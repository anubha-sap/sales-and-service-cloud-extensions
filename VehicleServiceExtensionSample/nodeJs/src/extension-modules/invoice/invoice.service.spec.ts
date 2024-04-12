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
import { RequestMock } from '../../../test/mock-data/common.mock.data';
import { oCase } from '../../../test/mock-data/modules/case.mock.data';
import { oDocument } from '../../../test/mock-data/modules/invoice-service.mock.data';
import { JobCardCountResponseDTOWithCNSData } from '../../../test/mock-data/modules/job-card.mock.data';
jest.mock('../common/open-api/client/document-service/document-service-api');

describe('InvoiceService', () => {
  let invoiceService: InvoiceService;
  let mockHttpService;
  let mockCaseService;
  let mockJobCardService;
  let mockUtilsService;

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
          useValue: RequestMock,
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
          execute: jest.fn().mockResolvedValue({ value: oDocument }),
        });
        (
          DocumentServiceApi.createdocumentserviceDocument as jest.Mock
        ).mockImplementation(documentServiceApiMock);
        const result = await invoiceService.createDocument(docData);
        expect(result.value).toStrictEqual(oDocument);
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
        jest
          .spyOn(mockCaseService, 'updateCase')
          .mockResolvedValue({ value: oCase });
        const result = await invoiceService.updateCaseWithInvoice(caseId, {
          value: oDocument,
        });
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
        jest
          .spyOn(mockJobCardService, 'findAll')
          .mockResolvedValue(JobCardCountResponseDTOWithCNSData);
        const result = await invoiceService.generateInvoice(query);
        expect(result).toBeInstanceOf(Buffer);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should handle when serviceSelected does not have service/name/status/price ', async () => {
      const oJobCardResponseDTOWithCNSData = JSON.parse(
        JSON.stringify(JobCardCountResponseDTOWithCNSData),
      );
      oJobCardResponseDTOWithCNSData.value[0].servicesSelected[0].service =
        undefined;
      oJobCardResponseDTOWithCNSData.value[0].servicesSelected[0].technician =
        undefined;
      oJobCardResponseDTOWithCNSData.value[0].servicesSelected[0].status =
        undefined;
      oJobCardResponseDTOWithCNSData.value[0].servicesSelected[0].price =
        undefined;
      try {
        jest
          .spyOn(mockJobCardService, 'findAll')
          .mockResolvedValue(oJobCardResponseDTOWithCNSData);
        const result = await invoiceService.generateInvoice(query);
        expect(result).toBeInstanceOf(Buffer);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should handle error when generate invoice', async () => {
      try {
        jest
          .spyOn(mockJobCardService, 'findAll')
          .mockResolvedValue({ value: [], count: 0 });
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
        jest
          .spyOn(mockJobCardService, 'findAll')
          .mockResolvedValue(JobCardCountResponseDTOWithCNSData);
        const documentServiceApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockResolvedValue({ value: oDocument }),
        });
        (
          DocumentServiceApi.createdocumentserviceDocument as jest.Mock
        ).mockImplementation(documentServiceApiMock);
        jest
          .spyOn(mockHttpService, 'put')
          .mockImplementationOnce(() => of(response));
        jest
          .spyOn(mockCaseService, 'updateCase')
          .mockResolvedValue({ value: oCase });
        const result = await invoiceService.createInvoice(query);
        expect(result).toStrictEqual({ status: true });
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should handle when case has no value', async () => {
      try {
        jest
          .spyOn(mockJobCardService, 'findAll')
          .mockResolvedValue(JobCardCountResponseDTOWithCNSData);
        const documentServiceApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockResolvedValue({ value: oDocument }),
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
        jest
          .spyOn(mockJobCardService, 'findAll')
          .mockResolvedValue(JobCardCountResponseDTOWithCNSData);
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
      delete oNoAttachCase.attachments;
      try {
        jest
          .spyOn(mockJobCardService, 'findAll')
          .mockResolvedValue(JobCardCountResponseDTOWithCNSData);
        const documentServiceApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockResolvedValue({ value: oDocument }),
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
