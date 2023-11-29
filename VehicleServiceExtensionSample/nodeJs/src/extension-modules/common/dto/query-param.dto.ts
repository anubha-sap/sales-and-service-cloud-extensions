import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryParamsDTO {
  @ApiPropertyOptional({
    description: `The criteria to filter the items eg. $filter=caseId eq 'a953c9c7-eb7a-4d32-a36a-41de727bc275'`,
  })
  @IsOptional()
  @IsString()
  $filter?: string;
}
