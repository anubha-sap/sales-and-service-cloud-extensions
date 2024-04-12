/* eslint-disable @typescript-eslint/no-empty-interface */
import { FindManyOptions } from 'typeorm';
import { BaseRepositoryInterface } from '../../../common/repository/base/base-repository.interface';
import { JobCard } from '../entities/job-card.entity';
import { UpdateJobCardDto } from '../dto/job-card/update-job-card.dto';
import { JobCardResponseDto } from '../dto/job-card/response-job-card.dto';
import { JobCardCountResponseType } from '../../common/interfaces';

export interface JobCardRepositoryInterface
  extends BaseRepositoryInterface<JobCard> {
  findOneJobCard(id: string): Promise<JobCardResponseDto>;
  findAllJobCards(
    options?: FindManyOptions<JobCard>,
  ): Promise<JobCardCountResponseType>;
  updateJobCard(
    id: string,
    updateData: UpdateJobCardDto,
    updatedBy: string,
  ): Promise<JobCardResponseDto>;
}
