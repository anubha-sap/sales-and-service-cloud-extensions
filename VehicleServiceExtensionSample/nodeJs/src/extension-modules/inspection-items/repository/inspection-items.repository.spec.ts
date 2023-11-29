import { Test, TestingModule } from '@nestjs/testing';
import { InspectionItemsRepository } from './inspection-items.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InspectionItem } from '../entities/inspection-item.entity';

describe('InspectionItemsRepository', () => {
  let oInspectionItemsRepo: InspectionItemsRepository;
  const mockInspectionRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InspectionItemsRepository,
        {
          provide: getRepositoryToken(InspectionItem),
          useValue: mockInspectionRepository,
        },
      ],
    }).compile();
    oInspectionItemsRepo = module.get<InspectionItemsRepository>(
      InspectionItemsRepository,
    );
  });

  it('should be defined', () => {
    expect(oInspectionItemsRepo).toBeDefined();
  });
});
