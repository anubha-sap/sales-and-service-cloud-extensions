import { Test, TestingModule } from '@nestjs/testing';
import { RegisteredProductsService } from './registered-products.service';
import { RegisteredProductApi } from './open-api/client/registeredProducts';
import { ServerException } from '../../common/filters/server-exception';
import { REQUEST } from '@nestjs/core';
import { CustomLogger } from '../../logger/logger.service';
import { RequestMock } from '../../../test/mock-data/common.mock.data';
import {
  RegisteredProduct,
  RegisteredProductDetail,
} from '../../../test/mock-data/modules/registered-products.mock.data';
import { oCase } from '../../../test/mock-data/modules/case.mock.data';
jest.mock('./open-api/client/registeredProducts');

describe('RegisteredProductsService', () => {
  let registeredProductService: RegisteredProductsService;

  const mockCustomLogger = {
    setClassName: jest.fn(),
    debug: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisteredProductsService,
        {
          provide: REQUEST,
          useValue: RequestMock,
        },
        { provide: CustomLogger, useValue: mockCustomLogger },
      ],
    }).compile();

    registeredProductService = module.get<RegisteredProductsService>(
      RegisteredProductsService,
    );
  });

  it('should be defined', () => {
    expect(registeredProductService).toBeDefined();
  });

  describe('getRegisteredProductData', () => {
    it('should get registered product data', async () => {
      jest
        .spyOn(registeredProductService, 'findOne')
        .mockResolvedValue(RegisteredProduct);
      const result = await registeredProductService.getRegisteredProductData(
        oCase,
      );
      expect(result).toStrictEqual(RegisteredProductDetail);
    });

    it('should handle when there is no vehicle number extension field', async () => {
      delete RegisteredProduct.extensions;
      jest
        .spyOn(registeredProductService, 'findOne')
        .mockResolvedValue({ value: RegisteredProduct });
      const result = await registeredProductService.getRegisteredProductData(
        oCase,
      );
      expect(result.vehicleNumber).toBe(undefined);
    });

    it('should throw error for No registered product', async () => {
      try {
        await registeredProductService.getRegisteredProductData({});
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('should handle when there is no dop, model', async () => {
      try {
        delete RegisteredProduct.referenceProduct;
        delete RegisteredProduct.referenceDate;
        await registeredProductService.getRegisteredProductData(oCase);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('should handle when there is no referenceDate in oRegisteredProduct', async () => {
      delete RegisteredProduct.referenceDate;
      jest
        .spyOn(registeredProductService, 'findOne')
        .mockResolvedValue({ value: RegisteredProduct });
      const result = await registeredProductService.getRegisteredProductData(
        oCase,
      );
      expect(result.dateOfPurchase).toBe('');
    });

    it('should handle when there is no referenceProduct in oRegisteredProduct', async () => {
      delete RegisteredProduct.referenceProduct;
      jest
        .spyOn(registeredProductService, 'findOne')
        .mockResolvedValue({ value: RegisteredProduct });
      const result = await registeredProductService.getRegisteredProductData(
        oCase,
      );
      expect(result.model).toBe('');
    });
  });

  describe('findOne', () => {
    const regProductId = '04e29c42-bcdd-4edb-bf57-ba1b3bd81be2';
    it('it should find one registered product', async () => {
      try {
        const oRegisteredProductApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockResolvedValue({ value: RegisteredProduct }),
        });
        (
          RegisteredProductApi.readregisteredproductserviceRegisteredProduct as jest.Mock
        ).mockImplementation(oRegisteredProductApiMock);
        const oResult = await registeredProductService.findOne(regProductId);
        expect(oResult).toStrictEqual(RegisteredProduct);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });
    it('it should find handle error', async () => {
      const oErr = {
        response: { data: { error: { message: 'Error in Case API' } } },
      };
      try {
        const oRegisteredProductApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockRejectedValue(oErr),
        });
        (
          RegisteredProductApi.readregisteredproductserviceRegisteredProduct as jest.Mock
        ).mockImplementation(oRegisteredProductApiMock);
        await registeredProductService.findOne(regProductId);
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
        const oRegisteredProductApiMock = jest.fn().mockReturnValue({
          addCustomHeaders: jest.fn().mockReturnThis(),
          execute: jest.fn().mockRejectedValue(oErr),
        });
        (
          RegisteredProductApi.readregisteredproductserviceRegisteredProduct as jest.Mock
        ).mockImplementation(oRegisteredProductApiMock);
        await registeredProductService.findOne(regProductId);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getErrorMessage()).toBe(oErr.message);
      }
    });
  });
});
