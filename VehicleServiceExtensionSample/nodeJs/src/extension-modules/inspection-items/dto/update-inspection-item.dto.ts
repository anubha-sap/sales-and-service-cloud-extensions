import { PartialType } from '@nestjs/mapped-types';
import { InspectionItemDto } from './inspection-item.dto';

export class UpdateInspectionItemDto extends PartialType(InspectionItemDto) {}
