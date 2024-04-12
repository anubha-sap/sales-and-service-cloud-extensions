import { Test, TestingModule } from '@nestjs/testing';
import { JobCardService } from './job-card.service';
import { ServiceFormService } from '../service-form/service-form.service';
import { REQUEST } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';
import { CasesService } from '../../cns-modules/cases/cases.service';
import { CustomerService } from '../../cns-modules/customer/customer.service';
import {
  MESSAGES,
  CUSTOM_LOGIC_ERROR_CODE,
  CASE_STATUS,
} from '../../common/constants';
import {
  JCStatus,
  SFStatus,
  Scope,
  ServiceStatus,
  SourceType,
} from '../common/enums';
import { ServerException } from '../../common/filters/server-exception';
import { TransactionManager } from '../../database/transaction.manager';
import { UtilsService } from '../../utils/utils.service';
import { UpdateJobCardDto } from './dto/job-card/update-job-card.dto';
import { JobCardServiceRepository } from './repository/job-card-services.repository';
import { JobCardRepository } from './repository/job-card.repository';
import { DataSource } from 'typeorm';
import { CustomLogger } from '../../logger/logger.service';
import { EmployeesService } from '../employees/employees.service';
import {
  JobCardCountResponseDTO,
  JobCardCountResponseDTOWithCNSData,
  JobCardCountResponseDTOWithoutCNSData,
  JobCardResponseDTO,
  JobCardResponseDTOWithCNSData,
  JobCardResponseDTOWithoutCNSData,
  JobCardServiceResponse,
  JobCardServiceResponseDTO,
  oJobCard,
} from '../../../test/mock-data/modules/job-card.mock.data';
import {
  RequestMock,
  sTranslatedText,
} from '../../../test/mock-data/common.mock.data';
import {
  caseData,
  caseEntity,
  oCase,
} from '../../../test/mock-data/modules/case.mock.data';
import { oCustomerDataResult } from '../../../test/mock-data/modules/customer-service.mock.data';
import { ServiceForm } from '../../../test/mock-data/modules/service-form.mock.data';
import { JobCardServices } from './entities/job-card-services.entity';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { EmployeesResponseDto } from '../../../test/mock-data/modules/employees.mock.data';

