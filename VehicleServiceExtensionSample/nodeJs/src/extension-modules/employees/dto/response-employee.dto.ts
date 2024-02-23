import { ApiResponseProperty } from '@nestjs/swagger';
import { AdminDataDto } from '../../../extension-modules/common/dto/admin-data.dto';
import { EmployeeDto } from './employee.dto';
import { Employee } from '../entities/employee.entity';
import { Roles } from '../../common/enums';

export class EmployeeResponseDto extends EmployeeDto {
  constructor(partial: Partial<EmployeeResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  adminData: AdminDataDto;

  @ApiResponseProperty()
  roleName: Roles;

  public static toDto(oEmployee: Employee) {
    return new EmployeeResponseDto({
      id: oEmployee.id,
      btpUserId: oEmployee.btpUserId,
      email: oEmployee.email,
      name: oEmployee.name,
      roleCode: oEmployee.roleCode,
      roleName: oEmployee.roleName,
      adminData: new AdminDataDto({
        createdOn: oEmployee.createdOn,
        updatedOn: oEmployee.updatedOn,
        createdBy: oEmployee.createdBy,
        updatedBy: oEmployee.updatedBy,
      }),
    });
  }
}
