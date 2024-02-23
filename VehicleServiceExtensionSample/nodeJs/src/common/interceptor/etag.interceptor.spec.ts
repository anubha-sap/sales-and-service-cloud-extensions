import { JobCardResponseDTO } from '../../../test/mock-data/modules/job-card.mock.data';
import { EtagInterceptor } from './etag.interceptor';
import * as rxjs from 'rxjs/operators';

describe('ETag Interceptor testing', () => {
  let eTagInterceptor, response, requestMock, headerMock, context;

  beforeAll(() => {
    response = JobCardResponseDTO;
    eTagInterceptor = new EtagInterceptor();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(rxjs, 'map').mockImplementation(
      jest.fn().mockImplementation((cbk) => {
        cbk(response);
      }),
    );

    headerMock = jest.fn();

    requestMock = {
      url: '/job-cards/',
      method: 'GET',
      res: {
        header: headerMock,
      },
    };

    context = {
      switchToHttp: () => ({
        getRequest: () => requestMock,
      }),
    };
  });
  afterEach(async () => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(eTagInterceptor).toBeDefined();
  });

  it('should add eTag to response header when its a GET method', () => {
    const next = {
      handle: jest.fn().mockReturnValue({
        pipe: jest.fn(),
      }),
    };
    requestMock.method = 'GET';
    eTagInterceptor.intercept(context, next);
    expect(headerMock).toHaveBeenCalled();
    headerMock.mockReset();
  });

  it('should not add eTag to response header when response is null', () => {
    const next = {
      handle: jest.fn().mockReturnValue({
        pipe: jest.fn(),
      }),
    };
    requestMock.method = 'PUT';
    response = null;
    eTagInterceptor.intercept(context, next);
    expect(headerMock).toHaveBeenCalledTimes(0);
    headerMock.mockReset();
  });
});
