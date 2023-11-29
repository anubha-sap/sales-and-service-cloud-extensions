import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { SourceType } from '../../../common/enums';

export class CreateJobCardQueryDto {
  @IsUUID()
  @IsNotEmpty()
  sourceid: string;

  @IsEnum(SourceType, {
    message: ` Invalid sourceType.`,
  })
  @IsString()
  @IsNotEmpty()
  sourceType: SourceType;
}
