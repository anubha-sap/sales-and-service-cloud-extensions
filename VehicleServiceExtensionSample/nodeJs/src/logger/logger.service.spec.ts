import { Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomLogger } from './logger.service';

describe('CustomLogger', () => {
  let customLogger;
  const className = 'testClassName';
  const mockRequest = {
    session: {
      jwtToken: 'jwtToken',
      b3TraceId: 'b3traceId',
      log: 4,
    },
  };
  let testMessage = 'test message';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomLogger,
        {
          provide: REQUEST,
          useValue: mockRequest,
        },
      ],
    }).compile();
    customLogger = await module.resolve<CustomLogger>(CustomLogger);
    customLogger.setClassName(className);
    testMessage = 'test message';
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(customLogger).toBeDefined();
  });

  it('should log debug when log level is 4', async () => {
    const logSpy = jest.spyOn(Logger, 'debug');
    await customLogger.debug(testMessage);
    const logMessage = `[${className}] - ${testMessage}`;
    expect(logSpy).toHaveBeenCalledWith(logMessage);
    logSpy.mockReset();
  });

  it('should not log debug when log level is less than 4', async () => {
    const logSpy = jest.spyOn(Logger, 'debug');
    mockRequest.session.log = 3;
    await customLogger.debug(testMessage);
    expect(logSpy).toHaveBeenCalledTimes(0);
    logSpy.mockReset();
  });

  it('should log info when log level is 4', async () => {
    const logSpy = jest.spyOn(Logger, 'log');
    await customLogger.log(testMessage);
    const logMessage = `[${className}] - ${testMessage}`;
    expect(logSpy).toHaveBeenCalledWith(logMessage);
    logSpy.mockReset();
  });

  it('should log info when log level is 3', async () => {
    const logSpy = jest.spyOn(Logger, 'log');
    const modifiedRequest = JSON.parse(JSON.stringify(mockRequest));
    modifiedRequest.session.log = 3;
    await customLogger.log(testMessage);
    const logMessage = `[${className}] - ${testMessage}`;
    expect(logSpy).toHaveBeenCalledWith(logMessage);
    logSpy.mockReset();
  });

  it('should not log info when log level is less than 3', async () => {
    const logSpy = jest.spyOn(Logger, 'log');
    mockRequest.session.log = 2;
    await customLogger.log(testMessage);
    expect(logSpy).toHaveBeenCalledTimes(0);
    logSpy.mockReset();
  });

  it('should log warn when log level is 4', async () => {
    const logSpy = jest.spyOn(Logger, 'warn');
    await customLogger.warn(testMessage);
    const logMessage = `[${className}] - ${testMessage}`;
    expect(logSpy).toHaveBeenCalledWith(logMessage);
    logSpy.mockReset();
  });

  it('should log warn when log level is 3', async () => {
    const logSpy = jest.spyOn(Logger, 'warn');
    const modifiedRequest = JSON.parse(JSON.stringify(mockRequest));
    modifiedRequest.session.log = 3;
    await customLogger.warn(testMessage);
    const logMessage = `[${className}] - ${testMessage}`;
    expect(logSpy).toHaveBeenCalledWith(logMessage);
    logSpy.mockReset();
  });

  it('should log warn when log level is 2', async () => {
    const logSpy = jest.spyOn(Logger, 'warn');
    const modifiedRequest = JSON.parse(JSON.stringify(mockRequest));
    modifiedRequest.session.log = 2;
    await customLogger.warn(testMessage);
    const logMessage = `[${className}] - ${testMessage}`;
    expect(logSpy).toHaveBeenCalledWith(logMessage);
    logSpy.mockReset();
  });

  it('should not log warn when log level is less than 2', async () => {
    const logSpy = jest.spyOn(Logger, 'warn');
    mockRequest.session.log = 1;
    await customLogger.warn(testMessage);
    expect(logSpy).toHaveBeenCalledTimes(0);
    logSpy.mockReset();
  });

  it('should log error when log level is 4', async () => {
    const logSpy = jest.spyOn(Logger, 'error');
    await customLogger.error(testMessage);
    const logMessage = `[${className}] - ${testMessage}`;
    expect(logSpy).toHaveBeenCalledWith(logMessage);
    logSpy.mockReset();
  });

  it('should log error when log level is 3', async () => {
    const logSpy = jest.spyOn(Logger, 'error');
    const modifiedRequest = JSON.parse(JSON.stringify(mockRequest));
    modifiedRequest.session.log = 3;
    await customLogger.error(testMessage);
    const logMessage = `[${className}] - ${testMessage}`;
    expect(logSpy).toHaveBeenCalledWith(logMessage);
    logSpy.mockReset();
  });

  it('should log error when log level is 2', async () => {
    const logSpy = jest.spyOn(Logger, 'error');
    const modifiedRequest = JSON.parse(JSON.stringify(mockRequest));
    modifiedRequest.session.log = 2;
    await customLogger.error(testMessage);
    const logMessage = `[${className}] - ${testMessage}`;
    expect(logSpy).toHaveBeenCalledWith(logMessage);
    logSpy.mockReset();
  });

  it('should log error when log level is 1', async () => {
    const logSpy = jest.spyOn(Logger, 'error');
    const modifiedRequest = JSON.parse(JSON.stringify(mockRequest));
    modifiedRequest.session.log = 1;
    await customLogger.error(testMessage);
    const logMessage = `[${className}] - ${testMessage}`;
    expect(logSpy).toHaveBeenCalledWith(logMessage);
    logSpy.mockReset();
  });

  it('should not log error when log level is less than 1', async () => {
    const logSpy = jest.spyOn(Logger, 'error');
    mockRequest.session.log = 0;
    await customLogger.error(testMessage);
    expect(logSpy).toHaveBeenCalledTimes(0);
    logSpy.mockReset();
  });

  it('should handle when log level in request is invalid', async () => {
    const logSpy = jest.spyOn(Logger, 'error');
    mockRequest.session.log = 6;
    await customLogger.error(testMessage);
    const logMessage = `[${className}] - ${testMessage}`;
    expect(logSpy).toHaveBeenCalledWith(logMessage);
    logSpy.mockReset();
  });
});
