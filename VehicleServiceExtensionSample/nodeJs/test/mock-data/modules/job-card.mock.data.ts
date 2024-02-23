import {
  JCStatus,
  ServiceStatus,
} from '../../../src/extension-modules/common/enums';
import { AdminData, sTranslatedText } from '../common.mock.data';
import { oCase } from './case.mock.data';
import { oCustomerDataResult } from './customer-service.mock.data';

export const oJobCard = {
  ...AdminData,
  id: '93ae7eee-dbc8-43bc-83c5-3f5dba858911',
  displayId: 2,
  caseId: 'd37e8d1a-9b27-11ee-9809-f14f8c98fafa',
  caseDisplayId: '872',
  registeredProduct:
    '{"dateOfPurchase":"2022-04-04T00:00:00Z","model":"AHT Radiator"}',
  customerComplaints: '["C1  ","  ","  ","  ","  "]',
  milometer: 4000,
  estimatedCompletionDate: '2023-12-19T08:56:00.000Z',
  status: JCStatus.Z13,
  servicesSelected: [
    {
      ...AdminData,
      id: '3994a379-fc57-4c50-b5bb-42a3db317f6d',
      service: 'Brake pad replacement',
      price: '3450',
      technician:
        '{"name":"Tony Mathew","btpUserId":"b4042340-3a8b-42b3-b983-5db33caa331b"}',
      status: ServiceStatus.Z23,
      startTime: '2023-12-22T10:14:20.087Z',
      endTime: '2023-12-22T10:14:30.831Z',
      notes: null,
      observation: null,
    },
    {
      ...AdminData,
      id: '61f5e09c-16a5-4409-bfd9-507d67c46eca',
      service: 'Transmission fluid change',
      price: '5450',
      technician:
        '{"name":"Tony Mathew","btpUserId":"b4042340-3a8b-42b3-b983-5db33caa331b"}',
      status: ServiceStatus.Z23,
      startTime: '2023-12-22T10:13:39.955Z',
      endTime: '2023-12-22T10:15:01.998Z',
      notes: '[]',
      observation: '[]',
    },
  ],
};

export const JobCardResponseDTO = {
  id: '93ae7eee-dbc8-43bc-83c5-3f5dba858911',
  displayId: 2,
  caseId: 'd37e8d1a-9b27-11ee-9809-f14f8c98fafa',
  caseDisplayId: '872',
  registeredProduct: {
    dateOfPurchase: '2022-04-04T00:00:00Z',
    model: 'AHT Radiator',
  },
  customerComplaints: ['C1  ', '  ', '  ', '  ', '  '],
  milometer: 4000,
  servicesSelected: [
    {
      ...AdminData,
      id: '3994a379-fc57-4c50-b5bb-42a3db317f6d',
      service: 'Brake pad replacement',
      price: '3450',
      technician: {
        name: 'Tony Mathew',
        btpUserId: 'b4042340-3a8b-42b3-b983-5db33caa331b',
      },
      status: ServiceStatus.Z23,
      startTime: '2023-12-22T10:14:20.087Z',
      endTime: '2023-12-22T10:14:30.831Z',
      notes: null,
      observation: null,
    },
    {
      ...AdminData,
      id: '61f5e09c-16a5-4409-bfd9-507d67c46eca',
      service: 'Transmission fluid change',
      price: '5450',
      technician: {
        name: 'Tony Mathew',
        btpUserId: 'b4042340-3a8b-42b3-b983-5db33caa331b',
      },
      status: ServiceStatus.Z23,
      startTime: '2023-12-22T10:13:39.955Z',
      endTime: '2023-12-22T10:15:01.998Z',
      notes: '[]',
      observation: '[]',
    },
  ],
  status: JCStatus.Z13,
  estimatedCompletionDate: '2023-12-19T08:56:00.000Z',
  adminData: AdminData,
};

export const JobCardResponseDTOWithoutCNSData = {
  id: '93ae7eee-dbc8-43bc-83c5-3f5dba858911',
  displayId: 2,
  caseId: 'd37e8d1a-9b27-11ee-9809-f14f8c98fafa',
  caseDisplayId: '872',
  registeredProduct: {
    dateOfPurchase: '2022-04-04T00:00:00Z',
    model: 'AHT Radiator',
  },
  customerComplaints: ['C1  ', '  ', '  ', '  ', '  '],
  milometer: 4000,
  servicesSelected: [
    {
      adminData: AdminData,
      id: '3994a379-fc57-4c50-b5bb-42a3db317f6d',
      service: 'Brake pad replacement',
      price: '3450',
      technician: {
        name: 'Tony Mathew',
        btpUserId: 'b4042340-3a8b-42b3-b983-5db33caa331b',
      },
      status: ServiceStatus.Z23,
      startTime: '2023-12-22T10:14:20.087Z',
      endTime: '2023-12-22T10:14:30.831Z',
      notes: null,
      observation: null,
      statusDescription: sTranslatedText,
    },
    {
      adminData: AdminData,
      id: '61f5e09c-16a5-4409-bfd9-507d67c46eca',
      service: 'Transmission fluid change',
      price: '5450',
      technician: {
        name: 'Tony Mathew',
        btpUserId: 'b4042340-3a8b-42b3-b983-5db33caa331b',
      },
      status: ServiceStatus.Z23,
      startTime: '2023-12-22T10:13:39.955Z',
      endTime: '2023-12-22T10:15:01.998Z',
      notes: '[]',
      observation: '[]',
      statusDescription: sTranslatedText,
    },
  ],
  status: JCStatus.Z13,
  estimatedCompletionDate: '2023-12-19T08:56:00.000Z',
  adminData: AdminData,
  statusDescription: sTranslatedText,
};

