export const GLOBAL_PREFIX = 'vehicle-service';
export const DB_TYPE = 'sap';
export const FALLBACK_LANGUAGE = 'en';
export const SESSION = 'session';
export const DEFAULT_LOG_LEVEL = 3;
export const TRANSLATION_JSON_FILE = 'vehicleService';
export const ETAG = 'ETag';
export const ETAG_HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
export const MESSAGES = {
  //Recommended approach is to move to properties file for translation
  DB_ERROR: 'DB Error',
  UNIQUE_KEY_CONSTRAINT_FAILED: 'Unique key constraint violation',
  NO_UPDATE_DATA: 'No update data provided',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  RESOURCE_NOT_FOUND: 'Resource with the provided id not found',
  CASE_COMPLETED:
    'Case is Completed. Cannot create Job Card for Completed Case',
  NO_REGISTERED_PRODUCTS_IN_CASE: 'No Registered Products in the case',
  NO_MILOMETER_IN_CASE: 'No milometer reading in case',
  NO_SERVICES_SELECTED: 'No Services selected in service form',
  SERVICE_FORM_NOT_BOOKED: 'Service Form is not booked',
  CASE_STATUS_DISABLED:
    'Status of the Case cannot be changed because all the tasks under the Job Card are not completed.',
  JOBCARD_NOT_FOUND: 'No jobcard found for selected Case',
  ERR_IN_INVOICE: 'Error in generate Invoice : ',
};

export const EXTENSION_FIELDS = {
  JOBCARD_ID: 'jobcardid_lgfbv7xg',
  VEHICLE_NUMBER: 'vehiclenovin_lgf4inuf',
  MILOMETER: 'milometer_lgfbu3bg',
  SERVICE_FORM_ID: 'serviceformid_lgfbwo7p',
};

export const CASE_STATUS = {
  BOOKED: 'Z1',
  SERVICE_IN_PROCESS: 'Z2',
  SERVICE_COMPLETED: 'Z3',
  COMPLETED: '05',
  CLOSED: '06',
};

export const ENTITY_NAME = {
  CASE: 'sap.crm.caseservice.entity.case',
};

export const CNS_SERVICES = {
  CREATE_DOCUMENT_URL: '/sap/c4c/api/v1/document-service/documents',
  INDIVIDUAL_CUSTOMER_URL:
    '/elsa/sap/c4c/api/v1/individual-customer-service/individualCustomers',
  ACCOUNTS: '/elsa/sap/c4c/api/v1/account-service/accounts',
};

export const CASE_TYPE = {
  VEHICLE_SERVICE_REQUEST: 'ZVSR',
};

export const CUSTOM_LOGIC_ERROR_CODE = {
  CASE_SERVICE: 'caseService_customLogic',
};
