import { Test, TestingModule } from '@nestjs/testing';
import { InspectionItemsController } from './inspection-items.controller';
import { InspectionItemsService } from './inspection-items.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InspectionItem } from './entities/inspection-item.entity';

describe('InspectionItemsController', () => {
  let controller: InspectionItemsController;
  let mockInspectionItemsService;
  let oInspectionItems;
  let mockInspectionRepository;

  beforeEach(async () => {
    mockInspectionItemsService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      replace: jest.fn(),
      remove: jest.fn(),
    };
    oInspectionItems = [
      {
        description: 'Check for toolkit',
        isSelected: false,
      },
      {
        description: 'Check for any dents',
        isSelected: false,
      },
    ];
    mockInspectionRepository = {
      find: jest.fn(() => {
        return oInspectionItems;
      }),
      findOne: jest.fn((id) => {
        return oInspectionItems[0];
      }),
      findOneBy: jest.fn(() => {
        return oInspectionItems[0];
      }),
      save: jest.fn().mockImplementation((oInspectionItemDto) => {
        return Promise.resolve({ id: '123', ...oInspectionItemDto });
      }),
      update: jest.fn().mockImplementation((id, oInspectionItemDto) => ({
        ...id,
        ...oInspectionItemDto,
      })),
      delete: jest.fn().mockImplementation((id) => ({
        ...id,
      })),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InspectionItemsController],
      providers: [
        {
          provide: InspectionItemsService,
          useValue: mockInspectionItemsService,
        },
        {
          provide: getRepositoryToken(InspectionItem),
          useValue: mockInspectionRepository,
        },
      ],
    }).compile();

    controller = module.get<InspectionItemsController>(
      InspectionItemsController,
    );
  });

  afterEach(async () => {
    mockInspectionItemsService =
      oInspectionItems =
      mockInspectionRepository =
        undefined;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create new inspection-item', async () => {
    const oCreateDto = {
      description: 'Check toolkit',
      isSelected: false,
    };
    const spy = jest.spyOn(mockInspectionItemsService, 'create');
    await controller.create(oCreateDto);
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
    const sId = 'b9a0af7c-8114-48fb-88eb-f463b0070934';
    const oPatchBody = {
      description: 'Check toolkit items',
    };
    const spy = jest.spyOn(mockInspectionItemsService, 'update');
    await controller.update(sId, oPatchBody);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should be able to do put operation on a inspection-item by id', async () => {
    const sId = 'b9a0af7c-8114-48fb-88eb-f463b0070934';
    const spy = jest.spyOn(mockInspectionItemsService, 'remove');
    await controller.remove(sId);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
