import { IsUUID, IsString, IsArray, IsOptional } from 'class-validator';
import { RegisteredProduct } from '../interfaces';

export class BaseObjectDto {
  id: string;
  displayId: number;
  caseDisplayId: string;
  registeredProduct: RegisteredProduct;
  milometer: number;
  statusDescription: string;

  @IsOptional()
  @IsUUID()
  caseId: string;

  @IsArray()
  @IsString({ each: true })
  customerComplaints: string[];
}