describe('VehicleServiceService', () => {
  let jobCardService: JobCardService;
  const mockUtilsService = {
    getCustomLogicErrorDetails: jest.fn((error, target, message) => {
      return [
        {
          code: `${CUSTOM_LOGIC_ERROR_CODE.CASE_SERVICE}.${target}`,
          message: message,
          target: `caseId/${target}`,
        },
      ];
    }),
  };

  const mockJobCardRepository = {
    findAllJobCards: jest.fn().mockImplementation(),
    findOneJobCard: jest.fn().mockImplementation(),
    updateJobCard: jest.fn().mockImplementation(),
    delete: jest.fn().mockImplementation(),
  };

  const mockCustomerService = {
    getAccountInfo: jest.fn(),
    getIndividualCustomerInfo: jest.fn(),
  };

  const mockJobCardServicesRepository = {
    findAllJobCardServices: jest.fn().mockImplementation(() => {
      return [JobCardServiceResponse];
    }),
    findOne: jest.fn().mockImplementation(() => {
      return JobCardServiceResponse;
    }),
    save: jest.fn().mockImplementation((obj) => {
      return obj;
    }),
  };

  const mockI18nService = {
    translate: jest.fn(),
  };

  const mockServiceFormService = {
    findOne: jest.fn().mockImplementation(),
  };

  const mockCaseService = {
    getCaseById: jest.fn(),
    getCaseData: jest.fn(),
    updateCase: jest.fn(),
    getCase: jest.fn(),
  };

  const mockEmployeesService = {
    findAll: jest.fn(),
  };

  const mockDataSource = {
    createQueryRunner: jest.fn().mockReturnThis(),
    connect: jest.fn().mockReturnThis(),
    startTransaction: jest.fn().mockReturnThis(),
    commitTransaction: jest.fn().mockReturnThis(),
    rollbackTransaction: jest.fn().mockReturnThis(),
    release: jest.fn().mockReturnThis(),
    manager: {
      save: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockCustomLogger = {
    setClassName: jest.fn(),
    debug: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobCardService,
        TransactionManager,
        { provide: ServiceFormService, useValue: mockServiceFormService },
        {
          provide: CasesService,
          useValue: mockCaseService,
        },
        { provide: EmployeesService, useValue: mockEmployeesService },
        { provide: CustomerService, useValue: mockCustomerService },
        {
          provide: JobCardServiceRepository,
          useValue: mockJobCardServicesRepository,
        },
        {
          provide: JobCardRepository,
          useValue: mockJobCardRepository,
        },
        {
          provide: UtilsService,
          useValue: mockUtilsService,
        },
        {
          provide: REQUEST,
          useValue: RequestMock,
        },
        { provide: CustomLogger, useValue: mockCustomLogger },
        {
          provide: I18nService,
          useValue: mockI18nService,
        },
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    jobCardService = module.get<JobCardService>(JobCardService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(jobCardService).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return job cards based on $top and $skip', async () => {
      const oJobCardResponseDTOMock = JSON.parse(
        JSON.stringify(JobCardCountResponseDTO),
      );
      jest
        .spyOn(mockJobCardRepository, 'findAllJobCards')
        .mockResolvedValue(oJobCardResponseDTOMock);
      jest.spyOn(mockCaseService, 'getCaseById').mockResolvedValue(oCase);
      jest.spyOn(mockCaseService, 'getCaseData').mockReturnValue(caseData);
      jest
        .spyOn(mockCustomerService, 'getIndividualCustomerInfo')
        .mockReturnValue(oCustomerDataResult);
      jest.spyOn(mockI18nService, 'translate').mockReturnValue(sTranslatedText);
      const res = await jobCardService.findAll(
        {
          caseId: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
        },
        true,
        1,
        5,
      );
      expect(res).toEqual(JobCardCountResponseDTOWithCNSData);
      expect(mockJobCardRepository.findAllJobCards).toHaveBeenCalled();
    });
    it('Should return all job cards with CNS data', async () => {
      const oJobCardResponseDTOMock = JSON.parse(
        JSON.stringify(JobCardCountResponseDTO),
      );
      jest
        .spyOn(mockJobCardRepository, 'findAllJobCards')
        .mockResolvedValue(oJobCardResponseDTOMock);
      jest.spyOn(mockCaseService, 'getCaseById').mockResolvedValue(oCase);
      jest.spyOn(mockCaseService, 'getCaseData').mockReturnValue(caseData);
      jest
        .spyOn(mockCustomerService, 'getIndividualCustomerInfo')
        .mockReturnValue(oCustomerDataResult);
      jest.spyOn(mockI18nService, 'translate').mockReturnValue(sTranslatedText);
      const res = await jobCardService.findAll(
        {
          caseId: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
        },
        true,
      );
      expect(res).toEqual(JobCardCountResponseDTOWithCNSData);
      expect(mockJobCardRepository.findAllJobCards).toHaveBeenCalled();
    });

    it('Should return all job cards without CNS data', async () => {
      const oJobCardResponseDTOMock = JSON.parse(
        JSON.stringify(JobCardCountResponseDTO),
      );
      jest
        .spyOn(mockJobCardRepository, 'findAllJobCards')
        .mockResolvedValue(oJobCardResponseDTOMock);
      jest.spyOn(mockCaseService, 'getCaseById').mockResolvedValue(oCase);
      jest.spyOn(mockCaseService, 'getCaseData').mockReturnValue(caseData);
      jest
        .spyOn(mockCustomerService, 'getIndividualCustomerInfo')
        .mockReturnValue(oCustomerDataResult);
      jest.spyOn(mockI18nService, 'translate').mockReturnValue(sTranslatedText);
      const res = await jobCardService.findAll(
        {
          caseId: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
        },
        false,
      );
      expect(res).toEqual(JobCardCountResponseDTOWithoutCNSData);
      expect(mockJobCardRepository.findAllJobCards).toHaveBeenCalled();
    });

    it('Should return error', async () => {
      try {
        jest
          .spyOn(mockJobCardRepository, 'findAllJobCards')
          .mockRejectedValue({});
        await jobCardService.findAll({
          caseId: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('findValidationStatusService', () => {
    it('There shouldnt be error when case type is not ZVSR or when case status is not completed/closed/servicecompleted', async () => {
      const oCaseEntity = JSON.parse(JSON.stringify(caseEntity));
      oCaseEntity.currentImage.status = '01';
      const res = await jobCardService.findValidationStatusService(oCaseEntity);
      expect(res).toEqual({
        data: oCaseEntity.currentImage,
        info: [],
        error: [],
      });
    });

    it('Should handle when case type is ZVSR or when case status is completed/closed/servicecompleted', async () => {
      const oCaseEntity = JSON.parse(JSON.stringify(caseEntity));
      const oJobCardResponseDTOMock = JSON.parse(
        JSON.stringify(JobCardCountResponseDTO),
      );
      jest
        .spyOn(mockJobCardRepository, 'findAllJobCards')
        .mockResolvedValue(oJobCardResponseDTOMock);
      const res = await jobCardService.findValidationStatusService(oCaseEntity);
      expect(res).toEqual({
        data: oCaseEntity.currentImage,
        info: [],
        error: [],
      });
      expect(mockJobCardRepository.findAllJobCards).toHaveBeenCalled();
    });

    it('Should return entity data and error when no selected service', async () => {
      const oCaseEntity = JSON.parse(JSON.stringify(caseEntity));
      const oJobCardResponseDTOMock = JSON.parse(
        JSON.stringify(JobCardCountResponseDTO),
      );
      oJobCardResponseDTOMock.value[0].servicesSelected = [];
      jest
        .spyOn(mockJobCardRepository, 'findAllJobCards')
        .mockResolvedValue(oJobCardResponseDTOMock);
      const res = await jobCardService.findValidationStatusService(oCaseEntity);
      expect(res).toEqual({
        data: caseEntity.currentImage,
        info: [],
        error: [
          {
            code: `${CUSTOM_LOGIC_ERROR_CODE.CASE_SERVICE}.${JobCardResponseDTO.caseId}`,
            message: MESSAGES.NO_SERVICES_SELECTED,
            target: `caseId/${JobCardResponseDTO.caseId}`,
          },
        ],
      });
      expect(mockJobCardRepository.findAllJobCards).toHaveBeenCalled();
    });

    it('should handle when no job card available', async () => {
      const oCaseEntity = JSON.parse(JSON.stringify(caseEntity));
      jest
        .spyOn(mockJobCardRepository, 'findAllJobCards')
        .mockResolvedValue({ value: [], count: 0 });
      const res = await jobCardService.findValidationStatusService(oCaseEntity);
      expect(res).toEqual({
        data: oCaseEntity.currentImage,
        info: [],
        error: [
          {
            code: `${CUSTOM_LOGIC_ERROR_CODE.CASE_SERVICE}.${JobCardResponseDTO.caseId}`,
            message: MESSAGES.JOBCARD_NOT_FOUND,
            target: `caseId/${JobCardResponseDTO.caseId}`,
          },
        ],
      });
      expect(mockJobCardRepository.findAllJobCards).toHaveBeenCalled();
    });

    it('should return entity data and error when not completed service status', async () => {
      const oCaseEntity = JSON.parse(JSON.stringify(caseEntity));
      const oJobCardResponseDTOMock = JSON.parse(
        JSON.stringify(JobCardCountResponseDTO),
      );
      oJobCardResponseDTOMock.value[0].servicesSelected[0].status =
        ServiceStatus.Z22;
      jest
        .spyOn(mockJobCardRepository, 'findAllJobCards')
        .mockResolvedValue(oJobCardResponseDTOMock);
      const res = await jobCardService.findValidationStatusService(oCaseEntity);
      expect(res).toEqual({
        data: oCaseEntity.currentImage,
        info: [],
        error: [
          {
            code: `${CUSTOM_LOGIC_ERROR_CODE.CASE_SERVICE}.${JobCardResponseDTO.caseId}`,
            message: MESSAGES.CASE_STATUS_DISABLED,
            target: `caseId/${JobCardResponseDTO.caseId}`,
          },
        ],
      });
      expect(mockJobCardRepository.findAllJobCards).toHaveBeenCalled();
    });

    it('should return entity data and error when invalid currentImage data', async () => {
      const oCaseEntity = JSON.parse(JSON.stringify(caseEntity));
      const serverException = new ServerException(
        'ERROR',
        JobCardService.name,
        jobCardService.findValidationStatusService.name,
      );
      oCaseEntity.currentImage = undefined;
      await expect(
        jobCardService.findValidationStatusService(oCaseEntity),
      ).rejects.toThrow(serverException);
    });

    it('findValidationStatusService should handle when body is empty', async () => {
      try {
        await jobCardService.findValidationStatusService(undefined);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('findOne', () => {
    it('Should return selected job card', async () => {
      const oJobCardResponseDTOMock = JSON.parse(
        JSON.stringify(JobCardResponseDTO),
      );
      jest.spyOn(mockCaseService, 'getCaseById').mockResolvedValue(oCase);
      jest.spyOn(mockCaseService, 'getCaseData').mockReturnValue(caseData);
      jest
        .spyOn(mockJobCardRepository, 'findOneJobCard')
        .mockResolvedValue(oJobCardResponseDTOMock);
      jest
        .spyOn(mockCustomerService, 'getIndividualCustomerInfo')
        .mockReturnValue(oCustomerDataResult);
      jest.spyOn(mockI18nService, 'translate').mockReturnValue(sTranslatedText);
      const res = await jobCardService.findOne(
        '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177',
      );
      expect(mockJobCardRepository.findOneJobCard).toHaveBeenCalledWith(
        '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177',
      );
      expect(res).toEqual(JobCardResponseDTOWithCNSData);
    });

    it('Should return error', async () => {
      try {
        jest
          .spyOn(mockJobCardRepository, 'findOneJobCard')
          .mockRejectedValue({});
        await jobCardService.findOne('16da4bc2-a8cc-4ba6-a7a5-ef69802ce177');
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('findAllJobCardServices', () => {
    it('Should return all job card servies', async () => {
      const res = await jobCardService.findAllJobCardServices(
        '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177',
      );
      expect(res).toEqual([JobCardServiceResponse]);
      expect(
        mockJobCardServicesRepository.findAllJobCardServices,
      ).toHaveBeenCalled();
    });

    it('Should return error', async () => {
      try {
        jest
          .spyOn(mockJobCardServicesRepository, 'findAllJobCardServices')
          .mockRejectedValue({});
        await jobCardService.findAllJobCardServices(
          '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177',
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('findOneJobCardService', () => {
    it('should return selected job card service', async () => {
      const res = await jobCardService.findOneJobCardService(
        '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177',
        'a9643834-b16f-4bd8-81e7-3e9ff0ebed81',
      );
      expect(mockJobCardServicesRepository.findOne).toHaveBeenCalledWith({
        where: {
          jobCard: { id: '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177' },
          id: 'a9643834-b16f-4bd8-81e7-3e9ff0ebed81',
        },
      });
      expect(res).toBe(JobCardServiceResponse);
    });

    it('should return jobCard along with JobCardService when eager is true', async () => {
      const oJobCardServiceResponseMock = JSON.parse(
        JSON.stringify(JobCardServiceResponse),
      );
      jest
        .spyOn(mockJobCardServicesRepository, 'findOne')
        .mockResolvedValue(oJobCardServiceResponseMock);
      oJobCardServiceResponseMock.jobCard = JobCardResponseDTO;
      const res = await jobCardService.findOneJobCardService(
        '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177',
        'a9643834-b16f-4bd8-81e7-3e9ff0ebed81',
        true,
      );
      expect(mockJobCardServicesRepository.findOne).toHaveBeenCalledWith({
        where: {
          jobCard: { id: '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177' },
          id: 'a9643834-b16f-4bd8-81e7-3e9ff0ebed81',
        },
        relations: { jobCard: true },
      });
      expect(res).toBe(oJobCardServiceResponseMock);
    });

    it('should handle error', async () => {
      jest
        .spyOn(mockJobCardServicesRepository, 'findOne')
        .mockRejectedValue({});
      try {
        await jobCardService.findOneJobCardService(
          '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177',
          'a9643834-b16f-4bd8-81e7-3e9ff0ebed81',
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('remove', () => {
    it('should delete the job card', async () => {
      const res = await jobCardService.remove(
        'c7e9469a-1b6b-42c6-9580-28ed4a994346',
      );
      expect(mockJobCardRepository.delete).toHaveBeenCalledWith(
        'c7e9469a-1b6b-42c6-9580-28ed4a994346',
      );
    });
    it('should return error when delete the job card', async () => {
      try {
        jest
          .spyOn(mockJobCardRepository, 'delete')
          .mockRejectedValue(new Error('Delete error'));
        await jobCardService.remove('123');
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('create', () => {
    const jobCardCreate = {
      sourceid: 'e0dfacf7-a972-4367-bc9a-d8c4a086a09b',
      sourceType: SourceType.SERVICE_FORM,
    };

    it('should create the job card', async () => {
      jest
        .spyOn(mockServiceFormService, 'findOne')
        .mockResolvedValue(ServiceForm);
      jest
        .spyOn(mockCustomerService, 'getIndividualCustomerInfo')
        .mockReturnValue(oCustomerDataResult);
      jest.spyOn(mockCaseService, 'getCaseById').mockResolvedValue(oCase);
      jest.spyOn(mockCaseService, 'getCaseData').mockResolvedValue(caseData);
      jest.spyOn(mockCaseService, 'updateCase').mockResolvedValue(oCase);
      jest
        .spyOn(mockI18nService, 'translate')
        .mockResolvedValue('translatedText');
      jest.spyOn(mockDataSource.manager, 'save').mockReturnValue(oJobCard);
      const result = await jobCardService.create(jobCardCreate);
      expect(result).toEqual(JobCardResponseDTOWithoutCNSData);
    });

    it('should return error no service selected', async () => {
      const oServiceForm = JSON.parse(JSON.stringify(ServiceForm));
      oServiceForm.servicesProposed = [];
      try {
        jest
          .spyOn(mockServiceFormService, 'findOne')
          .mockResolvedValue(oServiceForm);
        await jobCardService.create(jobCardCreate);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getErrorMessage()).toBe(MESSAGES.NO_SERVICES_SELECTED);
      }
    });

    it('should return error when service form is not booked', async () => {
      const oServiceForm = JSON.parse(JSON.stringify(ServiceForm));
      oServiceForm.status = SFStatus.Z01;

      try {
        jest
          .spyOn(mockServiceFormService, 'findOne')
          .mockResolvedValue(oServiceForm);
        await jobCardService.create(jobCardCreate);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getErrorMessage()).toBe(MESSAGES.SERVICE_FORM_NOT_BOOKED);
      }
    });

    it('should return error when case is completed', async () => {
      try {
        const oCaseMock = JSON.parse(JSON.stringify(oCase));
        oCaseMock.status = CASE_STATUS.COMPLETED;
        jest
          .spyOn(mockServiceFormService, 'findOne')
          .mockResolvedValue(ServiceForm);
        jest.spyOn(mockCaseService, 'getCaseById').mockResolvedValue(oCaseMock);
        await jobCardService.create(jobCardCreate);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getErrorMessage()).toBe(MESSAGES.CASE_COMPLETED);
      }
    });
  });

  describe('update', () => {
    const jobCardId = '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177';
    it('should update the jobcard', async () => {
      const oJobCardResponseDTOMock = JSON.parse(
        JSON.stringify(JobCardResponseDTO),
      );
      const oJobCardResponseDTOWithCNSData = JSON.parse(
        JSON.stringify(JobCardResponseDTOWithCNSData),
      );
      oJobCardResponseDTOMock.status = JCStatus.Z12;
      oJobCardResponseDTOWithCNSData.status = JCStatus.Z12;
      const oPatchBody = { status: JCStatus.Z12 };
      try {
        jest
          .spyOn(mockJobCardRepository, 'updateJobCard')
          .mockResolvedValue(oJobCardResponseDTOMock);
        jest
          .spyOn(mockI18nService, 'translate')
          .mockResolvedValue(sTranslatedText);
        jest.spyOn(mockCaseService, 'getCaseById').mockResolvedValue(oCase);
        jest.spyOn(mockCaseService, 'getCaseData').mockReturnValue(caseData);
        jest
          .spyOn(mockCustomerService, 'getIndividualCustomerInfo')
          .mockReturnValue(oCustomerDataResult);
        const result = await jobCardService.update(jobCardId, oPatchBody);
        expect(result).toEqual(oJobCardResponseDTOWithCNSData);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should return error when update the jobcard', async () => {
      const oPatchBody = { status: JCStatus.Z13 };
      try {
        jest
          .spyOn(mockJobCardRepository, 'updateJobCard')
          .mockRejectedValue({});
        await jobCardService.update(jobCardId, oPatchBody);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });

    it('should return error no update data', async () => {
      const oPatchBody = {} as UpdateJobCardDto;
      try {
        await jobCardService.update(jobCardId, oPatchBody);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('updateJobCardService', () => {
    const sJobCardId = '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177';
    const sJobCardServieId = 'c4b45224-db39-47ed-9ea5-50dc9cee9162';
    let oJobCardServiceResponseMock;
    let oResponse;

    beforeEach(() => {
      oJobCardServiceResponseMock = JSON.parse(
        JSON.stringify(JobCardServiceResponse),
      );
      oJobCardServiceResponseMock.jobCard = JobCardResponseDTO;
      oJobCardServiceResponseMock.technician = JSON.parse(
        oJobCardServiceResponseMock.technician,
      );
      oJobCardServiceResponseMock.technician.btpUserId = 'userId';
      oJobCardServiceResponseMock.technician = JSON.stringify(
        oJobCardServiceResponseMock.technician,
      );

      oResponse = JSON.parse(JSON.stringify(oJobCardServiceResponseMock));
    });

    afterEach(() => {
      oJobCardServiceResponseMock = oResponse = undefined;
      jest.clearAllMocks();
    });

    it('Should update job-card-service', async () => {
      oResponse.notes = 'note';
      oResponse.updatedBy = 'userId';

      const findOneSpy = jest
        .spyOn(mockJobCardServicesRepository, 'findOne')
        .mockResolvedValue(oJobCardServiceResponseMock);
      const employeesServiceMock = jest.spyOn(mockEmployeesService, 'findAll');
      const saveSpy = jest.spyOn(mockJobCardServicesRepository, 'save');
      const jobCardServices = jest.spyOn(
        mockJobCardServicesRepository,
        'findAllJobCardServices',
      );
      const oJobCardSpy = jest.spyOn(mockDataSource.manager, 'update');
      const oCaseSpy = jest.spyOn(mockCaseService, 'updateCase');
      const oResult = await jobCardService.updateJobCardService(
        sJobCardId,
        sJobCardServieId,
        { notes: 'note' },
      );
      expect(findOneSpy).toBeCalledTimes(1);
      expect(employeesServiceMock).toBeCalledTimes(0);
      expect(saveSpy).toBeCalledTimes(1);
      expect(jobCardServices).toBeCalledTimes(0);
      expect(oJobCardSpy).toBeCalledTimes(0);
      expect(oCaseSpy).toBeCalledTimes(0);
      expect(oResult).toStrictEqual(oResponse);
    });

    it('Should handle cases when technician field is udpated', async () => {
      oResponse.technician = JSON.stringify({
        name: EmployeesResponseDto.name,
        btpUserId: EmployeesResponseDto.btpUserId,
      });
      oResponse.updatedBy = 'userId';

      const findOneSpy = jest
        .spyOn(mockJobCardServicesRepository, 'findOne')
        .mockResolvedValue(oJobCardServiceResponseMock);
      const employeesServiceMock = jest
        .spyOn(mockEmployeesService, 'findAll')
        .mockResolvedValue([EmployeesResponseDto]);
      const saveSpy = jest.spyOn(mockJobCardServicesRepository, 'save');
      const jobCardServices = jest.spyOn(
        mockJobCardServicesRepository,
        'findAllJobCardServices',
      );
      const oJobCardSpy = jest
        .spyOn(mockDataSource.manager, 'update')
        .mockReturnValue(oJobCard);
      const oCaseSpy = jest.spyOn(mockCaseService, 'updateCase');

      const oResult = await jobCardService.updateJobCardService(
        sJobCardId,
        sJobCardServieId,
        { technician: { btpUserId: 'btpUserId' } },
      );

      expect(findOneSpy).toBeCalledTimes(1);
      expect(employeesServiceMock).toBeCalledTimes(1);
      expect(saveSpy).toBeCalledTimes(1);
      expect(jobCardServices).toBeCalledTimes(0);
      expect(oJobCardSpy).toBeCalledTimes(0);
      expect(oCaseSpy).toBeCalledTimes(0);
      expect(oResult).toStrictEqual(oResponse);
    });

    it('Should handle cases when invalid technician is passed', async () => {
      const employeesServiceMock = jest
        .spyOn(mockEmployeesService, 'findAll')
        .mockResolvedValue([]);
      const findOneSpy = jest
        .spyOn(mockJobCardServicesRepository, 'findOne')
        .mockResolvedValue(oJobCardServiceResponseMock);
      const saveSpy = jest.spyOn(mockJobCardServicesRepository, 'save');
      const jobCardServices = jest.spyOn(
        mockJobCardServicesRepository,
        'findAllJobCardServices',
      );
      const oCaseSpy = jest.spyOn(mockCaseService, 'updateCase');
      const oJobCardSpy = jest
        .spyOn(mockDataSource.manager, 'update')
        .mockReturnValue(oJobCard);

      try {
        await jobCardService.updateJobCardService(
          sJobCardId,
          sJobCardServieId,
          { technician: { btpUserId: 'btpUserId' } },
        );
      } catch (error) {
        expect(findOneSpy).toBeCalledTimes(1);
        expect(employeesServiceMock).toBeCalledTimes(1);
        expect(saveSpy).toBeCalledTimes(0);
        expect(jobCardServices).toBeCalledTimes(0);
        expect(oJobCardSpy).toBeCalledTimes(0);
        expect(oCaseSpy).toBeCalledTimes(0);
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getError().message).toBe(MESSAGES.INVALID_EMPLOYEE);
      }
    });

    it('Should handle cases when first job-card-service is started', async () => {
      oResponse.status = ServiceStatus.Z22;
      oResponse.updatedBy = 'userId';

      const oJobCardServiceResponse = JSON.parse(
        JSON.stringify(JobCardServiceResponse),
      );
      oJobCardServiceResponse.status = ServiceStatus.Z22;
      jest
        .spyOn(mockJobCardServicesRepository, 'findAllJobCardServices')
        .mockResolvedValue([oJobCardServiceResponse]);

      const findOneSpy = jest
        .spyOn(mockJobCardServicesRepository, 'findOne')
        .mockResolvedValue(oJobCardServiceResponseMock);
      const employeesServiceMock = jest.spyOn(mockEmployeesService, 'findAll');
      const saveSpy = jest.spyOn(mockJobCardServicesRepository, 'save');
      const jobCardServices = jest.spyOn(
        mockJobCardServicesRepository,
        'findAllJobCardServices',
      );
      const oCaseSpy = jest.spyOn(mockCaseService, 'updateCase');
      const oJobCardSpy = jest
        .spyOn(mockDataSource.manager, 'update')
        .mockReturnValue(oJobCard);
      const oResult = await jobCardService.updateJobCardService(
        sJobCardId,
        sJobCardServieId,
        { status: ServiceStatus.Z22 },
      );
      expect(findOneSpy).toBeCalledTimes(1);
      expect(employeesServiceMock).toBeCalledTimes(0);
      expect(saveSpy).toBeCalledTimes(1);
      expect(jobCardServices).toBeCalledTimes(1);
      expect(oJobCardSpy).toBeCalledTimes(1);
      expect(oCaseSpy).toBeCalledTimes(1);
      expect(oResult).toStrictEqual(oResponse);
    });

    it('Should handle cases when last job-card-service is closed', async () => {
      oResponse.status = ServiceStatus.Z23;
      oResponse.updatedBy = 'userId';

      jest
        .spyOn(mockJobCardServicesRepository, 'findAllJobCardServices')
        .mockResolvedValue([JobCardServiceResponse]);

      const findOneSpy = jest
        .spyOn(mockJobCardServicesRepository, 'findOne')
        .mockResolvedValue(oJobCardServiceResponseMock);
      const employeesServiceMock = jest.spyOn(mockEmployeesService, 'findAll');
      const saveSpy = jest.spyOn(mockJobCardServicesRepository, 'save');
      const jobCardServices = jest.spyOn(
        mockJobCardServicesRepository,
        'findAllJobCardServices',
      );
      const oCaseSpy = jest.spyOn(mockCaseService, 'updateCase');
      const oJobCardSpy = jest
        .spyOn(mockDataSource.manager, 'update')
        .mockReturnValue(oJobCard);
      const oResult = await jobCardService.updateJobCardService(
        sJobCardId,
        sJobCardServieId,
        { status: ServiceStatus.Z23 },
      );
      expect(findOneSpy).toBeCalledTimes(1);
      expect(employeesServiceMock).toBeCalledTimes(0);
      expect(saveSpy).toBeCalledTimes(1);
      expect(jobCardServices).toBeCalledTimes(1);
      expect(oCaseSpy).toBeCalledTimes(1);
      expect(oJobCardSpy).toBeCalledTimes(1);
      expect(oResult).toStrictEqual(oResponse);
    });

    it('Should handle error', async () => {
      const findOneSpy = jest
        .spyOn(mockJobCardServicesRepository, 'findOne')
        .mockRejectedValue(
          new NotFoundException(
            `JobCardService ${MESSAGES.RESOURCE_NOT_FOUND}`,
          ),
        );
      const employeesServiceMock = jest.spyOn(mockEmployeesService, 'findAll');
      const saveSpy = jest.spyOn(mockJobCardServicesRepository, 'save');
      const jobCardServices = jest.spyOn(
        mockJobCardServicesRepository,
        'findAllJobCardServices',
      );
      const oCaseSpy = jest.spyOn(mockCaseService, 'updateCase');
      const oJobCardSpy = jest.spyOn(mockDataSource.manager, 'update');
      try {
        await jobCardService.updateJobCardService(
          sJobCardId,
          sJobCardServieId,
          {
            notes: 'note',
          },
        );
      } catch (error) {
        expect(findOneSpy).toBeCalledTimes(1);
        expect(employeesServiceMock).toBeCalledTimes(0);
        expect(saveSpy).toBeCalledTimes(0);
        expect(jobCardServices).toBeCalledTimes(0);
        expect(oCaseSpy).toBeCalledTimes(0);
        expect(oJobCardSpy).toBeCalledTimes(0);
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('getCustomerDetailsFromCase', () => {
    it('should return customer details', async () => {
      jest.spyOn(mockCaseService, 'getCaseById').mockResolvedValue(oCase);
      jest.spyOn(mockCaseService, 'getCaseData').mockReturnValue(caseData);
      jest
        .spyOn(mockCustomerService, 'getIndividualCustomerInfo')
        .mockReturnValue(oCustomerDataResult);
      const result = await jobCardService.getCustomerDetailsFromCase('caseId');
      expect(result).toEqual({
        ...oCustomerDataResult,
        serviceAdvisor: 'Pavithra N',
      });
    });

    it(`should handle when there's error in the function`, async () => {
      try {
        jest
          .spyOn(mockCaseService, 'getCaseById')
          .mockRejectedValue(new ServerException({}, 'testClass', 'testFun'));
        await jobCardService.getCustomerDetailsFromCase('caseId');
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('getCustomerPhoneName', () => {
    it('when account is there in case, should fetch phone from account service', async () => {
      const oCustomerData = JSON.parse(JSON.stringify(oCustomerDataResult));
      const oCaseMock = JSON.parse(JSON.stringify(oCase));
      delete oCaseMock.individualCustomer;
      delete oCustomerData.contactNumber;
      oCustomerData['serviceAdvisor'] = 'Pavithra N';
      jest
        .spyOn(mockCustomerService, 'getAccountInfo')
        .mockReturnValue(oCustomerDataResult);
      const result = await jobCardService.getCustomerPhoneName(
        oCaseMock,
        oCustomerData,
      );
      expect(mockCustomerService.getAccountInfo).toHaveBeenCalledTimes(1);
      expect(
        mockCustomerService.getIndividualCustomerInfo,
      ).toHaveBeenCalledTimes(0);
      expect(result).toEqual(oCustomerData);
    });

    it('when individualCustomer is there in case, should fetch phone from individualCustomer service', async () => {
      const oCustomerData = JSON.parse(JSON.stringify(oCustomerDataResult));
      const oCaseMock = JSON.parse(JSON.stringify(oCase));
      delete oCaseMock.account;
      delete oCustomerData.contactNumber;
      jest
        .spyOn(mockCustomerService, 'getIndividualCustomerInfo')
        .mockReturnValue(oCustomerDataResult);
      const result = await jobCardService.getCustomerPhoneName(
        oCaseMock,
        oCustomerData,
      );
      expect(
        mockCustomerService.getIndividualCustomerInfo,
      ).toHaveBeenCalledTimes(1);
      expect(mockCustomerService.getAccountInfo).toHaveBeenCalledTimes(0);
      expect(result).toEqual(oCustomerData);
    });
  });

  describe('checkAuthorization', () => {
    beforeEach(() => {
      RequestMock.session.scopes = [
        `${process.env.xsappname}.${Scope.EditTask}`,
      ];
    });
    afterEach(() => {
      RequestMock.session.scopes = [
        `${process.env.xsappname}.${Scope.EditTask}`,
        `${process.env.xsappname}.${Scope.EditJobCardService}`,
      ];
    });
    it('Should throw Unauthorized exception when a user who has only `EditTask` scope tries to update another users record', async () => {
      const oJobCardServiceResponse = JSON.parse(
        JSON.stringify(JobCardServiceResponse),
      );
      const oUpdateData = {
        status: ServiceStatus.Z21,
      };
      try {
        jobCardService.checkAuthorization(oUpdateData, oJobCardServiceResponse);
        fail('should not be here');
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
        expect(error.message).toBe(MESSAGES.CANNOT_EDIT_OTHER_USER_RECORDS);
      }
    });

    it('Should throw Unauthorized exception when a user who has only `EditTask` scope tries to update unauthorized fields', async () => {
      const oJobCardServiceResponse = JSON.parse(
        JSON.stringify(JobCardServiceResponse),
      );
      oJobCardServiceResponse.technician = JSON.parse(
        oJobCardServiceResponse.technician,
      );
      oJobCardServiceResponse.technician.btpUserId = 'userId';
      oJobCardServiceResponse.technician = JSON.stringify(
        oJobCardServiceResponse.technician,
      );
      const oUpdateData = {
        technician: {
          name: 'Tony Mathew',
          btpUserId: 'b4042340-3a8b-42b3-b983-5db33caa331b',
        },
      };
      try {
        jobCardService.checkAuthorization(oUpdateData, oJobCardServiceResponse);
        fail('should not be here');
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
        expect(error.message).toBe(
          MESSAGES.CANNOT_EDIT_FIELD.replace(/\${key}/, 'technician'),
        );
      }
    });
  });

  describe('addStartOrEndTime', () => {
    it('Should add startTime', () => {
      const oJobCardServiceResponse = JSON.parse(
        JSON.stringify(JobCardServiceResponse),
      );
      oJobCardServiceResponse.startTime = oJobCardServiceResponse.endTime =
        undefined;
      const oUpdateData = {
        status: ServiceStatus.Z22,
      };
      jobCardService.addStartOrEndTime(oUpdateData, oJobCardServiceResponse);
      expect(oJobCardServiceResponse.startTime).toBeDefined();
      expect(oJobCardServiceResponse.endTime).toBeUndefined();
    });

    it('Should add endTime', () => {
      const oJobCardServiceResponse = JSON.parse(
        JSON.stringify(JobCardServiceResponse),
      );
      oJobCardServiceResponse.startTime = oJobCardServiceResponse.endTime =
        undefined;
      const oUpdateData = {
        status: ServiceStatus.Z23,
      };
      jobCardService.addStartOrEndTime(oUpdateData, oJobCardServiceResponse);
      expect(oJobCardServiceResponse.startTime).toBeUndefined();
      expect(oJobCardServiceResponse.endTime).toBeDefined();
    });
  });

  describe('createCaseUpdateData', () => {
    it('Should update case status to "Service Completed", update job card status to "Completed" when the last service is completed', async () => {
      const oJobCardUpdateData = {
        updatedBy: 'userId',
      };
      jest
        .spyOn(mockJobCardServicesRepository, 'findAllJobCardServices')
        .mockResolvedValue([JobCardServiceResponse]);
      const result = await jobCardService.createCaseUpdateData(
        'jobCardId',
        JobCardServiceResponse as unknown as JobCardServices,
        oJobCardUpdateData,
      );
      expect(result).toStrictEqual({
        oCaseUpdateData: {
          status: 'Z3',
        },
        bJobCardStarted: false,
        bJobCardCompleted: true,
        oJobCardUpdateData: { ...oJobCardUpdateData, status: JCStatus.Z13 },
      });
    });

    it('Should update update case status to "Service In Process" when the first service is started', async () => {
      const oJobCardUpdateData = {
        updatedBy: 'userId',
      };
      const oJobCardServiceResponse = JSON.parse(
        JSON.stringify(JobCardServiceResponse),
      );
      oJobCardServiceResponse.status = ServiceStatus.Z22;
      jest
        .spyOn(mockJobCardServicesRepository, 'findAllJobCardServices')
        .mockResolvedValue([oJobCardServiceResponse]);
      const result = await jobCardService.createCaseUpdateData(
        'jobCardId',
        oJobCardServiceResponse as unknown as JobCardServices,
        oJobCardUpdateData,
      );
      expect(result).toStrictEqual({
        oCaseUpdateData: {
          status: 'Z2',
        },
        bJobCardStarted: true,
        bJobCardCompleted: false,
        oJobCardUpdateData: { ...oJobCardUpdateData, status: JCStatus.Z12 },
      });
    });
  });

  describe('translateJobCardEntity', () => {
    it('Should translate Job Card Service Entity', async () => {
      const oMockJCServiceData = JSON.parse(
        JSON.stringify(JobCardServiceResponseDTO),
      );
      jest.spyOn(mockI18nService, 'translate').mockReturnValue('Completed');
      const oResult = await jobCardService.translateJobCardServiceEntity(
        oMockJCServiceData,
      );
      expect(oResult).toStrictEqual(JobCardServiceResponseDTO);
    });
  });

  /*   describe('handleSearchQuery', () => {
    it('Should handle search query', async () => {
      const sMockSearchQuery = 'KH';
      jest
        .spyOn(mockJobCardRepository, 'findAllJobCards')
        .mockReturnValue(JobCardCountResponseDTO);
      jest.spyOn(mockCaseService, 'getCase').mockResolvedValue([oCase]);

      const oResult = await jobCardService.handleSearchQuery(sMockSearchQuery);
      expect(oResult).toStrictEqual(JobCardCountResponseDTO);
    });
  });

  describe('handleFilterInCase', () => {
    it('Should handle filter query', async () => {
      const sMockFilterQuery = `individualCustomer.name ct 'Raghu' or account.name ct 'Ki'`;
      jest
        .spyOn(mockJobCardRepository, 'findAllJobCards')
        .mockReturnValue(JobCardCountResponseDTO);
      jest.spyOn(mockCaseService, 'getCase').mockResolvedValue([oCase]);
      const oResult = await jobCardService.handleFilterInCase(sMockFilterQuery);
      expect(oResult).toStrictEqual(JobCardCountResponseDTO);
    });
  }); */
});
