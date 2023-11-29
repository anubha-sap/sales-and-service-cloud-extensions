import { Module } from '@nestjs/common';
import { ServiceFormService } from './service-form.service';
import { ServiceFormController } from './service-form.controller';
import { InspectionItemsModule } from '../inspection-items/inspection-items.module';
import { ServicesModule } from '../services/service.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceForm } from './entities/service-form.entity';
import { CasesModule } from '../../cns-modules/cases/cases.module';
import { CustomerModule } from '../../cns-modules/customer/customer.module';
import { RegisteredProductsModule } from '../../cns-modules/registered-products/registered-products.module';
import { I18nConfigModule } from '../i18n/i18n.module';
import { ServiceFormRepository } from './repository/service-form.repository';

@Module({
  imports: [
    I18nConfigModule,
    CasesModule,
    CustomerModule,
    InspectionItemsModule,
    ServicesModule,
    RegisteredProductsModule,
    TypeOrmModule.forFeature([ServiceForm]),
  ],
  controllers: [ServiceFormController],
  providers: [ServiceFormService, ServiceFormRepository],
  exports: [ServiceFormService],
})
export class ServiceFormModule {}
