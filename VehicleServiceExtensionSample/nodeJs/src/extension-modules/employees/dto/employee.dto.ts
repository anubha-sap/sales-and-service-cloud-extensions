import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { RoleCodes } from '../../common/enums';

export class EmployeeDto {
  constructor(partial: Partial<EmployeeDto>) {
    Object.assign(this, partial);
  }

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  btpUserId: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEnum(RoleCodes, {
    message: `Invalid role. Valid values are: ${Object.values(RoleCodes)}`,
  })
  @IsString()
  @IsNotEmpty()
  roleCode: RoleCodes;
}
