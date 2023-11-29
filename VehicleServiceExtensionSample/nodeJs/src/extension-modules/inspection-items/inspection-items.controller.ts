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
import { InspectionItemsService } from './inspection-items.service';
import { InspectionItemDto } from './dto/inspection-item.dto';
import { UpdateInspectionItemDto } from './dto/update-inspection-item.dto';
import { EtagInterceptor } from '../../common/interceptor/etag.interceptor';

@Controller('inspection-items')
export class InspectionItemsController {
  constructor(
    private readonly inspectionItemsService: InspectionItemsService,
  ) {}

  @Post()
  create(@Body() createInspectionItemDto: InspectionItemDto) {
    return this.inspectionItemsService.create(createInspectionItemDto);
  }

  @Get()
  findAll() {
    return this.inspectionItemsService.findAll();
  }

  @UseInterceptors(new EtagInterceptor())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inspectionItemsService.findOne(id);
  }

  @UseInterceptors(new EtagInterceptor())
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInspectionItemDto: UpdateInspectionItemDto,
  ) {
    return this.inspectionItemsService.update(id, updateInspectionItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inspectionItemsService.remove(id);
  }
}
