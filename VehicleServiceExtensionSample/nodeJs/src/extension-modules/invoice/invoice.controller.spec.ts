import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { UtilsService } from '../../utils/utils.service';
import { CustomLogger } from '../../logger/logger.service';
import { REQUEST } from '@nestjs/core';
import { RequestMock } from '../../../test/mock-data/common.mock.data';

describe('InvoiceController', () => {
  let controller: InvoiceController;
  let mockInvoiceService;
  const mockUtilsService = {
    parseFilterString: jest.fn(),
  };
  const mockCustomLogger = {
    setClassName: jest.fn(),
    log: jest.fn(),
  };

  beforeEach(async () => {
    mockInvoiceService = {
      createInvoice: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceController],
      providers: [
        { provide: InvoiceService, useValue: mockInvoiceService },
        { provide: CustomLogger, useValue: mockCustomLogger },
        { provide: UtilsService, useValue: mockUtilsService },
        {
          provide: REQUEST,
          useValue: RequestMock,
        },
      ],
    }).compile();

    controller = module.get<InvoiceController>(InvoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create invoice', async () => {
    const response = { status: true };
    const query = {
      $filter: `caseId eq 'b867087f-f3ba-11ed-95b1-4f6d461bbdcd'`,
    };
    jest.spyOn(mockInvoiceService, 'createInvoice').mockResolvedValue(response);
    jest
      .spyOn(mockUtilsService, 'parseFilterString')
      .mockReturnValue({ caseId: `b867087f-f3ba-11ed-95b1-4f6d461bbdcd` });
    const parseFilterStringSpy = jest.spyOn(
      mockUtilsService,
      'parseFilterString',
    );
    const result = await controller.invoice(query);
    expect(result).toStrictEqual({ status: true });
    expect(parseFilterStringSpy).toHaveBeenCalledTimes(1);
  });
});
