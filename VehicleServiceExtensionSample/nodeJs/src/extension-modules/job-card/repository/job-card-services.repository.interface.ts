/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseRepositoryInterface } from '../../../common/repository/base/base-repository.interface';
import { JobCardServices } from '../entities/job-card-services.entity';

export interface JobCardServicesRepositoryInterface
  extends BaseRepositoryInterface<JobCardServices> {}