export const JobCardResponseDTOWithCNSData = {
  id: '93ae7eee-dbc8-43bc-83c5-3f5dba858911',
  displayId: 2,
  caseId: 'd37e8d1a-9b27-11ee-9809-f14f8c98fafa',
  caseDisplayId: '872',
  registeredProduct: {
    dateOfPurchase: '2022-04-04T00:00:00Z',
    model: 'AHT Radiator',
  },
  customerComplaints: ['C1  ', '  ', '  ', '  ', '  '],
  milometer: 4000,
  servicesSelected: [
    {
      adminData: AdminData,
      id: '3994a379-fc57-4c50-b5bb-42a3db317f6d',
      service: 'Brake pad replacement',
      price: '3450',
      technician: {
        name: 'Tony Mathew',
        btpUserId: 'b4042340-3a8b-42b3-b983-5db33caa331b',
      },
      status: ServiceStatus.Z23,
      startTime: '2023-12-22T10:14:20.087Z',
      endTime: '2023-12-22T10:14:30.831Z',
      notes: null,
      observation: null,
      statusDescription: sTranslatedText,
    },
    {
      adminData: AdminData,
      id: '61f5e09c-16a5-4409-bfd9-507d67c46eca',
      service: 'Transmission fluid change',
      price: '5450',
      technician: {
        name: 'Tony Mathew',
        btpUserId: 'b4042340-3a8b-42b3-b983-5db33caa331b',
      },
      status: ServiceStatus.Z23,
      startTime: '2023-12-22T10:13:39.955Z',
      endTime: '2023-12-22T10:15:01.998Z',
      notes: '[]',
      observation: '[]',
      statusDescription: sTranslatedText,
    },
  ],
  customerDetails: oCustomerDataResult,
  serviceAdvisor: oCase.processor.name,
  status: JCStatus.Z13,
  estimatedCompletionDate: '2023-12-19T08:56:00.000Z',
  adminData: AdminData,
  statusDescription: sTranslatedText,
};

/* export const JobCardResponseDTO = {
  id: '93ae7eee-dbc8-43bc-83c5-3f5dba858911',
  displayId: 1,
  caseId: 'd37e8d1a-9b27-11ee-9809-f14f8c98fafa',
  caseDisplayId: '872',
  registeredProduct: {
    vehicleNumber: 'KH1234DF',
    dateOfPurchase: '2022-04-04T00:00:00Z',
    model: 'AHT Radiator',
  },
  customerDetails: {
    name: 'Andrew Jonas',
    contactNumber: '1234567890',
  },
  customerComplaints: ['C1  ', '  ', '  ', '  ', '  '],
  milometer: 4000,
  servicesSelected: [
    {
      createdOn: '2023-12-22T10:09:10.217Z',
      updatedOn: '2023-12-22T10:14:30.849Z',
      createdBy: 'b4042340-3a8b-42b3-b983-5db33caa331b',
      updatedBy: 'b4042340-3a8b-42b3-b983-5db33caa331b',
      id: '3994a379-fc57-4c50-b5bb-42a3db317f6d',
      service: 'Brake pad replacement',
      price: '3450',
      technician: {
        name: 'Tony Mathew',
        btpUserId: 'b4042340-3a8b-42b3-b983-5db33caa331b',
      },
      status: ServiceStatus.Z23,
      startTime: '2023-12-22T10:14:20.087Z',
      endTime: '2023-12-22T10:14:30.831Z',
      notes: null,
      observation: null,
      statusDescription: 'Completed',
    },
    {
      createdOn: '2023-12-22T10:09:10.233Z',
      updatedOn: '2023-12-22T10:15:02.012Z',
      createdBy: 'b4042340-3a8b-42b3-b983-5db33caa331b',
      updatedBy: 'b4042340-3a8b-42b3-b983-5db33caa331b',
      id: '61f5e09c-16a5-4409-bfd9-507d67c46eca',
      service: 'Transmission fluid change',
      price: '5450',
      technician: {
        name: 'Tony Mathew',
        btpUserId: 'b4042340-3a8b-42b3-b983-5db33caa331b',
      },
      status: ServiceStatus.Z23,
      startTime: '2023-12-22T10:13:39.955Z',
      endTime: '2023-12-22T10:15:01.998Z',
      notes: null,
      observation: null,
      statusDescription: 'Completed',
    },
  ],
  status: JCStatus.Z13,
  estimatedCompletionDate: '2023-12-19T08:56:00.000Z',
  adminData: AdminData,
  statusDescription: 'Completed',
}; */

export const JobCardServiceResponse = {
  id: 'a9643834-b16f-4bd8-81e7-3e9ff0ebed81',
  service: 'Brake pad replacement',
  price: '99.99',
  technician: JSON.stringify({
    name: 'Tony Mathew',
    btpUserId: 'b4042340-3a8b-42b3-b983-5db33caa331b',
  }),
  status: ServiceStatus.Z23,
  startTime: '2023-05-08T11:58:27.609Z',
  endTime: '2023-05-08T11:58:41.288Z',
  notes: null,
  observation: null,
  ...AdminData,
};

export const JobCardServiceResponseDTO = {
  id: 'a9643834-b16f-4bd8-81e7-3e9ff0ebed81',
  service: 'Brake pad replacement',
  price: '99.99',
  technician: {
    name: 'Tony Mathew',
    btpUserId: 'b4042340-3a8b-42b3-b983-5db33caa331b',
  },
  status: ServiceStatus.Z23,
  startTime: '2023-05-08T11:58:27.609Z',
  endTime: '2023-05-08T11:58:41.288Z',
  notes: null,
  observation: null,
  adminData: AdminData,
  statusDescription: 'Completed',
};
