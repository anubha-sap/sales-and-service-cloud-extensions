/* eslint-disable @typescript-eslint/no-empty-interface */
import { FindManyOptions } from 'typeorm';
import { BaseRepositoryInterface } from '../../../common/repository/base/base-repository.interface';
import { ServiceForm } from '../entities/service-form.entity';
import { UpdateServiceFormDto } from '../dto/service-form/update-service-form.dto';
import { ServiceFormResponseDto } from '../dto/service-form/response-service-form.dto';

export interface ServiceFormRepositoryInterface
  extends BaseRepositoryInterface<ServiceForm> {
  findOneServiceForm(id: string): Promise<ServiceFormResponseDto>;
  findAllServiceForms(
    options?: FindManyOptions<ServiceForm>,
  ): Promise<ServiceFormResponseDto[]>;
  updateServiceForm(
    id: string,
    updateData: UpdateServiceFormDto,
    updatedBy: string,
  ): Promise<ServiceFormResponseDto>;
}
