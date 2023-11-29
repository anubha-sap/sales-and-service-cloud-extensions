import { IsEnum, IsString } from 'class-validator';
import { BaseObjectDto } from '../../../common/dto/base-object.dto';
import { JCStatus } from '../../../common/enums';
import { CustomerDetails } from '../../../common/interfaces';

export class JobCardDto extends BaseObjectDto {
  serviceAdvisor: string;
  customerDetails: CustomerDetails;
  estimatedCompletionDate: Date;
  servicesSelected: any;
  createdOn: Date;

  @IsEnum(JCStatus, {
    message: `Invalid status. Valid values are: ${Object.values(JCStatus)}`,
  })
  @IsString()
  status: JCStatus;
}
