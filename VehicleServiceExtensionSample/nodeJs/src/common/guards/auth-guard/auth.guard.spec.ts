import { Test, TestingModule } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { SESSION } from '../../constants';
import { Scope } from '../../../extension-modules/common/enums';

const xsappname = `vehicle-service!t173918`;

const refectorMock: Reflector = {
  getAllAndOverride: jest.fn(),
  get: jest.fn(),
  getAll: jest.fn(),
  getAllAndMerge: jest.fn(),
};
const requestMock = {
  url: '/mashups/',
  method: 'GET',
};
const executionContextMock: ExecutionContext = {
  getHandler: jest.fn(),
  getClass: jest.fn(),
  getArgs: jest.fn(),
  getArgByIndex: jest.fn(),
  switchToRpc: jest.fn(),
  switchToHttp: () => ({
    getRequest: () => requestMock,
  }),
  switchToWs: jest.fn(),
  getType: jest.fn(),
} as unknown as ExecutionContext;

describe(`AuthGuard`, () => {
  let authGuard: AuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGuard],
    })
      .overrideProvider(Reflector)
      .useValue(refectorMock)
      .compile();

    authGuard = await module.resolve<AuthGuard>(AuthGuard);
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    return expect(authGuard).toBeDefined();
  });

  it('Grant access if required scopes are there', () => {
    jest
      .spyOn(refectorMock, 'getAllAndOverride')
      .mockReturnValue([Scope.CreateJobCard]);
    const sessionData = {
      scopes: [`${xsappname}.${Scope.CreateJobCard}`],
    };
    requestMock[SESSION] = sessionData;
    process.env.xsappname = xsappname;
    const bAutorized = authGuard.canActivate(executionContextMock);
    expect(bAutorized).toBeTruthy();
  });

  it('Deny access if required scopes are not there', () => {
    jest
      .spyOn(refectorMock, 'getAllAndOverride')
      .mockReturnValue([Scope.CreateJobCard]);
    const sessionData = {
      scopes: [`${xsappname}.${Scope.DeleteJobCard}`],
    };
    requestMock[SESSION] = sessionData;
    process.env.xsappname = xsappname;
    const bAutorized = authGuard.canActivate(executionContextMock);
    expect(bAutorized).toBeFalsy();
  });

  it('Grant access if required scopes are not defined in the API', () => {
    jest.spyOn(refectorMock, 'getAllAndOverride').mockReturnValue(undefined);
    const sessionData = {
      scopes: [`${xsappname}.${Scope.CreateJobCard}`],
    };
    requestMock[SESSION] = sessionData;
    process.env.xsappname = xsappname;
    const bAutorized = authGuard.canActivate(executionContextMock);
    expect(bAutorized).toBeTruthy();
  });
});
