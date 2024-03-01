import { Test, TestingModule } from '@nestjs/testing';
import { CasesService } from './cases.service';
import { CaseApi } from './open-api/client/SalesSvcCloudV2_case';
import {
  CASE_STATUS,
  EXTENSION_FIELDS,
  MESSAGES,
} from '../../common/constants';
import { ServerException } from '../../common/filters/server-exception';
import { REQUEST } from '@nestjs/core';
import { CustomLogger } from '../../logger/logger.service';
import { RequestMock } from '../../../test/mock-data/common.mock.data';
import { oCase } from '../../../test/mock-data/modules/case.mock.data';
jest.mock('./open-api/client/SalesSvcCloudV2_case');

describe('CasesService', () => {
  let service: CasesService;
  const mockCustomLogger = {
    setClassName: jest.fn(),
    debug: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CasesService,
        {
          provide: REQUEST,
          useValue: RequestMock,
        },
        { provide: CustomLogger, useValue: mockCustomLogger },
      ],
    }).compile();

    service = module.get<CasesService>(CasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCaseById', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('should get case data by id', async () => {
      try {
        const oCaseApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockResolvedValue({ value: oCase }),
        });
        (CaseApi.readcaseserviceCase as jest.Mock).mockImplementation(
          oCaseApiMock,
        );
        const oResult = await service.getCaseById(oCase.id);
        expect(oResult).toStrictEqual(oCase);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should handle error', async () => {
      const oErr = {
        response: { data: { error: { message: 'Error in Case API' } } },
      };
      try {
        const oCaseApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockRejectedValue(oErr),
        });
        (CaseApi.readcaseserviceCase as jest.Mock).mockImplementation(
          oCaseApiMock,
        );
        await service.getCaseById('b867087f-f3ba-11ed-95b1-4f6d461bbdcd');
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getErrorMessage()).toBe(oErr.response.data.error.message);
      }
    });

    it(`should handle when there's error.message`, async () => {
      const oErr = {
        message: 'upstream error',
      };
      try {
        const oCaseApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockRejectedValue(oErr),
        });
        (CaseApi.readcaseserviceCase as jest.Mock).mockImplementation(
          oCaseApiMock,
        );
        await service.getCaseById('b867087f-f3ba-11ed-95b1-4f6d461bbdcd');
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getErrorMessage()).toBe(oErr.message);
      }
    });
  });

  describe('updateCase', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('should be able to update case', async () => {
      try {
        const oCaseApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockResolvedValue(oCase),
        });
        (CaseApi.modifycaseserviceCase as jest.Mock).mockImplementation(
          oCaseApiMock,
        );
        const oGetCaseApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockResolvedValue({ value: oCase }),
        });
        (CaseApi.readcaseserviceCase as jest.Mock).mockImplementation(
          oGetCaseApiMock,
        );
        const oResult = await service.updateCase(oCase.id, {});
        expect(oResult).toStrictEqual(oCase);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should handle error', async () => {
      const oErr = {
        response: { data: { error: { message: 'Error in Case API' } } },
      };
      try {
        const oGetCaseApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockResolvedValue({ value: oCase }),
        });
        (CaseApi.readcaseserviceCase as jest.Mock).mockImplementation(
          oGetCaseApiMock,
        );

        const oCaseApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockRejectedValue(oErr),
        });
        (CaseApi.modifycaseserviceCase as jest.Mock).mockImplementation(
          oCaseApiMock,
        );
        await service.updateCase('b867087f-f3ba-11ed-95b1-4f6d461bbdcd', {});
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getErrorMessage()).toBe(oErr.response.data.error.message);
      }
    });

    it(`should handle when there is no adminData`, async () => {
      const oErr = {
        response: { data: { error: { message: 'Error in Case API' } } },
      };
      try {
        const oCaseApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockResolvedValue({
            value: {},
          }),
        });
        (CaseApi.readcaseserviceCase as jest.Mock).mockImplementation(
          oCaseApiMock,
        );

        const oCaseApiMockRead = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockRejectedValue(oErr),
        });
        (CaseApi.modifycaseserviceCase as jest.Mock).mockImplementation(
          oCaseApiMockRead,
        );

        await service.updateCase('sCaseId', {});
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getErrorMessage()).toBe(oErr.response.data.error.message);
      }
    });

    it(`should handle when there's error.message`, async () => {
      const oErr = {
        message: 'upstream error',
      };
      try {
        const oCaseApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockResolvedValue({
            value: { adminData: { updatedOn: '2023-06-01T16:53:21.346Z' } },
          }),
        });
        (CaseApi.readcaseserviceCase as jest.Mock).mockImplementation(
          oCaseApiMock,
        );

        const oCaseApiMockRead = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockRejectedValue(oErr),
        });
        (CaseApi.modifycaseserviceCase as jest.Mock).mockImplementation(
          oCaseApiMockRead,
        );

        await service.updateCase('sCaseId', {});
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getErrorMessage()).toBe(oErr.message);
      }
    });
  });

  describe('getCaseData', () => {
    it('should get case data', async () => {
      try {
        const oCaseData = service.getCaseData(oCase);
        expect(oCaseData).toHaveProperty('sProcessor');
        expect(oCaseData).toHaveProperty('nMilometer');
        expect(oCaseData).toHaveProperty('sEstimatedCompletionDate');
        expect(oCaseData).toHaveProperty('sCustomerName');
        expect(oCaseData).toHaveProperty('sCaseDisplayId');
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });
    it('should throw error when case status is completed', async () => {
      try {
        oCase.status = CASE_STATUS.COMPLETED;
        service.getCaseData(oCase);
      } catch (error) {
        expect(error.message).toBe(MESSAGES.CASE_COMPLETED);
      }
    });
    it('should fetch customer name from account when there is no individual customer', async () => {
      try {
        const oCaseMock = JSON.parse(JSON.stringify(oCase));
        oCaseMock.status = '01';
        delete oCaseMock.individualCustomer;
        oCaseMock['account'] = {};
        oCaseMock['account']['name'] = 'Justin';
        const oCaseData = service.getCaseData(oCaseMock);
        expect(oCaseData).toHaveProperty('sProcessor');
        expect(oCaseData).toHaveProperty('nMilometer');
        expect(oCaseData).toHaveProperty('sEstimatedCompletionDate');
        expect(oCaseData.sCustomerName).toBe('Justin');
        expect(oCaseData).toHaveProperty('sCaseDisplayId');
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });
    it('should handle when there is no milometer extension field in case', async () => {
      try {
        oCase['extensions'] = {};
        oCase['extensions'][EXTENSION_FIELDS['MILOMETER']] = '4578';
        const oCaseData = service.getCaseData(oCase);
        expect(oCaseData).toHaveProperty('sProcessor');
        expect(oCaseData).toHaveProperty('nMilometer');
        expect(oCaseData.nMilometer).toBe('4578');
        expect(oCaseData).toHaveProperty('sEstimatedCompletionDate');
        expect(oCaseData).toHaveProperty('sCustomerName');
        expect(oCaseData).toHaveProperty('sCaseDisplayId');
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should handle when there is no processor info in case', async () => {
      try {
        delete oCase['processor'];
        const oCaseData = service.getCaseData(oCase);
        expect(oCaseData.sProcessor).toBe(undefined);
        expect(oCaseData).toHaveProperty('nMilometer');
        expect(oCaseData).toHaveProperty('sEstimatedCompletionDate');
        expect(oCaseData).toHaveProperty('sCustomerName');
        expect(oCaseData).toHaveProperty('sCaseDisplayId');
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should handle when there is no timePoints info in case', async () => {
      try {
        delete oCase['timePoints'];
        const oCaseData = service.getCaseData(oCase);
        expect(oCaseData).toHaveProperty('sProcessor');
        expect(oCaseData).toHaveProperty('nMilometer');
        expect(oCaseData.sEstimatedCompletionDate).toBe(undefined);
        expect(oCaseData).toHaveProperty('sCustomerName');
        expect(oCaseData).toHaveProperty('sCaseDisplayId');
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });
  });
});
