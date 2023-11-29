import { IsNotEmpty, IsString } from 'class-validator';

export class CustomerInfoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  contactNumber: string;
}
