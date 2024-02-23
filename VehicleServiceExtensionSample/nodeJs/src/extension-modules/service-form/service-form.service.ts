import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InspectionItemsService } from '../inspection-items/inspection-items.service';
import {
  FindManyOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
  FindOptionsWhere,
} from 'typeorm';
import { ServicesService } from '../services/service.service';
import { ServiceForm } from './entities/service-form.entity';
import { CreateServiceFormDto } from './dto/service-form/create-service-form.dto';
import { I18nService } from 'nestjs-i18n';
import { REQUEST } from '@nestjs/core';
import { CasesService } from '../../cns-modules/cases/cases.service';
import { RegisteredProductsService } from '../../cns-modules/registered-products/registered-products.service';
import {
  SESSION,
  TRANSLATION_JSON_FILE,
  MESSAGES,
} from '../../common/constants';
import { SFStatus } from '../common/enums';
import { ServerException } from '../../common/filters/server-exception';
import { TransactionManager } from '../../database/transaction.manager';
import { ServiceFormType } from '../common/interfaces';
import { ServiceFormRepository } from './repository/service-form.repository';
import { UpdateServiceFormDto } from './dto/service-form/update-service-form.dto';
import { ServiceFormResponseDto } from './dto/service-form/response-service-form.dto';
import { CustomLogger } from '../../logger/logger.service';

@Injectable()
export class ServiceFormService {
  private serviceFormIdExtensionField: string;
  private caseStatusCompleted: string;
  private requestId: string;

  constructor(
    private readonly logger: CustomLogger,
    private readonly serviceFormRepository: ServiceFormRepository,
    private casesService: CasesService,
    private inspectionItemsService: InspectionItemsService,
    private servicesService: ServicesService,
    private registeredProductsService: RegisteredProductsService,
    private transactionManager: TransactionManager,
    private readonly i18n: I18nService,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    this.logger.setClassName(ServiceFormService.name);
    this.serviceFormIdExtensionField =
      this.request[SESSION].extensionFields.serviceFormId;
    this.caseStatusCompleted = this.request[SESSION].caseStatuses.completed;
    this.requestId = this.request[SESSION].reqId;
  }

  async findOne(id: string) {
    try {
      const oServiceForm = await this.serviceFormRepository.findOneServiceForm(
        id,
      );
      return this.translateServiceFormEntity(oServiceForm);
    } catch (error) {
      throw new ServerException(
        error,
        ServiceFormService.name,
        this.findOne.name,
      );
    }
  }

  async findAll(
    query: FindOptionsWhere<ServiceForm>[] | FindOptionsWhere<ServiceForm>,
  ) {
    try {
      const oQuery: FindManyOptions<ServiceForm> = {
        where: query,
      };
      const oServiceForms =
        await this.serviceFormRepository.findAllServiceForms(oQuery);
      const oTranslatedServiceForms = new Array<ServiceFormResponseDto>();
      for (const oEntity of oServiceForms) {
        oTranslatedServiceForms.push(
          await this.translateServiceFormEntity(oEntity),
        );
      }
      return oTranslatedServiceForms;
    } catch (error) {
      throw new ServerException(
        error,
        ServiceFormService.name,
        this.findAll.name,
      );
    }
  }

  async create(createServiceFormDto: CreateServiceFormDto) {
    let result: ServiceForm;
    try {
      const sCaseId = createServiceFormDto.caseId;
      const oServiceForm = await this.getServiceFormInfo(createServiceFormDto);
      const userId = this.request[SESSION].userId;
      const oServiceFormEntity = ServiceForm.toEntity(oServiceForm, userId);

      const startTime = new Date().getTime();
      result = await this.transactionManager.executeTransaction(
        async (queryRunner) => {
          result = await queryRunner.manager.save(oServiceFormEntity);

          // Updating case with service-form id
          const oUpdateData = {
            extensions: {
              [this.serviceFormIdExtensionField]: result.displayId.toString(),
            },
          };
          await this.casesService.updateCase(sCaseId, oUpdateData);
          return result;
        },
      );
      const endTime = new Date().getTime();
      this.logger.debug(
        `Time taken by request ${
          this.requestId
        } to create ServiceForm with id ${
          result.displayId
        } and update case status for case ${sCaseId}: ${
          (endTime - startTime) / 1000
        } seconds`,
      );
    } catch (error) {
      throw new ServerException(
        error,
        ServiceFormService.name,
        this.create.name,
      );
    }
    const oServiceForm = ServiceFormResponseDto.toDto(result);
    return this.translateServiceFormEntity(oServiceForm);
  }

