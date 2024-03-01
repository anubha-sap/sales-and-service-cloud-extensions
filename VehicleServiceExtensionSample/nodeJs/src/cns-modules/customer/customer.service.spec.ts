import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { IndividualCustomerApi } from './open-api/client/individual-customer/individual-customer-api';
import { AccountsApi } from './open-api/client/account/account-api';
import { ServerException } from '../../common/filters/server-exception';
import { REQUEST } from '@nestjs/core';
import { CustomLogger } from '../../logger/logger.service';
import { RequestMock } from '../../../test/mock-data/common.mock.data';
import {
  IndividualCustomer,
  oAccount,
} from '../../../test/mock-data/modules/customer-service.mock.data';
jest.mock('./open-api/client/individual-customer/individual-customer-api');
jest.mock('./open-api/client/account/account-api');

const mockCustomLogger = {
  setClassName: jest.fn(),
  debug: jest.fn(),
};

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: REQUEST,
          useValue: RequestMock,
        },
        { provide: CustomLogger, useValue: mockCustomLogger },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAccountInfo', () => {
    it('should return accountInfo', async () => {
      const accountServiceMock = jest.fn().mockReturnValue({
        addCustomHeaders: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({ value: oAccount }),
      });
      (AccountsApi.getAccountsApi as jest.Mock).mockImplementation(
        accountServiceMock,
      );
      const oAccountInfo = await service.getAccountInfo('id');
      expect(oAccountInfo.contactNumber).toBe(
        oAccount.defaultCommunication.phoneFormattedNumber,
      );
    });

    it('should handle error in getAccountInfo', async () => {
      const oErr = {
        response: { data: { error: { message: 'Error in Account API' } } },
      };
      const accountServiceMock = jest.fn().mockReturnValue({
        addCustomHeaders: jest.fn().mockReturnThis(),
        execute: jest.fn().mockRejectedValue(oErr),
      });
      (AccountsApi.getAccountsApi as jest.Mock).mockImplementation(
        accountServiceMock,
      );
      try {
        const oAccountInfo = await service.getAccountInfo('id');
        expect(oAccountInfo.contactNumber).toBe(
          oAccount.defaultCommunication.phoneFormattedNumber,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getErrorMessage()).toBe(oErr.response.data.error.message);
      }
    });

    it(`should handle when there's error.message`, async () => {
      const oErr = {
        message: 'upstream error',
      };
      const accountServiceMock = jest.fn().mockReturnValue({
        addCustomHeaders: jest.fn().mockReturnThis(),
        execute: jest.fn().mockRejectedValue(oErr),
      });
      (AccountsApi.getAccountsApi as jest.Mock).mockImplementation(
        accountServiceMock,
      );
      try {
        const oAccountInfo = await service.getAccountInfo('id');
        expect(oAccountInfo.contactNumber).toBe(
          oAccount.defaultCommunication.phoneFormattedNumber,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getErrorMessage()).toBe(oErr.message);
      }
    });

    it('should handle when there is no defaultCommunication in oAccountInfo', async () => {
      delete oAccount.defaultCommunication;
      const accountServiceMock = jest.fn().mockReturnValue({
        addCustomHeaders: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({ value: oAccount }),
      });
      (AccountsApi.getAccountsApi as jest.Mock).mockImplementation(
        accountServiceMock,
      );
      const oAccountInfo = await service.getAccountInfo('id');
      expect(oAccountInfo.contactNumber).toBe(undefined);
    });
  });

  describe('getIndividualCustomerInfo', () => {
    it('should return accountInfo', async () => {
      const individualCustomerInfoMock = jest.fn().mockReturnValue({
        addCustomHeaders: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({ value: IndividualCustomer }),
      });
      (
        IndividualCustomerApi.getIndividualCustomerApi as jest.Mock
      ).mockImplementation(individualCustomerInfoMock);
      const oResult = await service.getIndividualCustomerInfo('id');
      expect(oResult.contactNumber).toBe(
        IndividualCustomer.defaultCommunication.mobileFormattedNumber,
      );
    });

    it('should handle error in getIndividualCustomerInfo', async () => {
      const oErr = {
        response: {
          data: { error: { message: 'Error in IndividualCustomer API' } },
        },
      };
      const individualCustomerInfoMock = jest.fn().mockReturnValue({
        addCustomHeaders: jest.fn().mockReturnThis(),
        execute: jest.fn().mockRejectedValue(oErr),
      });
      (
        IndividualCustomerApi.getIndividualCustomerApi as jest.Mock
      ).mockImplementation(individualCustomerInfoMock);
      try {
        await service.getIndividualCustomerInfo('id');
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getErrorMessage()).toBe(oErr.response.data.error.message);
      }
    });

    it(`should handle when there's error.message`, async () => {
      const oErr = {
        message: 'upstream error',
      };
      const individualCustomerInfoMock = jest.fn().mockReturnValue({
        addCustomHeaders: jest.fn().mockReturnThis(),
        execute: jest.fn().mockRejectedValue(oErr),
      });
      (
        IndividualCustomerApi.getIndividualCustomerApi as jest.Mock
      ).mockImplementation(individualCustomerInfoMock);
      try {
        await service.getIndividualCustomerInfo('id');
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getErrorMessage()).toBe(oErr.message);
      }
    });

    it('should handle when there is no defaultCommunication in oIndividualCustomerInfo', async () => {
      delete IndividualCustomer.defaultCommunication;
      const individualCustomerInfoMock = jest.fn().mockReturnValue({
        addCustomHeaders: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({ value: IndividualCustomer }),
      });
      (
        IndividualCustomerApi.getIndividualCustomerApi as jest.Mock
      ).mockImplementation(individualCustomerInfoMock);
      const oResult = await service.getIndividualCustomerInfo('id');
      expect(oResult.contactNumber).toBe(undefined);
    });
  });
});
