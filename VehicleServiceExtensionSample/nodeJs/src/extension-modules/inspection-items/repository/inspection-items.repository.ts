import { InspectionItem } from '../entities/inspection-item.entity';
import { InspectionItemsRepositoryInterface } from './inspection-items.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../common/repository/base/base-repository';

@Injectable()
export class InspectionItemsRepository
  extends BaseRepository<InspectionItem>
  implements InspectionItemsRepositoryInterface
{
  constructor(
    @InjectRepository(InspectionItem)
    private readonly inspectionItemRepository: Repository<InspectionItem>,
  ) {
    super(inspectionItemRepository);
  }
}
