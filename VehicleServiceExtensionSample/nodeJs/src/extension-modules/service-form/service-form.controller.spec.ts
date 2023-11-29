import { Test, TestingModule } from '@nestjs/testing';
import { ServiceFormController } from './service-form.controller';
import { ServiceFormService } from './service-form.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ServiceForm } from './entities/service-form.entity';
import { SFStatus } from '../common/enums';
import { REQUEST } from '@nestjs/core';
import { CustomLogger } from '../../logger/logger.service';
import { UtilsService } from '../../utils/utils.service';

describe('ServiceFormController', () => {
  let controller: ServiceFormController;
  let oServiceForms;
  let mockServiceFormRepository;
  let mockServiceFormService;
  let mockDestinationManager;
  let mockHttpService;
  let mockCustomLogger;
  let mockUtilService;

  beforeEach(async () => {
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
      {
        id: '651e561d-cb7a-44db-9d72-426b7b8455d7',
        displayId: 2,
        caseId: '2bfdd60f-da14-11ed-bf97-bb732c681de4',
        caseDisplayId: '451',
        status: SFStatus.Z02,
        registeredProduct: {
          vehicleNumber: 'KA53HB4898',
          dateOfPurchase: '2022-08-01T00:00:00Z',
          model: 'AHT Combi 110e',
        },
        customerComplaints: ['A2 ', ' ', ' ', ' ', ' '],
        milometer: 3400,
        servicesProposed: [
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
    mockServiceFormRepository = {
      find: jest.fn(() => {
        return oServiceForms;
      }),
      findOne: jest.fn(() => {
        return oServiceForms[0];
      }),
      findOneBy: jest.fn(() => {
        return oServiceForms[0];
      }),
      save: jest.fn().mockImplementation((oServiceFormDto) => {
        return Promise.resolve({ id: '123', ...oServiceFormDto });
      }),
      update: jest.fn().mockImplementation((id, oServiceFormDto) => ({
        ...id,
        ...oServiceFormDto,
      })),
      delete: jest.fn().mockImplementation((id) => ({
        ...id,
      })),
    };
    mockServiceFormService = {
      findAllStatus: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      replace: jest.fn(),
      remove: jest.fn(),
    };
    mockHttpService = {
      get: jest.fn().mockImplementation(() => {
        return Promise.resolve({ pipe: jest.fn() });
      }),
    };
    mockCustomLogger = {
      setClassName: jest.fn(),
      log: jest.fn(),
    };
    mockUtilService = { parseFilterString: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceFormController],
      providers: [
        {
          provide: ServiceFormService,
          useValue: mockServiceFormService,
        },
        {
          provide: getRepositoryToken(ServiceForm),
          useValue: mockServiceFormRepository,
        },
        {
          provide: REQUEST,
          useValue: {
            session: {
              language: 'en',
            },
          },
        },
        { provide: CustomLogger, useValue: mockCustomLogger },
        { provide: UtilsService, useValue: mockUtilService },
      ],
    }).compile();

    controller = module.get<ServiceFormController>(ServiceFormController);
  });

  afterEach(async () => {
    oServiceForms =
      mockServiceFormRepository =
      mockServiceFormService =
        undefined;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create new service-form', async () => {
    const oCreateDto = {
      caseId: 'dfc05d5e-8356-4734-8773-11719cc3509b',
      milometer: 4000,
    };
    const spy = jest.spyOn(mockServiceFormService, 'create');
    await controller.create(oCreateDto);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should be able to find all service-forms', async () => {
    const oServiceFormQueryDto = {
      $filter: `caseId eq 'dfc05d5e-8356-4734-8773-11719cc3509b'`,
    };
    const spy = jest.spyOn(mockServiceFormService, 'findAll');
    const parseFilterStringSpy = jest.spyOn(
      mockUtilService,
      'parseFilterString',
    );
    await controller.findAll(oServiceFormQueryDto);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(parseFilterStringSpy).toHaveBeenCalledTimes(1);
  });

  it('should be able to find all service-form statuses', async () => {
    const spy = jest.spyOn(mockServiceFormService, 'findAllStatus');
    await controller.findAllStatus();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should be able to find one service-form by id', async () => {
    const oFindOneQuery = 'b9a0af7c-8114-48fb-88eb-f463b0070934';
    const spy = jest.spyOn(mockServiceFormService, 'findOne');
    await controller.findOne(oFindOneQuery);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should be able to patch a service-form by id', async () => {
    const sId = 'b9a0af7c-8114-48fb-88eb-f463b0070934';
    const oPatchBody = {
      status: SFStatus.Z02,
    };
    const spy = jest.spyOn(mockServiceFormService, 'update');
    await controller.update(sId, oPatchBody);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  /*   it('should be able to do put operation on a service-form by id', async () => {
    const sId = 'b9a0af7c-8114-48fb-88eb-f463b0070934';
    const oPutBody = {
      caseId: 'dfc05d5e-8356-4734-8773-11719cc3509b',
      milometer: 4000,
    };
    const spy = jest.spyOn(mockServiceFormService, 'replace');
    await controller.replace(sId, oPutBody);
    expect(spy).toHaveBeenCalledTimes(1);
  }); */

  it('should be able to delete a service-form by id', async () => {
    const sId = 'b9a0af7c-8114-48fb-88eb-f463b0070934';
    const spy = jest.spyOn(mockServiceFormService, 'remove');
    await controller.remove(sId);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
