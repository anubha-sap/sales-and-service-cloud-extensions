import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JobCard } from './entities/job-card.entity';
import { FindManyOptions, FindOptionsWhere, QueryRunner } from 'typeorm';
import { CreateJobCardQueryDto } from './dto/job-card/create-job-card.dto';
import { JobCardServices } from './entities/job-card-services.entity';
import { ServiceFormService } from '../service-form/service-form.service';
import { UpdateJobCardServiceDto } from './dto/job-card/update-job-card-service';
import { UpdateJobCardDto } from './dto/job-card/update-job-card.dto';
import { REQUEST } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';
import { CasesService } from '../../cns-modules/cases/cases.service';
import { CustomerService } from '../../cns-modules/customer/customer.service';
import {
  ENTITY_NAME,
  SESSION,
  TRANSLATION_JSON_FILE,
  MESSAGES,
  CASE_TYPE,
} from '../../common/constants';
import { SFStatus, JCStatus, ServiceStatus } from '../common/enums';
import { ServerException } from '../../common/filters/server-exception';
import { TransactionManager } from '../../database/transaction.manager';
import { UtilsService } from '../../utils/utils.service';
import { CustomerDetails, JobCardType, CodeList } from '../common/interfaces';
import { JobCardRepository } from './repository/job-card.repository';
import { JobCardServiceRepository } from './repository/job-card-services.repository';
import { JobCardResponseDto } from './dto/job-card/response-job-card.dto';
import { ServiceForm } from '../service-form/entities/service-form.entity';
import { CustomLogger } from '../../logger/logger.service';

@Injectable()
export class JobCardService {
  private userId: string;
  private language: string;
  private jobCardIdExtensionField: string;
  private caseStatusBooked: string;
  private caseStatusServiceInProcess: string;
  private caseStatusServiceCompleted: string;
  private caseStatusClosed: string;
  private caseStatusCompleted: string;
  private requestId: string;

  constructor(
    private readonly logger: CustomLogger,
    private readonly jobCardRepository: JobCardRepository,
    private readonly jobCardServicesRepository: JobCardServiceRepository,
    private serviceFormService: ServiceFormService,
    private casesService: CasesService,
    private customerService: CustomerService,
    private transactionManager: TransactionManager,
    private readonly i18n: I18nService,
    private readonly utilService: UtilsService,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    this.logger.setClassName(JobCardService.name);
    this.userId = this.request[SESSION].userId;
    this.language = this.request[SESSION].language;
    this.jobCardIdExtensionField =
      this.request[SESSION].extensionFields.jobCardId;
    this.caseStatusBooked = this.request[SESSION].caseStatuses.booked;
    this.caseStatusServiceInProcess =
      this.request[SESSION].caseStatuses.serviceInProcess;
    this.caseStatusServiceCompleted =
      this.request[SESSION].caseStatuses.serviceCompleted;
    this.caseStatusClosed = this.request[SESSION].caseStatuses.closed;
    this.caseStatusCompleted = this.request[SESSION].caseStatuses.completed;
    this.requestId = this.request[SESSION].reqId;
  }

