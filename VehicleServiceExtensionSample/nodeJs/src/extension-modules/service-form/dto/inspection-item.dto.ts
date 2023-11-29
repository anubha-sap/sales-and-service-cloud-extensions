import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class SFInspectionItemDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  isSelected: boolean;
}
