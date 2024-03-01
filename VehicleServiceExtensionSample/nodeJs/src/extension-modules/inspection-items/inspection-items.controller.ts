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
import { InspectionItemsService } from './inspection-items.service';
import { InspectionItemDto } from './dto/inspection-item.dto';
import { UpdateInspectionItemDto } from './dto/update-inspection-item.dto';
import { EtagInterceptor } from '../../common/interceptor/etag.interceptor';
import { Scopes } from '../../common/decorators/scopes.decorator';
import { Scope } from '../common/enums';
import { AuthGuard } from '../../common/guards/auth-guard/auth.guard';

@Controller('inspection-items')
export class InspectionItemsController {
  constructor(
    private readonly inspectionItemsService: InspectionItemsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @Scopes(Scope.MasterData)
  create(@Body() createInspectionItemDto: InspectionItemDto) {
    return this.inspectionItemsService.create(createInspectionItemDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Scopes(Scope.MasterData)
  findAll() {
    return this.inspectionItemsService.findAll();
  }

  @UseInterceptors(new EtagInterceptor())
  @Get(':id')
  @UseGuards(AuthGuard)
  @Scopes(Scope.MasterData)
  findOne(@Param('id') id: string) {
    return this.inspectionItemsService.findOne(id);
  }

  @UseInterceptors(new EtagInterceptor())
  @Patch(':id')
  @UseGuards(AuthGuard)
  @Scopes(Scope.MasterData)
  update(
    @Param('id') id: string,
    @Body() updateInspectionItemDto: UpdateInspectionItemDto,
  ) {
    return this.inspectionItemsService.update(id, updateInspectionItemDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Scopes(Scope.MasterData)
  remove(@Param('id') id: string) {
    return this.inspectionItemsService.remove(id);
  }
}
