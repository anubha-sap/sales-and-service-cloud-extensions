import { Test, TestingModule } from '@nestjs/testing';
import { InspectionItemsService } from './inspection-items.service';
import { TypeORMError } from 'typeorm';
import { ServerException } from '../../common/filters/server-exception';
import { MESSAGES } from '../../common/constants';
import { InspectionItemsRepository } from './repository/inspection-items.repository';
import { REQUEST } from '@nestjs/core';
import {
  InspectionItemsDTO,
  InspectionItemsResponse,
  InspectionItemsResponseDTO,
} from '../../../test/mock-data/modules/inspection-items.mock.data';
import { RequestMock } from '../../../test/mock-data/common.mock.data';

describe('InspectionItemsService', () => {
  let service: InspectionItemsService;
  const mockInspectionRepository = {
    findAll: jest.fn().mockImplementation(() => {
      return [InspectionItemsResponse];
    }),
    findOne: jest.fn().mockImplementation(() => {
      return InspectionItemsResponse;
    }),
    save: jest.fn().mockImplementation((oInspectionItemDto) => {
      return Promise.resolve(InspectionItemsResponse);
    }),
    update: jest
      .fn()
      .mockImplementation((id, oInspectionItemDto) => InspectionItemsResponse),
    delete: jest.fn().mockImplementation(() => ({
      raw: [],
      affected: 1,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InspectionItemsService,
        {
          provide: InspectionItemsRepository,
          useValue: mockInspectionRepository,
        },
        {
          provide: REQUEST,
          useValue: RequestMock,
        },
      ],
    }).compile();

    service = module.get<InspectionItemsService>(InspectionItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should be able to create inspection-item', async () => {
      try {
        const oInspectionItem = await service.create(InspectionItemsDTO);
        expect(oInspectionItem).toEqual(InspectionItemsResponseDTO);
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });
    it('should be able to handle error when saving inspection-item', async () => {
      try {
        jest
          .spyOn(mockInspectionRepository, 'save')
          .mockRejectedValue(new TypeORMError('Error Saving'));
        await service.create(InspectionItemsDTO);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('findAll', () => {
    it('should be able to findAll inspection-items', async () => {
      try {
        const oInspectionItem = await service.findAll();
        expect(oInspectionItem).toStrictEqual([InspectionItemsResponse]);
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
    it('should be able to findOne inspection-item', async () => {
      try {
        const oInspectionItem = await service.findOne(
          InspectionItemsResponseDTO.id,
        );
        expect(oInspectionItem).toEqual(InspectionItemsResponseDTO);
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
        await service.findOne(InspectionItemsResponseDTO.id);
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
        jest
          .spyOn(mockInspectionRepository, 'update')
          .mockResolvedValue(InspectionItemsResponse);
        const oInspectionItem = await service.update(sId, InspectionItemsDTO);
        expect(oInspectionItem).toEqual(InspectionItemsResponseDTO);
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
