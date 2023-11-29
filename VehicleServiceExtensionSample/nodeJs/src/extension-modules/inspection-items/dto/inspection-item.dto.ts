import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class InspectionItemDto {
  constructor(partial: Partial<InspectionItemDto>) {
    Object.assign(this, partial);
  }

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isSelected = false;
}
