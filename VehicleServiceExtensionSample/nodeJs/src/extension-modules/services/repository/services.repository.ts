import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Services } from '../entities/service.entity';
import { ServicesRepositoryInterface } from './services.repository.interface';
import { BaseRepository } from '../../../common/repository/base/base-repository';

@Injectable()
export class ServicesRepository
  extends BaseRepository<Services>
  implements ServicesRepositoryInterface
{
  constructor(
    @InjectRepository(Services)
    private readonly servicesRepository: Repository<Services>,
  ) {
    super(servicesRepository);
  }
}
