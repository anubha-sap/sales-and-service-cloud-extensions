import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ServiceFormService } from './service-form.service';
import { CreateServiceFormDto } from './dto/service-form/create-service-form.dto';
import { UpdateServiceFormDto } from './dto/service-form/update-service-form.dto';
import { EtagInterceptor } from '../../common/interceptor/etag.interceptor';
import { QueryParamsDTO } from '../common/dto/query-param.dto';
import { UtilsService } from '../../utils/utils.service';

@Controller('service-forms')
export class ServiceFormController {
  constructor(
    private readonly serviceFormService: ServiceFormService,
    private readonly utilService: UtilsService,
  ) {}

  @Post()
  create(@Body() createServiceFormDto: CreateServiceFormDto) {
    return this.serviceFormService.create(createServiceFormDto);
  }

  @Get()
  findAll(@Query() { $filter }: QueryParamsDTO) {
    const oQuery = this.utilService.parseFilterString($filter);
    return this.serviceFormService.findAll(oQuery);
  }

  @Get('/statuses')
  findAllStatus() {
    return this.serviceFormService.findAllStatus();
  }

  @UseInterceptors(new EtagInterceptor())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceFormService.findOne(id);
  }

  @UseInterceptors(new EtagInterceptor())
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceFormDto: UpdateServiceFormDto,
  ) {
    return this.serviceFormService.update(id, updateServiceFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceFormService.remove(id);
  }
}
