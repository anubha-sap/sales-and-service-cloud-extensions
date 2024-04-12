import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryParamsDTO {
  @ApiPropertyOptional({
    description: `The criteria to filter the items eg. $filter=caseId eq 'a953c9c7-eb7a-4d32-a36a-41de727bc275'`,
  })
  @IsOptional()
  @IsString()
  $filter?: string;

  @ApiPropertyOptional({
    description: `The criteria to search the items eg. $search=nexonev`,
  })
  @IsOptional()
  @IsString()
  $search?: string;

  @ApiPropertyOptional({
    description: `Indicates page size.`,
  })
  @IsOptional()
  @IsString()
  $top?: string;

  @ApiPropertyOptional({
    description: `Indicates offset (number of items). For e.g. if page size is 100 and the user is navigating to 10th page, then offset ($skip) would be 900 (9 * 100)`,
  })
  @IsOptional()
  @IsString()
  $skip?: string;
}
