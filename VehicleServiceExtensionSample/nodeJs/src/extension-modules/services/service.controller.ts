import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ServicesService } from './service.service';
import { UpdateServicesDto } from './dto/update-service.dto';
import { ServicesDto } from './dto/service.dto';
import { EtagInterceptor } from '../../common/interceptor/etag.interceptor';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() createServiceDto: ServicesDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @UseInterceptors(new EtagInterceptor())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @UseInterceptors(new EtagInterceptor())
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServicesDto) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}
