import { PartialType } from '@nestjs/mapped-types';
import { ServicesDto } from './service.dto';

export class UpdateServicesDto extends PartialType(ServicesDto) {}
