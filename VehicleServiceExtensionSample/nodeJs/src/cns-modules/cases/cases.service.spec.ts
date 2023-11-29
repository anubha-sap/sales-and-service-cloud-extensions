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
jest.mock('./open-api/client/SalesSvcCloudV2_case');
let oCase;
let oCases;

describe('CasesService', () => {
  let service: CasesService;
  oCases = {
    value: [
      {
        id: 'b867087f-f3ba-11ed-95b1-4f6d461bbdcd',
        displayId: 'CR64',
        subject: 'test individual customer clear PS working',
        priority: '03',
        priorityDescription: 'Medium',
        origin: 'MANUAL_DATA_ENTRY',
        caseType: 'ZSW9',
        caseTypeDescription: 'PS_CASE_MAY',
        statusSchema: '01',
        status: '01',
        statusDescription: 'Open',
        escalationStatus: 'NOT_ESCALATED',
        isRecommendedCommunicationLanguage: false,
        individualCustomer: {
          id: '11ed23b4-a67f-7bce-afdb-813f39a8c000',
          displayId: '1004091',
          name: '. Ind Customer with ID',
          isDeleted: false,
          partyRoleCategory: 'ACCOUNT',
          addressId: '11edd391-0ed2-3dce-afdb-81394ca8c000',
          determinationMethodCode: 1,
          isMain: true,
          partyType: 'INDIVIDUAL_CUSTOMER',
        },
        contact: {
          emailId: 'INFO@johannes-engelke.de',
          id: '11edde92-0b67-b78e-afdb-814342020a00',
          displayId: '1000510',
          name: 'Johannes Engelke',
          isDeleted: false,
          partyRoleCategory: 'CONTACT_OF_ACCOUNT',
          partyRole: '591',
          addressId: '11edea5e-8d51-ddce-afdb-815d6c020a00',
          determinationMethodCode: 1,
          isMain: true,
          partyType: 'CONTACT',
        },
        processor: {
          emailId: 'pavithra.n@sap.com',
          id: '11ece234-9c0f-0c8e-afdb-811324a8c000',
          displayId: 'I031008',
          name: 'Pavithra N',
          isDeleted: false,
          partyRoleCategory: 'PROCESSOR',
          addressId: '11ece234-9c11-a49e-afdb-811324a8c000',
          determinationMethodCode: 13,
          isMain: true,
          partyType: 'EMPLOYEE',
        },
        reporter: {
          id: '11eca450-4516-757e-afdb-815d3fa8c000',
          displayId: '9000000072',
          name: 'Karthik Simha',
          isDeleted: false,
          partyRoleCategory: 'REPORTER',
          addressId: '11eca450-451a-1efe-afdb-815d3fa8c000',
          determinationMethodCode: 3,
          isMain: true,
          partyType: 'EMPLOYEE',
        },
        timePoints: {
          reportedOn: '2023-05-16T07:22:00Z',
          completionDueOn: '2023-05-16T11:52:00Z',
          initialReviewDueOn: '2023-05-16T09:22:00Z',
          assignedToProcessorOn: '2023-05-16T07:24:40.664Z',
        },
        catalog: {
          id: '8e09cf66-cc69-4ccf-bec7-70bbbe862947',
          displayId: '4323',
          name: 'PS_Playwright_Catalog--Do not touch',
        },
        serviceLevelId: 'a10b6a88-ddcc-11ed-9415-877f034c77ee',
        serviceLevel: 'ps_april2023',
        isRecommendedCategory: false,
        isEndOfPurpose: false,
        isDepersonalized: false,
        isRead: true,
        isIrrelevant: false,
        adminData: {
          createdOn: '2023-05-16T07:24:40.051Z',
          createdBy: '8529115f-a451-11ec-85b1-0d2b15f57fee',
          createdByName: 'Karthik Simha',
          updatedOn: '2023-05-16T07:24:49.572Z',
          updatedBy: '8529115f-a451-11ec-85b1-0d2b15f57fee',
          updatedByName: 'Karthik Simha',
        },
      },
    ],
  };
  oCase = { value: oCases.value[0] };
  const mockCustomLogger = {
    setClassName: jest.fn(),
    debug: jest.fn(),
  };
  const requestStub = {
    session: {
      reqId: '1',
      language: 'en',
      caseStatuses: {
        booked: CASE_STATUS.BOOKED,
        closed: CASE_STATUS.CLOSED,
        completed: CASE_STATUS.COMPLETED,
        serviceCompleted: CASE_STATUS.SERVICE_COMPLETED,
        serviceInProcess: CASE_STATUS.SERVICE_IN_PROCESS,
      },
      extensionFields: {
        jobCardId: EXTENSION_FIELDS.JOBCARD_ID,
        milometer: EXTENSION_FIELDS.MILOMETER,
        serviceFormId: EXTENSION_FIELDS.SERVICE_FORM_ID,
        vehicleNumber: EXTENSION_FIELDS.VEHICLE_NUMBER,
      },
      sscDestination: 'SAPServiceCloudDiscoveryService7',
      logLevel: '4',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CasesService,
        {
          provide: REQUEST,
          useValue: requestStub,
        },
        { provide: CustomLogger, useValue: mockCustomLogger },
      ],
    }).compile();

    service = module.get<CasesService>(CasesService);
  });
  /* 
  afterEach(() => {
    oCases = oCase = undefined;
  }); */

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
          execute: jest.fn().mockResolvedValue(oCase),
        });
        (CaseApi.readcaseserviceCase as jest.Mock).mockImplementation(
          oCaseApiMock,
        );
        const oResult = await service.getCaseById(oCase.value.id);
        expect(oResult).toStrictEqual(oCase.value);
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
          execute: jest.fn().mockResolvedValue(oCase),
        });
        (CaseApi.readcaseserviceCase as jest.Mock).mockImplementation(
          oGetCaseApiMock,
        );
        const oResult = await service.updateCase(oCase.value.id, {});
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
          execute: jest.fn().mockResolvedValue(oCase),
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
    beforeEach(async () => {
      oCase = { value: oCases.value[0] };
    });
    afterEach(async () => {
      oCase = undefined;
    });
    it('should get case data', async () => {
      try {
        const oCaseData = service.getCaseData(oCase.value);
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
        oCase.value.status = CASE_STATUS.COMPLETED;
        service.getCaseData(oCase.value);
      } catch (error) {
        expect(error.message).toBe(MESSAGES.CASE_COMPLETED);
      }
    });
    it('should fetch customer name from account when there is no individual customer', async () => {
      try {
        oCase.value.status = '01';
        delete oCase.value.individualCustomer;
        oCase.value['account'] = {};
        oCase.value['account']['name'] = 'Justin';
        const oCaseData = service.getCaseData(oCase.value);
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
        oCase.value['extensions'] = {};
        oCase.value['extensions'][EXTENSION_FIELDS['MILOMETER']] = '4578';
        const oCaseData = service.getCaseData(oCase.value);
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
        delete oCase.value['processor'];
        const oCaseData = service.getCaseData(oCase.value);
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
        delete oCase.value['timePoints'];
        const oCaseData = service.getCaseData(oCase.value);
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
