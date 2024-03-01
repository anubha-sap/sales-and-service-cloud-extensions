import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './service.service';
import { UpdateServicesDto } from './dto/update-service.dto';
import { ServicesDto } from './dto/service.dto';
import { EtagInterceptor } from '../../common/interceptor/etag.interceptor';
import { Scopes } from '../../common/decorators/scopes.decorator';
import { Scope } from '../common/enums';
import { AuthGuard } from '../../common/guards/auth-guard/auth.guard';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Scopes(Scope.MasterData)
  create(@Body() createServiceDto: ServicesDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Scopes(Scope.MasterData)
  findAll() {
    return this.servicesService.findAll();
  }

  @UseInterceptors(new EtagInterceptor())
  @Get(':id')
  @UseGuards(AuthGuard)
  @Scopes(Scope.MasterData)
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @UseInterceptors(new EtagInterceptor())
  @Patch(':id')
  @UseGuards(AuthGuard)
  @Scopes(Scope.MasterData)
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServicesDto) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Scopes(Scope.MasterData)
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}
