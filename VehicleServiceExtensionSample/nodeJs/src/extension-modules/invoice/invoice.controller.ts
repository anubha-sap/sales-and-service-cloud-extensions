import { Controller, Get, Query } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { QueryParamsDTO } from '../common/dto/query-param.dto';
import { UtilsService } from '../../utils/utils.service';

@Controller('generate-invoice')
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly utilService: UtilsService,
  ) {}

  @Get()
  invoice(@Query() { $filter }: QueryParamsDTO) {
    const oQuery = this.utilService.parseFilterString($filter);
    return this.invoiceService.createInvoice(oQuery);
  }
}
