import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { QueryParamsDTO } from '../common/dto/query-param.dto';
import { UtilsService } from '../../utils/utils.service';
import { Scopes } from '../../common/decorators/scopes.decorator';
import { AuthGuard } from '../../common/guards/auth-guard/auth.guard';
import { Scope } from '../common/enums';

@Controller('generate-invoice')
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly utilService: UtilsService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  @Scopes(Scope.GenerateInvoice)
  invoice(@Query() { $filter }: QueryParamsDTO) {
    const oQuery = this.utilService.parseFilterString($filter);
    return this.invoiceService.createInvoice(oQuery);
  }
}
