import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Services } from '../entities/service.entity';
import { ServicesRepository } from './services.repository';

describe('ServicesRepository', () => {
  let service: ServicesRepository;
  const mockServicesRepo = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesRepository,
        {
          provide: getRepositoryToken(Services),
          useValue: mockServicesRepo,
        },
      ],
    }).compile();
    service = module.get<ServicesRepository>(ServicesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
