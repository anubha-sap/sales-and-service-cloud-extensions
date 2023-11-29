import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JCStatus } from '../../common/enums';
import { JobCardRepository } from './job-card.repository';
import { JobCard } from '../entities/job-card.entity';
import { JobCardResponseDto } from '../dto/job-card/response-job-card.dto';
import { CustomLogger } from '../../../logger/logger.service';
import { REQUEST } from '@nestjs/core';
import { CASE_STATUS, EXTENSION_FIELDS } from '../../../common/constants';

describe('JobCardRepository', () => {
  const mockCustomLogger = {
    setClassName: jest.fn(),
    debug: jest.fn(),
  };
  const mockRequest = {
    session: {
      language: 'en',
      caseStatusBooked: CASE_STATUS.BOOKED,
      caseStatusClosed: CASE_STATUS.CLOSED,
      caseStatusCompleted: CASE_STATUS.COMPLETED,
      caseStatusServiceCompleted: CASE_STATUS.SERVICE_COMPLETED,
      caseStatusServiceInProcess: CASE_STATUS.SERVICE_IN_PROCESS,
      destination: 'SAPServiceCloudDiscoveryService7',
      extensionFieldJobCardId: EXTENSION_FIELDS.JOBCARD_ID,
      extensionFieldMilometer: EXTENSION_FIELDS.MILOMETER,
      extensionFieldServiceFormId: EXTENSION_FIELDS.SERVICE_FORM_ID,
      extensionFieldVehicleNumber: EXTENSION_FIELDS.VEHICLE_NUMBER,
      logLevel: '4',
    },
  };
  const updatedBy = 'user';
  const oJobCards = [
    {
      id: '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177',
      displayId: 1,
      caseId: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
      caseDisplayId: '536',
      status: 'COMPLETED',
      registeredProduct: JSON.stringify({
        vehicleNumber: 'KA01MJ5010',
        dateOfPurchase: '2023-04-14T00:00:00Z',
        model: 'TATA Nexon XMA',
      }),
      customerComplaints: JSON.stringify([' ', ' ', ' ', ' ', ' ']),
      milometer: 4863,
      serviceAdvisor: 'Sandra Webber',
      customerDetails: JSON.stringify({
        name: 'Andrew Jonas',
        contactNumber: '1234567890',
      }),
      estimatedCompletionDate: '2023-05-10T11:55:47.397Z',
      createdOn: '2023-05-08T11:55:47.410Z',
      servicesSelected: [
        {
          id: 'a9643834-b16f-4bd8-81e7-3e9ff0ebed81',
          service: 'Brake pad replacement',
          price: '99.99',
          technician: 'Sandra',
          status: 'Z23',
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
          status: 'Z23',
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
      status: 'COMPLETED',
      registeredProduct: JSON.stringify({
        vehicleNumber: 'KA53HB4898',
        dateOfPurchase: '2022-08-01T00:00:00Z',
        model: 'AHT Combi 110e',
      }),
      customerComplaints: JSON.stringify(['A2 ', ' ', ' ', ' ', ' ']),
      milometer: 3400,
      serviceAdvisor: 'Sandra Webber',
      customerDetails: JSON.stringify({
        name: 'Andrew Jonas',
        contactNumber: '1234567890',
      }),
      estimatedCompletionDate: '2023-05-10T12:05:34.072Z',
      createdOn: '2023-05-08T12:05:34.079Z',
      servicesSelected: [
        {
          id: 'a9cd57cd-f61a-4d7f-9f87-dc031d5b95fb',
          service: 'Brake pad replacement',
          price: '99.99',
          technician: 'Sandra',
          status: 'Z23',
          startTime: '2023-05-08T12:23:46.884Z',
          endTime: '2023-05-08T12:24:05.845Z',
          notes: 'iyiy',
          observation: 'fdasf',
        },
      ],
    },
  ];
  let oJobCardRepo: JobCardRepository;
  const mockJobCardRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobCardRepository,
        {
          provide: REQUEST,
          useValue: mockRequest,
        },
        { provide: CustomLogger, useValue: mockCustomLogger },
        {
          provide: getRepositoryToken(JobCard),
          useValue: mockJobCardRepo,
        },
      ],
    }).compile();
    oJobCardRepo = module.get<JobCardRepository>(JobCardRepository);
  });

  it('should be defined', () => {
    expect(oJobCardRepo).toBeDefined();
  });

  describe('findOneJobCard', () => {
    it('should findOneJobCard', async () => {
      jest
        .spyOn(oJobCardRepo, 'findOne')
        .mockResolvedValue(oJobCards[0] as unknown as JobCard);
      const res = await oJobCardRepo.findOneJobCard('id');
      expect(res).toEqual(
        JobCardResponseDto.toDto(oJobCards[0] as unknown as JobCard),
      );
    });
  });

  describe('findAllJobCards', () => {
    it('should findAllJobCards', async () => {
      jest
        .spyOn(oJobCardRepo, 'findAll')
        .mockResolvedValue(oJobCards as unknown as JobCard[]);
      const res = await oJobCardRepo.findAllJobCards({});
      expect(res[0]).toBeInstanceOf(JobCardResponseDto);
    });
  });

  describe('updateJobCard', () => {
    it('should updateJobCard', async () => {
      jest
        .spyOn(oJobCardRepo, 'update')
        .mockResolvedValue(oJobCards[0] as unknown as JobCard);
      const res = await oJobCardRepo.updateJobCard(
        'id',
        {
          status: JCStatus.Z11,
        },
        updatedBy,
      );
      expect(res).toEqual(
        JobCardResponseDto.toDto(oJobCards[0] as unknown as JobCard),
      );
    });
  });
});
