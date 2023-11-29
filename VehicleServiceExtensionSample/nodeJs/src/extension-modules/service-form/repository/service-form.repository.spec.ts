import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ServiceFormRepository } from './service-form.repository';
import { ServiceForm } from '../entities/service-form.entity';
import { SFStatus } from '../../common/enums';
import { UtilsService } from '../../../utils/utils.service';
import { ServiceFormResponseDto } from '../dto/service-form/response-service-form.dto';
import { CustomLogger } from '../../../logger/logger.service';
import { REQUEST } from '@nestjs/core';
import { CASE_STATUS, EXTENSION_FIELDS } from '../../../common/constants';

describe('ServiceFormRepository', () => {
  const updatedBy = 'user';
  let oMockServiceFormRepo: ServiceFormRepository;
  const mockServiceFormRepo = {
    findOne: jest.fn(),
    target: {
      name: 'dummy',
    },
  };
  const mockUtilsService = {
    stringifyServiceFormDto: jest.fn(),
  };
  const adminData = {
    createdOn: new Date('2023-06-06T10:08:10.829Z'),
    updatedOn: new Date('2023-06-06T10:29:19.686Z'),
    createdBy: 'test@abc.com',
    updatedBy: updatedBy,
  };
  const oServiceForms = [
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
      jobCard: null,
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
      jobCard: null,
    },
  ];
  const oServiceFormDBResult = {
    ...oServiceForms[0],
    ...adminData,
  };
  const mockCustomLogger = {
    setClassName: jest.fn(),
    debug: jest.fn(),
  };
  const mockRequest = {
    session: {
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceFormRepository,
        {
          provide: getRepositoryToken(ServiceForm),
          useValue: mockServiceFormRepo,
        },
        {
          provide: REQUEST,
          useValue: mockRequest,
        },
        { provide: CustomLogger, useValue: mockCustomLogger },
        { provide: UtilsService, useValue: mockUtilsService },
      ],
    }).compile();
    oMockServiceFormRepo = module.get<ServiceFormRepository>(
      ServiceFormRepository,
    );
  });

  it('should be defined', () => {
    expect(oMockServiceFormRepo).toBeDefined();
  });

  describe('findOneServiceForm', () => {
    it('should findOneServiceForm', async () => {
      jest
        .spyOn(oMockServiceFormRepo, 'findOne')
        .mockResolvedValue(oServiceFormDBResult);
      const res = await oMockServiceFormRepo.findOneServiceForm('id');
      expect(res).toEqual(ServiceFormResponseDto.toDto(oServiceFormDBResult));
    });
  });

  describe('findAllServiceForms', () => {
    it('should findAllServiceForms', async () => {
      jest
        .spyOn(oMockServiceFormRepo, 'findAll')
        .mockResolvedValue([oServiceFormDBResult]);

      const res = await oMockServiceFormRepo.findAllServiceForms({});
      expect(res[0]).toBeInstanceOf(ServiceFormResponseDto);
    });
  });

  describe('updateServiceForm', () => {
    it('should updateServiceForm', async () => {
      jest
        .spyOn(oMockServiceFormRepo, 'update')
        .mockResolvedValue(oServiceFormDBResult);
      jest.spyOn(mockUtilsService, 'stringifyServiceFormDto');
      const res = await oMockServiceFormRepo.updateServiceForm(
        'id',
        {},
        updatedBy,
      );
      expect(res).toEqual(ServiceFormResponseDto.toDto(oServiceFormDBResult));
    });
  });
});
