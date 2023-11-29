import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { JobCardService } from './job-card.service';
import { CreateJobCardQueryDto } from './dto/job-card/create-job-card.dto';
import { UpdateJobCardServiceDto } from './dto/job-card/update-job-card-service';
import { EtagInterceptor } from '../../common/interceptor/etag.interceptor';
import { QueryParamsDTO } from '../common/dto/query-param.dto';
import { UtilsService } from '../../utils/utils.service';

@Controller('job-cards')
export class JobCardController {
  constructor(
    private readonly jobCardService: JobCardService,
    private readonly utilService: UtilsService,
  ) {}

  @Post()
  create(@Query() oQuery: CreateJobCardQueryDto) {
    return this.jobCardService.create(oQuery);
  }

  @Get()
  findAll(@Query() { $filter }: QueryParamsDTO) {
    const oQuery = this.utilService.parseFilterString($filter);
    return this.jobCardService.findAll(oQuery);
  }

  @Post('/validations')
  findValidationStatus(@Body() body) {
    return this.jobCardService.findValidationStatusService(body);
  }

  @Get('/statuses')
  findAllJCStatus() {
    return this.jobCardService.findAllJCStatus();
  }

  @Get('/services/statuses')
  findAllJCServiceStatus() {
    return this.jobCardService.findAllJCServiceStatus();
  }

  @Get(':jobCardId')
  @UseInterceptors(new EtagInterceptor())
  findOne(@Param('jobCardId') id: string) {
    return this.jobCardService.findOne(id);
  }

  @Delete(':jobCardId')
  remove(@Param('jobCardId') id: string) {
    return this.jobCardService.remove(id);
  }

  @Get(':jobCardId/services')
  findAllJobCardTasks(@Param('jobCardId') jobCardId: string) {
    return this.jobCardService.findAllJobCardServices(jobCardId);
  }

  @UseInterceptors(new EtagInterceptor())
  @Get(':jobCardId/services/:jobCardServiceId')
  findOneJobCardTask(
    @Param('jobCardId') jobCardId: string,
    @Param('jobCardServiceId') jobCardServiceId: string,
  ) {
    return this.jobCardService.findOneJobCardService(
      jobCardId,
      jobCardServiceId,
    );
  }

  @UseInterceptors(new EtagInterceptor())
  @Patch(':jobCardId/services/:jobCardServiceId')
  updateJobCardTask(
    @Param('jobCardId') jobCardId: string,
    @Param('jobCardServiceId') jobCardServiceId: string,
    @Body() updateServicesDto: UpdateJobCardServiceDto,
  ) {
    return this.jobCardService.updateJobCardService(
      jobCardId,
      jobCardServiceId,
      updateServicesDto,
    );
  }
}
