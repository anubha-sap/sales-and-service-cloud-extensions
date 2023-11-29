import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, FindManyOptions } from 'typeorm';
import { ServiceResponseDto } from './dto/response-service.dto';
import { UpdateServicesDto } from './dto/update-service.dto';
import { Services } from './entities/service.entity';
import { ServerException } from '../../common/filters/server-exception';
import { ServicesRepository } from './repository/services.repository';
import { ServicesDto } from './dto/service.dto';
import { REQUEST } from '@nestjs/core';
import { SESSION } from '../../common/constants';

@Injectable()
export class ServicesService {
  constructor(
    private readonly servicesRepository: ServicesRepository,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async create(service: ServicesDto) {
    let result: Services;
    try {
      const userId = this.request[SESSION].userId;
      const oService = Services.toEntity(service, userId);
      result = await this.servicesRepository.save(oService);
      return ServiceResponseDto.toDto(result);
    } catch (error) {
      throw new ServerException(error, ServicesService.name, this.create.name);
    }
  }

  async findAll(query?: FindManyOptions<Services>) {
    let result: Services[];
    try {
      result = await this.servicesRepository.findAll(query);
    } catch (error) {
      throw new ServerException(error, ServicesService.name, this.findAll.name);
    }
    return result;
  }

  async findOne(id: string) {
    let result: Services;
    try {
      result = await this.servicesRepository.findOne(id);
      return ServiceResponseDto.toDto(result);
    } catch (error) {
      throw new ServerException(error, ServicesService.name, this.findOne.name);
    }
  }

  async update(id: string, updateServicesDto: UpdateServicesDto) {
    let result: Services;
    try {
      const userId = this.request[SESSION].userId;
      result = await this.servicesRepository.update(
        id,
        updateServicesDto,
        userId,
      );
    } catch (error) {
      throw new ServerException(error, ServicesService.name, this.update.name);
    }
    return ServiceResponseDto.toDto(result);
  }

  async remove(id: string) {
    let result: DeleteResult;
    try {
      result = await this.servicesRepository.delete(id);
    } catch (error) {
      throw new ServerException(error, ServicesService.name, this.remove.name);
    }
    return result;
  }
}
