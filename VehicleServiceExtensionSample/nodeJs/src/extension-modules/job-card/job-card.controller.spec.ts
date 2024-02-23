import { Test, TestingModule } from '@nestjs/testing';
import { CreateJobCardQueryDto } from './dto/job-card/create-job-card.dto';
import { JobCardController } from './job-card.controller';
import { JobCardService } from './job-card.service';
import { ENTITY_NAME } from '../../common/constants';
import { SourceType } from '../common/enums';
import { REQUEST } from '@nestjs/core';
import { CustomLogger } from '../../logger/logger.service';
import { UtilsService } from '../../utils/utils.service';
import {
  JobCardResponseDTO,
  JobCardServiceResponse,
  JobCardServiceResponseDTO,
} from '../../../test/mock-data/modules/job-card.mock.data';
import { oCase } from '../../../test/mock-data/modules/case.mock.data';
import { RequestMock } from '../../../test/mock-data/common.mock.data';

describe('JobCardController', () => {
  let jobCardController: JobCardController;
  const mockCustomLogger = {
    setClassName: jest.fn(),
    log: jest.fn(),
  };

  const mockUtilService = {
    parseFilterString: jest.fn(),
  };

  const caseEntity = {
    entity: ENTITY_NAME.CASE,
    currentImage: oCase,
  };

  const jobCardDto: CreateJobCardQueryDto = {
    sourceid: 'id',
    sourceType: SourceType.SERVICE_FORM,
  };

  const mockJobCardService = {
    findAll: jest.fn(() => {
      return [JobCardResponseDTO];
    }),
    findValidationStatusService: jest.fn(() => {
      return caseEntity.currentImage;
    }),
    findOne: jest.fn(() => {
      return JobCardResponseDTO;
    }),
    create: jest.fn((jobCardDto) => {
      return {
        jobCardId: '123',
        ...jobCardDto,
      };
    }),
    findAllJobCardServices: jest.fn(() => {
      return [JobCardServiceResponse];
    }),
    findOneJobCardService: jest.fn(() => {
      return JobCardServiceResponse;
    }),
    updateJobCardService: jest.fn(() => {
      return JobCardServiceResponse;
    }),
    update: jest.fn().mockImplementation((jobCardId, jobCardDto) => ({
      jobCardId,
      ...jobCardDto,
    })),
    remove: jest.fn().mockImplementation((jobCardId) => ({
      jobCardId,
    })),
    translateJobCardServiceEntity: jest.fn(() => {
      return { ...JobCardServiceResponseDTO, statusDescription: 'Completed' };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobCardController],
      providers: [
        JobCardService,
        {
          provide: REQUEST,
          useValue: RequestMock,
        },
        { provide: CustomLogger, useValue: mockCustomLogger },
        { provide: UtilsService, useValue: mockUtilService },
      ],
    })
      .overrideProvider(JobCardService)
      .useValue(mockJobCardService)
      .compile();

    jobCardController = module.get<JobCardController>(JobCardController);
  });

  it('should be defined', () => {
    expect(jobCardController).toBeDefined();
  });

  it('should return array of job cards', async () => {
    const res = await jobCardController.findAll({
      $filter: `caseId eq 'caseId'`,
    });
    const parseFilterStringSpy = jest.spyOn(
      mockUtilService,
      'parseFilterString',
    );
    expect(mockJobCardService.findAll).toHaveBeenCalled();
    expect(res).toStrictEqual([JobCardResponseDTO]);
    expect(parseFilterStringSpy).toHaveBeenCalledTimes(1);
  });

  it('should return entity object', async () => {
    const res = await jobCardController.findValidationStatus(caseEntity);
    expect(mockJobCardService.findValidationStatusService).toHaveBeenCalled();
    expect(res).toBe(caseEntity.currentImage);
  });

  it('should return selected job card', async () => {
    const res = await jobCardController.findOne('222');
    expect(mockJobCardService.findOne).toHaveBeenCalled();
    expect(res).toBe(JobCardResponseDTO);
  });

  it('should create a job card', async () => {
    const res = await jobCardController.create(jobCardDto);
    expect(res).toEqual({ jobCardId: '123', ...jobCardDto });
    expect(mockJobCardService.create).toHaveBeenCalledWith(jobCardDto);
  });

  /*   it('should return array of job cards tasks', async () => {
    const res = await jobCardController.findAllJobCardServices('222');
    expect(mockJobCardService.findAllJobCardServices).toHaveBeenCalled();
    expect(res).toBe(jobCardServices);
  });

  it('should return selected job card task', async () => {
    const res = await jobCardController.findOneJobCardService('222', '333');
    expect(mockJobCardService.findOneJobCardService).toHaveBeenCalled();
    expect(res).toBe(jobCardServices[0]);
  }); */

  it('should delete the job card task', async () => {
    const res = await jobCardController.remove('223');
    expect(res).toEqual({ jobCardId: '223' });
    expect(mockJobCardService.remove).toHaveBeenCalledWith('223');
  });

  /*   it('should return all job card status', async () => {
    jest
      .spyOn(mockJobCardService, 'findAllJCStatus')
      .mockResolvedValue(oJCStatusDesc);
    const res = await jobCardController.findAllJCStatus();
    expect(res).toBe(oJCStatusDesc);
  });

  it('should return all job card service status', async () => {
    jest
      .spyOn(mockJobCardService, 'findAllJCServiceStatus')
      .mockResolvedValue(oJCServiceStatusDesc);
    const res = await jobCardController.findAllJCServiceStatus();
    expect(res).toBe(oJCServiceStatusDesc);
  }); */

  it('should update job Card Services', async () => {
    const jobCardId = '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177';
    const jobCardServiceId = 'a9643834-b16f-4bd8-81e7-3e9ff0ebed81';
    const res = await jobCardController.updateJobCardService(
      jobCardId,
      jobCardServiceId,
      {},
    );
    expect(res).toEqual(JobCardServiceResponseDTO);
  });
});
