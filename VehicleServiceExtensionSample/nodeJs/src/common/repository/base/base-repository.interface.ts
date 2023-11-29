import { DeepPartial, DeleteResult, FindManyOptions } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface BaseRepositoryInterface<T> {
  save(data: DeepPartial<T>): Promise<T>;
  findOne(id: string): Promise<T>;
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  update(
    id: string,
    updateData: QueryDeepPartialEntity<T>,
    updatedBy: string,
  ): Promise<T>;
  delete(id: string): Promise<DeleteResult>;
}
