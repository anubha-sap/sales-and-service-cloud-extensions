import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './health/health.module';
import { DatabaseModule } from './database/database.module';
import { SessionMiddleware } from './common/middleware/session.middleware';
import { UtilsModule } from './utils/utils.module';
import { CasesModule } from './cns-modules/cases/cases.module';
import { CustomerModule } from './cns-modules/customer/customer.module';
import { RegisteredProductsModule } from './cns-modules/registered-products/registered-products.module';
import { DataSourceOptions } from 'typeorm';
import { DB_TYPE } from './common/constants';
import { InspectionItem } from './extension-modules/inspection-items/entities/inspection-item.entity';
import { InspectionItemsModule } from './extension-modules/inspection-items/inspection-items.module';
import { InvoiceModule } from './extension-modules/invoice/invoice.module';
import { JobCardServices } from './extension-modules/job-card/entities/job-card-services.entity';
import { JobCard } from './extension-modules/job-card/entities/job-card.entity';
import { JobCardModule } from './extension-modules/job-card/job-card.module';
import { ServiceForm } from './extension-modules/service-form/entities/service-form.entity';
import { ServiceFormModule } from './extension-modules/service-form/service-form.module';
import { Services } from './extension-modules/services/entities/service.entity';
import { ServicesModule } from './extension-modules/services/service.module';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { EmployeesModule } from './extension-modules/employees/employees.module';
import { Employee } from './extension-modules/employees/entities/employee.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: DB_TYPE,
      host: process.env.hanadb_binding_host,
      port: parseInt(process.env.hanadb_binding_port),
      username: process.env.db_user,
      password: process.env.db_password,
      entities: [
        Services,
        JobCard,
        JobCardServices,
        InspectionItem,
        ServiceForm,
        Employee,
      ],
      synchronize: process.env.synchronize === 'true' ? true : false,
      dropSchema: process.env.dropSchema === 'true' ? true : false,
    } as DataSourceOptions),
    ServicesModule,
    HealthModule,
    JobCardModule,
    CasesModule,
    InspectionItemsModule,
    DatabaseModule,
    CustomerModule,
    ServiceFormModule,
    RegisteredProductsModule,
    InvoiceModule,
    UtilsModule,
    LoggerModule,
    EmployeesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware)
      .exclude({
        path: `/healthz`,
        method: RequestMethod.ALL,
      })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
