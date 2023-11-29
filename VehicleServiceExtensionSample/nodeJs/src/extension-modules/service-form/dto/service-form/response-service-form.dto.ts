import { ApiResponseProperty } from '@nestjs/swagger';
import { AdminDataDto } from '../../../common/dto/admin-data.dto';
import { ServiceForm } from '../../entities/service-form.entity';
import { ServiceFormDto } from './service-form.dto';

export class ServiceFormResponseDto extends ServiceFormDto {
  constructor(partial: Partial<ServiceFormResponseDto>) {
    super();
    Object.assign(this, partial);
  }

  @ApiResponseProperty()
  adminData: AdminDataDto;

  public static toDto(oServiceForm: ServiceForm) {
    return new ServiceFormResponseDto({
      id: oServiceForm.id,
      displayId: oServiceForm.displayId,
      caseId: oServiceForm.caseId,
      caseDisplayId: oServiceForm.caseDisplayId,
      registeredProduct: JSON.parse(oServiceForm.registeredProduct),
      customerComplaints: JSON.parse(oServiceForm.customerComplaints),
      milometer: oServiceForm.milometer,
      servicesProposed: JSON.parse(oServiceForm.servicesProposed),
      inspectionItems: JSON.parse(oServiceForm.inspectionItems),
      notes: JSON.parse(oServiceForm.notes),
      status: oServiceForm.status,
      adminData: new AdminDataDto({
        createdOn: oServiceForm.createdOn,
        updatedOn: oServiceForm.updatedOn,
        createdBy: oServiceForm.createdBy,
        updatedBy: oServiceForm.updatedBy,
      }),
    });
  }
}
