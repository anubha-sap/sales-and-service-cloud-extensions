import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { JobCardModule } from '../job-card/job-card.module';
import { HttpModule } from '@nestjs/axios';
import { CasesModule } from '../../cns-modules/cases/cases.module';

@Module({
  imports: [HttpModule, JobCardModule, CasesModule],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
