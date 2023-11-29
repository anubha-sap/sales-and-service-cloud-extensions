import { PickType } from '@nestjs/mapped-types';
import { JobCardDto } from './job-card.dto';

export class UpdateJobCardDto extends PickType(JobCardDto, ['status']) {}
