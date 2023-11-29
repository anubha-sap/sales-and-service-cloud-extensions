import { Test, TestingModule } from '@nestjs/testing';
import { RegisteredProductsService } from './registered-products.service';
import { RegisteredProductApi } from './open-api/client/registeredProducts';
import { ServerException } from '../../common/filters/server-exception';
import { REQUEST } from '@nestjs/core';
import { CASE_STATUS, EXTENSION_FIELDS } from '../../common/constants';
import { CustomLogger } from '../../logger/logger.service';
jest.mock('./open-api/client/registeredProducts');

let registeredProductData;

describe('RegisteredProductsService', () => {
  let registeredProductService: RegisteredProductsService;

  const oCase = {
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
  };

  const registeredProductDetail = {
    vehicleNumber: 'KA01MJ5010',
    dateOfPurchase: '2023-04-14T00:00:00Z',
    model: 'TATA Nexon XMA',
  };
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
        RegisteredProductsService,
        {
          provide: REQUEST,
          useValue: requestStub,
        },
        { provide: CustomLogger, useValue: mockCustomLogger },
      ],
    }).compile();

    registeredProductService = module.get<RegisteredProductsService>(
      RegisteredProductsService,
    );

    registeredProductData = {
      value: {
        id: '04e29c42-bcdd-4edb-bf57-ba1b3bd81be2',
        displayId: '33',
        referenceProduct: {
          id: '11edd9f9-9b1d-af8e-afdb-812c72a8c000',
          displayId: 'TNE-1',
          description: 'TATA Nexon XMA',
        },
        referenceDate: '2023-04-14T00:00:00Z',
        serialId: 'TATN001',
        status: 'ACTIVE',
        typeCode: 'REGISTERED_PRODUCT',
        individualCustomer: {
          id: '11edd1df-d226-eaee-afdb-81c759a8c000',
          displayId: '1000253',
          name: 'Anirudh DPP',
        },
        descriptions: [
          {
            content: 'TATA Nexon XMA - Registered',
            languageCode: 'en',
          },
        ],
        description: 'TATA Nexon XMA - Registered',
        address: {
          postalAddress: {
            countryCode: 'IN',
            countryName: 'India',
            stateCode: '30',
            stateName: 'Delhi',
          },
        },
        adminData: {
          createdBy: '1aa96e32-a903-11ec-bad9-dd7b9f38f062',
          createdByName: 'Sandra Webber',
          createdOn: '2023-04-14T11:18:46.135Z',
          updatedBy: 'b2bf0296-cbf2-11ed-b3b3-ff531c3c557c',
          updatedByName: 'Rakesh Kumar',
          updatedOn: '2023-04-17T09:02:01.127Z',
        },
        extensions: {
          [`${EXTENSION_FIELDS.VEHICLE_NUMBER}`]: 'KA01MJ5010',
        },
      },
    };
  });

  afterEach(() => {
    registeredProductData = undefined;
  });

  it('should be defined', () => {
    expect(registeredProductService).toBeDefined();
  });

  describe('getRegisteredProductData', () => {
    it('should get registered product data', async () => {
      jest
        .spyOn(registeredProductService, 'findOne')
        .mockResolvedValue(registeredProductData.value);
      const result = await registeredProductService.getRegisteredProductData(
        oCase,
      );
      expect(result).toStrictEqual(registeredProductDetail);
    });

    it('should handle when there is no vehicle number extension field', async () => {
      delete registeredProductData.value.extensions;
      jest
        .spyOn(registeredProductService, 'findOne')
        .mockResolvedValue(registeredProductData.value);
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
        delete registeredProductData.value.referenceProduct;
        delete registeredProductData.value.referenceDate;
        await registeredProductService.getRegisteredProductData(oCase);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('should handle when there is no referenceDate in oRegisteredProduct', async () => {
      delete registeredProductData.value.referenceDate;
      jest
        .spyOn(registeredProductService, 'findOne')
        .mockResolvedValue(registeredProductData.value);
      const result = await registeredProductService.getRegisteredProductData(
        oCase,
      );
      expect(result.dateOfPurchase).toBe('');
    });

    it('should handle when there is no referenceProduct in oRegisteredProduct', async () => {
      delete registeredProductData.value.referenceProduct;
      jest
        .spyOn(registeredProductService, 'findOne')
        .mockResolvedValue(registeredProductData.value);
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
          execute: jest.fn().mockResolvedValue(registeredProductData),
        });
        (
          RegisteredProductApi.readregisteredproductserviceRegisteredProduct as jest.Mock
        ).mockImplementation(oRegisteredProductApiMock);
        const oResult = await registeredProductService.findOne(regProductId);
        expect(oResult).toStrictEqual(registeredProductData.value);
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
