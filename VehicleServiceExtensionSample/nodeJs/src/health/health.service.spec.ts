import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthService],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('isServerRunning', () => {
    it('should return server running state', async () => {
      try {
        service.setServerRunning(true);
        const result = await service.isServerRunning('abc');
        expect(result.abc.message).toBe('Server Running: true');
      } catch (error) {
        expect(error).toBe(undefined);
      }
    });

    it('should return error Server is not running', async () => {
      try {
        service.setServerRunning(false);
        await service.isServerRunning('abc');
      } catch (error) {
        expect(error.message).toBe('Server is not running');
      }
    });
  });
});
