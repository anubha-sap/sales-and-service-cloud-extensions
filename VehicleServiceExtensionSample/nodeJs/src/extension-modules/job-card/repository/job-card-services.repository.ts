import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../common/repository/base/base-repository';
import { JobCardServices } from '../entities/job-card-services.entity';
import { JobCardServicesRepositoryInterface } from './job-card-services.repository.interface';
import { MESSAGES, SESSION } from '../../../common/constants';
import { REQUEST } from '@nestjs/core';
import { CustomLogger } from '../../../logger/logger.service';
import { JobCardServiceResponseDto } from '../dto/job-card/job-card-service/response-job-card-service.dto';

@Injectable()
export class JobCardServiceRepository
  extends BaseRepository<JobCardServices>
  implements JobCardServicesRepositoryInterface
{
  private requestId: string;

  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    @InjectRepository(JobCardServices)
    private readonly jobCardServicesRepository: Repository<JobCardServices>,
    private readonly logger: CustomLogger,
  ) {
    super(jobCardServicesRepository);
    this.logger.setClassName(JobCardServiceRepository.name);
    this.requestId = this.request[SESSION].reqId;
  }

  public async findOne(options: any): Promise<JobCardServices> {
    const startTime = new Date().getTime();
    const result = await this.jobCardServicesRepository.findOne(options);
    const endTime = new Date().getTime();
    this.logger.debug(
      `Time taken by request ${
        this.requestId
      } to get the job-card-service from DB ${options.where?.id}: ${
        (endTime - startTime) / 1000
      } seconds`,
    );
    if (!result) {
      throw new NotFoundException(
        `JobCardService ${MESSAGES.RESOURCE_NOT_FOUND}`,
      );
    }
    return result;
  }

  public async findAllJobCardServices(
    options: any,
  ): Promise<JobCardServices[]> {
    const startTime = new Date().getTime();
    const result = await this.findAll(options);
    const endTime = new Date().getTime();
    this.logger.debug(
      `Time taken by request ${
        this.requestId
      } to get all job-card-services from DB ${
        (endTime - startTime) / 1000
      } seconds`,
    );
    return result;
  }
}
