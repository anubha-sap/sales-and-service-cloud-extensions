import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from './service.controller';
import { ServicesService } from './service.service';

describe('ServicesController', () => {
  let servicesController: ServicesController;
  const tasks = [
    {
      taskId: '111',
      task: 'REPLACE_OIL_FILTER',
      taskDescription: 'Replace oil filter',
      assignee: 'Smith',
      status: 'OPEN',
    },
    {
      taskId: '121',
      task: 'REFILL_ENGINE_WITH_NEW_OIL',
      taskDescription: 'Refill engine with new oil',
      assignee: 'Chris',
      status: 'OPEN',
    },
  ];
  const serviceDto = {
    service: 'REPLACE_OIL_FILTER',
    minMileage: 0,
    maxMileage: 5000,
    price: '5000',
    ert: 120,
    isSelected: false,
  };
  const mockTaskService = {
    findAll: jest.fn(() => {
      return tasks;
    }),
    findOne: jest.fn(() => {
      return tasks[0];
    }),
    create: jest.fn((taskDto) => {
      return {
        id: '123',
        ...taskDto,
      };
    }),
    update: jest.fn().mockImplementation((id, taskDto) => ({
      id,
      ...taskDto,
    })),
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
      .useValue(mockTaskService)
      .compile();

    servicesController = module.get<ServicesController>(ServicesController);
  });

  it('should be defined', () => {
    expect(servicesController).toBeDefined();
  });

  it('should return array of tasks', async () => {
    const res = await servicesController.findAll();
    expect(mockTaskService.findAll).toHaveBeenCalled();
    expect(res).toBe(tasks);
  });

  it('should return selected task', async () => {
    const res = await servicesController.findOne('111');
    expect(mockTaskService.findOne).toHaveBeenCalled();
    expect(res).toBe(tasks[0]);
  });

  it('should create a task', async () => {
    const res = await servicesController.create(serviceDto);
    expect(res).toEqual({ id: '123', ...serviceDto });
    expect(mockTaskService.create).toHaveBeenCalledWith(serviceDto);
  });

  it('should update the task', async () => {
    const res = await servicesController.update('123', serviceDto);
    expect(res).toEqual({ id: '123', ...serviceDto });
    expect(mockTaskService.update).toHaveBeenCalledWith('123', serviceDto);
  });

  it('should delete the task', async () => {
    const res = await servicesController.remove('111');
    expect(res).toEqual({ id: '111' });
    expect(mockTaskService.remove).toHaveBeenCalledWith('111');
  });
});