  async create(oJobCardCreateDto: CreateJobCardQueryDto) {
    let oResult;
    try {
      const sServiceFormId = oJobCardCreateDto.sourceid;
      const oServiceForm = await this.serviceFormService.findOne(
        sServiceFormId,
      );

      if (oServiceForm.status != SFStatus.Z02) {
        throw new InternalServerErrorException(
          MESSAGES.SERVICE_FORM_NOT_BOOKED,
        );
      }

      const oJobCardServices = new Array<JobCardServices>();
      const oServices = oServiceForm.servicesProposed.filter(
        (service) => service.isSelected === true,
      );
      if (oServices.length === 0) {
        throw new InternalServerErrorException(MESSAGES.NO_SERVICES_SELECTED);
      }
      for (const oService of oServices) {
        const oJobCardService = JobCardServices.toEntity(oService);
        oJobCardServices.push(oJobCardService);
      }

      const sCaseId = oServiceForm.caseId;

      const oCase = await this.casesService.getCaseById(sCaseId);
      if (oCase.status === this.caseStatusCompleted) {
        throw new Error(MESSAGES.CASE_COMPLETED);
      }
      const oCaseData = this.casesService.getCaseData(oCase);

      // Get customer contact number either from account or individual customer if contact info is unavailable in case response
      let oCustomerData: CustomerDetails = {
        name: oCaseData.sCustomerName,
        contactNumber: oCaseData.sContactNumber,
        serviceAdvisor: oCaseData.sProcessor,
      };
      oCustomerData = await this.getCustomerPhoneName(oCase, oCustomerData);

      const oJobCard: JobCardType = {
        caseId: sCaseId,
        caseDisplayId: oCaseData.sCaseDisplayId,
        status: JCStatus.Z11,
        milometer: oServiceForm.milometer,
        estimatedCompletionDate: oCaseData.sEstimatedCompletionDate,
        registeredProduct: oServiceForm.registeredProduct,
        servicesSelected: oJobCardServices,
        customerComplaints: oServiceForm.customerComplaints,
      };
      const oJobCardEntity = JobCard.toEntity(oJobCard, this.userId);
      oJobCardEntity.serviceForm = oServiceForm as unknown as ServiceForm;

      const startTime = new Date().getTime();
      oResult = await this.transactionManager.executeTransaction(
        async (queryRunner) => {
          oResult = await queryRunner.manager.save(oJobCardEntity);

          // Updating case status to `Service Booked`, adding job card id in case
          const oUpdateData = {
            status: this.caseStatusBooked,
            extensions: {
              [this.jobCardIdExtensionField]: oResult.displayId.toString(),
            },
          };
          await this.casesService.updateCase(sCaseId, oUpdateData);
          if (oResult.servicesSelected) {
            const oServicesSelected = oResult.servicesSelected.map((service) =>
              JobCardServices.toDto(service),
            );
            oResult.servicesSelected = oServicesSelected;
          }

          oResult.serviceAdvisor = oCustomerData.serviceAdvisor;
          delete oCustomerData.serviceAdvisor;
          oResult.customerDetails = oCustomerData;
          return oResult;
        },
      );
      const endTime = new Date().getTime();
      this.logger.debug(
        `Time taken by request ${this.requestId} to create JobCard ${
          oResult.displayId
        } and update case status for case ${sCaseId}: ${
          (endTime - startTime) / 1000
        } seconds`,
      );
    } catch (error) {
      throw new ServerException(error, JobCardService.name, this.create.name);
    }
    const oJobCard = JobCardResponseDto.toDto(oResult);
    return this.translateJobCardEntity(oJobCard);
  }

  async findAll(
    query: FindOptionsWhere<JobCard>[] | FindOptionsWhere<JobCard>,
    getCustomerDetails = true,
  ) {
    try {
      const oQuery: FindManyOptions<JobCard> = {
        where: query,
      };
      const oJobCardEntities = await this.jobCardRepository.findAllJobCards(
        oQuery,
      );
      const oJobCards = new Array<JobCardResponseDto>();
      for (const oEntity of oJobCardEntities) {
        if (getCustomerDetails) {
          const oCustomerDetails = await this.getCustomerDetailsFromCase(
            oEntity.caseId,
          );
          oEntity.serviceAdvisor = oCustomerDetails.serviceAdvisor;
          delete oCustomerDetails.serviceAdvisor;
          oEntity.customerDetails = oCustomerDetails;
        }
        oJobCards.push(await this.translateJobCardEntity(oEntity));
      }
      return oJobCards;
    } catch (error) {
      throw new ServerException(error, JobCardService.name, this.findAll.name);
    }
  }

  async findOne(id: string) {
    try {
      const oJobCard = await this.jobCardRepository.findOneJobCard(id);

      const oCustomerDetails = await this.getCustomerDetailsFromCase(
        oJobCard.caseId,
      );
      oJobCard.serviceAdvisor = oCustomerDetails.serviceAdvisor;
      delete oCustomerDetails.serviceAdvisor;
      oJobCard.customerDetails = oCustomerDetails;

      if (oJobCard.servicesSelected) {
        const oServicesSelected = oJobCard.servicesSelected.map((service) =>
          JobCardServices.toDto(service),
        );
        Object.assign(oJobCard.servicesSelected, oServicesSelected);
      }
      return this.translateJobCardEntity(oJobCard);
    } catch (error) {
      throw new ServerException(error, JobCardService.name, this.findOne.name);
    }
  }

