import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JCStatus } from '../../common/enums';
import { JobCardRepository } from './job-card.repository';
import { JobCard } from '../entities/job-card.entity';
import { JobCardResponseDto } from '../dto/job-card/response-job-card.dto';
import { CustomLogger } from '../../../logger/logger.service';
import { REQUEST } from '@nestjs/core';
import { RequestMock } from '../../../../test/mock-data/common.mock.data';
import { oJobCard } from '../../../../test/mock-data/modules/job-card.mock.data';

describe('JobCardRepository', () => {
  let oJobCardMock;
  const mockCustomLogger = {
    setClassName: jest.fn(),
    debug: jest.fn(),
  };
  const updatedBy = 'user';

  let oJobCardRepo: JobCardRepository;
  const mockJobCardRepo = {
    findOne: jest.fn(),
    findAndCount: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobCardRepository,
        {
          provide: REQUEST,
          useValue: RequestMock,
        },
        { provide: CustomLogger, useValue: mockCustomLogger },
        {
          provide: getRepositoryToken(JobCard),
          useValue: mockJobCardRepo,
        },
      ],
    }).compile();
    oJobCardRepo = module.get<JobCardRepository>(JobCardRepository);
    oJobCardMock = JSON.parse(JSON.stringify(oJobCard));
  });

  afterEach(() => {
    oJobCardMock = undefined;
  });

  it('should be defined', () => {
    expect(oJobCardRepo).toBeDefined();
  });

  describe('findOneJobCard', () => {
    it('should findOneJobCard', async () => {
      jest
        .spyOn(oJobCardRepo, 'findOne')
        .mockResolvedValue(oJobCardMock as unknown as JobCard);
      const res = await oJobCardRepo.findOneJobCard(oJobCardMock.id);
      expect(res.id).toEqual(oJobCardMock.id);
    });
  });

  describe('findAllJobCards', () => {
    it('should findAllJobCards', async () => {
      jest
        .spyOn(oJobCardRepo, 'findAndCount')
        .mockResolvedValue([[oJobCardMock], 1] as unknown as [
          JobCard[],
          number,
        ]);
      const res = await oJobCardRepo.findAllJobCards({});
      expect(res.value[0]).toBeInstanceOf(JobCardResponseDto);
    });
  });

  describe('updateJobCard', () => {
    it('should updateJobCard', async () => {
      jest
        .spyOn(oJobCardRepo, 'update')
        .mockResolvedValue(oJobCardMock as unknown as JobCard);
      const res = await oJobCardRepo.updateJobCard(
        'id',
        {
          status: JCStatus.Z11,
        },
        updatedBy,
      );
      expect(res.id).toEqual(oJobCardMock.id);
    });
  });
});
