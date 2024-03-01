import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from './service.controller';
import { ServicesService } from './service.service';
import {
  ServicesMockDTO,
  ServicesResponseDTO,
} from '../../../test/mock-data/modules/services.mock.data';
import { AdminData } from '../../../test/mock-data/common.mock.data';

describe('ServicesController', () => {
  let servicesController: ServicesController;
  const mockServicesService = {
    findAll: jest.fn(() => {
      return [{ ...ServicesMockDTO, ...AdminData }];
    }),
    findOne: jest.fn(() => {
      return ServicesResponseDTO;
    }),
    create: jest.fn((servicesDTO) => {
      return ServicesResponseDTO;
    }),
    update: jest
      .fn()
      .mockImplementation((id, servicesDTO) => ServicesResponseDTO),
    remove: jest.fn().mockImplementation((id) => ({
      id,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesController],
      providers: [ServicesService],
    })
      .overrideProvider(ServicesService)
      .useValue(mockServicesService)
      .compile();

    servicesController = module.get<ServicesController>(ServicesController);
  });

  it('should be defined', () => {
    expect(servicesController).toBeDefined();
  });

  it('should return array of services', async () => {
    const res = await servicesController.findAll();
    expect(mockServicesService.findAll).toHaveBeenCalled();
    expect(res).toEqual([{ ...ServicesMockDTO, ...AdminData }]);
  });

  it('should return selected services', async () => {
    const res = await servicesController.findOne('111');
    expect(mockServicesService.findOne).toHaveBeenCalled();
    expect(res).toBe(ServicesResponseDTO);
  });

  it('should create a services', async () => {
    const res = await servicesController.create(ServicesMockDTO);
    expect(res).toEqual(ServicesResponseDTO);
    expect(mockServicesService.create).toHaveBeenCalledWith(ServicesMockDTO);
  });

  it('should update the services', async () => {
    const res = await servicesController.update('123', ServicesMockDTO);
    expect(res).toEqual(ServicesResponseDTO);
    expect(mockServicesService.update).toHaveBeenCalledWith(
      '123',
      ServicesMockDTO,
    );
  });

  it('should delete the services', async () => {
    const res = await servicesController.remove('111');
    expect(res).toEqual({ id: '111' });
    expect(mockServicesService.remove).toHaveBeenCalledWith('111');
  });
});
