import { NotFoundException } from '@nestjs/common';
import { BaseRepository } from './base-repository';

class DummyEntity {
  id: string;
}
const oDummyEntityInstance = {
  save: jest.fn(),
  findOneBy: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findAndCount: jest.fn(),
  target: {
    name: 'dummy',
  },
};
const oDummyData = {
  name: 'Derik',
};
const updatedBy = 'user';
describe('BaseRepository', () => {
  class TestService extends BaseRepository<DummyEntity> {
    constructor(private readonly dummyRepo) {
      super(dummyRepo);
    }
  }
  let oBaseRepo: TestService;
  beforeEach(async () => {
    oBaseRepo = new TestService(oDummyEntityInstance);
  });

  it('should save', async () => {
    jest.spyOn(oDummyEntityInstance, 'save').mockResolvedValue(oDummyData);
    const oVal = await oBaseRepo.save({});
    expect(oVal).toBe(oDummyData);
  });

  describe('findOne', () => {
    it('should findOne', async () => {
      jest
        .spyOn(oDummyEntityInstance, 'findOneBy')
        .mockResolvedValue(oDummyData);
      const oVal = await oBaseRepo.findOne('id');
      expect(oVal).toBe(oDummyData);
    });
    it('should handle cases when no items found', async () => {
      jest.spyOn(oDummyEntityInstance, 'findOneBy').mockResolvedValue(null);
      try {
        await oBaseRepo.findOne('id');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  it('should findAll', async () => {
    jest.spyOn(oDummyEntityInstance, 'find').mockResolvedValue([oDummyData]);
    const oVal = await oBaseRepo.findAll({});
    expect(oVal).toEqual([oDummyData]);
  });

  it('should findAndCount', async () => {
    jest
      .spyOn(oDummyEntityInstance, 'findAndCount')
      .mockResolvedValue([[oDummyData], 1]);
    const oVal = await oBaseRepo.findAndCount({});
    expect(oVal).toEqual([[oDummyData], 1]);
  });

  describe('delete', () => {
    const oDeleteResponse = {
      raw: [],
      affected: 1,
    };
    it('should delete', async () => {
      jest
        .spyOn(oDummyEntityInstance, 'delete')
        .mockResolvedValue(oDeleteResponse);
      const oVal = await oBaseRepo.delete('id');
      expect(oVal).toBe(oDeleteResponse);
    });
    it('should handle cases when no items found', async () => {
      oDeleteResponse.affected = 0;
      jest
        .spyOn(oDummyEntityInstance, 'delete')
        .mockResolvedValue(oDeleteResponse);
      try {
        await oBaseRepo.delete('id');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update', () => {
    const oUpdateResponse = {
      raw: [],
      affected: 1,
    };
    it('should update', async () => {
      jest
        .spyOn(oDummyEntityInstance, 'update')
        .mockResolvedValue(oUpdateResponse);
      jest
        .spyOn(oDummyEntityInstance, 'findOneBy')
        .mockResolvedValue(oDummyData);
      const oVal = await oBaseRepo.update('id', {}, updatedBy);
      expect(oVal).toBe(oDummyData);
    });
    it('should handle cases when no items found', async () => {
      oUpdateResponse.affected = 0;
      jest
        .spyOn(oDummyEntityInstance, 'update')
        .mockResolvedValue(oUpdateResponse);
      try {
        await oBaseRepo.update('id', {}, updatedBy);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
