import { ApiResponseProperty } from '@nestjs/swagger';
import { AdminDataDto } from '../../../../common/dto/admin-data.dto';
import { JobCardServiceDto } from './job-card-service.dto';
import { JobCardServices } from '../../../entities/job-card-services.entity';

export class JobCardServiceResponseDto extends JobCardServiceDto {
  constructor(partial: Partial<JobCardServiceResponseDto>) {
    super();
    Object.assign(this, partial);
  }

  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  service: string;

  @ApiResponseProperty()
  price: string;

  @ApiResponseProperty()
  startTime: Date;

  @ApiResponseProperty()
  endTime: Date;

  @ApiResponseProperty()
  notes: string;

  @ApiResponseProperty()
  observation: string;

  @ApiResponseProperty()
  adminData: AdminDataDto;

  @ApiResponseProperty()
  statusDescription: string;

  public static toDto(oJobCardService: JobCardServices) {
    return new JobCardServiceResponseDto({
      id: oJobCardService.id,
      service: oJobCardService.service,
      price: oJobCardService.price,
      technician: JSON.parse(oJobCardService.technician),
      status: oJobCardService.status,
      startTime: oJobCardService.startTime,
      endTime: oJobCardService.endTime,
      notes: oJobCardService.notes,
      observation: oJobCardService.observation,
      adminData: new AdminDataDto({
        createdOn: oJobCardService.createdOn,
        updatedOn: oJobCardService.updatedOn,
        createdBy: oJobCardService.createdBy,
        updatedBy: oJobCardService.updatedBy,
      }),
    });
  }
}
