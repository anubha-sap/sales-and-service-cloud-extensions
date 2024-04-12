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
  UseGuards,
} from '@nestjs/common';
import { JobCardService } from './job-card.service';
import { CreateJobCardQueryDto } from './dto/job-card/create-job-card.dto';
import { JobCardServiceDto } from './dto/job-card/job-card-service/job-card-service.dto';
import { EtagInterceptor } from '../../common/interceptor/etag.interceptor';
import { QueryParamsDTO } from '../common/dto/query-param.dto';
import { UtilsService } from '../../utils/utils.service';
import { AuthGuard } from '../../common/guards/auth-guard/auth.guard';
import { Scopes } from '../../common/decorators/scopes.decorator';
import { JobCardServiceResponseDto } from './dto/job-card/job-card-service/response-job-card-service.dto';
import { Scope } from '../common/enums';

@Controller('job-cards')
export class JobCardController {
  constructor(
    private readonly jobCardService: JobCardService,
    private readonly utilService: UtilsService,
  ) {}

  @Post()
  @Scopes(Scope.CreateJobCard)
  @UseGuards(AuthGuard)
  create(@Query() oQuery: CreateJobCardQueryDto) {
    return this.jobCardService.create(oQuery);
  }

  @Get()
  @Scopes(Scope.ViewJobCard)
  @UseGuards(AuthGuard)
  async findAll(@Query() { $filter, $search, $top, $skip }: QueryParamsDTO) {
    const oQuery = this.utilService.handleQueryParams($filter, $search);
    return this.jobCardService.findAll(
      oQuery,
      false,
      parseInt($top),
      parseInt($skip),
    );
  }

  @Post('/validations')
  findValidationStatus(@Body() body) {
    return this.jobCardService.findValidationStatusService(body);
  }

  @Get(':jobCardId')
  @Scopes(Scope.ViewJobCard)
  @UseGuards(AuthGuard)
  @UseInterceptors(new EtagInterceptor())
  findOne(@Param('jobCardId') id: string) {
    return this.jobCardService.findOne(id);
  }

  @Delete(':jobCardId')
  @Scopes(Scope.DeleteJobCard)
  @UseGuards(AuthGuard)
  remove(@Param('jobCardId') id: string) {
    return this.jobCardService.remove(id);
  }

  @UseInterceptors(new EtagInterceptor())
  @Patch(':jobCardId/services/:jobCardServiceId')
  @Scopes(Scope.EditJobCardService, Scope.EditTask)
  @UseGuards(AuthGuard)
  async updateJobCardService(
    @Param('jobCardId') jobCardId: string,
    @Param('jobCardServiceId') jobCardServiceId: string,
    @Body() updateServicesDto: JobCardServiceDto,
  ) {
    const oJobCardService = await this.jobCardService.updateJobCardService(
      jobCardId,
      jobCardServiceId,
      updateServicesDto,
    );
    const oJobCardServiceRespDto =
      JobCardServiceResponseDto.toDto(oJobCardService);
    return this.jobCardService.translateJobCardServiceEntity(
      oJobCardServiceRespDto,
    );
  }

  /* @Get('/statuses')
  findAllJCStatus() {
    return this.jobCardService.findAllJCStatus();
  }

  @Get('/services/statuses')
  findAllJCServiceStatus() {
    return this.jobCardService.findAllJCServiceStatus();
  } 
  
  @Get(':jobCardId/services')
  @Scopes(Scope.ViewJobCardService)
  @UseGuards(AuthGuard)
  async findAllJobCardServices(@Param('jobCardId') jobCardId: string) {
    const oJobCardServices = await this.jobCardService.findAllJobCardServices(
      jobCardId,
    );
    const oJobCardServicesResponseDTO = new Array<JobCardServiceDto>();
    for (const oJobCardService of oJobCardServices) {
      oJobCardServicesResponseDTO.push(
        JobCardServiceResponseDto.toDto(oJobCardService),
      );
    }
    return oJobCardServicesResponseDTO;
  }

  @UseInterceptors(new EtagInterceptor())
  @Get(':jobCardId/services/:jobCardServiceId')
  @Scopes(Scope.ViewJobCardService)
  @UseGuards(AuthGuard)
  async findOneJobCardService(
    @Param('jobCardId') jobCardId: string,
    @Param('jobCardServiceId') jobCardServiceId: string,
  ) {
    const oJobCardService = await this.jobCardService.findOneJobCardService(
      jobCardId,
      jobCardServiceId,
    );
    return JobCardServiceResponseDto.toDto(oJobCardService);
  } */
}
