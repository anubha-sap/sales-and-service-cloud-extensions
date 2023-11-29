import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class ServiceProposedDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsOptional()
  service: string;

  @IsOptional()
  price: string;

  @IsNotEmpty()
  @IsBoolean()
  isSelected: boolean;
}
