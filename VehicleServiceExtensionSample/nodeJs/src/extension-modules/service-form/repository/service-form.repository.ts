import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { BaseRepository } from '../../../common/repository/base/base-repository';
import { ServiceForm } from '../entities/service-form.entity';
import { ServiceFormRepositoryInterface } from './service-form.repository.interface';
import { UtilsService } from '../../../utils/utils.service';
import { UpdateServiceFormDto } from '../dto/service-form/update-service-form.dto';
import { ServiceFormResponseDto } from '../dto/service-form/response-service-form.dto';
import { REQUEST } from '@nestjs/core';
import { CustomLogger } from '../../../logger/logger.service';
import { SESSION } from '../../../common/constants';

@Injectable()
export class ServiceFormRepository
  extends BaseRepository<ServiceForm>
  implements ServiceFormRepositoryInterface
{
  private requestId: string;

  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    @InjectRepository(ServiceForm)
    private readonly serviceFormRepository: Repository<ServiceForm>,
    private readonly utilService: UtilsService,
    private readonly logger: CustomLogger,
  ) {
    super(serviceFormRepository);
    this.logger.setClassName(ServiceFormRepository.name);
    this.requestId = this.request[SESSION].reqId;
  }

  public async findOneServiceForm(id: string): Promise<ServiceFormResponseDto> {
    const startTime = new Date().getTime();
    const result = await this.findOne(id);
    const endTime = new Date().getTime();
    this.logger.debug(
      `Time taken by request ${
        this.requestId
      } to get the service-form ${id} from DB: ${
        (endTime - startTime) / 1000
      } seconds`,
    );
    return ServiceFormResponseDto.toDto(result);
  }

  public async findAllServiceForms(
    options?: FindManyOptions<ServiceForm>,
  ): Promise<ServiceFormResponseDto[]> {
    const startTime = new Date().getTime();
    const oServiceFormArray = await this.findAll(options);
    const endTime = new Date().getTime();
    this.logger.debug(
      `Time taken by request ${
        this.requestId
      } to get all service-fors from DB: ${
        (endTime - startTime) / 1000
      } seconds`,
    );
    const oParsedServiceFormArray: Array<ServiceFormResponseDto> = [];
    for (const oServiceForm of oServiceFormArray) {
      oParsedServiceFormArray.push(ServiceFormResponseDto.toDto(oServiceForm));
    }
    return oParsedServiceFormArray;
  }

  public async updateServiceForm(
    id: string,
    updateData: UpdateServiceFormDto,
    updatedBy: string,
  ): Promise<ServiceFormResponseDto> {
    const oPatchData = this.utilService.stringifyServiceFormDto(updateData);
    const startTime = new Date().getTime();
    const oUpdateData = await this.update(id, oPatchData, updatedBy);
    const endTime = new Date().getTime();
    this.logger.debug(
      `Time taken by request ${
        this.requestId
      } to update the service-form ${id} in DB: ${
        (endTime - startTime) / 1000
      } seconds`,
    );
    return ServiceFormResponseDto.toDto(oUpdateData);
  }
}
