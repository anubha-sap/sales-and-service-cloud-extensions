import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ServiceStatus } from '../../../../common/enums';
import { TechnicianDto } from './technician.dto';
import { Type } from 'class-transformer';

export class JobCardServiceDto {
  @IsObject()
  @ValidateNested()
  @Type(() => TechnicianDto)
  @IsOptional()
  technician?: TechnicianDto;

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
