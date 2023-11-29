import { Test, TestingModule } from '@nestjs/testing';
import { InspectionItemsService } from './inspection-items.service';
import { TypeORMError } from 'typeorm';
import { ServerException } from '../../common/filters/server-exception';
import { MESSAGES } from '../../common/constants';
import { InspectionItemsRepository } from './repository/inspection-items.repository';
import { AdminDataDto } from '../common/dto/admin-data.dto';
import { InspectionItemResponseDto } from './dto/response-inspection-item.dto';
import { REQUEST } from '@nestjs/core';

describe('InspectionItemsService', () => {
  let service: InspectionItemsService;
  let oInspectionItems;
  let mockInspectionRepository;
  let adminData;
  const requestStub = {
    session: {
      language: 'lan',
      userToken: 'token',
      userId: 'uId',
    },
  };

  beforeEach(async () => {
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

    adminData = new AdminDataDto({
      createdOn: new Date('2023-06-06T10:08:10.829Z'),
      updatedOn: new Date('2023-06-06T10:29:19.686Z'),
      createdBy: 'test@abc.com',
      updatedBy: 'null',
    });

    mockInspectionRepository = {
      findAll: jest.fn(() => {
        return oInspectionItems;
      }),
      findOne: jest.fn(() => {
        return {
          id: 'e0dfacf7-a972-4367-bc9a-d8c4a086a09b',
          ...oInspectionItems[0],
          ...adminData,
        };
      }),
      save: jest.fn().mockImplementation((oInspectionItemDto) => {
        return Promise.resolve({
          id: '123',
          ...oInspectionItemDto,
          ...adminData,
        });
      }),
      update: jest.fn().mockImplementation((id, oInspectionItemDto) => ({
        ...id,
        ...oInspectionItemDto,
      })),
      delete: jest.fn().mockImplementation(() => ({
        raw: [],
        affected: 1,
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InspectionItemsService,
        {
          provide: InspectionItemsRepository,
          useValue: mockInspectionRepository,
        },
        {
          provide: REQUEST,
          useValue: requestStub,
        },
      ],
    }).compile();

    service = module.get<InspectionItemsService>(InspectionItemsService);
  });

  afterEach(async () => {
    oInspectionItems = mockInspectionRepository = undefined;
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should be able to create inspection-item', async () => {
      try {
        const oResult = new InspectionItemResponseDto({
          id: '123',
          ...oInspectionItems[1],
          adminData,
        });
        const oInspectionItem = await service.create(oInspectionItems[1]);
        expect(oInspectionItem).toStrictEqual(oResult);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });
    it('should be able to handle error when saving inspection-item', async () => {
      try {
        jest
          .spyOn(mockInspectionRepository, 'save')
          .mockRejectedValue(new TypeORMError('Error Saving'));
        await service.create(oInspectionItems[1]);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('findAll', () => {
    it('should be able to findAll inspection-items', async () => {
      try {
        const oInspectionItem = await service.findAll();
        expect(oInspectionItem).toStrictEqual(oInspectionItems);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });
    it('should be able to handle error when getting all inspection-items', async () => {
      try {
        jest
          .spyOn(mockInspectionRepository, 'findAll')
          .mockRejectedValue(
            new TypeORMError('Error fetching inspection-items'),
          );
        await service.findAll();
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('findOne', () => {
    const sId = 'e0dfacf7-a972-4367-bc9a-d8c4a086a09b';
    it('should be able to findOne inspection-item', async () => {
      try {
        const oResult = new InspectionItemResponseDto({
          id: 'e0dfacf7-a972-4367-bc9a-d8c4a086a09b',
          ...oInspectionItems[0],
          adminData,
        });

        const oInspectionItem = await service.findOne(sId);
        expect(oInspectionItem).toStrictEqual(oResult);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });
    it('should be able to handle error when getting an inspection-item', async () => {
      try {
        jest
          .spyOn(mockInspectionRepository, 'findOne')
          .mockRejectedValue(
            new TypeORMError('Error fetching inspection-item'),
          );
        await service.findOne(sId);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('update', () => {
    const sId = 'e0dfacf7-a972-4367-bc9a-d8c4a086a09b';
    const oPatchBody = {
      description: 'Check toolkit items',
    };
    it('should be able to update inspection-item', async () => {
      try {
        const oResult = new InspectionItemResponseDto({
          id: 'e0dfacf7-a972-4367-bc9a-d8c4a086a09b',
          ...oInspectionItems[1],
          adminData,
        });
        jest.spyOn(mockInspectionRepository, 'update').mockResolvedValue({
          id: 'e0dfacf7-a972-4367-bc9a-d8c4a086a09b',
          ...oInspectionItems[1],
          ...adminData,
        });
        const oInspectionItem = await service.update(sId, oInspectionItems[0]);
        expect(oInspectionItem).toStrictEqual(oResult);
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
        jest
          .spyOn(mockInspectionRepository, 'update')
          .mockResolvedValue({ affected: 0 });
        await service.update(sId, oPatchBody);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getError().getStatus()).toBe(404);
      }
    });
    it('should be able to handle error when updating an inspection-item', async () => {
      try {
        jest
          .spyOn(mockInspectionRepository, 'update')
          .mockRejectedValue(
            new TypeORMError('Error updating inspection-item'),
          );
        await service.update(sId, oPatchBody);
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
    const sId = 'e0dfacf7-a972-4367-bc9a-d8c4a086a09b';
    it('should be able to remove an inspection-item', async () => {
      try {
        const oResponse = await service.remove(sId);
        expect(oResponse).toStrictEqual(oDeleteResponse);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });
    it('should throw NotFoundException when no resource found', async () => {
      try {
        jest.spyOn(mockInspectionRepository, 'delete').mockResolvedValue({
          affected: 0,
        });
        await service.remove(sId);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getError().getStatus()).toBe(404);
      }
    });
    it('should be able to handle error when removing an inspection-item', async () => {
      try {
        jest
          .spyOn(mockInspectionRepository, 'delete')
          .mockRejectedValue(
            new TypeORMError('Error deleting inspection-item'),
          );
        await service.remove(sId);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });
});
