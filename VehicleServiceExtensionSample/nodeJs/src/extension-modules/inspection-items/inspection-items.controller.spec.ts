import { Test, TestingModule } from '@nestjs/testing';
import { InspectionItemsController } from './inspection-items.controller';
import { InspectionItemsService } from './inspection-items.service';
import {
  InspectionItemsDTO,
  InspectionItemsResponse,
} from '../../../test/mock-data/modules/inspection-items.mock.data';

describe('InspectionItemsController', () => {
  let controller: InspectionItemsController;
  const mockInspectionItemsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    replace: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InspectionItemsController],
      providers: [
        {
          provide: InspectionItemsService,
          useValue: mockInspectionItemsService,
        },
      ],
    }).compile();

    controller = module.get<InspectionItemsController>(
      InspectionItemsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create new inspection-item', async () => {
    const spy = jest.spyOn(mockInspectionItemsService, 'create');
    await controller.create(InspectionItemsDTO);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should be able to find all inspection-items', async () => {
    const spy = jest.spyOn(mockInspectionItemsService, 'findAll');
    await controller.findAll();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should be able to find one inspection-item by id', async () => {
    const oFindOneQuery = 'b9a0af7c-8114-48fb-88eb-f463b0070934';
    const spy = jest.spyOn(mockInspectionItemsService, 'findOne');
    await controller.findOne(oFindOneQuery);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should be able to patch a inspection-itemby id', async () => {
    const spy = jest.spyOn(mockInspectionItemsService, 'update');
    await controller.update(InspectionItemsResponse.id, InspectionItemsDTO);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should be able to do put operation on a inspection-item by id', async () => {
    const sId = 'b9a0af7c-8114-48fb-88eb-f463b0070934';
    const spy = jest.spyOn(mockInspectionItemsService, 'remove');
    await controller.remove(sId);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
