/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseRepositoryInterface } from '../../../common/repository/base/base-repository.interface';
import { Services } from '../entities/service.entity';

export interface ServicesRepositoryInterface
  extends BaseRepositoryInterface<Services> {}
