import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesRepository } from './employees.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Employee } from '../entities/employee.entity';
import { CustomLogger } from '../../../logger/logger.service';
import { EmployeesResponse } from '../../../../test/mock-data/modules/employees.mock.data';
import { EmployeeResponseDto } from '../dto/response-employee.dto';
import { REQUEST } from '@nestjs/core';
import { RequestMock } from '../../../../test/mock-data/common.mock.data';

describe('EmployeesRepository', () => {
  let employeesRepo: EmployeesRepository;
  const mockEmployeesRepository = {};
  const mockCustomLogger = {
    setClassName: jest.fn(),
    debug: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesRepository,
        {
          provide: REQUEST,
          useValue: RequestMock,
        },
        {
          provide: getRepositoryToken(Employee),
          useValue: mockEmployeesRepository,
        },
        { provide: CustomLogger, useValue: mockCustomLogger },
      ],
    }).compile();
    employeesRepo = module.get<EmployeesRepository>(EmployeesRepository);
  });

  it('should be defined', () => {
    expect(employeesRepo).toBeDefined();
  });

  describe('findOneEmployee', () => {
    it('Should fetch one employee from DB', async () => {
      jest
        .spyOn(employeesRepo, 'findOne')
        .mockResolvedValue(EmployeesResponse as unknown as Employee);
      const res = await employeesRepo.findOneEmployee(EmployeesResponse.id);
      expect(res.id).toEqual(EmployeesResponse.id);
    });
  });

  describe('findAllEmployees', () => {
    it('Should fetch all Employees from DB', async () => {
      jest
        .spyOn(employeesRepo, 'findAll')
        .mockResolvedValue([EmployeesResponse] as unknown as [Employee]);
      const res = await employeesRepo.findAllEmployees({});
      expect(res[0]).toBeInstanceOf(EmployeeResponseDto);
    });
  });

  describe('updateEmployee', () => {
    it('Should update an Employee', async () => {
      jest
        .spyOn(employeesRepo, 'update')
        .mockResolvedValue(EmployeesResponse as unknown as Employee);
      const res = await employeesRepo.updateEmployee(
        'id',
        {
          name: 'Tony',
        },
        'userId',
      );
      expect(res.id).toEqual(EmployeesResponse.id);
    });
  });
});
