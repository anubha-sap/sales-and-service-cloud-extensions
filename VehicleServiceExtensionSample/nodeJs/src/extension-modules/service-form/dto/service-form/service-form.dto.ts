import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SFStatus } from '../../../common/enums';
import { SFInspectionItemDto } from '../inspection-item.dto';
import { ServiceProposedDto } from '../service-proposed.dto';
import { BaseObjectDto } from '../../../common/dto/base-object.dto';

export class ServiceFormDto extends BaseObjectDto {
  @IsEnum(SFStatus, {
    message: `Invalid status. Valid values are: ${Object.values(SFStatus)}`,
  })
  @IsString()
  @IsNotEmpty()
  status: SFStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceProposedDto)
  @IsNotEmpty()
  servicesProposed: ServiceProposedDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SFInspectionItemDto)
  @IsNotEmpty()
  inspectionItems: SFInspectionItemDto[];

  @IsArray()
  @IsString({ each: true })
  notes: string[];
}
