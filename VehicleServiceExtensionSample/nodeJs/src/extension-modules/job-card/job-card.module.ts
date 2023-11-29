import { Module } from '@nestjs/common';
import { JobCardService } from './job-card.service';
import { JobCardController } from './job-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobCard } from './entities/job-card.entity';
import { JobCardServices } from './entities/job-card-services.entity';
import { ServicesModule } from '../services/service.module';
import { ServiceFormModule } from '../service-form/service-form.module';
import { CasesModule } from '../../cns-modules/cases/cases.module';
import { CustomerModule } from '../../cns-modules/customer/customer.module';
import { RegisteredProductsModule } from '../../cns-modules/registered-products/registered-products.module';
import { JobCardRepository } from './repository/job-card.repository';
import { JobCardServiceRepository } from './repository/job-card-services.repository';

@Module({
  imports: [
    ServiceFormModule,
    CustomerModule,
    ServicesModule,
    CasesModule,
    RegisteredProductsModule,
    TypeOrmModule.forFeature([JobCard, JobCardServices]),
  ],
  controllers: [JobCardController],
  providers: [JobCardService, JobCardRepository, JobCardServiceRepository],
  exports: [JobCardService],
})
export class JobCardModule {}
