import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { IndividualCustomerApi } from './open-api/client/individual-customer/individual-customer-api';
import { AccountsApi } from './open-api/client/account/account-api';
import { ServerException } from '../../common/filters/server-exception';
import { REQUEST } from '@nestjs/core';
import { CASE_STATUS, EXTENSION_FIELDS } from '../../common/constants';
import { CustomLogger } from '../../logger/logger.service';
jest.mock('./open-api/client/individual-customer/individual-customer-api');
jest.mock('./open-api/client/account/account-api');

const mockCustomLogger = {
  setClassName: jest.fn(),
  debug: jest.fn(),
};
const requestStub = {
  session: {
    userToken: 'token',
    userId: 'uId',
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

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: REQUEST,
          useValue: requestStub,
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
    let oAccountData;
    beforeEach(() => {
      oAccountData = {
        value: {
          defaultCommunication: {
            phoneFormattedNumber: '+915348679512',
          },
          lifeCycleStatus: 'ACTIVE',
          isProspect: false,
          customerRole: 'CRM000',
          formattedName: 'AHT Japan',
          isNaturalPerson: false,
          blockingReasons: {
            isSalesSupportBlocked: false,
          },
          firstLineName: 'AHT Japan',
          adminData: {
            createdOn: '2012-10-19T10:36:57.436618Z',
            createdBy: '00163e03-5535-1ed2-86b5-ade623a5da5b',
            updatedOn: '2012-10-19T10:59:51.282647Z',
            updatedBy: '00163e03-5535-1ed2-86b5-ade623a5da5b',
          },
          id: '00163e03-63a4-1ed2-86b9-666190d99637',
          displayId: 'MC90099',
          isBusinessPurposeCompleted: false,
          defaultAddress: {
            country: 'JP',
            postalCode: '15370002',
            cityName: 'Osaka',
            streetName: 'Fukaeminami 2cho-me',
            houseId: '8-35',
            isPostOfficeBoxAddress: false,
            countryDescription: 'Japan',
          },
          addresses: [
            {
              isDefaultAddress: true,
              country: 'JP',
              cityName: 'Osaka',
              streetName: 'Fukaeminami 2cho-me',
              houseId: '8-35',
              postalCode: '15370002',
              isPostOfficeBoxAddress: false,
              id: '00163e03-5535-1ee2-86bb-1c8cd7ce8744',
              parentId: '00163e03-63a4-1ed2-86b9-666190d99637',
              addressId: '00163e03-5535-1ee2-86bb-1c8cd7cee744',
              countryDescription: 'Japan',
            },
          ],
          lifeCycleStatusDescription: 'Active',
          customerRoleDescription: 'Customer',
        },
      };
    });
    afterEach(() => {
      oAccountData = undefined;
    });
    it('should return accountInfo', async () => {
      const accountServiceMock = jest.fn().mockReturnValue({
        addCustomHeaders: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(oAccountData),
      });
      (AccountsApi.getAccountsApi as jest.Mock).mockImplementation(
        accountServiceMock,
      );
      const oAccountInfo = await service.getAccountInfo('id');
      expect(oAccountInfo.contactNumber).toBe(
        oAccountData.value.defaultCommunication.phoneFormattedNumber,
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
          oAccountData.value.defaultCommunication.phoneFormattedNumber,
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
          oAccountData.value.defaultCommunication.phoneFormattedNumber,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getErrorMessage()).toBe(oErr.message);
      }
    });

    it('should handle when there is no defaultCommunication in oAccountInfo', async () => {
      delete oAccountData.value.defaultCommunication;
      const accountServiceMock = jest.fn().mockReturnValue({
        addCustomHeaders: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(oAccountData),
      });
      (AccountsApi.getAccountsApi as jest.Mock).mockImplementation(
        accountServiceMock,
      );
      const oAccountInfo = await service.getAccountInfo('id');
      expect(oAccountInfo.contactNumber).toBe(undefined);
    });
  });

  describe('getIndividualCustomerInfo', () => {
    let oIndividualCustomerInfo;
    beforeEach(() => {
      oIndividualCustomerInfo = {
        value: {
          lifeCycleStatus: 'ACTIVE',
          isProspect: false,
          customerRole: 'CRM000',
          formattedName: 'Andrew Jonas',
          givenName: 'Andrew',
          familyName: 'Jonas',
          gender: '0',
          nonVerbalCommunicationLanguage: 'en',
          blockingReasons: {
            isSalesSupportBlocked: false,
          },
          adminData: {
            createdOn: '2023-04-13T13:19:13.225Z',
            createdBy: '1aa96e32-a903-11ec-bad9-dd7b9f38f062',
            createdByName: 'Sandra Webber',
            updatedOn: '2023-05-17T14:25:36.916Z',
            updatedBy: '1aa96e32-a903-11ec-bad9-dd7b9f38f062',
            updatedByName: 'Sandra Webber',
          },
          id: '11edd9fd-c87a-182e-afdb-812c72a8c000',
          displayId: '1000290',
          isBusinessPurposeCompleted: false,
          addresses: [
            {
              isDefaultAddress: true,
              country: 'IN',
              region: {
                country: 'IN',
                region: '10',
              },
              cityName: 'bengaluru',
              streetName: 'Mallya street',
              houseId: '12',
              postalCode: '560066',
              formattedPostalAddressDescription:
                '12 Mallya street / bengaluru 560066 / IN',
              phoneFormattedNumber: '+91 9999990012',
              phoneNormalisedNumber: '+919999990012',
              mobileFormattedNumber: '+91 9999990012',
              mobileNormalisedNumber: '+919999990012',
              id: '11edd9fd-c87a-8d5e-afdb-812c72a8c000',
              parentId: '11edd9fd-c87a-182e-afdb-812c72a8c000',
              addressId: '11edd9fd-c87a-b46e-afdb-812c72a8c000',
              countryDescription: 'India',
              regionDescription: 'Karnataka',
            },
          ],
          defaultAddress: {
            country: 'IN',
            region: {
              country: 'IN',
              region: '10',
            },
            postalCode: '560066',
            cityName: 'bengaluru',
            streetName: 'Mallya street',
            houseId: '12',
            formattedPostalAddressDescription:
              '12 Mallya street / bengaluru 560066 / IN',
            countryDescription: 'India',
            regionDescription: 'Karnataka',
          },
          defaultCommunication: {
            phoneFormattedNumber: '+91 9999990012',
            phoneNormalisedNumber: '+919999990012',
            mobileFormattedNumber: '+91 9999990012',
            mobileNormalisedNumber: '+919999990012',
          },
          lifeCycleStatusDescription: 'Active',
          customerRoleDescription: 'Customer',
          genderDescription: 'Gender not known',
          nonVerbalCommunicationLanguageDescription: 'English',
        },
      };
    });
    afterEach(() => {
      oIndividualCustomerInfo = undefined;
    });
    it('should return accountInfo', async () => {
      const individualCustomerInfoMock = jest.fn().mockReturnValue({
        addCustomHeaders: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(oIndividualCustomerInfo),
      });
      (
        IndividualCustomerApi.getIndividualCustomerApi as jest.Mock
      ).mockImplementation(individualCustomerInfoMock);
      const oResult = await service.getIndividualCustomerInfo('id');
      expect(oResult.contactNumber).toBe(
        oIndividualCustomerInfo.value.defaultCommunication
          .mobileFormattedNumber,
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
      delete oIndividualCustomerInfo.value.defaultCommunication;
      const individualCustomerInfoMock = jest.fn().mockReturnValue({
        addCustomHeaders: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue(oIndividualCustomerInfo),
      });
      (
        IndividualCustomerApi.getIndividualCustomerApi as jest.Mock
      ).mockImplementation(individualCustomerInfoMock);
      const oResult = await service.getIndividualCustomerInfo('id');
      expect(oResult.contactNumber).toBe(undefined);
    });
  });
});
