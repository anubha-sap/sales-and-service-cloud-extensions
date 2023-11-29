import { UnauthorizedException } from '@nestjs/common';
import { SESSION } from '../constants';
import { SessionMiddleware } from './session.middleware';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomLogger } from '../../logger/logger.service';
import { ConfigService } from '@nestjs/config';

describe('SessionMiddleware', () => {
  let sessionMiddleware: SessionMiddleware;
  const next = jest.fn();
  const mockCustomLogger = {
    setClassName: jest.fn(),
    log: jest.fn(),
    debug: jest.fn(),
  };
  const mockConfigService = {
    get: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionMiddleware,
        { provide: CustomLogger, useValue: mockCustomLogger },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();
    sessionMiddleware = module.get<SessionMiddleware>(SessionMiddleware);
  });

  it('should be defined', () => {
    expect(sessionMiddleware).toBeDefined();
  });

  it('should set hardcoded session data for LOCALHOST when jwt token is not passed and not port forwarded', () => {
    const req = {
      hostname: 'LOCALHOST',
      headers: {
        'accept-language': 'es',
        Authorization:
          'Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vZXh0ZXJuYWwtZnVuYy1zZXJ2aWNlcy5hdXRoZW50aWNhdGlvbi5ldTEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktLTIxMDA1NDMxMDIiLCJ0eXAiOiJKV1QiLCJqaWQiOiAiSUhLUHpRNWVGTk1xbklaS3pLbmVNK2JCRmFWUm0yZ045VnQ3RC9uVzlRdz0ifQ.eyJqdGkiOiI4M2IzMTY2NWRjNmY0Y2ZiOGQ5ZjdlNjZjYzFmODBmMCIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiJiNWFkYTllOC02NjY1LTQ3NGEtOGU5NC1hZjYxMzU4NTkwZGQiLCJ6ZG4iOiJleHRlcm5hbC1mdW5jLXNlcnZpY2VzIiwib2lkY0lzc3VlciI6Imh0dHBzOi8vc2Fwc2FsZXNzZXJ2aWNlZXh0cmVmLmFjY291bnRzLm9uZGVtYW5kLmNvbSJ9LCJ1c2VyX3V1aWQiOiI3MmExYjM1NC03YWQwLTRmYTktYWY0OC0wMWM3NzA3MjdmZmQiLCJ4cy51c2VyLmF0dHJpYnV0ZXMiOnt9LCJ4cy5zeXN0ZW0uYXR0cmlidXRlcyI6eyJ4cy5yb2xlY29sbGVjdGlvbnMiOlsiU3ViYWNjb3VudCBTZXJ2aWNlIEFkbWluaXN0cmF0b3IiLCJleGZzLXZlaGljbGUtc2VydmljZS1yb2xlLWNvbGxlY3Rpb24iLCJTQVAgSEFOQSBDbG91ZCBBZG1pbmlzdHJhdG9yIiwiRGVzdGluYXRpb24gQWRtaW5pc3RyYXRvciIsIkNsb3VkIENvbm5lY3RvciBBZG1pbmlzdHJhdG9yIiwiQnVzaW5lc3NfQXBwbGljYXRpb25fU3R1ZGlvX0FkbWluaXN0cmF0b3IiLCJCdWlsZEFwcHNfRGV2ZWxvcGVyIiwiU3ViYWNjb3VudCBBZG1pbmlzdHJhdG9yIiwiQnVpbGRBcHBzX0FkbWluaXN0cmF0b3IiLCJDb25uZWN0aXZpdHkgYW5kIERlc3RpbmF0aW9uIEFkbWluaXN0cmF0b3IiLCJTQVAgSEFOQSBDbG91ZCBTZWN1cml0eSBBZG1pbmlzdHJhdG9yIl19LCJnaXZlbl9uYW1lIjoiVG9ueSIsImZhbWlseV9uYW1lIjoiTWF0aGV3Iiwic3ViIjoiYjQwNDIzNDAtM2E4Yi00MmIzLWI5ODMtNWRiMzNjYWEzMzFiIiwic2NvcGUiOlsib3BlbmlkIl0sImNsaWVudF9pZCI6InNiLW5hLTZiNWU1MDg0LWYyNmQtNDA1NS1iNWZiLTg4NjljNzNiNDAzNiF0MTczOTE4IiwiY2lkIjoic2ItbmEtNmI1ZTUwODQtZjI2ZC00MDU1LWI1ZmItODg2OWM3M2I0MDM2IXQxNzM5MTgiLCJhenAiOiJzYi1uYS02YjVlNTA4NC1mMjZkLTQwNTUtYjVmYi04ODY5YzczYjQwMzYhdDE3MzkxOCIsImdyYW50X3R5cGUiOiJhdXRob3JpemF0aW9uX2NvZGUiLCJ1c2VyX2lkIjoiYjQwNDIzNDAtM2E4Yi00MmIzLWI5ODMtNWRiMzNjYWEzMzFiIiwib3JpZ2luIjoic2FwLmN1c3RvbSIsInVzZXJfbmFtZSI6InRvbnkubWF0aGV3QHNhcC5jb20iLCJlbWFpbCI6InRvbnkubWF0aGV3QHNhcC5jb20iLCJhdXRoX3RpbWUiOjE2OTIzNzAyMjgsInJldl9zaWciOiI1ZWFmNDczMiIsImlhdCI6MTY5MjM3MDIyOSwiZXhwIjoxNjkyNDEzNDI5LCJpc3MiOiJodHRwczovL2V4dGVybmFsLWZ1bmMtc2VydmljZXMuYXV0aGVudGljYXRpb24uZXUxMC5oYW5hLm9uZGVtYW5kLmNvbS9vYXV0aC90b2tlbiIsInppZCI6ImI1YWRhOWU4LTY2NjUtNDc0YS04ZTk0LWFmNjEzNTg1OTBkZCIsImF1ZCI6WyJzYi1uYS02YjVlNTA4NC1mMjZkLTQwNTUtYjVmYi04ODY5YzczYjQwMzYhdDE3MzkxOCIsIm9wZW5pZCJdfQ.RAQRTS-5bKUYQxhIF6TpRBR5JIPE04eSUQjGItVMbfFvoHpxaJNURerwQOWVjSA9avdu3YNgM24xL0Wm6qVtQ4lfkJxqPpMs974JCdBkpXMcNXA4jR17w9fObjsygLzP-8C_sdJFGjs6TZ3VoIZ9F1RTdea2uJW4QyDwXnn1wu4ltXKD-my1VGDzH6ly1sMPUdL9BF2u3hpv8ZXj5x91uBWrDWOC2qIO-5WttcdLJALlCMJzLNUsUQzM1ah43pjYtpVPbRTSkbfBOIsQIjnu_-L6XtdwT7kXCKkqkX7ygkZzkYSbpALyyF_neDrM-y_HQNV2WxEV0M6nsXt-C1ihUw',
      },
    };
    sessionMiddleware.use(req as any, {} as any, next);
    expect(req[SESSION].language).toEqual(req.headers['accept-language']);
  });

  it('should handle when there is no authorization header', () => {
    try {
      const req = {
        hostname: 'LOCALHOST',
        headers: {
          'accept-language': 'es',
        },
      };
      sessionMiddleware.use(req as any, {} as any, next);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
  });
});
