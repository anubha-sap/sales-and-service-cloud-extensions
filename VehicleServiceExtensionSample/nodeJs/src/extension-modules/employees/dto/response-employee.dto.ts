import { ApiResponseProperty } from '@nestjs/swagger';
import { AdminDataDto } from '../../../extension-modules/common/dto/admin-data.dto';
import { EmployeeDto } from './employee.dto';
import { Employee } from '../entities/employee.entity';

export class EmployeeResponseDto extends EmployeeDto {
  constructor(partial: Partial<EmployeeResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  adminData: AdminDataDto;

  public static toDto(oEmployee: Employee) {
    return new EmployeeResponseDto({
      id: oEmployee.id,
      btpUserId: oEmployee.btpUserId,
      email: oEmployee.email,
      name: oEmployee.name,
      adminData: new AdminDataDto({
        createdOn: oEmployee.createdOn,
        updatedOn: oEmployee.updatedOn,
        createdBy: oEmployee.createdBy,
        updatedBy: oEmployee.updatedBy,
      }),
    });
  }
}