  async update(id: string, updateJobCardDto: UpdateJobCardDto) {
    try {
      if (Object.keys(updateJobCardDto).length === 0) {
        throw new InternalServerErrorException(MESSAGES.NO_UPDATE_DATA);
      }
      const oJobCard = await this.jobCardRepository.updateJobCard(
        id,
        updateJobCardDto,
        this.userId,
      );

      const oCustomerDetails = await this.getCustomerDetailsFromCase(
        oJobCard.caseId,
      );
      oJobCard.serviceAdvisor = oCustomerDetails.serviceAdvisor;
      delete oCustomerDetails.serviceAdvisor;
      oJobCard.customerDetails = oCustomerDetails;

      return this.translateJobCardEntity(oJobCard);
    } catch (error) {
      throw new ServerException(error, JobCardService.name, this.update.name);
    }
  }

  async remove(id: string) {
    try {
      return await this.jobCardRepository.delete(id);
    } catch (error) {
      throw new ServerException(error, JobCardService.name, this.remove.name);
    }
  }

  async findAllJobCardServices(jobCardId: string) {
    try {
      return await this.jobCardServicesRepository.findAllJobCardServices({
        where: { jobCard: { id: jobCardId } },
      });
    } catch (error) {
      throw new ServerException(
        error,
        JobCardService.name,
        this.findAllJobCardServices.name,
      );
    }
  }

  async findOneJobCardService(
    jobCardId: string,
    jobCardServiceId: string,
    eager?: boolean,
  ) {
    const oQuery = {
      where: {
        jobCard: { id: jobCardId },
        id: jobCardServiceId,
      },
    };
    if (eager) {
      oQuery['relations'] = { jobCard: true };
    }

    try {
      return await this.jobCardServicesRepository.findOne(oQuery);
    } catch (error) {
      throw new ServerException(
        error,
        JobCardService.name,
        this.findOneJobCardService.name,
      );
    }
  }

  async updateJobCardService(
    jobCardId: string,
    jobCardServiceId: string,
    updateJobCardService: UpdateJobCardServiceDto,
  ) {
    try {
      let oCaseUpdateData = {};
      let bJobCardCompleted = false;
      let bJobCardStarted = false;

      const oResult = await this.findOneJobCardService(
        jobCardId,
        jobCardServiceId,
        true,
      );
      oResult.updatedBy = this.userId;

      for (const sField of Object.keys(updateJobCardService)) {
        oResult[sField] = updateJobCardService[sField];
      }

      if (
        [ServiceStatus.Z22, ServiceStatus.Z23].includes(
          updateJobCardService.status,
        )
      ) {
        this.addStartOrEndTime(updateJobCardService, oResult);
        const oData = await this.createCaseUpdateData(
          jobCardId,
          updateJobCardService,
        );
        oCaseUpdateData = oData.oCaseUpdateData;
        bJobCardStarted = oData.bJobCardStarted;
        bJobCardCompleted = oData.bJobCardCompleted;
      }

      const sCaseId = oResult.jobCard.caseId;
      const sJobCardId = oResult.jobCard.id;
      let oUpdatedJobCardService: JobCardServices;

      if (bJobCardStarted) {
        oUpdatedJobCardService =
          await this.transactionManager.executeTransaction(
            async (queryRunner: QueryRunner) => {
              await queryRunner.manager.save(oResult);
              const oJobCardUpdateData = {
                updatedBy: this.userId,
              };
              await queryRunner.manager.update(
                JobCard,
                sJobCardId,
                oJobCardUpdateData,
              );
              await this.casesService.updateCase(sCaseId, oCaseUpdateData);
              delete oResult.jobCard;
              return oResult;
            },
          );
      } else if (bJobCardCompleted) {
        /* When all the services are completed, first update the job-card, job-card-services statuses to completed, then update case status to completed.
      This order is important because there is a custom logic validation which throws error if we try to close case before all job-card-services are closed.
      This is the reason why casesService.updateCase() is not part of executeTransaction() */
        oUpdatedJobCardService =
          await this.transactionManager.executeTransaction(
            async (queryRunner: QueryRunner) => {
              await queryRunner.manager.save(oResult);
              const oJobCardUpdateData = {
                status: JCStatus.Z13,
                updatedBy: this.userId,
              };
              await queryRunner.manager.update(
                JobCard,
                sJobCardId,
                oJobCardUpdateData,
              );
              delete oResult.jobCard;
              return oResult;
            },
          );
        await this.casesService.updateCase(sCaseId, oCaseUpdateData);
      } else {
        oUpdatedJobCardService =
          await this.transactionManager.executeTransaction(
            async (queryRunner: QueryRunner) => {
              await queryRunner.manager.save(oResult);
              const oJobCardUpdateData = {
                updatedBy: this.userId,
              };
              await queryRunner.manager.update(
                JobCard,
                sJobCardId,
                oJobCardUpdateData,
              );
              delete oResult.jobCard;
              return oResult;
            },
          );
      }
      return oUpdatedJobCardService;
    } catch (error) {
      throw new ServerException(
        error,
        JobCardService.name,
        this.updateJobCardService.name,
      );
    }
  }

