import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { BaseRepository } from '../../../common/repository/base/base-repository';
import { JobCard } from '../entities/job-card.entity';
import { JobCardRepositoryInterface } from './job-card.repository.interface';
import { JobCardResponseDto } from '../dto/job-card/response-job-card.dto';
import { UpdateJobCardDto } from '../dto/job-card/update-job-card.dto';
import { CustomLogger } from '../../../logger/logger.service';
import { REQUEST } from '@nestjs/core';
import { SESSION } from '../../../common/constants';

@Injectable()
export class JobCardRepository
  extends BaseRepository<JobCard>
  implements JobCardRepositoryInterface
{
  private requestId: string;

  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    @InjectRepository(JobCard)
    private readonly jobCardRepository: Repository<JobCard>,
    private readonly logger: CustomLogger,
  ) {
    super(jobCardRepository);
    this.logger.setClassName(JobCardRepository.name);
    this.requestId = this.request[SESSION].reqId;
  }

  public async findOneJobCard(id: string): Promise<JobCardResponseDto> {
    const startTime = new Date().getTime();
    const result = await this.findOne(id);
    const endTime = new Date().getTime();
    this.logger.debug(
      `Time taken by request ${
        this.requestId
      } to get the job-card ${id} from DB: ${
        (endTime - startTime) / 1000
      } seconds`,
    );
    return JobCardResponseDto.toDto(result);
  }

  public async findAllJobCards(
    options?: FindManyOptions<JobCard>,
  ): Promise<JobCardResponseDto[]> {
    const startTime = new Date().getTime();
    const oJobCardArray = await this.findAll(options);
    const endTime = new Date().getTime();
    this.logger.debug(
      `Time taken by request ${this.requestId} to get all job-cards from DB ${
        (endTime - startTime) / 1000
      } seconds`,
    );
    const oParsedJobCardArray: Array<JobCardResponseDto> = [];
    for (const oJobCard of oJobCardArray) {
      oParsedJobCardArray.push(JobCardResponseDto.toDto(oJobCard));
    }
    return oParsedJobCardArray;
  }

  public async updateJobCard(
    id: string,
    updateData: UpdateJobCardDto,
    updatedBy: string,
  ): Promise<JobCardResponseDto> {
    const startTime = new Date().getTime();
    const oUpdateData = await this.update(id, updateData, updatedBy);
    const endTime = new Date().getTime();
    this.logger.debug(
      `Time taken by request ${
        this.requestId
      } to update the job-card ${id} in DB: ${
        (endTime - startTime) / 1000
      } seconds`,
    );
    return JobCardResponseDto.toDto(oUpdateData);
  }
}
