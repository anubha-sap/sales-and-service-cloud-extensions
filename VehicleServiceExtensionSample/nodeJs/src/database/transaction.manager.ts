import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class TransactionManager {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Sets up a transaction using the queryRunner object, performs database operations within the transaction,
   * and ensures that the transaction is either committed or rolled back based on the outcome
   * @param callback callback function that executes operations in a transaction
   * @returns result of the callback function
   */
  async executeTransaction<T>(
    callback: (queryRunner: QueryRunner) => Promise<T>,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await callback(queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