  async update(id: string, updateServiceFormDto: UpdateServiceFormDto) {
    try {
      if (Object.keys(updateServiceFormDto).length === 0) {
        throw new InternalServerErrorException(MESSAGES.NO_UPDATE_DATA);
      }
      const userId = this.request[SESSION].userId;

      // servicesProposed, inspectionItems ids should be used to fetch its master data
      updateServiceFormDto = await this.fetchServicesAndInspectionItems(
        updateServiceFormDto,
      );

      const oServiceForm = await this.serviceFormRepository.updateServiceForm(
        id,
        updateServiceFormDto,
        userId,
      );
      return this.translateServiceFormEntity(oServiceForm);
    } catch (error) {
      throw new ServerException(
        error,
        ServiceFormService.name,
        this.update.name,
      );
    }
  }

  async remove(id: string) {
    try {
      return await this.serviceFormRepository.delete(id);
    } catch (error) {
      throw new ServerException(
        error,
        InspectionItemsService.name,
        this.remove.name,
      );
    }
  }

  async getServiceFormInfo(createServiceFormDto: CreateServiceFormDto) {
    try {
      const sCaseId = createServiceFormDto.caseId;
      let nMilometer = createServiceFormDto.milometer;

      // Getting case. Throws error if case is completed
      const oCase = await this.casesService.getCaseById(sCaseId);
      if (oCase.status === this.caseStatusCompleted) {
        throw new InternalServerErrorException(MESSAGES.CASE_COMPLETED);
      }

      if (!nMilometer) {
        ({ nMilometer } = await this.casesService.getCaseData(oCase));
      }
      if (!nMilometer) {
        throw new InternalServerErrorException(MESSAGES.NO_MILOMETER_IN_CASE);
      }

      // Getting Registered Products. Registered Product Id is taken from case data above
      const oRegisteredProductData =
        await this.registeredProductsService.getRegisteredProductData(oCase);

      // Get Inspection Items
      const oInspectionItems = await this.inspectionItemsService.findAll({
        select: {
          id: true,
          description: true,
          isSelected: true,
        },
      });
      if (oInspectionItems.length === 0) {
        throw new InternalServerErrorException(
          MESSAGES.NO_INSPECTION_ITEMS_AVAILABLE,
        );
      }

      // Get a list of suggested services based on the milometer reading of the vehicle
      const oSuggestedServices = await this.getSuggestedServices(nMilometer);
      if (oSuggestedServices.length === 0) {
        throw new InternalServerErrorException(MESSAGES.NO_SERVICES_AVAILABLE);
      }

      const oServiceForm: ServiceFormType = {
        caseId: oCase.id,
        caseDisplayId: oCase.displayId,
        status: SFStatus.Z01,
        milometer: nMilometer,
        registeredProduct: oRegisteredProductData,
        inspectionItems: oInspectionItems,
        servicesProposed: oSuggestedServices,
      };

      return oServiceForm;
    } catch (error) {
      throw new ServerException(
        error,
        ServiceFormService.name,
        this.getServiceFormInfo.name,
      );
    }
  }

  async getSuggestedServices(milometer: number) {
    let suggestedServices = [];
    try {
      suggestedServices = await this.servicesService.findAll({
        where: {
          minMileage: LessThanOrEqual(milometer),
          maxMileage: MoreThanOrEqual(milometer),
        },
        select: {
          service: true,
          id: true,
          price: true,
          isSelected: true,
        },
      });
    } catch (error) {
      throw new ServerException(
        error,
        ServiceFormService.name,
        this.getSuggestedServices.name,
      );
    }
    return suggestedServices;
  }

  /*   async findAllStatus() {
    const oCodeList: CodeList[] = [];
    try {
      const sLang = this.request[SESSION].language;
      for (const status in SFStatus) {
        const codeval: CodeList = {
          code: status,
          description: await this.i18n.translate(
            `${TRANSLATION_JSON_FILE}.${status}`,
            {
              lang: sLang,
            },
          ),
        };
        oCodeList.push(codeval);
      }
    } catch (error) {
      throw new ServerException(
        error,
        ServiceFormService.name,
        this.findAllStatus.name,
      );
    }
    return oCodeList;
  } */

  async translateServiceFormEntity(
    oServiceFormInstance: ServiceFormResponseDto,
  ) {
    const sLang = this.request[SESSION].language;
    oServiceFormInstance.statusDescription = await this.i18n.translate(
      `${TRANSLATION_JSON_FILE}.${oServiceFormInstance.status}`,
      {
        lang: sLang,
      },
    );
    return oServiceFormInstance;
  }

  async fetchServicesAndInspectionItems(
    updateServiceFormDto: UpdateServiceFormDto,
  ) {
    if (updateServiceFormDto.servicesProposed) {
      for (const sp of updateServiceFormDto.servicesProposed) {
        const oService = await this.servicesService.findOne(sp.id);
        if (oService) {
          sp.service = oService.service;
          sp.price = oService.price;
        }
      }
    }
    if (updateServiceFormDto.inspectionItems) {
      for (const it of updateServiceFormDto.inspectionItems) {
        const oInspectionItem = await this.inspectionItemsService.findOne(
          it.id,
        );
        if (oInspectionItem) {
          it.description = oInspectionItem.description;
        }
      }
    }

    return updateServiceFormDto;
  }
}
