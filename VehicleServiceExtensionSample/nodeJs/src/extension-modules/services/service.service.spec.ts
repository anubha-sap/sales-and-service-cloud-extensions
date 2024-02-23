import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './service.service';
import { ServerException } from '../../common/filters/server-exception';
import { ServicesRepository } from './repository/services.repository';
import { REQUEST } from '@nestjs/core';
import { RequestMock } from '../../../test/mock-data/common.mock.data';
import {
  ServicesMockDTO,
  ServicesResponse,
  ServicesResponseDTO,
} from '../../../test/mock-data/modules/services.mock.data';

describe('ServicesService', () => {
  let servicesService: ServicesService;

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
          useValue: RequestMock,
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
          .mockResolvedValue([ServicesResponse]);
        const res = await servicesService.findAll();
        expect(res).toEqual([ServicesResponse]);
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
          .mockResolvedValue(ServicesResponse);
        const res = await servicesService.findOne(ServicesResponse.id);
        expect(oMockServicesRepository.findOne).toHaveBeenCalledWith(
          ServicesResponse.id,
        );
        expect(res).toEqual(ServicesResponseDTO);
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
    it('should create a service', async () => {
      try {
        jest
          .spyOn(oMockServicesRepository, 'save')
          .mockResolvedValue(ServicesResponse);
        const res = await servicesService.create(ServicesMockDTO);
        expect(res).toEqual(ServicesResponseDTO);
        expect(oMockServicesRepository.save).toHaveBeenCalledWith({
          ...ServicesMockDTO,
          createdBy: RequestMock.session.userId,
        });
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should return error for create a service', async () => {
      try {
        jest.spyOn(oMockServicesRepository, 'save').mockRejectedValue({});
        await servicesService.create(ServicesMockDTO);
        expect(oMockServicesRepository.save).toHaveBeenCalledWith(
          ServicesMockDTO,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('update', () => {
    const oPatchBody = {
      ...ServicesMockDTO[1],
    };
    oPatchBody.price = '2300';
    it('should update the service', async () => {
      try {
        jest
          .spyOn(oMockServicesRepository, 'update')
          .mockResolvedValue(ServicesResponse);
        const res = await servicesService.update(
          ServicesResponse.id,
          oPatchBody,
        );
        expect(res).toEqual(ServicesResponseDTO);
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
