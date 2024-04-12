import { Test, TestingModule } from '@nestjs/testing';
import { TypeORMError } from 'typeorm';
import { ServerException } from '../../common/filters/server-exception';
import { MESSAGES } from '../../common/constants';
import { REQUEST } from '@nestjs/core';
import { RequestMock } from '../../../test/mock-data/common.mock.data';
import { EmployeesService } from './employees.service';
import {
  EmployeesDTO,
  EmployeesResponse,
  EmployeesResponseDto,
} from '../../../test/mock-data/modules/employees.mock.data';
import { EmployeesRepository } from './repository/employees.repository';

describe('EmployeesService', () => {
  let service: EmployeesService;
  const mockEmployeesRepository = {
    findAllEmployees: jest.fn().mockImplementation(() => {
      return [EmployeesResponseDto];
    }),
    findOneEmployee: jest.fn().mockImplementation(() => {
      return EmployeesResponseDto;
    }),
    save: jest.fn().mockImplementation((oEmployeeDto) => {
      return Promise.resolve(EmployeesResponse);
    }),
    updateEmployee: jest
      .fn()
      .mockImplementation((id, oEmployeeDto) => EmployeesResponseDto),
    delete: jest.fn().mockImplementation(() => ({
      raw: [],
      affected: 1,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: EmployeesRepository,
          useValue: mockEmployeesRepository,
        },
        {
          provide: REQUEST,
          useValue: RequestMock,
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should be able to create an employee', async () => {
      const oEmployee = await service.create(EmployeesDTO);
      expect(oEmployee).toEqual(EmployeesResponseDto);
    });
    it('should be able to handle error when saving an employee', async () => {
      try {
        jest
          .spyOn(mockEmployeesRepository, 'save')
          .mockRejectedValue(new TypeORMError('Error Saving'));
        await service.create(EmployeesDTO);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('findAll', () => {
    it('should be able to findAll employees', async () => {
      const oEmployee = await service.findAll({});
      expect(oEmployee).toStrictEqual([EmployeesResponseDto]);
    });
    it('should be able to handle error when getting all employees', async () => {
      try {
        jest
          .spyOn(mockEmployeesRepository, 'findAllEmployees')
          .mockRejectedValue(new TypeORMError('Error fetching employees'));
        await service.findAll({});
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('findOne', () => {
    it('should be able to findOne employee', async () => {
      const oEmployee = await service.findOne(EmployeesResponseDto.id);
      expect(oEmployee).toEqual(EmployeesResponseDto);
    });
    it('should be able to handle error when getting an employee', async () => {
      try {
        jest
          .spyOn(mockEmployeesRepository, 'findOneEmployee')
          .mockRejectedValue(new TypeORMError('Error fetching employee'));
        await service.findOne(EmployeesResponseDto.id);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('update', () => {
    it('should be able to update employee', async () => {
      const oEmployee = await service.update(
        EmployeesResponse.id,
        EmployeesDTO,
      );
      expect(oEmployee).toEqual(EmployeesResponseDto);
    });
    it('should be able to handle when no update data is passed', async () => {
      try {
        await service.update(EmployeesResponse.id, {});
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getErrorMessage()).toBe(MESSAGES.NO_UPDATE_DATA);
      }
    });
    it('should throw NotFoundException when no resource found', async () => {
      try {
        jest
          .spyOn(mockEmployeesRepository, 'updateEmployee')
          .mockResolvedValue({ affected: 0 });
        await service.update(EmployeesResponse.id, EmployeesDTO);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getError().getStatus()).toBe(404);
      }
    });
    it('should be able to handle error when updating an employee', async () => {
      try {
        jest
          .spyOn(mockEmployeesRepository, 'updateEmployee')
          .mockRejectedValue(new TypeORMError('Error updating employee'));
        await service.update(EmployeesResponse.id, EmployeesDTO);
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
    it('should be able to remove an employee', async () => {
      const oResponse = await service.remove(EmployeesResponse.id);
      expect(oResponse).toStrictEqual(oDeleteResponse);
    });
    it('should throw NotFoundException when no resource found', async () => {
      try {
        jest.spyOn(mockEmployeesRepository, 'delete').mockResolvedValue({
          affected: 0,
        });
        await service.remove(EmployeesResponse.id);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
        expect(error.getError().getStatus()).toBe(404);
      }
    });
    it('should be able to handle error when removing an employee', async () => {
      try {
        jest
          .spyOn(mockEmployeesRepository, 'delete')
          .mockRejectedValue(new TypeORMError('Error deleting employee'));
        await service.remove(EmployeesResponse.id);
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });

  describe('getCurrentUserInfo', () => {
    it('should be able to get logged in users info', async () => {
      const oUserInfo = await service.getCurrentUserInfo();
      expect(oUserInfo).toHaveProperty('userName');
      expect(oUserInfo).toHaveProperty('scopes');
    });
    it('should be able to handle error when getting logged in user info', async () => {
      try {
        delete RequestMock.session;
        await service.getCurrentUserInfo();
      } catch (error) {
        expect(error).toBeInstanceOf(ServerException);
      }
    });
  });
});
