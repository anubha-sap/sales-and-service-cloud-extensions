import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ServiceFormService } from './service-form.service';
import { CreateServiceFormDto } from './dto/service-form/create-service-form.dto';
import { UpdateServiceFormDto } from './dto/service-form/update-service-form.dto';
import { EtagInterceptor } from '../../common/interceptor/etag.interceptor';
import { QueryParamsDTO } from '../common/dto/query-param.dto';
import { UtilsService } from '../../utils/utils.service';
import { Scopes } from '../../common/decorators/scopes.decorator';
import { AuthGuard } from '../../common/guards/auth-guard/auth.guard';
import { Scope } from '../common/enums';

@Controller('service-forms')
export class ServiceFormController {
  constructor(
    private readonly serviceFormService: ServiceFormService,
    private readonly utilService: UtilsService,
  ) {}

  @Post()
  @Scopes(Scope.CreateServiceForm)
  @UseGuards(AuthGuard)
  create(@Body() createServiceFormDto: CreateServiceFormDto) {
    return this.serviceFormService.create(createServiceFormDto);
  }

  @Get()
  @Scopes(Scope.ViewServiceForm)
  @UseGuards(AuthGuard)
  findAll(@Query() { $filter }: QueryParamsDTO) {
    const oQuery = this.utilService.parseFilterString($filter);
    return this.serviceFormService.findAll(oQuery);
  }

  @UseInterceptors(new EtagInterceptor())
  @Patch(':id')
  @Scopes(Scope.UpdateServiceForm)
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateServiceFormDto: UpdateServiceFormDto,
  ) {
    return this.serviceFormService.update(id, updateServiceFormDto);
  }

  @Delete(':id')
  @Scopes(Scope.DeleteServiceForm)
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.serviceFormService.remove(id);
  }

  /* @Get('/statuses')
  findAllStatus() {
    return this.serviceFormService.findAllStatus();
  } 

    @UseInterceptors(new EtagInterceptor())
  @Get(':id')
  @Scopes(Scope.ViewServiceForm)
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.serviceFormService.findOne(id);
  } */
}