  async findAllJCStatus() {
    const oCodeList: CodeList[] = [];
    try {
      for (const status in JCStatus) {
        const codeval: CodeList = {
          code: status,
          description: await this.i18n.translate(
            `${TRANSLATION_JSON_FILE}.${status}`,
            {
              lang: this.language,
            },
          ),
        };
        oCodeList.push(codeval);
      }
    } catch (error) {
      throw new ServerException(
        error,
        JobCardService.name,
        this.findAllJCStatus.name,
      );
    }
    return oCodeList;
  }

  async findAllJCServiceStatus() {
    const oCodeList: CodeList[] = [];
    try {
      for (const status in ServiceStatus) {
        const codeval: CodeList = {
          code: status,
          description: await this.i18n.translate(
            `${TRANSLATION_JSON_FILE}.${status}`,
            {
              lang: this.language,
            },
          ),
        };
        oCodeList.push(codeval);
      }
    } catch (error) {
      throw new ServerException(
        error,
        JobCardService.name,
        this.findAllJCServiceStatus.name,
      );
    }
    return oCodeList;
  }

  async findValidationStatusService(body) {
    const entityName = body?.entity;
    const sCompleteAggregateEntity = body?.currentImage;
    let error = [];
    const info = [];
    try {
      const oCompleteAggregateEntity = JSON.parse(sCompleteAggregateEntity);
      const query = {
        caseId: oCompleteAggregateEntity.id,
      };
      const caseDetails = {
        caseStatus: oCompleteAggregateEntity.status,
        caseType: oCompleteAggregateEntity.caseType,
      };
      // Check for valid case with entity name, caseId, caseType and status
      if (
        entityName === ENTITY_NAME.CASE &&
        query.caseId &&
        caseDetails.caseType === CASE_TYPE.VEHICLE_SERVICE_REQUEST &&
        (caseDetails.caseStatus === this.caseStatusCompleted ||
          caseDetails.caseStatus === this.caseStatusClosed ||
          caseDetails.caseStatus === this.caseStatusServiceCompleted)
      ) {
        const result = await this.findAll(query, false);
        if (!result || result.length === 0) {
          // Check if case id exists or case ID has any job cards
          error = this.utilService.getCustomLogicErrorDetails(
            error,
            query.caseId,
            MESSAGES.JOBCARD_NOT_FOUND,
          );
        } else {
          for (const jobCard of result) {
            // Check if job card has any servicesSelected
            if (
              !jobCard.servicesSelected ||
              jobCard.servicesSelected.length === 0
            ) {
              error = this.utilService.getCustomLogicErrorDetails(
                error,
                query.caseId,
                MESSAGES.NO_SERVICES_SELECTED,
              );
            } else {
              for (const servicesSelected of jobCard.servicesSelected) {
                // Check for servicesSelected complete status
                if (servicesSelected.status !== ServiceStatus.Z23) {
                  error = this.utilService.getCustomLogicErrorDetails(
                    error,
                    query.caseId,
                    MESSAGES.CASE_STATUS_DISABLED,
                  );
                  break;
                }
              }
            }
          }
        }
      }
    } catch (error) {
      throw new ServerException(
        error,
        JobCardService.name,
        this.findValidationStatusService.name,
      );
    }

    const responseData = {
      data: sCompleteAggregateEntity,
      info: info,
      error: error,
    };

    return responseData;
  }

