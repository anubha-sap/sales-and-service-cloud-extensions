import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ServiceStatus } from '../../../common/enums';

export class UpdateJobCardServiceDto {
  @IsString()
  @IsOptional()
  technician?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  observation?: string;

  @IsEnum(ServiceStatus, {
    message: ` Invalid status. Valid values are: ${Object.values(
      ServiceStatus,
    )}`,
  })
  @IsString()
  @IsOptional()
  status?: ServiceStatus;
}
