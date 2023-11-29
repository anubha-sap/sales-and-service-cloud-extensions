import { Test, TestingModule } from '@nestjs/testing';
import * as rxjs from 'rxjs/operators';
import { CustomLogger } from '../../logger/logger.service';
import { mocked } from 'jest-mock';
import { LoggingInterceptor } from './logging.interceptor';
import { SESSION } from '../constants';
jest.mock('../../logger/logger.service', () => {
  return {
    CustomLogger: jest.fn(),
  };
});
const requestMock = {
  url: '/job-cards/',
  method: 'GET',
  [SESSION]: { reqId: 1 },
  res: {
    header: jest.fn(),
  },
};
export const argumentHostMock: any = {
  switchToHttp: () => ({
    getRequest: () => requestMock,
  }),
};

describe('Test Logging Interceptor', () => {
  let logginInterceptor: LoggingInterceptor,
    loggerMock: any,
    debugMock,
    logMock;
  beforeEach(async () => {
    jest.spyOn(global.Date, 'now').mockReturnValue(2 as any);
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggingInterceptor],
    }).compile();
    logginInterceptor = module.get<LoggingInterceptor>(LoggingInterceptor);
    loggerMock = mocked(CustomLogger, true);
    debugMock = jest.fn();
    logMock = jest.fn();
    loggerMock.mockImplementation(() => {
      return {
        setClassName: jest.fn(),
        debug: debugMock,
        log: logMock,
      };
    });
  });

  it('should be defined', () => {
    expect(logginInterceptor).toBeDefined();
  });

  it('should intercept and log the time taken to serve the request', () => {
    jest.spyOn(rxjs, 'tap').mockImplementation(
      jest.fn().mockImplementation((cbk) => {
        cbk();
      }),
    );
    const next = {
      handle: jest.fn().mockReturnValue({
        pipe: jest.fn(),
      }),
    };
    logginInterceptor.intercept(argumentHostMock, next);
    expect(debugMock).toHaveBeenNthCalledWith(
      1,
      'Request received for request 1 for GET on /job-cards/',
    );
    expect(debugMock).toHaveBeenNthCalledWith(
      2,
      'Request for request 1 for GET on /job-cards/ was served in 0 seconds',
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
