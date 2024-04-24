import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { BaseRepositoryInterface } from './base-repository.interface';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { NotFoundException } from '@nestjs/common';
import { MESSAGES } from '../../constants';

interface HasId {
  id: string;
}

export abstract class BaseRepository<T extends HasId>
  implements BaseRepositoryInterface<T>
{
  private entity: Repository<T>;
  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public async save(data: DeepPartial<T>): Promise<T> {
    return await this.entity.save(data);
  }

  public async findOne(id: any): Promise<T> {
    const options: FindOptionsWhere<T> = {
      id: id,
    };
    const result = await this.entity.findOneBy(options);
    if (!result) {
      throw new NotFoundException(
        `${this.entity.target['name']} ${MESSAGES.RESOURCE_NOT_FOUND}`,
      );
    }
    return result;
  }

  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    options.order = { updatedOn: 'DESC' } as any;
    return await this.entity.find(options);
  }

  public async findAndCount(
    options?: FindManyOptions<T>,
  ): Promise<[T[], number]> {
    options.order = { updatedOn: 'DESC' } as any;
    return await this.entity.findAndCount(options);
  }

  public async delete(id: string): Promise<DeleteResult> {
    const result = await this.entity.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `${this.entity.target['name']} ${MESSAGES.RESOURCE_NOT_FOUND}`,
      );
    }
    return result;
  }

  public async update(
    id: string,
    updateData: QueryDeepPartialEntity<T>,
    updatedBy: string,
  ): Promise<T> {
    let result: T;
    updateData['updatedBy'] = updatedBy;
    const updateResult = await this.entity.update(id, updateData);
    if (updateResult.affected > 0) {
      result = await this.findOne(id);
    } else {
      throw new NotFoundException(
        `${this.entity.target['name']} ${MESSAGES.RESOURCE_NOT_FOUND}`,
      );
    }
    return result;
  }
}
