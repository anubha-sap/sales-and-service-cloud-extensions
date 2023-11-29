import { Test, TestingModule } from '@nestjs/testing';
import { TransactionManager } from './transaction.manager';
import { DataSource } from 'typeorm';

describe('TransactionManager', () => {
  let service: TransactionManager;
  let mockDataSource;

  beforeEach(async () => {
    mockDataSource = {
      createQueryRunner: jest.fn().mockReturnThis(),
      connect: jest.fn().mockReturnThis(),
      startTransaction: jest.fn().mockReturnThis(),
      commitTransaction: jest.fn().mockReturnThis(),
      rollbackTransaction: jest.fn().mockReturnThis(),
      release: jest.fn().mockReturnThis(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionManager,
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    service = module.get<TransactionManager>(TransactionManager);
  });

  afterEach(async () => {
    mockDataSource = undefined;
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should execute transaction', async () => {
    const fCallback = () => {
      return Promise.resolve('Success');
    };
    try {
      const oResult = await service.executeTransaction(fCallback);
      expect(oResult).toBe('Success');
    } catch (error) {
      expect(error).toBe(undefined);
    }
  });

  it('should handle error during transaction', async () => {
    const fCallback = () => {
      return Promise.reject('Failure');
    };
    try {
      await service.executeTransaction(fCallback);
    } catch (error) {
      expect(error).toBe('Failure');
    }
  });
});
