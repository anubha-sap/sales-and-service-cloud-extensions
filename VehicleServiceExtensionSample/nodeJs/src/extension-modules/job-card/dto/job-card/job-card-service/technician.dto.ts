import { IsNotEmpty, IsUUID } from 'class-validator';

export class TechnicianDto {
  @IsNotEmpty()
  @IsUUID()
  btpUserId: string;
}
