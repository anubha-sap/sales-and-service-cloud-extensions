import { Module } from '@nestjs/common';
import { InspectionItemsService } from './inspection-items.service';
import { InspectionItemsController } from './inspection-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InspectionItem } from './entities/inspection-item.entity';
import { InspectionItemsRepository } from './repository/inspection-items.repository';

@Module({
  imports: [TypeOrmModule.forFeature([InspectionItem])],
  controllers: [InspectionItemsController],
  providers: [InspectionItemsService, InspectionItemsRepository],
  exports: [InspectionItemsService],
})
export class InspectionItemsModule {}
