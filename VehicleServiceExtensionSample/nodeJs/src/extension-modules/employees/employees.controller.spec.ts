import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import {
  EmployeesDTO,
  EmployeesResponse,
} from '../../../test/mock-data/modules/employees.mock.data';
import { UtilsService } from '../../utils/utils.service';

describe('EmployeesController', () => {
  let controller: EmployeesController;
  const mockEmployeesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    replace: jest.fn(),
    remove: jest.fn(),
  };

  const mockUtilsService = {
    parseFilterString: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        {
          provide: EmployeesService,
          useValue: mockEmployeesService,
        },
        {
          provide: UtilsService,
          useValue: mockUtilsService,
        },
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create new employee', async () => {
    const spy = jest.spyOn(mockEmployeesService, 'create');
    await controller.create(EmployeesDTO);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should be able to find all employees', async () => {
    const spy = jest.spyOn(mockEmployeesService, 'findAll');
    const utilServiceSpy = jest.spyOn(mockUtilsService, 'parseFilterString');
    await controller.findAll({});
    expect(utilServiceSpy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should be able to find one employee by id', async () => {
    const oFindOneQuery = 'b9a0af7c-8114-48fb-88eb-f463b0070934';
    const spy = jest.spyOn(mockEmployeesService, 'findOne');
    await controller.findOne(oFindOneQuery);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should be able to patch a employeeby id', async () => {
    const spy = jest.spyOn(mockEmployeesService, 'update');
    await controller.update(EmployeesResponse.id, EmployeesDTO);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should be able to do put operation on a employee by id', async () => {
    const sId = 'b9a0af7c-8114-48fb-88eb-f463b0070934';
    const spy = jest.spyOn(mockEmployeesService, 'remove');
    await controller.remove(sId);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
