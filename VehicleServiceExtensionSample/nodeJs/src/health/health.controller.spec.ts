import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import {
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';

const httpHealthIndicatorStub: HttpHealthIndicator = {
  pingCheck: async () => {
    return Promise.resolve({
      serverrunning: {
        status: 'up',
        message: 'dummy running',
      },
    } as HealthIndicatorResult);
  },
} as unknown as HttpHealthIndicator;
const healthCheckServiceStub: HealthCheckService = {
  check: async (a) => {
    const result = true;
    for (let i = 0; i < a.length; i++) {
      await a[i]().catch(() => Promise.reject(false));
    }
    return Promise.resolve(result);
  },
} as unknown as HealthCheckService;

const mockTypeOrmHealthIndicator: TypeOrmHealthIndicator = {
  pingCheck: async () => {
    return Promise.resolve({
      serverrunning: {
        status: 'up',
        message: 'dummy running',
      },
    } as HealthIndicatorResult);
  },
} as unknown as TypeOrmHealthIndicator;

const appHealthServiceStub: HealthService = new HealthService();
describe('HealthController', () => {
  let healthController: HealthController;
  beforeEach(async () => {
    const healthModule: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        HealthService,
        HealthCheckService,
        HttpHealthIndicator,
        TypeOrmHealthIndicator,
      ],
    })
      .overrideProvider(HealthCheckService)
      .useValue(healthCheckServiceStub)
      .overrideProvider(HttpHealthIndicator)
      .useValue(httpHealthIndicatorStub)
      .overrideProvider(HealthService)
      .useValue(appHealthServiceStub)
      .overrideProvider(TypeOrmHealthIndicator)
      .useValue(mockTypeOrmHealthIndicator)
      .compile();

    healthController = healthModule.get<HealthController>(HealthController);
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(healthController).toBeDefined();
  });

  describe('check', () => {
    it('should return the DB server status', async () => {
      appHealthServiceStub.setServerRunning(true);
      await expect(healthController.check()).resolves.toBe(true);
    });

    it('should throw error if any service fail', async () => {
      appHealthServiceStub.setServerRunning(false);
      await expect(healthController.check()).rejects.toBe(false);
    });
  });
});
