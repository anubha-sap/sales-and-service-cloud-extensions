import { EtagInterceptor } from './etag.interceptor';
import * as rxjs from 'rxjs/operators';

describe('ETag Interceptor testing', () => {
  let eTagInterceptor, response, requestMock, headerMock, context;
  const jobCardResponse = {
    id: 'f3bd112c-3ca7-49e6-bb2a-30a6d0561541',
    displayId: 22,
    caseId: '863ba406-fdef-11ed-9c8e-d3eaf8c1c924',
    caseDisplayId: '586',
    registeredProduct: {
      vehicleNumber: 'KH1234DF',
      dateOfPurchase: '2023-06-01T00:00:00Z',
      model: 'TATA Nexon XMA',
    },
    customerComplaints: ['C1  ', '  ', '  ', '  ', '  '],
    milometer: 4500,
    serviceAdvisor: 'Dr. Olaf Fussballgott Marschall',
    customerDetails: {
      name: '1. FC Kaiserslautern',
      contactNumber: '1234567890',
    },
    estimatedCompletionDate: '2023-05-31T07:07:00.000Z',
    createdOn: '2023-06-01T11:40:05.906Z',
    status: 'Z13',
    servicesSelected: [
      {
        id: 'df055fce-bb75-433b-9a68-f841260e2f98',
        service: 'Air filter replacement',
        price: '49.99',
        technician: 'Sandra',
        status: 'Z23',
        startTime: '2023-06-01T11:42:21.796Z',
        endTime: '2023-06-01T11:42:27.828Z',
        notes: 'C',
        observation: 'na',
        statusDescription: 'Completed',
      },
    ],
    statusDescription: 'Completed',
    adminData: {
      createdBy: 'test@abc.com',
      createdOn: '2023-06-27T08:33:22.610Z',
      updatedBy: null,
      updatedOn: '2023-06-28T08:33:22.610Z',
    },
  };

  beforeAll(() => {
    response = jobCardResponse;
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
