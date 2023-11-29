import { ApiResponseProperty } from '@nestjs/swagger';
import { ServicesDto } from './service.dto';
import { AdminDataDto } from '../../../extension-modules/common/dto/admin-data.dto';
import { Services } from '../entities/service.entity';

export class ServiceResponseDto extends ServicesDto {
  constructor(partial: Partial<ServiceResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  adminData: AdminDataDto;

  public static toDto(service: Services) {
    return new ServiceResponseDto({
      id: service.id,
      service: service.service,
      price: service.price,
      minMileage: service.minMileage,
      maxMileage: service.maxMileage,
      isSelected: service.isSelected,
      adminData: new AdminDataDto({
        createdOn: service.createdOn,
        updatedOn: service.updatedOn,
        createdBy: service.createdBy,
        updatedBy: service.updatedBy,
      }),
    });
  }
}
