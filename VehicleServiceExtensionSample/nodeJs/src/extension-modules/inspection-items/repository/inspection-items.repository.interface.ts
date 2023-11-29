/* eslint-disable @typescript-eslint/no-empty-interface */
import { BaseRepositoryInterface } from '../../../common/repository/base/base-repository.interface';
import { InspectionItem } from '../entities/inspection-item.entity';

export interface InspectionItemsRepositoryInterface
  extends BaseRepositoryInterface<InspectionItem> {}