  async translateJobCardEntity(oJobCardInstance: JobCardResponseDto) {
    oJobCardInstance.statusDescription = await this.i18n.translate(
      `${TRANSLATION_JSON_FILE}.${oJobCardInstance.status}`,
      {
        lang: this.language,
      },
    );
    if (oJobCardInstance.servicesSelected.length > 0) {
      for (let i = 0; i < oJobCardInstance.servicesSelected.length; i++) {
        oJobCardInstance.servicesSelected[i].statusDescription =
          await this.i18n.translate(
            `${TRANSLATION_JSON_FILE}.${oJobCardInstance.servicesSelected[i].status}`,
            {
              lang: this.language,
            },
          );
      }
    }
    return oJobCardInstance;
  }

  async getCustomerDetailsFromCase(sCaseId: string) {
    const oCase = await this.casesService.getCaseById(sCaseId);
    const oCaseData = this.casesService.getCaseData(oCase);

    let oCustomerData: CustomerDetails = {
      name: oCaseData.sCustomerName,
      contactNumber: oCaseData.sContactNumber,
      serviceAdvisor: oCaseData.sProcessor,
    };

    oCustomerData = await this.getCustomerPhoneName(oCase, oCustomerData);
    return oCustomerData;
  }

  async getCustomerPhoneName(oCase, oCustomerData: CustomerDetails) {
    if (!oCustomerData.contactNumber) {
      let contactNumber: string;
      if (oCase.individualCustomer) {
        ({ contactNumber } =
          await this.customerService.getIndividualCustomerInfo(
            oCase.individualCustomer.id,
          ));
      } else if (oCase.account) {
        ({ contactNumber } = await this.customerService.getAccountInfo(
          oCase.account.id,
        ));
      }
      oCustomerData.contactNumber = contactNumber;
    }
    return oCustomerData;
  }

  addStartOrEndTime(updateJobCardService, oResult) {
    if (
      updateJobCardService.status === ServiceStatus.Z22 &&
      !oResult.startTime
    ) {
      oResult.startTime = new Date().toISOString();
    } else if (
      updateJobCardService.status === ServiceStatus.Z23 &&
      !oResult.endTime
    ) {
      oResult.endTime = new Date().toISOString();
    }
  }

  async createCaseUpdateData(jobCardId, updateJobCardService) {
    let oCaseUpdateData = {};
    let bJobCardStarted = false;
    let bJobCardCompleted = false;

    const oJobCardServices = await this.findAllJobCardServices(jobCardId);
    const nJobCardServices = oJobCardServices.length;
    const nCompletedServices = oJobCardServices.filter(
      (service) => service.status === ServiceStatus.Z23,
    ).length;
    const nInProgressServices = oJobCardServices.filter(
      (service) => service.status === ServiceStatus.Z22,
    ).length;

    // If the first service is started, update case status to "Service In Process".
    if (
      updateJobCardService.status === ServiceStatus.Z22 &&
      nInProgressServices === 0 &&
      nCompletedServices === 0
    ) {
      oCaseUpdateData = {
        status: this.caseStatusServiceInProcess,
      };
      bJobCardStarted = true;
    }
    // If the last service is completed, update case status to "Service Completed", update job card status to "Completed"
    else if (
      updateJobCardService.status === ServiceStatus.Z23 &&
      nCompletedServices + 1 === nJobCardServices
    ) {
      oCaseUpdateData = {
        status: this.caseStatusServiceCompleted,
      };
      bJobCardCompleted = true;
    }

    return { oCaseUpdateData, bJobCardStarted, bJobCardCompleted };
  }
}
