import { Test, TestingModule } from '@nestjs/testing';
import { CreateJobCardQueryDto } from './dto/job-card/create-job-card.dto';
import { JobCardController } from './job-card.controller';
import { JobCardService } from './job-card.service';
import { ENTITY_NAME } from '../../common/constants';
import { JCStatus, ServiceStatus, SourceType } from '../common/enums';
import { REQUEST } from '@nestjs/core';
import { CustomLogger } from '../../logger/logger.service';
import { UtilsService } from '../../utils/utils.service';

describe('JobCardController', () => {
  let jobCardController: JobCardController;
  const mockCustomLogger = {
    setClassName: jest.fn(),
    log: jest.fn(),
  };

  const mockUtilService = {
    parseFilterString: jest.fn(),
  };

  const jobCards = [
    {
      id: '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177',
      displayId: 1,
      caseId: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
      caseDisplayId: '536',
      status: JCStatus.Z13,
      registeredProduct: {
        vehicleNumber: 'KA01MJ5010',
        dateOfPurchase: '2023-04-14T00:00:00Z',
        model: 'TATA Nexon XMA',
      },
      customerComplaints: [' ', ' ', ' ', ' ', ' '],
      milometer: 4863,
      serviceAdvisor: 'Sandra Webber',
      customerDetails: {
        name: 'Andrew Jonas',
        contactNumber: '1234567890',
      },
      estimatedCompletionDate: '2023-05-10T11:55:47.397Z',
      createdOn: '2023-05-08T11:55:47.410Z',
      servicesSelected: [
        {
          id: 'a9643834-b16f-4bd8-81e7-3e9ff0ebed81',
          service: 'Brake pad replacement',
          price: '99.99',
          technician: 'Sandra',
          status: JCStatus.Z13,
          startTime: '2023-05-08T11:58:27.609Z',
          endTime: '2023-05-08T11:58:41.288Z',
          notes: null,
          observation: null,
        },
        {
          id: 'c4b45224-db39-47ed-9ea5-50dc9cee9162',
          service: 'Change Tyre',
          price: '2499',
          technician: 'Peter',
          status: JCStatus.Z13,
          startTime: '2023-05-08T11:58:00.516Z',
          endTime: '2023-05-08T11:58:49.673Z',
          notes: null,
          observation: null,
        },
      ],
    },
    {
      id: 'c7e9469a-1b6b-42c6-9580-28ed4a994346',
      displayId: 2,
      caseId: '2bfdd60f-da14-11ed-bf97-bb732c681de4',
      caseDisplayId: '451',
      status: JCStatus.Z13,
      registeredProduct: {
        vehicleNumber: 'KA53HB4898',
        dateOfPurchase: '2022-08-01T00:00:00Z',
        model: 'AHT Combi 110e',
      },
      customerComplaints: ['A2 ', ' ', ' ', ' ', ' '],
      milometer: 3400,
      serviceAdvisor: 'Sandra Webber',
      customerDetails: {
        name: 'Andrew Jonas',
        contactNumber: '1234567890',
      },
      estimatedCompletionDate: '2023-05-10T12:05:34.072Z',
      createdOn: '2023-05-08T12:05:34.079Z',
      servicesSelected: [
        {
          id: 'a9cd57cd-f61a-4d7f-9f87-dc031d5b95fb',
          service: 'Brake pad replacement',
          price: '99.99',
          technician: 'Sandra',
          status: JCStatus.Z13,
          startTime: '2023-05-08T12:23:46.884Z',
          endTime: '2023-05-08T12:24:05.845Z',
          notes: 'iyiy',
          observation: 'fdasf',
        },
      ],
    },
  ];

  const caseEntity = {
    entity: ENTITY_NAME.CASE,
    currentImage:
      '{"id":"9f2140a1-f479-11ed-9080-1357cd22d30b","items":[{"id":"I1001","productId":"P1001","quantity":{"content":101,"unit":"ea"},"price":{}},{"id":"I1002","productId":"P1002","quantity":{},"price":{},"extensions":{}}]}',
  };

  const jobCardServices = [
    {
      id: 'a9643834-b16f-4bd8-81e7-3e9ff0ebed81',
      service: 'Brake pad replacement',
      price: '99.99',
      technician: 'Sandra',
      status: ServiceStatus.Z23,
      startTime: '2023-05-08T11:58:27.609Z',
      endTime: '2023-05-08T11:58:41.288Z',
      notes: null,
      observation: null,
    },
    {
      id: 'c4b45224-db39-47ed-9ea5-50dc9cee9162',
      service: 'Change Tyre',
      price: '2499',
      technician: 'Peter',
      status: ServiceStatus.Z23,
      startTime: '2023-05-08T11:58:00.516Z',
      endTime: '2023-05-08T11:58:49.673Z',
      notes: null,
      observation: null,
    },
  ];
  const jobCardDto: CreateJobCardQueryDto = {
    sourceid: 'id',
    sourceType: SourceType.SERVICE_FORM,
  };

  const oJCStatusDesc = [
    {
      code: 'Z11',
      description: 'Booked',
    },
    {
      code: 'Z12',
      description: 'In Progress',
    },
    {
      code: 'Z13',
      description: 'Completed',
    },
  ];

  const oJCServiceStatusDesc = [
    {
      code: 'Z21',
      description: 'New',
    },
    {
      code: 'Z22',
      description: 'In Progress',
    },
    {
      code: 'Z23',
      description: 'Completed',
    },
  ];
  const mockJobCardService = {
    findAll: jest.fn(() => {
      return jobCards;
    }),
    findValidationStatusService: jest.fn(() => {
      return caseEntity.currentImage;
    }),
    findOne: jest.fn(() => {
      return jobCards[0];
    }),
    create: jest.fn((jobCardDto) => {
      return {
        jobCardId: '123',
        ...jobCardDto,
      };
    }),
    findAllJobCardServices: jest.fn(() => {
      return jobCardServices;
    }),
    findOneJobCardService: jest.fn(() => {
      return jobCardServices[0];
    }),
    updateJobCardService: jest.fn(() => {
      return jobCardServices[0];
    }),
    update: jest.fn().mockImplementation((jobCardId, jobCardDto) => ({
      jobCardId,
      ...jobCardDto,
    })),
    remove: jest.fn().mockImplementation((jobCardId) => ({
      jobCardId,
    })),
    findAllJCStatus: jest.fn(),
    findAllJCServiceStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobCardController],
      providers: [
        JobCardService,
        {
          provide: REQUEST,
          useValue: {
            session: {
              language: 'en',
            },
          },
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
    expect(res).toBe(jobCards);
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
    expect(res).toBe(jobCards[0]);
  });

  it('should create a job card', async () => {
    const res = await jobCardController.create(jobCardDto);
    expect(res).toEqual({ jobCardId: '123', ...jobCardDto });
    expect(mockJobCardService.create).toHaveBeenCalledWith(jobCardDto);
  });

  it('should return array of job cards tasks', async () => {
    const res = await jobCardController.findAllJobCardTasks('222');
    expect(mockJobCardService.findAllJobCardServices).toHaveBeenCalled();
    expect(res).toBe(jobCardServices);
  });

  it('should return selected job card task', async () => {
    const res = await jobCardController.findOneJobCardTask('222', '333');
    expect(mockJobCardService.findOneJobCardService).toHaveBeenCalled();
    expect(res).toBe(jobCardServices[0]);
  });

  it('should delete the job card task', async () => {
    const res = await jobCardController.remove('223');
    expect(res).toEqual({ jobCardId: '223' });
    expect(mockJobCardService.remove).toHaveBeenCalledWith('223');
  });

  it('should return all job card status', async () => {
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
  });

  it('should update job Card Services', async () => {
    const jobCardId = '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177';
    const jobCardServiceId = 'a9643834-b16f-4bd8-81e7-3e9ff0ebed81';
    const res = await jobCardController.updateJobCardTask(
      jobCardId,
      jobCardServiceId,
      jobCardServices[0],
    );
    expect(res).toBe(jobCardServices[0]);
  });
});
