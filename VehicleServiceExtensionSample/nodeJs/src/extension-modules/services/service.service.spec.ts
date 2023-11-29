import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './service.service';
import { ServerException } from '../../common/filters/server-exception';
import { ServicesRepository } from './repository/services.repository';
import { ServiceResponseDto } from './dto/response-service.dto';
import { AdminDataDto } from '../common/dto/admin-data.dto';
import { REQUEST } from '@nestjs/core';

describe('ServicesService', () => {
  let servicesService: ServicesService;

  const requestStub = {
    session: {
      language: 'lan',
      userToken: 'token',
      userId: 'uId',
    },
  };

  const serviceDto = [
    {
      id: '123',
      service:
        'Check and top off all fluid levels (engine oil, transmission fluid, brake fluid, power steering fluid, coolant)',
      minMileage: 0,
      maxMileage: 5000,
      price: '2299',
      isSelected: false,
    },
    {
      id: '111',
      service: 'engine oil, power steering fluid, coolant',
      minMileage: 10,
      maxMileage: 5000,
      price: '3299',
      isSelected: true,
    },
  ];
  const adminData = new AdminDataDto({
    createdOn: new Date('2023-06-06T10:08:10.829Z'),
    updatedOn: new Date('2023-06-06T10:29:19.686Z'),
    createdBy: '',
    updatedBy: '',
  });
  const dbResult = {
    ...serviceDto[1],
    ...adminData,
  };

  const serviceResult = new ServiceResponseDto({
    ...serviceDto[1],
    adminData,
  });
  const oMockServicesRepository = {
    save: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        {
          provide: ServicesRepository,
          useValue: oMockServicesRepository,
        },
        {
          provide: REQUEST,
          useValue: requestStub,
        },
      ],
    }).compile();

    servicesService = module.get<ServicesService>(ServicesService);
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(servicesService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all Services', async () => {
      try {
        jest
          .spyOn(oMockServicesRepository, 'findAll')
          .mockResolvedValue(serviceDto);
        const res = await servicesService.findAll();
        expect(res).toEqual(serviceDto);
        expect(oMockServicesRepository.findAll).toHaveBeenCalled();
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });
    it('should return error for findall service', async () => {
      try {
        jest.spyOn(oMockServicesRepository, 'findAll').mockRejectedValue({});
        await servicesService.findAll();
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('findOne', () => {
    it('should return selected service', async () => {
      try {
        jest
          .spyOn(oMockServicesRepository, 'findOne')
          .mockResolvedValue(dbResult);
        const res = await servicesService.findOne('111');
        expect(oMockServicesRepository.findOne).toHaveBeenCalledWith('111');
        expect(res).toStrictEqual(serviceResult);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should handle error', async () => {
      try {
        jest
          .spyOn(oMockServicesRepository, 'findOne')
          .mockRejectedValue(new Error('Error in findOne'));
        await servicesService.findOne('101');
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('create', () => {
    const oNewService = {
      service: 'engine oil, power steering fluid, coolant',
      minMileage: 10,
      maxMileage: 5000,
      price: '3299',
      isSelected: true,
    };
    it('should create a service', async () => {
      try {
        jest.spyOn(oMockServicesRepository, 'save').mockResolvedValue(dbResult);
        const res = await servicesService.create(oNewService);
        expect(res).toEqual(serviceResult);
        expect(oMockServicesRepository.save).toHaveBeenCalledWith({
          ...oNewService,
          createdBy: requestStub.session.userId,
        });
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should return error for create a service', async () => {
      try {
        jest.spyOn(oMockServicesRepository, 'save').mockRejectedValue({});
        await servicesService.create(oNewService);
        expect(oMockServicesRepository.save).toHaveBeenCalledWith(oNewService);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('update', () => {
    const oPatchBody = {
      ...serviceDto[1],
    };
    oPatchBody.price = '2300';
    it('should update the service', async () => {
      try {
        jest
          .spyOn(oMockServicesRepository, 'update')
          .mockResolvedValue(dbResult);
        const res = await servicesService.update('111', oPatchBody);
        expect(res).toEqual(serviceResult);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should return error for update the service', async () => {
      try {
        jest
          .spyOn(oMockServicesRepository, 'update')
          .mockRejectedValue(new Error('error in update'));
        await servicesService.update('111', oPatchBody);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('remove', () => {
    const oDeleteResponse = {
      raw: [],
      affected: 1,
    };
    it('should delete the service', async () => {
      try {
        jest
          .spyOn(oMockServicesRepository, 'delete')
          .mockResolvedValue(oDeleteResponse);
        const res = await servicesService.remove('123');
        expect(res).toEqual(oDeleteResponse);
        expect(oMockServicesRepository.delete).toHaveBeenCalledWith('123');
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should return error for Not found exception', async () => {
      try {
        jest
          .spyOn(oMockServicesRepository, 'delete')
          .mockRejectedValue(new Error('error in remove'));
        await servicesService.remove('124');
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });
});
