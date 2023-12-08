import { Test, TestingModule } from '@nestjs/testing';
import { JobCardService } from './job-card.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ServiceFormService } from '../service-form/service-form.service';
import { REQUEST } from '@nestjs/core';
import { I18nService } from 'nestjs-i18n';
import { CasesService } from '../../cns-modules/cases/cases.service';
import { CustomerService } from '../../cns-modules/customer/customer.service';
import {
  ENTITY_NAME,
  MESSAGES,
  CASE_TYPE,
  CASE_STATUS,
  CUSTOM_LOGIC_ERROR_CODE,
  EXTENSION_FIELDS,
} from '../../common/constants';
import { ServiceStatus, SFStatus, SourceType } from '../common/enums';
import { ServerException } from '../../common/filters/server-exception';
import { TransactionManager } from '../../database/transaction.manager';
import { UtilsService } from '../../utils/utils.service';
import { ServiceForm } from '../service-form/entities/service-form.entity';
import { UpdateJobCardDto } from './dto/job-card/update-job-card.dto';
import { JobCardServiceRepository } from './repository/job-card-services.repository';
import { JobCardRepository } from './repository/job-card.repository';
import { JobCardResponseDto } from './dto/job-card/response-job-card.dto';
import { DataSource } from 'typeorm';
import { CustomLogger } from '../../logger/logger.service';

