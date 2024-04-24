import { CASE_STATUS, EXTENSION_FIELDS } from '../../src/common/constants';
import { Scope } from '../../src/extension-modules/common/enums';

export const AdminData = {
  createdOn: '2023-06-06T10:08:10.829Z',
  updatedOn: '2023-06-06T10:29:19.686Z',
  createdBy: '63094698-b310-4a67-8177-adfc187e685d',
  updatedBy: '63094698-b310-4a67-8177-adfc187e685d',
};

export const RequestMock1 = {
  session: jest.fn().mockImplementation(),
};

export const RequestMock = {
  session: {
    userToken: 'userToken',
    reqId: '1',
    userId: 'userId',
    language: 'en',
    caseStatuses: {
      booked: CASE_STATUS.BOOKED,
      closed: CASE_STATUS.CLOSED,
      completed: CASE_STATUS.COMPLETED,
      serviceCompleted: CASE_STATUS.SERVICE_COMPLETED,
      serviceInProcess: CASE_STATUS.SERVICE_IN_PROCESS,
    },
    extensionFields: {
      jobCardId: EXTENSION_FIELDS.JOBCARD_ID,
      milometer: EXTENSION_FIELDS.MILOMETER,
      serviceFormId: EXTENSION_FIELDS.SERVICE_FORM_ID,
      vehicleNumber: EXTENSION_FIELDS.VEHICLE_NUMBER,
    },
    sscDestination: 'SAPServiceCloudDiscoveryService7',
    log: '4',
    scopes: [
      `${process.env.xsappname}.${Scope.EditTask}`,
      `${process.env.xsappname}.${Scope.EditJobCardService}`,
    ],
    userName: `User Name`,
    top: '30',
  },
};

export const sTranslatedText = 'translatedText';
