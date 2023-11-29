import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JobCardServiceRepository } from './job-card-services.repository';
import { JobCardServices } from '../entities/job-card-services.entity';
import { ServiceStatus } from '../../common/enums';
import { NotFoundException } from '@nestjs/common';
import { CustomLogger } from '../../../logger/logger.service';
import { REQUEST } from '@nestjs/core';
import { CASE_STATUS, EXTENSION_FIELDS } from '../../../common/constants';

describe('JobCardServiceRepository', () => {
  const oJobCardServices = [
    {
      createdOn: '2023-10-12T02:08:34.364Z',
      updatedOn: '2023-10-12T02:11:19.553Z',
      createdBy: '',
      updatedBy: 'b4042340-3a8b-42b3-b983-5db33caa331b',
      id: '3075fa86-ca44-4917-aa43-918de4a6f9cd',
      service: 'Brake pad replacement',
      price: '3450',
      technician: 'Peter',
      status: ServiceStatus.Z22,
      startTime: '2023-10-12T02:11:19.535Z',
      endTime: null,
      notes: null,
      observation: null,
    },
    {
      createdOn: '2023-10-12T02:08:34.376Z',
      updatedOn: '2023-10-12T02:11:37.313Z',
      createdBy: '',
      updatedBy: 'b4042340-3a8b-42b3-b983-5db33caa331b',
      id: '0469d2c7-384c-4478-8034-f2680bb6ad88',
      service: 'Transmission fluid change',
      price: '5450',
      technician: 'Sandra',
      status: ServiceStatus.Z23,
      startTime: '2023-10-12T02:11:32.744Z',
      endTime: '2023-10-12T02:11:37.296Z',
      notes: null,
      observation: null,
    },
  ];
  let oJobCardServicesRepo: JobCardServiceRepository;
  const mockJobCardServicesRepo = {
    findOne: jest.fn(),
    find: jest.fn(),
  };
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobCardServiceRepository,
        {
          provide: getRepositoryToken(JobCardServices),
          useValue: mockJobCardServicesRepo,
        },
        {
          provide: REQUEST,
          useValue: mockRequest,
        },
        { provide: CustomLogger, useValue: mockCustomLogger },
      ],
    }).compile();
    oJobCardServicesRepo = module.get<JobCardServiceRepository>(
      JobCardServiceRepository,
    );
  });

  it('should be defined', () => {
    expect(oJobCardServicesRepo).toBeDefined();
  });

  describe('findOne', () => {
    it('should findOne job-card-service', async () => {
      jest
        .spyOn(mockJobCardServicesRepo, 'findOne')
        .mockResolvedValue(oJobCardServices);
      const res = await oJobCardServicesRepo.findOne({});
      expect(res).toEqual(oJobCardServices);
    });

    it('should handle when findOne return empty', async () => {
      jest.spyOn(mockJobCardServicesRepo, 'findOne').mockResolvedValue(null);
      try {
        await oJobCardServicesRepo.findOne({});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('findAllJobCardServices', () => {
    it('should findAll JobCardServices', async () => {
      jest
        .spyOn(mockJobCardServicesRepo, 'find')
        .mockResolvedValue(oJobCardServices);
      const res = await oJobCardServicesRepo.findAllJobCardServices({
        where: { jobCard: { id: 'jobCardId' } },
      });
      expect(res).toEqual(oJobCardServices);
    });
  });
});
