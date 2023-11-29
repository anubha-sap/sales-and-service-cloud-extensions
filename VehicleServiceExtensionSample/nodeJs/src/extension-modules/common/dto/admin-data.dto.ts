import { ApiProperty } from '@nestjs/swagger';

export class AdminDataDto {
  constructor(partial: Partial<AdminDataDto>) {
    Object.assign(this, partial);
  }
  @ApiProperty({ readOnly: true })
  createdOn: Date;

  @ApiProperty({ readOnly: true })
  updatedOn: Date;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  updatedBy: string;
}
