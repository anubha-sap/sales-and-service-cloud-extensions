import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

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
}
