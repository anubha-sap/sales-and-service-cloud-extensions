import { PartialType, PickType } from '@nestjs/mapped-types';
import { ServiceFormDto } from './service-form.dto';

export class UpdateServiceFormDto extends PartialType(
  PickType(ServiceFormDto, [
    'status',
    'servicesProposed',
    'inspectionItems',
    'customerComplaints',
    'notes',
  ]),
) {}
