import { TestingModule, Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { InvoiceService } from './invoice.service';
import { JobCardService } from '../job-card/job-card.service';
import { of } from 'rxjs';
import { CasesService } from '../../cns-modules/cases/cases.service';
import { ServerException } from '../../common/filters/server-exception';
import { UtilsService } from '../../utils/utils.service';
import { DocumentServiceApi } from '../common/open-api/client/document-service/document-service-api';
import { MESSAGES } from '../../common/constants';
import { REQUEST } from '@nestjs/core';
jest.mock('../common/open-api/client/document-service/document-service-api');

describe('InvoiceService', () => {
  let invoiceService: InvoiceService;
  let mockHttpService;
  let mockCaseService;
  let mockJobCardService;
  let mockUtilsService;

  const requestStub = {
    session: {
      language: 'lan',
      userToken: 'token',
      userId: 'uId',
    },
  };

  const oCase = {
    value: {
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
      attachments: [
        {
          id: '0f0bf9da-efdc-11ed-a69d-e51aa3459720',
          category: 'DOCUMENT',
          title: 'test_invoice.pdf',
          fileName: 'test_invoice.pdf',
          fileSize: 2923,
          contentType: 'application/pdf',
          status: 'ACTIVE',
          adminData: {
            createdOn: '2023-05-11T09:13:14.264Z',
            createdBy: 'abf4a353-ea15-11e9-8fa7-f92a516fe751',
            updatedOn: '2023-05-11T09:13:14.264Z',
            updatedBy: 'abf4a353-ea15-11e9-8fa7-f92a516fe751',
          },
        },
      ],
      registeredProducts: [
        {
          serialId: 'TATN001',
          referenceProduct: {
            id: '11edd9f9-9b1d-af8e-afdb-812c72a8c000',
          },
          referenceDate: '2023-04-14T00:00:00Z',
          id: '04e29c42-bcdd-4edb-bf57-ba1b3bd81be2',
          displayId: '33',
          status: 'ACTIVE',
          description: 'TATA Nexon XMA - Registered',
          isMain: true,
        },
      ],

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
  };
  const oDocument = {
    value: {
      id: '0f0bf9da-efdc-11ed-a69d-e51aa3459720',
      title: 'test_invoice.pdf',
      fileName: 'test_invoice.pdf',
      category: 'DOCUMENT',
      status: 'OPEN',
      thumbnailStatus: 'NOT_PROCESSED',
      type: '10001',
      fileSize: 0,
      uploadUrl:
        'https://stage-us-east-1-documents.s3.dualstack.us-east-1.amazonaws.com/',
      adminData: {
        createdBy: 'abf4a353-ea15-11e9-8fa7-f92a516fe751',
        createdOn: '2023-05-11T09:13:14.264849227Z',
        updatedBy: 'abf4a353-ea15-11e9-8fa7-f92a516fe751',
        updatedOn: '2023-05-11T09:13:14.264849227Z',
      },
      hostObjectId: 'abf4a353-ea15-11e9-8fa7-f92a516fe751',
      hostObjectType: 'user',
      icon: 'file_general',
      color: 'grey',
    },
  };

  const jobCard = [
    {
      id: '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177',
      displayId: 1,
      caseId: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
      caseDisplayId: '536',
      status: 'COMPLETED',
      registeredProduct: {
        vehicleNumber: 'KA01MJ5010',
        dateOfPurchase: '2023-04-14T00:00:00Z',
        model: 'TATA Nexon XMA',
      },
      customerComplaints: ['Need to check engine', ' ', ' ', ' ', ' '],
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
          status: 'COMPLETED',
          startTime: '2023-05-08T11:58:27.609Z',
          endTime: '2023-05-08T11:58:41.288Z',
          notes: 'test',
          observation: 'oil leakage',
        },
        {
          id: 'c4b45224-db39-47ed-9ea5-50dc9cee9162',
          service: '',
          price: '',
          technician: '',
          status: '',
          startTime: '2023-05-08T11:58:00.516Z',
          endTime: '2023-05-08T11:58:49.673Z',
          notes: null,
          observation: null,
        },
      ],
    },
  ];

  beforeEach(async () => {
    mockUtilsService = {
      getDateTime: jest.fn(),
    };
    mockHttpService = {
      put: jest.fn().mockImplementation((stream) => {
        return Promise.resolve({ pipe: jest.fn() });
      }),
    };

    mockCaseService = {
      updateCase: jest.fn(),
    };
    mockJobCardService = {
      findAll: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceService,
        {
          provide: UtilsService,
          useValue: mockUtilsService,
        },
        { provide: CasesService, useValue: mockCaseService },
        { provide: HttpService, useValue: mockHttpService },
        { provide: JobCardService, useValue: mockJobCardService },
        {
          provide: REQUEST,
          useValue: requestStub,
        },
      ],
    }).compile();

    invoiceService = module.get<InvoiceService>(InvoiceService);
  });

  it('should be defined', () => {
    expect(invoiceService).toBeDefined();
  });

  describe('createDocument', () => {
    const docData = {
      category: 'DOCUMENT',
      fileName: 'test_invoice.pdf',
      isSelected: false,
      type: '10001',
    };
    it('should be create the document', async () => {
      try {
        const documentServiceApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockResolvedValue(oDocument),
        });
        (
          DocumentServiceApi.createdocumentserviceDocument as jest.Mock
        ).mockImplementation(documentServiceApiMock);
        const result = await invoiceService.createDocument(docData);
        expect(result).toStrictEqual(oDocument);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should handle error when create document', async () => {
      const oErr = {
        response: { data: { error: { message: 'Error in Case API' } } },
      };
      try {
        const documentServiceApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockRejectedValue(oErr),
        });
        (
          DocumentServiceApi.createdocumentserviceDocument as jest.Mock
        ).mockImplementation(documentServiceApiMock);
        await invoiceService.createDocument(docData);
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
        const documentServiceApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockRejectedValue(oErr),
        });
        (
          DocumentServiceApi.createdocumentserviceDocument as jest.Mock
        ).mockImplementation(documentServiceApiMock);
        await invoiceService.createDocument(docData);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getErrorMessage()).toBe(oErr.message);
      }
    });
  });

  describe('uploadDocument', () => {
    const bufferData = Buffer.from('Abc - invoice');
    const uploadUrl = 'http://test.com';
    const response = { data: '', status: 200 };
    it('should upload the document', async () => {
      try {
        jest
          .spyOn(mockHttpService, 'put')
          .mockImplementationOnce(() => of(response));
        const res = await invoiceService.uploadDocument(bufferData, uploadUrl);
        expect(res).toStrictEqual(200);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should handle when response is empty', async () => {
      try {
        jest
          .spyOn(mockHttpService, 'put')
          .mockImplementationOnce(() => of(undefined));
        const res = await invoiceService.uploadDocument(bufferData, uploadUrl);
        expect(res).toStrictEqual(undefined);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should return error for upload the document', async () => {
      try {
        jest.spyOn(mockHttpService, 'put').mockImplementation(() => {
          throw new Error('Error in Upload document');
        });
        await invoiceService.uploadDocument(bufferData, uploadUrl);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('updateCaseWithInvoice', () => {
    const caseId = 'b867087f-f3ba-11ed-95b1-4f6d461bbdcd';
    it('should update cate data', async () => {
      try {
        jest.spyOn(mockCaseService, 'updateCase').mockResolvedValue(oCase);
        const result = await invoiceService.updateCaseWithInvoice(
          caseId,
          oDocument,
        );
        expect(result.value.attachments).toBeDefined();
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should handle error when case update', async () => {
      try {
        jest
          .spyOn(mockCaseService, 'updateCase')
          .mockRejectedValue('Error for case update');
        await invoiceService.updateCaseWithInvoice(caseId, oDocument);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('generateInvoice', () => {
    const query = {
      caseId: 'b867087f-f3ba-11ed-95b1-4f6d461bbdcd',
      displayId: 1,
      serviceAdvisor: '',
    };
    it('should generate invoice', async () => {
      try {
        jest.spyOn(mockJobCardService, 'findAll').mockResolvedValue(jobCard);
        const result = await invoiceService.generateInvoice(query);
        expect(result).toBeInstanceOf(Buffer);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should handle error when generate invoice', async () => {
      try {
        jest.spyOn(mockJobCardService, 'findAll').mockResolvedValue(null);
        await invoiceService.generateInvoice(query);
      } catch (error) {
        expect(error.message).toBe(MESSAGES.JOBCARD_NOT_FOUND);
      }
    });

    it('should return error in invoice', async () => {
      try {
        jest.spyOn(mockJobCardService, 'findAll').mockRejectedValue({});
        await invoiceService.generateInvoice(query);
      } catch (error) {
        expect(error.message).toBe(MESSAGES.ERR_IN_INVOICE);
      }
    });
  });

  describe('createInvoice', () => {
    const query = {
      caseId: 'b867087f-f3ba-11ed-95b1-4f6d461bbdcd',
      displayId: 1,
      serviceAdvisor: '',
    };
    const response = { data: '', status: 200 };
    it('should create the invoice', async () => {
      try {
        jest.spyOn(mockJobCardService, 'findAll').mockResolvedValue(jobCard);
        const documentServiceApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockResolvedValue(oDocument),
        });
        (
          DocumentServiceApi.createdocumentserviceDocument as jest.Mock
        ).mockImplementation(documentServiceApiMock);
        jest
          .spyOn(mockHttpService, 'put')
          .mockImplementationOnce(() => of(response));
        jest.spyOn(mockCaseService, 'updateCase').mockResolvedValue(oCase);
        const result = await invoiceService.createInvoice(query);
        expect(result).toStrictEqual({ status: true });
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should handle when case has no value', async () => {
      try {
        jest.spyOn(mockJobCardService, 'findAll').mockResolvedValue(jobCard);
        const documentServiceApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockResolvedValue(oDocument),
        });
        (
          DocumentServiceApi.createdocumentserviceDocument as jest.Mock
        ).mockImplementation(documentServiceApiMock);
        jest
          .spyOn(mockHttpService, 'put')
          .mockImplementationOnce(() => of(response));
        jest.spyOn(mockCaseService, 'updateCase').mockResolvedValue({});
        const result = await invoiceService.createInvoice(query);
        expect(result).toStrictEqual({ status: false });
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should handle when createDocument() returns empty object', async () => {
      try {
        jest.spyOn(mockJobCardService, 'findAll').mockResolvedValue(jobCard);
        const documentServiceApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockResolvedValue({}),
        });
        (
          DocumentServiceApi.createdocumentserviceDocument as jest.Mock
        ).mockImplementation(documentServiceApiMock);
        jest
          .spyOn(mockHttpService, 'put')
          .mockImplementationOnce(() => of(response));
        jest.spyOn(mockCaseService, 'updateCase').mockResolvedValue(oCase);
        const result = await invoiceService.createInvoice(query);
        expect(result).toBeInstanceOf(Buffer);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should return false status for no attachment', async () => {
      const oNoAttachCase = oCase;
      delete oNoAttachCase.value.attachments;
      try {
        jest.spyOn(mockJobCardService, 'findAll').mockResolvedValue(jobCard);
        const documentServiceApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockResolvedValue(oDocument),
        });
        (
          DocumentServiceApi.createdocumentserviceDocument as jest.Mock
        ).mockImplementation(documentServiceApiMock);
        jest
          .spyOn(mockHttpService, 'put')
          .mockImplementationOnce(() => of(response));
        jest
          .spyOn(mockCaseService, 'updateCase')
          .mockResolvedValue(oNoAttachCase);
        const result = await invoiceService.createInvoice(query);
        expect(result).toStrictEqual({ status: false });
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should return error when create invoice', async () => {
      const oErr = {
        response: { data: { error: { message: 'Error in Case API' } } },
      };
      try {
        const documentServiceApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockResolvedValue(oErr),
        });
        (
          DocumentServiceApi.createdocumentserviceDocument as jest.Mock
        ).mockImplementation(documentServiceApiMock);
        await invoiceService.createInvoice(query);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });

    it('should return error for generate invoice', async () => {
      let pdfBuffer: Buffer;
      try {
        jest
          .spyOn(invoiceService, 'generateInvoice')
          .mockResolvedValue(pdfBuffer);
        const result = await invoiceService.createInvoice(query);
        expect(result).toBe(undefined);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });
  });
});
