import { ApiResponseProperty } from '@nestjs/swagger';
import { AdminDataDto } from '../../../../extension-modules/common/dto/admin-data.dto';
import { JobCard } from '../../entities/job-card.entity';
import { JobCardDto } from './job-card.dto';

export class JobCardResponseDto extends JobCardDto {
  constructor(partial: Partial<JobCardResponseDto>) {
    super();
    Object.assign(this, partial);
  }

  @ApiResponseProperty()
  adminData: AdminDataDto;

  public static toDto(oJobCard: JobCard) {
    return new JobCardResponseDto({
      id: oJobCard.id,
      displayId: oJobCard.displayId,
      caseId: oJobCard.caseId,
      caseDisplayId: oJobCard.caseDisplayId,
      registeredProduct: JSON.parse(oJobCard.registeredProduct),
      customerComplaints: JSON.parse(oJobCard.customerComplaints),
      milometer: oJobCard.milometer,
      servicesSelected: oJobCard.servicesSelected,
      status: oJobCard.status,
      estimatedCompletionDate: oJobCard.estimatedCompletionDate,
      adminData: new AdminDataDto({
        createdOn: oJobCard.createdOn,
        updatedOn: oJobCard.updatedOn,
        createdBy: oJobCard.createdBy,
        updatedBy: oJobCard.updatedBy,
      }),
    });
  }
}