describe('VehicleServiceService', () => {
  let jobCardService: JobCardService;
  let jobCards;
  let caseEntity;
  let jobCardServices;
  let mockJobCardServicesRepository;
  let mockJobCardRepository;
  let mockUtilsService;
  let mockRequest;
  let mockI18nService;
  let mockServiceFormService;
  let oServiceForms;
  let mockServiceFormRepository;
  let oCustomerData;
  let mockCustomerService;
  let mockCaseService;
  let oCase;
  let caseData;
  let adminData;
  let jobCardDBResult;
  let mockDataSource;
  let mockCustomLogger;

  beforeEach(async () => {
    mockUtilsService = {
      getCustomLogicErrorDetails: jest.fn((error, target, message) => {
        return [
          {
            code: `${CUSTOM_LOGIC_ERROR_CODE.CASE_SERVICE}.${target}`,
            message: message,
            target: `caseId/${target}`,
          },
        ];
      }),
    };
    jobCards = [
      {
        id: '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177',
        displayId: 1,
        caseId: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
        caseDisplayId: '536',
        status: 'COMPLETED',
        statusDescription: 'translatedText',
        registeredProduct: JSON.stringify({
          vehicleNumber: 'KA01MJ5010',
          dateOfPurchase: '2023-04-14T00:00:00Z',
          model: 'TATA Nexon XMA',
        }),
        customerComplaints: JSON.stringify([' ', ' ', ' ', ' ', ' ']),
        milometer: 4863,
        serviceAdvisor: 'Sandra Webber',
        customerDetails: JSON.stringify({
          name: 'Andrew Jonas',
          contactNumber: '1234567890',
        }),
        estimatedCompletionDate: '2023-05-10T11:55:47.397Z',
        //createdOn: '2023-05-08T11:55:47.410Z',
        servicesSelected: [
          {
            id: 'a9643834-b16f-4bd8-81e7-3e9ff0ebed81',
            service: 'Brake pad replacement',
            price: '99.99',
            technician: 'Sandra',
            status: 'Z23',
            startTime: '2023-05-08T11:58:27.609Z',
            endTime: '2023-05-08T11:58:41.288Z',
            notes: null,
            observation: null,
            statusDescription: 'translatedText',
          },
          {
            id: 'c4b45224-db39-47ed-9ea5-50dc9cee9162',
            service: 'Change Tyre',
            price: '2499',
            technician: 'Peter',
            status: 'Z23',
            startTime: '2023-05-08T11:58:00.516Z',
            endTime: '2023-05-08T11:58:49.673Z',
            notes: null,
            observation: null,
            statusDescription: 'translatedText',
          },
        ],
      },
      {
        id: 'c7e9469a-1b6b-42c6-9580-28ed4a994346',
        displayId: 2,
        caseId: '2bfdd60f-da14-11ed-bf97-bb732c681de4',
        caseDisplayId: '451',
        status: 'COMPLETED',
        statusDescription: 'translatedText',
        registeredProduct: JSON.stringify({
          vehicleNumber: 'KA53HB4898',
          dateOfPurchase: '2022-08-01T00:00:00Z',
          model: 'AHT Combi 110e',
        }),
        customerComplaints: JSON.stringify(['A2 ', ' ', ' ', ' ', ' ']),
        milometer: 3400,
        serviceAdvisor: 'Sandra Webber',
        customerDetails: JSON.stringify({
          name: 'Andrew Jonas',
          contactNumber: '1234567890',
        }),
        estimatedCompletionDate: '2023-05-10T12:05:34.072Z',
        // createdOn: '2023-05-08T12:05:34.079Z',
        servicesSelected: [
          {
            id: 'a9cd57cd-f61a-4d7f-9f87-dc031d5b95fb',
            service: 'Brake pad replacement',
            price: '99.99',
            technician: 'Sandra',
            status: 'Z23',
            startTime: '2023-05-08T12:23:46.884Z',
            endTime: '2023-05-08T12:24:05.845Z',
            notes: 'iyiy',
            observation: 'fdasf',
            statusDescription: 'translatedText',
          },
        ],
      },
    ];

    caseEntity = {
      entity: ENTITY_NAME.CASE.replace('.crm.', '.ssc.'),
      currentImage: {
        id: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
        subject: 'sbsws test vehicle case',
        priority: '03',
        origin: 'MANUAL_DATA_ENTRY',
        caseType: CASE_TYPE.VEHICLE_SERVICE_REQUEST,
        statusSchema: 'Z1',
        status: CASE_STATUS.COMPLETED,
        escalationStatus: 'NOT_ESCALATED',
        isRecommendedCommunicationLanguage: false,
        processor: {
          id: '11eccc06-510b-a8ee-afdb-81c341010a00',
          displayId: '8000000009',
          isDeleted: false,
          partyRoleCategory: 'PROCESSOR',
          partyRole: '40',
          addressId: '11eccc06-510c-6c3e-afdb-81c341010a00',
          determinationMethodCode: 13,
          isMain: true,
          partyType: 'EMPLOYEE',
        },
        reporter: {
          id: '11eccc65-79ad-fc8e-afdb-81c341010a00',
          displayId: '8000000010',
          isDeleted: false,
          partyRoleCategory: 'REPORTER',
          partyRole: '214',
          addressId: '11eccc65-79af-aa3e-afdb-81c341010a00',
          determinationMethodCode: 3,
          isMain: true,
          partyType: 'EMPLOYEE',
        },
        timePoints: {
          reportedOn: '2023-06-21T11:58:00Z',
          assignedToProcessorOn: '2023-06-21T11:58:47.608522760Z',
        },
        isRecommendedCategory: false,
        isEndOfPurpose: false,
        isDepersonalized: false,
        isRead: false,
        isIrrelevant: false,
        accessControlEntries: [
          '11eccc06-510b-a8ee-afdb-81c341010a00',
          '11eccc65-79ad-fc8e-afdb-81c341010a00',
          '9808336e-cc65-11ec-980b-7f14df82f69b',
          '11eccc65-79ad-fc8e-afdb-81c341010a00',
        ],
        adminData: {
          createdOn: '2023-06-21T11:58:46.985179524Z',
          createdBy: '9808336e-cc65-11ec-980b-7f14df82f69b',
          updatedOn: '2023-06-21T11:58:46.985179524Z',
          updatedBy: '9808336e-cc65-11ec-980b-7f14df82f69b',
        },
      },
    };

    jobCardServices = [
      {
        id: 'a9643834-b16f-4bd8-81e7-3e9ff0ebed81',
        service: 'Brake pad replacement',
        price: '99.99',
        technician: 'Sandra',
        status: ServiceStatus.Z22,
        startTime: '2023-05-08T11:58:27.609Z',
        endTime: '2023-05-08T11:58:41.288Z',
        notes: null,
        observation: null,
      },
      {
        id: 'c4b45224-db39-47ed-9ea5-50dc9cee9162',
        service: 'Change Tyre',
        price: '2499',
        technician: 'Peter',
        status: ServiceStatus.Z23,
        startTime: '2023-05-08T11:58:00.516Z',
        endTime: '2023-05-08T11:58:49.673Z',
        notes: null,
        observation: null,
      },
    ];

    oServiceForms = [
      {
        id: 'bff7f134-250b-4557-a5ee-150e2e1d6076',
        displayId: 1,
        caseId: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
        caseDisplayId: '536',
        status: SFStatus.Z02,
        registeredProduct: {
          vehicleNumber: 'KA01MJ5010',
          dateOfPurchase: '2023-04-14T00:00:00Z',
          model: 'TATA Nexon XMA',
        },
        customerComplaints: [' ', ' ', ' ', ' ', ' '],
        milometer: 4863,
        servicesProposed: [
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
        ],
        inspectionItems: [
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
        ],
        notes: [' ', ' ', ' ', ' ', ' '],
      },
    ];

    oCustomerData = {
      name: 'John Doe',
      contactNumber: '1234567890',
    };
    adminData = {
      createdOn: '2023-06-06T10:08:10.829Z',
      updatedOn: '2023-06-06T10:29:19.686Z',
      createdBy: '',
      updatedBy: '',
    };
    jobCardDBResult = {
      ...jobCards[0],
      createdOn: '2023-06-06T10:08:10.829Z',
      updatedOn: '2023-06-06T10:29:19.686Z',
      createdBy: '',
      updatedBy: '',
    };

    jobCardDBResult.servicesSelected[0] = {
      ...jobCardDBResult.servicesSelected[0],
      createdOn: '2023-06-06T10:08:10.829Z',
      updatedOn: '2023-06-06T10:29:19.686Z',
      createdBy: '',
      updatedBy: '',
    };
    jobCardDBResult.servicesSelected[1] = {
      ...jobCardDBResult.servicesSelected[1],
      createdOn: '2023-06-06T10:08:10.829Z',
      updatedOn: '2023-06-06T10:29:19.686Z',
      createdBy: '',
      updatedBy: '',
    };

    const oCases = {
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

    caseData = {
      sProcessor: 'Pavithra N',
      nMilometer: 4863,
      sEstimatedCompletionDate: '2023-05-16T11:52:00Z',
      sCustomerName: '. Ind Customer with ID',
      sCaseDisplayId: 'CR64',
    };

    mockCustomerService = {
      getAccountInfo: jest.fn(),
      getIndividualCustomerInfo: jest.fn(),
    };
    mockJobCardServicesRepository = {
      findAllJobCardServices: jest.fn(() => {
        return jobCardServices;
      }),
      findOne: jest.fn((id) => {
        return jobCardServices[0];
      }),
    };
    mockJobCardRepository = {
      findAllJobCards: jest.fn((arg) => {
        let jobCardWithCaseId = false;
        if (arg && arg.caseId) {
          jobCardWithCaseId = jobCards.find(
            (item) => item.caseId === arg.caseId,
          );
          if (!jobCardWithCaseId) {
            return jobCardWithCaseId;
          }
          return [jobCardWithCaseId];
        }
        return jobCards;
      }),
      findOneJobCard: jest.fn((id) => {
        return jobCardDBResult;
      }),
      updateJobCard: jest.fn().mockImplementation((jobCardDto) => {
        return Promise.resolve({ id: '444', ...jobCardDto });
      }),
      delete: jest.fn().mockImplementation((id) => ({
        ...id,
      })),
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
    mockI18nService = {
      translate: jest.fn(),
    };

    mockServiceFormService = {
      findOne: jest.fn(),
    };

    mockServiceFormRepository = {
      findOneBy: jest.fn(),
    };
    mockCaseService = {
      getCaseById: jest.fn(),
      getCaseData: jest.fn(),
      updateCase: jest.fn(),
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
        update: jest.fn(),
      },
    };
    mockCustomLogger = {
      setClassName: jest.fn(),
      debug: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobCardService,
        TransactionManager,
        { provide: ServiceFormService, useValue: mockServiceFormService },
        {
          provide: CasesService,
          useValue: mockCaseService,
        },
        { provide: CustomerService, useValue: mockCustomerService },
        {
          provide: getRepositoryToken(ServiceForm),
          useValue: mockServiceFormRepository,
        },
        {
          provide: JobCardServiceRepository,
          useValue: mockJobCardServicesRepository,
        },
        {
          provide: JobCardRepository,
          useValue: mockJobCardRepository,
        },
        {
          provide: UtilsService,
          useValue: mockUtilsService,
        },
        {
          provide: REQUEST,
          useValue: mockRequest,
        },
        { provide: CustomLogger, useValue: mockCustomLogger },
        {
          provide: I18nService,
          useValue: mockI18nService,
        },
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    jobCardService = module.get<JobCardService>(JobCardService);
  });

  afterEach(async () => {
    jobCards =
      caseEntity =
      mockRequest =
      mockUtilsService =
      mockI18nService =
      jobCardServices =
      jobCardDBResult =
      mockJobCardServicesRepository =
      mockJobCardRepository =
        undefined;
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(jobCardService).toBeDefined();
  });

  it('findAll: should return all job cards', async () => {
    jest
      .spyOn(mockJobCardRepository, 'findAllJobCards')
      .mockResolvedValue([jobCards[0]]);
    jest.spyOn(mockCaseService, 'getCaseById').mockResolvedValue(oCase);
    jest.spyOn(mockCaseService, 'getCaseData').mockReturnValue(caseData);
    const res = await jobCardService.findAll(
      {
        caseId: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
      },
      true,
    );
    expect(res).toEqual([jobCards[0]]);
    expect(mockJobCardRepository.findAllJobCards).toHaveBeenCalled();
  });

  it('findAll: should return error', async () => {
    try {
      jest
        .spyOn(mockJobCardRepository, 'findAllJobCards')
        .mockRejectedValue({});
      await jobCardService.findAll({
        caseId: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(ServerException);
    }
  });

  it('should return entity data', async () => {
    jest.spyOn(mockCaseService, 'getCaseById').mockResolvedValue(oCase);
    jest.spyOn(mockCaseService, 'getCaseData').mockReturnValue(caseData);
    const res = await jobCardService.findValidationStatusService(caseEntity);
    expect(res).toEqual({
      data: caseEntity.currentImage,
      info: [],
      error: [],
    });
    expect(mockJobCardRepository.findAllJobCards).toHaveBeenCalled();
  });

  it('findValidationStatusService should handle case status is closed', async () => {
    jest.spyOn(mockCaseService, 'getCaseById').mockResolvedValue(oCase);
    jest.spyOn(mockCaseService, 'getCaseData').mockReturnValue(caseData);
    caseEntity.currentImage = caseEntity.currentImage;
    caseEntity.currentImage.status = CASE_STATUS.CLOSED;
    caseEntity.currentImage = caseEntity.currentImage;
    const res = await jobCardService.findValidationStatusService(caseEntity);
    expect(res).toEqual({
      data: caseEntity.currentImage,
      info: [],
      error: [],
    });
    expect(mockJobCardRepository.findAllJobCards).toHaveBeenCalled();
  });

  it('findValidationStatusService should handle case status is SERVICE_COMPLETED', async () => {
    jest.spyOn(mockCaseService, 'getCaseById').mockResolvedValue(oCase);
    jest.spyOn(mockCaseService, 'getCaseData').mockReturnValue(caseData);
    caseEntity.currentImage = caseEntity.currentImage;
    caseEntity.currentImage.status = CASE_STATUS.SERVICE_COMPLETED;
    caseEntity.currentImage = caseEntity.currentImage;
    const res = await jobCardService.findValidationStatusService(caseEntity);
    expect(res).toEqual({
      data: caseEntity.currentImage,
      info: [],
      error: [],
    });
    expect(mockJobCardRepository.findAllJobCards).toHaveBeenCalled();
  });

  it('should return entity data when no case ID', async () => {
    const oData = caseEntity.currentImage;
    // No case ID
    oData.id = '';
    caseEntity.currentImage = oData;
    const res = await jobCardService.findValidationStatusService(caseEntity);
    expect(res).toEqual({
      data: caseEntity.currentImage,
      info: [],
      error: [],
    });
    expect(mockJobCardRepository.findAllJobCards).not.toHaveBeenCalled();
  });

  it('should return entity data when wrong entity', async () => {
    caseEntity.entity = 'test';
    const res = await jobCardService.findValidationStatusService(caseEntity);
    expect(res).toEqual({
      data: caseEntity.currentImage,
      info: [],
      error: [],
    });
    expect(mockJobCardRepository.findAllJobCards).not.toHaveBeenCalled();
  });

  it('should return entity data and error when wrong case ID', async () => {
    const oData = caseEntity.currentImage;
    // Wrong case ID
    oData.id = 'd886b468-ed95-11ed-a6bd-4354a6389ba1';
    caseEntity.currentImage = oData;
    jest.spyOn(mockJobCardRepository, 'findAllJobCards').mockResolvedValue([]);
    const res = await jobCardService.findValidationStatusService(caseEntity);
    expect(res).toEqual({
      data: caseEntity.currentImage,
      info: [],
      error: [
        {
          code: `${CUSTOM_LOGIC_ERROR_CODE.CASE_SERVICE}.${oData.id}`,
          message: MESSAGES.JOBCARD_NOT_FOUND,
          target: `caseId/${oData.id}`,
        },
      ],
    });
    expect(mockJobCardRepository.findAllJobCards).toHaveBeenCalled();
  });

  it('should return entity data and error when no selected service', async () => {
    jest.spyOn(mockCaseService, 'getCaseById').mockResolvedValue(oCase);
    jest.spyOn(mockCaseService, 'getCaseData').mockReturnValue(caseData);
    jobCards = [
      {
        id: '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177',
        displayId: 1,
        caseId: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
        caseDisplayId: '536',
        status: 'Z23',
        registeredProduct: JSON.stringify({
          vehicleNumber: 'KA01MJ5010',
          dateOfPurchase: '2023-04-14T00:00:00Z',
          model: 'TATA Nexon XMA',
        }),
        customerComplaints: JSON.stringify([' ', ' ', ' ', ' ', ' ']),
        milometer: 4863,
        serviceAdvisor: 'Sandra Webber',
        customerDetails: JSON.stringify({
          name: 'Andrew Jonas',
          contactNumber: '1234567890',
        }),
        estimatedCompletionDate: '2023-05-10T11:55:47.397Z',
        createdOn: '2023-05-08T11:55:47.410Z',
        servicesSelected: [],
      },
    ];
    const res = await jobCardService.findValidationStatusService(caseEntity);
    expect(res).toEqual({
      data: caseEntity.currentImage,
      info: [],
      error: [
        {
          code: `${CUSTOM_LOGIC_ERROR_CODE.CASE_SERVICE}.${jobCards[0].caseId}`,
          message: MESSAGES.NO_SERVICES_SELECTED,
          target: `caseId/${jobCards[0].caseId}`,
        },
      ],
    });
    expect(mockJobCardRepository.findAllJobCards).toHaveBeenCalled();
  });

  it('should return entity data and error when not completed service status', async () => {
    jest.spyOn(mockCaseService, 'getCaseById').mockResolvedValue(oCase);
    jest.spyOn(mockCaseService, 'getCaseData').mockReturnValue(caseData);
    jobCards = [
      {
        id: '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177',
        displayId: 1,
        caseId: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
        caseDisplayId: '536',
        status: 'Z23',
        registeredProduct: JSON.stringify({
          vehicleNumber: 'KA01MJ5010',
          dateOfPurchase: '2023-04-14T00:00:00Z',
          model: 'TATA Nexon XMA',
        }),
        customerComplaints: JSON.stringify([' ', ' ', ' ', ' ', ' ']),
        milometer: 4863,
        serviceAdvisor: 'Sandra Webber',
        customerDetails: JSON.stringify({
          name: 'Andrew Jonas',
          contactNumber: '1234567890',
        }),
        estimatedCompletionDate: '2023-05-10T11:55:47.397Z',
        createdOn: '2023-05-08T11:55:47.410Z',
        servicesSelected: [
          {
            id: 'a9643834-b16f-4bd8-81e7-3e9ff0ebed81',
            service: 'Brake pad replacement',
            price: '99.99',
            technician: 'Sandra',
            status: 'Z23',
            startTime: '2023-05-08T11:58:27.609Z',
            endTime: '2023-05-08T11:58:41.288Z',
            notes: null,
            observation: null,
          },
          {
            id: 'c4b45224-db39-47ed-9ea5-50dc9cee9162',
            service: 'Change Tyre',
            price: '2499',
            technician: 'Peter',
            status: 'Z21',
            startTime: '2023-05-08T11:58:00.516Z',
            endTime: '2023-05-08T11:58:49.673Z',
            notes: null,
            observation: null,
          },
        ],
      },
    ];
    const res = await jobCardService.findValidationStatusService(caseEntity);
    expect(res).toEqual({
      data: caseEntity.currentImage,
      info: [],
      error: [
        {
          code: `${CUSTOM_LOGIC_ERROR_CODE.CASE_SERVICE}.d886b468-ed95-11ed-a6bd-5354a6389ba0`,
          message: MESSAGES.CASE_STATUS_DISABLED,
          target: `caseId/d886b468-ed95-11ed-a6bd-5354a6389ba0`,
        },
      ],
    });
    expect(mockJobCardRepository.findAllJobCards).toHaveBeenCalled();
  });

  it('should return entity data and error when invalid currentImage data', async () => {
    const serverException = new ServerException(
      'ERROR',
      JobCardService.name,
      jobCardService.findValidationStatusService.name,
    );
    caseEntity.currentImage = undefined;
    await expect(
      jobCardService.findValidationStatusService(caseEntity),
    ).rejects.toThrow(serverException);
  });

  it('findValidationStatusService should handle when body is empty', async () => {
    try {
      await jobCardService.findValidationStatusService(undefined);
    } catch (error) {
      expect(error).toBeInstanceOf(ServerException);
    }
  });

  it('findOne: should return selected job card', async () => {
    jest.spyOn(mockCaseService, 'getCaseById').mockResolvedValue(oCase);
    jest.spyOn(mockCaseService, 'getCaseData').mockReturnValue(caseData);
    const res = await jobCardService.findOne(
      '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177',
    );
    expect(mockJobCardRepository.findOneJobCard).toHaveBeenCalledWith(
      '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177',
    );
    expect(res).toBe(jobCardDBResult);
  });

  it('findOne: should return error', async () => {
    try {
      jest.spyOn(mockJobCardRepository, 'findOneJobCard').mockRejectedValue({});
      await jobCardService.findOne('16da4bc2-a8cc-4ba6-a7a5-ef69802ce177');
    } catch (error) {
      expect(error).toBeInstanceOf(ServerException);
    }
  });

  it('findAllJobCardServices: should return all job card servies', async () => {
    const res = await jobCardService.findAllJobCardServices(
      '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177',
    );
    expect(res).toEqual(jobCardServices);
    expect(
      mockJobCardServicesRepository.findAllJobCardServices,
    ).toHaveBeenCalled();
  });

  it('findAllJobCardServices: should return error', async () => {
    try {
      jest
        .spyOn(mockJobCardServicesRepository, 'findAllJobCardServices')
        .mockRejectedValue({});
      await jobCardService.findAllJobCardServices(
        '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177',
      );
    } catch (error) {
      expect(error).toBeInstanceOf(ServerException);
    }
  });

  describe('findOneJobCardService', () => {
    it('should return selected job card service', async () => {
      const res = await jobCardService.findOneJobCardService(
        '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177',
        'a9643834-b16f-4bd8-81e7-3e9ff0ebed81',
      );
      expect(mockJobCardServicesRepository.findOne).toHaveBeenCalledWith({
        where: {
          jobCard: { id: '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177' },
          id: 'a9643834-b16f-4bd8-81e7-3e9ff0ebed81',
        },
      });
      expect(res).toBe(jobCardServices[0]);
    });

    it('should handle error', async () => {
      jest
        .spyOn(mockJobCardServicesRepository, 'findOne')
        .mockRejectedValue({});
      try {
        await jobCardService.findOneJobCardService(
          '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177',
          'a9643834-b16f-4bd8-81e7-3e9ff0ebed81',
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('remove', () => {
    it('should delete the job card', async () => {
      const res = await jobCardService.remove(
        'c7e9469a-1b6b-42c6-9580-28ed4a994346',
      );
      expect(mockJobCardRepository.delete).toHaveBeenCalledWith(
        'c7e9469a-1b6b-42c6-9580-28ed4a994346',
      );
    });
    it('should return error when delete the job card', async () => {
      try {
        jest
          .spyOn(mockJobCardRepository, 'delete')
          .mockRejectedValue(new Error('Delete error'));
        await jobCardService.remove('123');
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('create', () => {
    const jobCardCreate = {
      sourceid: 'e0dfacf7-a972-4367-bc9a-d8c4a086a09b',
      sourceType: SourceType.SERVICE_FORM,
    };
    const caseData = {
      sProcessor: 'Pavithra N',
      nMilometer: 4863,
      sEstimatedCompletionDate: '2023-05-16T11:52:00Z',
      sCustomerName: '. Ind Customer with ID',
      sCaseDisplayId: 'CR64',
    };

    const oServiceForm = {
      id: 'bff7f134-250b-4557-a5ee-150e2e1d6076',
      displayId: 1,
      caseId: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
      caseDisplayId: '536',
      status: SFStatus.Z02,
      registeredProduct: {
        vehicleNumber: 'KA01MJ5010',
        dateOfPurchase: '2023-04-14T00:00:00Z',
        model: 'TATA Nexon XMA',
      },
      customerComplaints: [' ', ' ', ' ', ' ', ' '],
      milometer: 4863,
      servicesProposed: [
        {
          id: '87a68c40-85c9-4654-8816-2e0a53b4483d',
          service: 'Change Tyre',
          price: '2499',
          isSelected: true,
        },
      ],
      inspectionItems: [
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
      ],
      notes: [' ', ' ', ' ', ' ', ' '],
    };

    it('should create the job card', async () => {
      const oMock = {
        adminData: {
          createdBy: '',
          createdOn: '2023-06-06T10:08:10.829Z',
          updatedBy: '',
          updatedOn: '2023-06-06T10:29:19.686Z',
        },
        caseDisplayId: '536',
        caseId: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
        customerComplaints: [' ', ' ', ' ', ' ', ' '],
        displayId: 1,
        estimatedCompletionDate: '2023-05-10T11:55:47.397Z',
        id: '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177',
        milometer: 4863,
        registeredProduct: {
          dateOfPurchase: '2023-04-14T00:00:00Z',
          model: 'TATA Nexon XMA',
          vehicleNumber: 'KA01MJ5010',
        },
        servicesSelected: [
          {
            adminData: {
              createdBy: '',
              createdOn: '2023-06-06T10:08:10.829Z',
              updatedBy: '',
              updatedOn: '2023-06-06T10:29:19.686Z',
            },
            endTime: '2023-05-08T11:58:41.288Z',
            id: 'a9643834-b16f-4bd8-81e7-3e9ff0ebed81',
            notes: null,
            observation: null,
            price: '99.99',
            service: 'Brake pad replacement',
            startTime: '2023-05-08T11:58:27.609Z',
            status: 'Z23',
            statusDescription: 'translatedText',
            technician: 'Sandra',
          },
          {
            adminData: {
              createdBy: '',
              createdOn: '2023-06-06T10:08:10.829Z',
              updatedBy: '',
              updatedOn: '2023-06-06T10:29:19.686Z',
            },
            endTime: '2023-05-08T11:58:49.673Z',
            id: 'c4b45224-db39-47ed-9ea5-50dc9cee9162',
            notes: null,
            observation: null,
            price: '2499',
            service: 'Change Tyre',
            startTime: '2023-05-08T11:58:00.516Z',
            status: 'Z23',
            statusDescription: 'translatedText',
            technician: 'Peter',
          },
        ],
        status: 'COMPLETED',
        statusDescription: 'translatedText',
      };
      jest
        .spyOn(mockServiceFormService, 'findOne')
        .mockResolvedValue(oServiceForm);
      jest
        .spyOn(mockServiceFormRepository, 'findOneBy')
        .mockResolvedValue(oServiceForms[0]);
      jest
        .spyOn(mockCustomerService, 'getAccountInfo')
        .mockReturnValue(oCustomerData);
      jest.spyOn(mockCaseService, 'getCaseById').mockResolvedValue(oCase);
      jest.spyOn(mockCaseService, 'getCaseData').mockResolvedValue(caseData);
      jest.spyOn(mockCaseService, 'updateCase').mockResolvedValue(oCase);
      jest
        .spyOn(mockI18nService, 'translate')
        .mockResolvedValue('translatedText');
      jest.spyOn(mockDataSource.manager, 'save').mockReturnValue({
        ...jobCards[0],
        createdBy: '',
        createdOn: '2023-06-06T10:08:10.829Z',
        updatedBy: '',
        updatedOn: '2023-06-06T10:29:19.686Z',
      });
      const result = await jobCardService.create(jobCardCreate);
      expect(result).toEqual(oMock);
    });

    it('should fetch contact number from getIndividualCustomerInfo() when contact info is unavailable in case response', async () => {
      try {
        jest
          .spyOn(mockServiceFormService, 'findOne')
          .mockResolvedValue(oServiceForms[0]);
        jest
          .spyOn(mockServiceFormRepository, 'findOneBy')
          .mockResolvedValue(oServiceForms[0]);
        jest
          .spyOn(mockCustomerService, 'getIndividualCustomerInfo')
          .mockReturnValue(oCustomerData);
        jest
          .spyOn(mockCaseService, 'getCaseById')
          .mockResolvedValue(oCase.value);
        jest.spyOn(mockDataSource.manager, 'save').mockReturnValue(jobCards[0]);
        jest.spyOn(mockCaseService, 'getCaseData').mockResolvedValue(caseData);
        jest.spyOn(mockCaseService, 'updateCase').mockResolvedValue(oCase);
        const result = await jobCardService.create(jobCardCreate);
        const oMock = JobCardResponseDto.toDto(jobCards[0]);
        delete result['statusDescription'];
        expect(result).toEqual(oMock);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should fetch contact number from getAccountInfo() when contact, individualCustomer info is unavailable in case response', async () => {
      try {
        jest
          .spyOn(mockServiceFormService, 'findOne')
          .mockResolvedValue(oServiceForms[0]);
        jest
          .spyOn(mockServiceFormRepository, 'findOneBy')
          .mockResolvedValue(oServiceForms[0]);
        oCase.value.account = {
          id: 'id',
        };
        jest
          .spyOn(mockCustomerService, 'getAccountInfo')
          .mockReturnValue(oCustomerData);
        delete oCase.value.individualCustomer;
        jest
          .spyOn(mockCaseService, 'getCaseById')
          .mockResolvedValue(oCase.value);
        jest.spyOn(mockCaseService, 'getCaseData').mockResolvedValue(caseData);
        jest.spyOn(mockCaseService, 'updateCase').mockResolvedValue(oCase);
        jest.spyOn(mockDataSource.manager, 'save').mockReturnValue(jobCards[0]);
        const result = await jobCardService.create(jobCardCreate);
        const oMock = JobCardResponseDto.toDto(jobCards[0]);
        delete result['statusDescription'];
        expect(result).toEqual(oMock);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should return error when creating job card', async () => {
      const oServiceForm = {
        id: 'bff7f134-250b-4557-a5ee-150e2e1d6076',
        displayId: 1,
        caseId: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
        caseDisplayId: '536',
        status: null,
      };
      try {
        jest
          .spyOn(mockServiceFormService, 'findOne')
          .mockResolvedValue(oServiceForms[0]);
        jest
          .spyOn(mockServiceFormRepository, 'findOneBy')
          .mockResolvedValue(oServiceForms[0]);
        await jobCardService.create(jobCardCreate);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });

    it('should return error no service selected', async () => {
      const oServiceFormErr = {
        id: 'bff7f134-250b-4557-a5ee-150e2e1d6076',
        displayId: 1,
        caseId: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
        caseDisplayId: '536',
        status: SFStatus.Z02,
        customerComplaints: JSON.stringify([' ', ' ', ' ', ' ', ' ']),
        milometer: 4863,
        servicesProposed: [
          {
            id: '87a68c40-85c9-4654-8816-2e0a53b4483d',
            service: 'Change Tyre',
            price: '2499',
            isSelected: false,
          },
        ],
        notes: JSON.stringify([' ', ' ', ' ', ' ', ' ']),
      };

      try {
        jest
          .spyOn(mockServiceFormService, 'findOne')
          .mockResolvedValue(oServiceFormErr);
        jest
          .spyOn(mockServiceFormRepository, 'findOneBy')
          .mockResolvedValue(oServiceFormErr);
        await jobCardService.create(jobCardCreate);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });

    it('should return error when service form is not booked', async () => {
      const oServiceFormErr = {
        id: 'bff7f134-250b-4557-a5ee-150e2e1d6076',
        displayId: 1,
        caseId: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
        caseDisplayId: '536',
        status: SFStatus.Z01,
        customerComplaints: JSON.stringify([' ', ' ', ' ', ' ', ' ']),
        milometer: 4863,
        servicesProposed: [
          {
            id: '87a68c40-85c9-4654-8816-2e0a53b4483d',
            service: 'Change Tyre',
            price: '2499',
            isSelected: false,
          },
        ],
        notes: JSON.stringify([' ', ' ', ' ', ' ', ' ']),
      };

      try {
        jest
          .spyOn(mockServiceFormService, 'findOne')
          .mockResolvedValue(oServiceFormErr);
        await jobCardService.create(jobCardCreate);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getErrorMessage()).toBe(MESSAGES.SERVICE_FORM_NOT_BOOKED);
      }
    });
  });

  describe('update', () => {
    const jobCardId = '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177';
    it('should update the jobcard', async () => {
      const oPatchBody = { ...jobCards[0] };
      const oMock = JobCardResponseDto.toDto(jobCardDBResult);
      try {
        jest
          .spyOn(mockJobCardRepository, 'updateJobCard')
          .mockResolvedValue({ ...oMock });
        jest
          .spyOn(mockI18nService, 'translate')
          .mockResolvedValue('translatedText');
        jest.spyOn(mockCaseService, 'getCaseById').mockResolvedValue(oCase);
        jest.spyOn(mockCaseService, 'getCaseData').mockReturnValue(caseData);
        const result = await jobCardService.update(jobCardId, oPatchBody);
        result.serviceAdvisor = caseData.serviceAdvisor;
        delete result.statusDescription;
        delete result.customerDetails;
        delete oMock.customerDetails;
        expect(result).toEqual(oMock);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should return error when update the jobcard', async () => {
      const oPatchBody = { ...jobCards[0] };
      try {
        jest
          .spyOn(mockJobCardRepository, 'updateJobCard')
          .mockRejectedValue({});
        await jobCardService.update(jobCardId, oPatchBody);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });

    it('should return error no update data', async () => {
      const oPatchBody = {} as UpdateJobCardDto;
      try {
        await jobCardService.update(jobCardId, oPatchBody);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('updateJobCardService', () => {
    const jobCardId = '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177';
    const jobCardServieId = 'c4b45224-db39-47ed-9ea5-50dc9cee9162';
    it('should update the job card service', async () => {
      try {
        jest.spyOn(mockJobCardServicesRepository, 'findOne').mockResolvedValue({
          ...jobCardServices[1],
          jobCard: { caseId: 'caseId', id: 'id' },
        });
        jest
          .spyOn(jobCardService, 'findAllJobCardServices')
          .mockResolvedValue(jobCardServices);
        const result = await jobCardService.updateJobCardService(
          jobCardId,
          jobCardServieId,
          jobCardServices[1],
        );
        expect(result).toEqual(jobCardServices[1]);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should handle when first job card is started', async () => {
      jobCardServices[0].status = ServiceStatus.Z21;
      jobCardServices[1].status = ServiceStatus.Z21;
      try {
        jest.spyOn(mockJobCardServicesRepository, 'findOne').mockResolvedValue({
          ...jobCardServices[1],
          jobCard: { caseId: 'caseId', id: 'id' },
        });
        jest
          .spyOn(jobCardService, 'findAllJobCardServices')
          .mockResolvedValue(jobCardServices);
        const oUpdateJobCardServiceBody = {
          id: 'c4b45224-db39-47ed-9ea5-50dc9cee9162',
          service: 'Change Tyre',
          price: '2499',
          technician: 'Peter',
          status: ServiceStatus.Z22,
          startTime: '2023-05-08T11:58:00.516Z',
          endTime: '2023-05-08T11:58:49.673Z',
          notes: null,
          observation: null,
        };
        const result = await jobCardService.updateJobCardService(
          jobCardId,
          jobCardServieId,
          oUpdateJobCardServiceBody,
        );
        expect(result).toEqual(oUpdateJobCardServiceBody);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should update job card service with endTime', async () => {
      const oPatchBody = { ...jobCardServices[1] };
      oPatchBody.endTime = '';
      const oResult = {
        ...jobCardServices[1],
        jobCard: { caseId: 'caseId', id: 'id' },
      };
      oResult.endTime = new Date().toISOString();
      try {
        jest
          .spyOn(mockJobCardServicesRepository, 'findOne')
          .mockResolvedValue(oResult);
        jest
          .spyOn(jobCardService, 'findAllJobCardServices')
          .mockResolvedValue(jobCardServices);
        const result = await jobCardService.updateJobCardService(
          jobCardId,
          jobCardServieId,
          oPatchBody,
        );
        expect(result).toEqual(oResult);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should update job card service with startTime', async () => {
      const oPatchBody = { ...jobCardServices[0] };
      oPatchBody.startTime = '';
      const oResult = {
        ...jobCardServices[0],
        jobCard: { caseId: 'caseId', id: 'id' },
      };
      oResult.startTime = new Date().toISOString();
      try {
        jest
          .spyOn(mockJobCardServicesRepository, 'findOne')
          .mockResolvedValue(oResult);
        jest
          .spyOn(jobCardService, 'findAllJobCardServices')
          .mockResolvedValue(jobCardServices);
        const result = await jobCardService.updateJobCardService(
          jobCardId,
          jobCardServieId,
          oPatchBody,
        );
        expect(result).toEqual(oResult);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should update job card service with case status', async () => {
      const oPatchBody = { ...jobCardServices[0] };
      const oResult = {
        ...jobCardServices[0],
        jobCard: { caseId: 'caseId', id: 'id' },
      };
      //const ojobCardService = jobCardServices[1];
      const tmpJobCardServices = jobCardServices;
      tmpJobCardServices[0].status = ServiceStatus.Z23;
      try {
        jest
          .spyOn(mockJobCardServicesRepository, 'findOne')
          .mockResolvedValue(oResult);
        jest
          .spyOn(jobCardService, 'findAllJobCardServices')
          .mockResolvedValue(tmpJobCardServices);
        const result = await jobCardService.updateJobCardService(
          jobCardId,
          jobCardServieId,
          oPatchBody,
        );
        expect(result).toEqual(oResult);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should return error for udpate job card service', async () => {
      try {
        jest
          .spyOn(mockJobCardServicesRepository, 'findOne')
          .mockResolvedValue(null);
        await jobCardService.updateJobCardService(
          jobCardId,
          jobCardServieId,
          jobCardServices[1],
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('findAllJCStatus', () => {
    it('should return all job card status', async () => {
      try {
        const result = await jobCardService.findAllJCStatus();
        expect(result.length).toEqual(3);
        expect(mockI18nService.translate).toHaveBeenCalledTimes(3);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should return error', async () => {
      try {
        jest.spyOn(mockI18nService, 'translate').mockRejectedValue({});
        await jobCardService.findAllJCStatus();
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('findAllJCServiceStatus', () => {
    it('should return all job card service status', async () => {
      try {
        const result = await jobCardService.findAllJCServiceStatus();
        expect(result.length).toEqual(3);
        expect(mockI18nService.translate).toHaveBeenCalledTimes(3);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should return error', async () => {
      try {
        jest.spyOn(mockI18nService, 'translate').mockRejectedValue({});
        await jobCardService.findAllJCServiceStatus();
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('getCustomerDetailsFromCase', () => {
    let oCaseData;
    beforeEach(() => {
      oCaseData = {
        sProcessor: 'Pavithra N',
        nMilometer: 4863,
        sEstimatedCompletionDate: '2023-05-16T11:52:00Z',
        sCustomerName: '. Ind Customer with ID',
        sCaseDisplayId: 'CR64',
        sContactNumber: '91123123123',
      };
    });

    afterEach(() => {
      oCaseData = undefined;
    });

    it('should return customer details', async () => {
      jest.spyOn(mockCaseService, 'getCaseById').mockResolvedValue(oCase);
      jest.spyOn(mockCaseService, 'getCaseData').mockReturnValue(oCaseData);
      const result = await jobCardService.getCustomerDetailsFromCase('caseId');
      expect(result).toEqual({
        name: '. Ind Customer with ID',
        contactNumber: '91123123123',
        serviceAdvisor: 'Pavithra N',
      });
    });

    it(`should handle when there's error in the function`, async () => {
      try {
        jest
          .spyOn(mockCaseService, 'getCaseById')
          .mockRejectedValue(new ServerException({}, 'testClass', 'testFun'));
        await jobCardService.getCustomerDetailsFromCase('caseId');
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('getCustomerPhoneName', () => {
    let oCase, oCustomerData, oCustomerDataResult;
    beforeEach(() => {
      oCase = {
        id: '3736420d-159f-11ee-a1ca-ef00dca406e1',
        displayId: '3197',
        subject: 'TestService@1',
        priority: '03',
        priorityDescription: 'Normal',
        origin: 'MANUAL_DATA_ENTRY',
        caseType: 'ZVSR',
        caseTypeDescription: 'Vehicle Service Case Type',
        statusSchema: 'Z1',
        status: 'ZC',
        statusDescription: 'Service Completed',
        escalationStatus: 'NOT_ESCALATED',
        isRecommendedCommunicationLanguage: false,
        registeredProducts: [
          {
            serialId: 'SVERKER900-12345',
            referenceProduct: { id: '11edef3f-3408-ec0e-afdb-815d6c020a00' },
            referenceDate: '2023-05-10T00:00:00.000Z',
            id: 'a8b34ffe-da19-45ef-a5dc-931656ecabe5',
            displayId: '156',
            status: 'ACTIVE',
            description: 'RELAY AND SUBSTATION TEST SYSTEM',
            isMain: false,
          },
          {
            serialId: 'REG1',
            referenceProduct: { id: '00163e12-7b8d-1ed6-b0ef-711a9c72b973' },
            referenceDate: '2022-10-03T07:00:00.000Z',
            id: 'e2e5ab07-72a5-4921-a4d9-5e1abc1f1e07',
            displayId: '96',
            status: 'ACTIVE',
            description: 'Copper Tubes',
            isMain: false,
          },
          {
            serialId: '1001',
            referenceProduct: { id: '11ee1571-122c-664e-afdb-81ac0d020a00' },
            referenceDate: '2023-06-28T00:00:00.000Z',
            id: 'baea13fb-2334-4206-9bf3-c457bb29e3f9',
            displayId: '161',
            status: 'ACTIVE',
            description: 'TATA Nexon',
            isMain: false,
          },
        ],
        account: {
          country: 'DE',
          state: '09',
          streetPostalCode: '90268',
          id: '00163e03-63a4-1ed2-8783-4df040ade600',
          displayId: 'MDEC67200',
          name: 'AKRON Heiztechnik GmbH AHT Verteilzentrum Nürnberg',
          isDeleted: false,
          partyRoleCategory: 'ACCOUNT',
          partyRole: '1001',
          addressId: '00163e03-63a4-1ed2-8783-cd7f3e1d0708',
          determinationMethodCode: 1,
          isMain: true,
          partyType: 'ACCOUNT',
        },
        processor: {
          emailId: 'pavithra.n@sap.com',
          id: '11eccc06-510b-a8ee-afdb-81c341010a00',
          displayId: '8000000009',
          name: 'Pavithra N',
          isDeleted: false,
          partyRoleCategory: 'PROCESSOR',
          partyRole: '40',
          addressId: '11eccc06-510c-6c3e-afdb-81c341010a00',
          determinationMethodCode: 1,
          isMain: true,
          partyType: 'EMPLOYEE',
        },
        reporter: {
          id: '11eccc65-79ad-fc8e-afdb-81c341010a00',
          displayId: '8000000010',
          name: 'Eddie Smoke',
          isDeleted: false,
          partyRoleCategory: 'REPORTER',
          partyRole: '214',
          addressId: '11eccc65-79af-aa3e-afdb-81c341010a00',
          determinationMethodCode: 3,
          isMain: true,
          partyType: 'EMPLOYEE',
        },
        relatedObjects: [
          {
            id: 'd6bb15de-2481-11ee-b4ac-353dbba7e83f',
            objectId: 'd57faef7-2481-11ee-ac8d-7ff21e90403f',
            type: '39',
            role: '2',
          },
          {
            id: '30db7e33-2487-11ee-b9b5-31bc4b2ab947',
            objectId: '2f443c8c-2487-11ee-9067-834c5901ee36',
            type: '39',
            role: '2',
          },
          {
            id: 'c00f62e1-265a-11ee-b4ac-e566cf4f0a62',
            objectId: 'be5eccd9-265a-11ee-ac8d-17668021aecb',
            type: '39',
            role: '2',
          },
          {
            id: 'a1d5a407-2661-11ee-9388-9104f02bd5e1',
            objectId: 'a06ff900-2661-11ee-9067-bd1d106267a6',
            type: '39',
            role: '2',
          },
          {
            id: 'dfcbf412-2662-11ee-b4ac-29e42d886b63',
            objectId: 'deb26ded-2662-11ee-9175-19f7c72b83cb',
            type: '39',
            role: '2',
          },
          {
            id: 'a3b3eeb7-2663-11ee-925a-e1d3f8b768ee',
            objectId: 'a2a27e7a-2663-11ee-ac8d-75bf532d59b9',
            type: '39',
            role: '2',
          },
        ],
        timePoints: {
          reportedOn: '2023-06-28T10:31:00.000Z',
          initialReviewCompletedOn: '2023-06-28T10:33:46.013Z',
          assignedToProcessorOn: '2023-06-28T10:33:26.859Z',
        },
        isRecommendedCategory: false,
        isEndOfPurpose: false,
        isDepersonalized: false,
        isRead: true,
        extensions: {
          serviceformid_lijsyl2o: '80',
          milometer_lijszqw2: 5674,
          jobcardid_lijsz0mg: '51',
        },
        adminData: {
          createdOn: '2023-06-28T10:33:26.449Z',
          createdBy: '9808336e-cc65-11ec-980b-7f14df82f69b',
          createdByName: 'Eddie Smoke',
          updatedOn: '2023-07-19T18:39:48.499Z',
          updatedBy: '00000000-0000-0000-0000-000000000000',
          updatedByName: 'SAP_SYSTEM01',
        },
      };
      oCustomerData = {
        name: '. Ind Customer with ID',
      };
      oCustomerDataResult = {
        name: '. Ind Customer with ID',
        contactNumber: '91123123123',
      };
    });

    afterEach(() => {
      oCase = oCustomerData = oCustomerDataResult = undefined;
    });

    it('when account is there in case, should fetch phone from account service', async () => {
      jest
        .spyOn(mockCustomerService, 'getAccountInfo')
        .mockReturnValue(oCustomerDataResult);
      const result = await jobCardService.getCustomerPhoneName(
        oCase,
        oCustomerData,
      );
      expect(mockCustomerService.getAccountInfo).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        name: '. Ind Customer with ID',
        contactNumber: '91123123123',
      });
    });

    it('when individualCustomer is there in case, should fetch phone from individualCustomer service', async () => {
      jest
        .spyOn(mockCustomerService, 'getIndividualCustomerInfo')
        .mockReturnValue(oCustomerDataResult);
      delete oCase.account;
      oCase['individualCustomer'] = {};
      const result = await jobCardService.getCustomerPhoneName(
        oCase,
        oCustomerData,
      );
      expect(
        mockCustomerService.getIndividualCustomerInfo,
      ).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        name: '. Ind Customer with ID',
        contactNumber: '91123123123',
      });
    });

    it(`should handle when there's error in the function`, async () => {
      try {
        jest
          .spyOn(mockCustomerService, 'getAccountInfo')
          .mockRejectedValue(new ServerException({}, 'testClass', 'testFun'));
        await jobCardService.getCustomerPhoneName(oCase, oCustomerData);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });
});
