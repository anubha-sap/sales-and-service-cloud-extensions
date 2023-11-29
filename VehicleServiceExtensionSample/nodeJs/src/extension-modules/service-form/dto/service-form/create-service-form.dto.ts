import { PickType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { ServiceFormDto } from './service-form.dto';

export class CreateServiceFormDto extends PickType(ServiceFormDto, ['caseId']) {
  @IsOptional()
  @IsNumber()
  milometer: number;
}
