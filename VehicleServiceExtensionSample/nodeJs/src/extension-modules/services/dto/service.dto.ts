import { Allow, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ServicesDto {
  constructor(partial: Partial<ServicesDto>) {
    Object.assign(this, partial);
  }

  @IsNotEmpty()
  @IsString()
  service: string;

  @IsNotEmpty()
  @IsNumber()
  minMileage: number;

  @IsNotEmpty()
  @IsNumber()
  maxMileage: number;

  @IsNotEmpty()
  @IsString()
  price: string;

  @Allow()
  isSelected = false;
}
