import { Test, TestingModule } from '@nestjs/testing';
import { ServiceFormService } from './service-form.service';
import { ServicesService } from '../services/service.service';
import { REQUEST } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';
import { DataSource, TypeORMError } from 'typeorm';
import { CasesService } from '../../cns-modules/cases/cases.service';
import { RegisteredProductsService } from '../../cns-modules/registered-products/registered-products.service';
import {
  CASE_STATUS,
  EXTENSION_FIELDS,
  MESSAGES,
} from '../../common/constants';
import { SFStatus } from '../common/enums';
import { ServerException } from '../../common/filters/server-exception';
import { TransactionManager } from '../../database/transaction.manager';
import { InspectionItemsService } from '../inspection-items/inspection-items.service';
import { ServiceFormType } from '../common/interfaces';
import { ServiceFormRepository } from './repository/service-form.repository';
import { ServiceFormResponseDto } from './dto/service-form/response-service-form.dto';
import { AdminDataDto } from '../common/dto/admin-data.dto';
import { CustomLogger } from '../../logger/logger.service';
import { RequestMock } from '../../../test/mock-data/common.mock.data';

describe('ServiceFormService', () => {
  let service: ServiceFormService;
  let oServiceForms;
  let mockServiceFormRepository;
  let mockServicesService;
  let mockCasesService;
  let mockRegisteredProductsService;
  let mockInspectionItemsService;
  let mockI18nService;
  let mockRequest;
  let adminData;
  let oServiceFormsDBResult;
  let mockDataSource;
  let mockCustomLogger;

  beforeEach(async () => {
    mockCustomLogger = {
      setClassName: jest.fn(),
      debug: jest.fn(),
    };
    oServiceForms = [
      {
        id: 'bff7f134-250b-4557-a5ee-150e2e1d6076',
        displayId: 1,
        caseId: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
        caseDisplayId: '536',
        status: SFStatus.Z02,
        registeredProduct: JSON.stringify({
          vehicleNumber: 'KA01MJ5010',
          dateOfPurchase: '2023-04-14T00:00:00Z',
          model: 'TATA Nexon XMA',
        }),
        customerComplaints: JSON.stringify([' ', ' ', ' ', ' ', ' ']),
        milometer: 4863,
        servicesProposed: JSON.stringify([
          {
            id: '87a68c40-85c9-4654-8816-2e0a53b4483d',
            service: 'Change Tyre',
            price: '2499',
            isSelected: true,
          },
          {
            id: 'd68e632d-3a3d-40c4-8428-217f94bf0f03',
            service: 'Brake pad replacement',
            price: '99.99',
            isSelected: true,
          },
          {
            id: '8633d063-6682-4685-bb1f-afde8c759950',
            service: 'Air filter replacement',
            price: '49.99',
            isSelected: false,
          },
          {
            id: 'e3efc3c7-501a-4fac-847d-77a7ef414e6c',
            service: 'Transmission fluid change',
            price: '89.99',
            isSelected: false,
          },
          {
            id: 'de919b3a-0a34-4228-88d6-ec090e960bb4',
            service: 'Coolant flush',
            price: '79.99',
            isSelected: false,
          },
        ]),
        inspectionItems: JSON.stringify([
          {
            id: '29375f72-a7a2-49b8-98f5-fa4adcdc2ba1',
            description: 'Check for toolkit',
            isSelected: false,
          },
          {
            id: 'a4db738c-3efd-4509-8e16-d9016339a1de',
            description: 'Check for any dents',
            isSelected: false,
          },
        ]),
        notes: JSON.stringify([' ', ' ', ' ', ' ', ' ']),
      },
      {
        id: '651e561d-cb7a-44db-9d72-426b7b8455d7',
        displayId: 2,
        caseId: '2bfdd60f-da14-11ed-bf97-bb732c681de4',
        caseDisplayId: '451',
        status: SFStatus.Z02,
        registeredProduct: JSON.stringify({
          vehicleNumber: 'KA53HB4898',
          dateOfPurchase: '2022-08-01T00:00:00Z',
          model: 'AHT Combi 110e',
        }),
        customerComplaints: JSON.stringify(['A2 ', ' ', ' ', ' ', ' ']),
        milometer: 3400,
        servicesProposed: JSON.stringify([
          {
            id: '87a68c40-85c9-4654-8816-2e0a53b4483d',
            service: 'Change Tyre',
            price: '2499',
            isSelected: false,
          },
          {
            id: 'd68e632d-3a3d-40c4-8428-217f94bf0f03',
            service: 'Brake pad replacement',
            price: '99.99',
            isSelected: true,
          },
          {
            id: '8633d063-6682-4685-bb1f-afde8c759950',
            service: 'Air filter replacement',
            price: '49.99',
            isSelected: false,
          },
          {
            id: 'e3efc3c7-501a-4fac-847d-77a7ef414e6c',
            service: 'Transmission fluid change',
            price: '89.99',
            isSelected: false,
          },
          {
            id: 'de919b3a-0a34-4228-88d6-ec090e960bb4',
            service: 'Coolant flush',
            price: '79.99',
            isSelected: false,
          },
        ]),
        inspectionItems: JSON.stringify([
          {
            id: '29375f72-a7a2-49b8-98f5-fa4adcdc2ba1',
            description: 'Check for toolkit',
            isSelected: false,
          },
          {
            id: 'a4db738c-3efd-4509-8e16-d9016339a1de',
            description: 'Check for any dents',
            isSelected: false,
          },
        ]),
        notes: JSON.stringify([' ', ' ', ' ', ' ', ' ']),
      },
    ];
    adminData = new AdminDataDto({
      createdOn: new Date('2023-06-06T10:08:10.829Z'),
      updatedOn: new Date('2023-06-06T10:29:19.686Z'),
      createdBy: '',
      updatedBy: '',
    });

    oServiceFormsDBResult = {
      ...oServiceForms[1],
      ...adminData,
    };

    mockServiceFormRepository = {
      findAllServiceForms: jest.fn(),
      findOneServiceForm: jest.fn(),
      updateServiceForm: jest.fn(),
      delete: jest.fn(),
    };

    mockServicesService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    mockI18nService = {
      translate: jest.fn(),
    };

    mockCasesService = {
      updateCase: jest.fn(),
      getCaseById: jest.fn(),
      getCaseData: jest.fn(),
    };

    mockRequest = {
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

    mockRegisteredProductsService = { getRegisteredProductData: jest.fn() };

    mockInspectionItemsService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    };

    mockDataSource = {
      createQueryRunner: jest.fn().mockReturnThis(),
      connect: jest.fn().mockReturnThis(),
      startTransaction: jest.fn().mockReturnThis(),
      commitTransaction: jest.fn().mockReturnThis(),
      rollbackTransaction: jest.fn().mockReturnThis(),
      release: jest.fn().mockReturnThis(),
      manager: {
        save: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceFormService,
        TransactionManager,
        { provide: I18nService, useValue: mockI18nService },
        {
          provide: CasesService,
          useValue: mockCasesService,
        },
        {
          provide: InspectionItemsService,
          useValue: mockInspectionItemsService,
        },
        {
          provide: ServicesService,
          useValue: mockServicesService,
        },
        {
          provide: RegisteredProductsService,
          useValue: mockRegisteredProductsService,
        },
        {
          provide: ServiceFormRepository,
          useValue: mockServiceFormRepository,
        },
        {
          provide: REQUEST,
          useValue: RequestMock,
        },
        { provide: CustomLogger, useValue: mockCustomLogger },
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    service = module.get<ServiceFormService>(ServiceFormService);
  });

  afterEach(async () => {
    mockRequest =
      mockI18nService =
      oServiceForms =
      mockServiceFormRepository =
      mockServicesService =
      mockCasesService =
      mockRegisteredProductsService =
      mockInspectionItemsService =
        undefined;
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    const sId = 'e0dfacf7-a972-4367-bc9a-d8c4a086a09b';

    it('should be able to findOne service-form', async () => {
      const oServiceFormResult = {
        ...oServiceForms[1],
        adminData,
      };
      try {
        jest
          .spyOn(mockServiceFormRepository, 'findOneServiceForm')
          .mockResolvedValue(oServiceFormResult);
        const oResult = await service.findOne(sId);
        expect(oResult).toStrictEqual(oServiceFormResult);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });
    it('should be able to handle error when getting an service-form', async () => {
      try {
        jest
          .spyOn(mockServiceFormRepository, 'findOneServiceForm')
          .mockRejectedValue(new TypeORMError('Error fetching service-form'));
        await service.findOne(sId);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('findAll', () => {
    const oQuery = {
      caseId: '169cedf0-e7cd-4fab-933a-2bf1393ce642',
    };
    it('should be able to findAll service-forms', async () => {
      try {
        jest
          .spyOn(mockServiceFormRepository, 'findAllServiceForms')
          .mockResolvedValue(oServiceForms);
        const oServideForm = await service.findAll(oQuery);
        expect(oServideForm).toStrictEqual(oServiceForms);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });
    it('should be able to handle error when getting all service-forms', async () => {
      try {
        jest
          .spyOn(mockServiceFormRepository, 'findAllServiceForms')
          .mockRejectedValue(new TypeORMError('Error fetching service-forms'));
        await service.findAll(oQuery);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('create', () => {
    const oRequest = {
      caseId: '0d4b875c-f0ee-4f24-9897-9872e94dc1d4',
      milometer: 4879,
    };
    it('should be able to create service-form', async () => {
      const oGetCaseById = {
        id: '0d4b875c-f0ee-4f24-9897-9872e94dc1d4',
        displayId: '546',
        status: '04',
      };

      const oGetCaseData = {
        nMilometer: 4586,
      };

      const oGetRegisteredProductData = JSON.parse(
        oServiceForms[0].registeredProduct,
      );

      const oGetSuggestedServices = JSON.parse(
        oServiceForms[0].servicesProposed,
      );

      const oInspectionItems = JSON.parse(oServiceForms[0].inspectionItems);
      jest
        .spyOn(mockCasesService, 'getCaseById')
        .mockResolvedValue(oGetCaseById);
      jest
        .spyOn(mockCasesService, 'getCaseData')
        .mockResolvedValue(oGetCaseData);
      jest
        .spyOn(mockRegisteredProductsService, 'getRegisteredProductData')
        .mockResolvedValue(oGetRegisteredProductData);
      jest
        .spyOn(mockInspectionItemsService, 'findAll')
        .mockResolvedValue(oInspectionItems);
      jest
        .spyOn(mockServicesService, 'findAll')
        .mockResolvedValue(oGetSuggestedServices);
      jest
        .spyOn(mockI18nService, 'translate')
        .mockResolvedValue('translatedText');
      jest
        .spyOn(mockDataSource.manager, 'save')
        .mockReturnValue(oServiceFormsDBResult);

      const result = await service.create(oRequest);
      const oMock = ServiceFormResponseDto.toDto(oServiceFormsDBResult);
      delete result.statusDescription;
      expect(result).toEqual(oMock);
    });
    it('should be able to handle error when saving service-form', async () => {
      try {
        jest
          .spyOn(mockCasesService, 'getCaseById')
          .mockRejectedValue('Error getting case data');
        await service.create(oRequest);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
    it('should be able to handle error when updating case', async () => {
      const oGetCaseById = {
        id: '0d4b875c-f0ee-4f24-9897-9872e94dc1d4',
        displayId: '546',
        status: '04',
      };
      const oGetCaseData = {
        nMilometer: 4586,
      };
      const oGetRegisteredProductData = JSON.parse(
        oServiceForms[0].registeredProduct,
      );
      const oGetSuggestedServices = JSON.parse(
        oServiceForms[0].servicesProposed,
      );
      const oInspectionItems = JSON.parse(oServiceForms[0].inspectionItems);
      jest
        .spyOn(mockCasesService, 'getCaseById')
        .mockResolvedValue(oGetCaseById);
      jest
        .spyOn(mockCasesService, 'getCaseData')
        .mockResolvedValue(oGetCaseData);
      jest
        .spyOn(mockRegisteredProductsService, 'getRegisteredProductData')
        .mockResolvedValue(oGetRegisteredProductData);
      jest
        .spyOn(mockInspectionItemsService, 'findAll')
        .mockResolvedValue(oInspectionItems);
      jest
        .spyOn(mockServicesService, 'findAll')
        .mockResolvedValue(oGetSuggestedServices);
      jest
        .spyOn(mockI18nService, 'translate')
        .mockResolvedValue('translatedText');
      jest
        .spyOn(mockDataSource.manager, 'save')
        .mockReturnValue(oServiceFormsDBResult);
      try {
        jest
          .spyOn(mockCasesService, 'updateCase')
          .mockRejectedValue('Error updating case');
        await service.create(oRequest);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('update', () => {
    const sId = 'e0dfacf7-a972-4367-bc9a-d8c4a086a09b';

    it('should be able to update service-form', async () => {
      try {
        const oPatchBody = {
          description: 'Check toolkit items',
          status: SFStatus.Z02,
          servicesProposed: oServiceForms[1].servicesProposed,
          inspectionItems: oServiceForms[1].inspectionItems,
          customerComplaints: oServiceForms[1].customerComplaints,
          notes: oServiceForms[1].notes,
        };
        const dbResult = {
          id: '123',
          ...oServiceForms[1],
          createdOn: '2023-06-06T10:08:10.829Z',
          updatedOn: '2023-06-06T10:29:19.686Z',
          createdBy: '',
          updatedBy: '',
        };
        const oResult = ServiceFormResponseDto.toDto(dbResult);
        jest
          .spyOn(mockServiceFormRepository, 'updateServiceForm')
          .mockResolvedValue(oResult);
        const result = await service.update(sId, oPatchBody);
        expect(result).toEqual(oResult);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });
    it('should be able to handle when no update data is passed', async () => {
      try {
        await service.update(sId, {});
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getErrorMessage()).toBe(MESSAGES.NO_UPDATE_DATA);
      }
    });
    it('should throw NotFoundException when no resource found', async () => {
      try {
        const oPatchBody = {
          description: 'Check toolkit items',
          status: SFStatus.Z02,
          servicesProposed: oServiceForms[1].servicesProposed,
          inspectionItems: oServiceForms[1].inspectionItems,
          customerComplaints: oServiceForms[1].customerComplaints,
          notes: oServiceForms[1].notes,
        };
        jest
          .spyOn(mockServiceFormRepository, 'updateServiceForm')
          .mockResolvedValue({ affected: 0 });
        await service.update(sId, oPatchBody);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getError().getStatus()).toBe(404);
      }
    });
  });

  describe('remove', () => {
    const oDeleteResponse = {
      raw: [],
      affected: 1,
    };
    const sId = 'e0dfacf7-a972-4367-bc9a-d8c4a086a09b';
    it('should be able to remove a service-form', async () => {
      try {
        jest
          .spyOn(mockServiceFormRepository, 'delete')
          .mockResolvedValue(oDeleteResponse);
        const oResponse = await service.remove(sId);
        expect(oResponse).toStrictEqual(oDeleteResponse);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });
    it('should throw NotFoundException when no resource found', async () => {
      try {
        jest.spyOn(mockServiceFormRepository, 'delete').mockResolvedValue({
          affected: 0,
        });
        await service.remove(sId);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getError().getStatus()).toBe(404);
      }
    });
    it('should be able to handle error when removing a service-form', async () => {
      try {
        jest
          .spyOn(mockServiceFormRepository, 'delete')
          .mockRejectedValue(new TypeORMError('Error deleting service-form'));
        await service.remove(sId);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('getServiceFormInfo', () => {
    let oRequest;
    let oGetCaseById;
    let oGetCaseData;

    beforeEach(async () => {
      oRequest = {
        caseId: '0d4b875c-f0ee-4f24-9897-9872e94dc1d4',
        milometer: 4879,
      };
      oGetCaseById = {
        id: '0d4b875c-f0ee-4f24-9897-9872e94dc1d4',
        displayId: '546',
        status: '04',
      };
      oGetCaseData = {
        nMilometer: 4586,
      };
    });

    afterEach(async () => {
      oRequest = oGetCaseById = oGetCaseData = undefined;
    });

    it('should get service form info', async () => {
      try {
        const oGetRegisteredProductData = JSON.parse(
          oServiceForms[0].registeredProduct,
        );
        const oGetSuggestedServices = JSON.parse(
          oServiceForms[0].servicesProposed,
        );
        const oInspectionItems = JSON.parse(oServiceForms[0].inspectionItems);

        const oResult: ServiceFormType = {
          caseId: oGetCaseById.id,
          caseDisplayId: oGetCaseById.displayId,
          status: SFStatus.Z01,
          milometer: oRequest.milometer,
          registeredProduct: oGetRegisteredProductData,
          inspectionItems: oInspectionItems,
          servicesProposed: oGetSuggestedServices,
        };
        jest
          .spyOn(mockCasesService, 'getCaseById')
          .mockResolvedValue(oGetCaseById);
        jest
          .spyOn(mockRegisteredProductsService, 'getRegisteredProductData')
          .mockResolvedValue(oGetRegisteredProductData);
        jest
          .spyOn(mockInspectionItemsService, 'findAll')
          .mockResolvedValue(oInspectionItems);
        jest
          .spyOn(mockServicesService, 'findAll')
          .mockResolvedValue(oGetSuggestedServices);

        const oServiceFormInfo = await service.getServiceFormInfo(oRequest);
        expect(oServiceFormInfo).toStrictEqual(oResult);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should handle when no inspection-items has bee selected', async () => {
      try {
        const oGetRegisteredProductData = JSON.parse(
          oServiceForms[0].registeredProduct,
        );
        const oGetSuggestedServices = JSON.parse(
          oServiceForms[0].servicesProposed,
        );

        jest
          .spyOn(mockCasesService, 'getCaseById')
          .mockResolvedValue(oGetCaseById);
        jest
          .spyOn(mockRegisteredProductsService, 'getRegisteredProductData')
          .mockResolvedValue(oGetRegisteredProductData);
        jest.spyOn(mockInspectionItemsService, 'findAll').mockResolvedValue([]);
        jest
          .spyOn(mockServicesService, 'findAll')
          .mockResolvedValue(oGetSuggestedServices);

        await service.getServiceFormInfo(oRequest);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getError().message).toBe(
          MESSAGES.NO_INSPECTION_ITEMS_AVAILABLE,
        );
      }
    });

    it('should get service form info', async () => {
      try {
        const oGetRegisteredProductData = JSON.parse(
          oServiceForms[0].registeredProduct,
        );
        const oInspectionItems = JSON.parse(oServiceForms[0].inspectionItems);

        jest
          .spyOn(mockCasesService, 'getCaseById')
          .mockResolvedValue(oGetCaseById);
        jest
          .spyOn(mockRegisteredProductsService, 'getRegisteredProductData')
          .mockResolvedValue(oGetRegisteredProductData);
        jest
          .spyOn(mockInspectionItemsService, 'findAll')
          .mockResolvedValue(oInspectionItems);
        jest.spyOn(mockServicesService, 'findAll').mockResolvedValue([]);

        await service.getServiceFormInfo(oRequest);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getError().message).toBe(MESSAGES.NO_SERVICES_AVAILABLE);
      }
    });

    it('should handle error', async () => {
      const sErrMsg = 'Error getting case data';
      try {
        jest.spyOn(mockCasesService, 'getCaseById').mockRejectedValue(sErrMsg);
        await service.getServiceFormInfo(oRequest);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getError()).toBe(sErrMsg);
      }
    });

    it('should throw error when case is completed ', async () => {
      oGetCaseById.status = CASE_STATUS.COMPLETED;
      try {
        jest
          .spyOn(mockCasesService, 'getCaseById')
          .mockResolvedValue(oGetCaseById);
        await service.getServiceFormInfo(oRequest);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getError().message).toBe(MESSAGES.CASE_COMPLETED);
      }
    });

    it('should get milometer from case data when its not passed in function parameters', async () => {
      delete oRequest.milometer;
      try {
        const oGetRegisteredProductData = JSON.parse(
          oServiceForms[0].registeredProduct,
        );
        const oGetSuggestedServices = JSON.parse(
          oServiceForms[0].servicesProposed,
        );
        const oInspectionItems = JSON.parse(oServiceForms[0].inspectionItems);

        const oResult: ServiceFormType = {
          caseId: oGetCaseById.id,
          caseDisplayId: oGetCaseById.displayId,
          status: SFStatus.Z01,
          milometer: oGetCaseData.nMilometer,
          registeredProduct: oGetRegisteredProductData,
          inspectionItems: oInspectionItems,
          servicesProposed: oGetSuggestedServices,
        };

        jest
          .spyOn(mockCasesService, 'getCaseById')
          .mockResolvedValue(oGetCaseById);
        jest
          .spyOn(mockCasesService, 'getCaseData')
          .mockResolvedValue(oGetCaseData);
        jest
          .spyOn(mockRegisteredProductsService, 'getRegisteredProductData')
          .mockResolvedValue(oGetRegisteredProductData);
        jest
          .spyOn(mockInspectionItemsService, 'findAll')
          .mockResolvedValue(oInspectionItems);
        jest
          .spyOn(mockServicesService, 'findAll')
          .mockResolvedValue(oGetSuggestedServices);

        const oServiceFormInfo = await service.getServiceFormInfo(oRequest);
        expect(oServiceFormInfo).toStrictEqual(oResult);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should throw error when there is no milometer reading in the request as well as in case data', async () => {
      delete oRequest.milometer;
      delete oGetCaseData.nMilometer;
      try {
        jest
          .spyOn(mockCasesService, 'getCaseById')
          .mockResolvedValue(oGetCaseById);
        jest
          .spyOn(mockCasesService, 'getCaseData')
          .mockResolvedValue(oGetCaseData);
        await service.getServiceFormInfo(oRequest);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getError().message).toBe(MESSAGES.NO_MILOMETER_IN_CASE);
      }
    });
  });

  describe('getSuggestedServices', () => {
    it('should fetch services from DB based on milometer reading', async () => {
      try {
        jest
          .spyOn(mockServicesService, 'findAll')
          .mockResolvedValue(JSON.parse(oServiceForms[0].servicesProposed));
        const oResult = await service.getSuggestedServices(4000);
        expect(oResult).toStrictEqual(
          JSON.parse(oServiceForms[0].servicesProposed),
        );
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should handle error when fetching services', async () => {
      try {
        jest
          .spyOn(mockServicesService, 'findAll')
          .mockRejectedValue(new TypeORMError('Error while fetching services'));
        await service.getSuggestedServices(4000);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  /*   describe('findAllStatus', () => {
    const mockResult = [
      { code: 'Z01', description: 'translatedText' },
      { code: 'Z02', description: 'translatedText' },
    ];
    it('should return statuses', async () => {
      try {
        jest
          .spyOn(mockI18nService, 'translate')
          .mockResolvedValue('translatedText');
        const oResult = await service.findAllStatus();
        expect(oResult).toStrictEqual(mockResult);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should handle error when gettings statuses', async () => {
      const err = 'Error while translating';
      try {
        jest
          .spyOn(mockI18nService, 'translate')
          .mockRejectedValue(new Error(err));
        await service.findAllStatus();
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getError().message).toBe(err);
      }
    });
  });
 */
  describe('fetchServicesAndInspectionItems', () => {
    let oInspectionItem;
    let oService;

    beforeEach(() => {
      oInspectionItem = {
        id: '159f0e5d-14cd-41dc-8b03-2603caea8e98',
        description: 'Check for any dents',
        isSelected: false,
        createdOn: '2023-08-07T05:26:21.656Z',
        updatedOn: '2023-08-07T05:26:21.656Z',
        createdBy: '',
        updatedBy: '',
      };
      oService = {
        id: 'cafe0406-708c-4d19-89bb-c637401af5b5',
        service: 'Oil change',
        price: '2499',
        minMileage: 5000,
        maxMileage: 10000,
        isSelected: false,
        createdOn: '2023-08-07T05:25:10.329Z',
        updatedOn: '2023-08-07T05:25:10.329Z',
        createdBy: '',
        updatedBy: '',
      };
    });
    afterEach(() => {
      oInspectionItem = oService;
    });

    it('should fetch services and inspection items from db', async () => {
      jest.spyOn(mockServicesService, 'findOne').mockResolvedValue(oService);
      jest
        .spyOn(mockInspectionItemsService, 'findOne')
        .mockResolvedValue(oInspectionItem);
      const oUpdateServiceFormDto = {
        servicesProposed: [
          {
            id: 'cafe0406-708c-4d19-89bb-c637401af5b5',
            isSelected: true,
            service: 'Oil change',
            price: '2499',
          },
        ],
        inspectionItems: [
          {
            id: '159f0e5d-14cd-41dc-8b03-2603caea8e98',
            isSelected: true,
            description: 'Check for any dents',
          },
        ],
      };

      const oUpdatedServiceForm = {
        servicesProposed: [
          {
            id: 'cafe0406-708c-4d19-89bb-c637401af5b5',
            isSelected: true,
            service: 'Oil change',
            price: '2499',
          },
        ],
        inspectionItems: [
          {
            id: '159f0e5d-14cd-41dc-8b03-2603caea8e98',
            isSelected: true,
            description: 'Check for any dents',
          },
        ],
      };
      const oResult = await service.fetchServicesAndInspectionItems(
        oUpdateServiceFormDto,
      );
      expect(oResult).toStrictEqual(oUpdatedServiceForm);
    });

    it(`should handle when there's an error`, async () => {
      try {
        jest
          .spyOn(mockServicesService, 'findOne')
          .mockRejectedValue(new ServerException({}, 'testClass', 'testFun'));
        const oUpdateServiceFormDto = {
          servicesProposed: [
            {
              id: 'cafe0406-708c-4d19-89bb-c637401af5b5',
              isSelected: true,
              service: 'Oil change',
              price: '2499',
            },
            {
              id: 'f310487d-126d-4318-8cf0-567bb2fd27a3',
              isSelected: true,
              service: 'Tyre change',
              price: '3499',
            },
          ],
        };
        await service.fetchServicesAndInspectionItems(oUpdateServiceFormDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });
});
