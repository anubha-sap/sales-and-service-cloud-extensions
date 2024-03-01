import { SFStatus } from '../../../src/extension-modules/common/enums';
import { AdminData } from '../common.mock.data';

export const ServiceFormResponseDTO = {
  id: 'bce85b94-fd99-4f36-b484-b66772110a53',
  displayId: 5,
  caseId: 'd37e8d1a-9b27-11ee-9809-f14f8c98fafa',
  caseDisplayId: '872',
  registeredProduct: {
    dateOfPurchase: '2022-04-04T00:00:00Z',
    model: 'AHT Radiator',
  },
  customerComplaints: null,
  milometer: 4000,
  servicesProposed: [
    {
      id: 'ff106a0b-7b94-4d30-8d82-6f1e0507e2ad',
      service: 'Brake pad replacement',
      price: '3450',
      isSelected: true,
    },
    {
      id: 'ec3be6b5-9543-4e49-9fd3-71523868d3ef',
      service: 'Transmission fluid change',
      price: '5450',
      isSelected: true,
    },
    {
      id: '86d5fe06-3111-4094-b101-887cad41d808',
      service: 'Air filter replacement',
      price: '999',
      isSelected: false,
    },
    {
      id: 'e58c85d7-1a04-4288-bd31-2ebd44fcab6e',
      service: 'Change Filter',
      price: '499',
      isSelected: false,
    },
  ],
  inspectionItems: [
    {
      id: '0b6c61f3-d586-402e-b712-177fe7a36416',
      description: 'Check engine oil level and condition',
      isSelected: false,
    },
    {
      id: '0916c7a0-265a-4a0c-8550-2abde9588179',
      description: 'Inspect windshield washer fluid level',
      isSelected: false,
    },
    {
      id: 'df30287c-3328-46cb-a799-5b9208cf586a',
      description: 'Check brake pads and rotors for wear',
      isSelected: false,
    },
    {
      id: 'd9a7c6c8-f42b-47e6-af48-79aff4c24319',
      description:
        'Test headlights, taillights, brake lights, and turn signals',
      isSelected: false,
    },
    {
      id: '138886ea-054b-4115-b0a6-5c6cd502804d',
      description: ' Safety and Electrical Systems',
      isSelected: false,
    },
    {
      id: 'e6e8f6be-d0d3-4516-b495-3c5e43ff3123',
      description:
        'Test headlights, taillights, brake lights, and turn signals',
      isSelected: false,
    },
    {
      id: '0a6475fe-d0ac-4f3c-83ad-f24205831b2d',
      description: 'Test the operation of the ignition system',
      isSelected: false,
    },
    {
      id: '0bb447ff-eb9e-48f2-991f-b32f488479f6',
      description:
        'Examine the condition of the coolant and recommend a flush if necessary',
      isSelected: false,
    },
    {
      id: '4fc9b078-db0d-412f-8fc5-cb54a9c5d54d',
      description: 'Check for toolkits',
      isSelected: false,
    },
  ],
  notes: null,
  status: SFStatus.Z02,
  adminData: AdminData,
  statusDescription: 'Booked',
};

export const ServiceForm = {
  id: 'bff7f134-250b-4557-a5ee-150e2e1d6076',
  displayId: 1,
  caseId: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
  caseDisplayId: '536',
  status: SFStatus.Z02,
  registeredProduct: {
    vehicleNumber: 'KA01MJ5010',
    dateOfPurchase: '2023-04-14T00:00:00Z',
    model: 'TATA Nexon XMA',
  },
  customerComplaints: [' ', ' ', ' ', ' ', ' '],
  milometer: 4863,
  servicesProposed: [
    {
      id: '87a68c40-85c9-4654-8816-2e0a53b4483d',
      service: 'Change Tyre',
      price: '2499',
      isSelected: true,
    },
  ],
  inspectionItems: [
    {
      id: '29375f72-a7a2-49b8-98f5-fa4adcdc2ba1',
      description: 'Check for toolkit',
      isSelected: false,
    },
    {
      id: 'a4db738c-3efd-4509-8e16-d9016339a1de',
      description: 'Check for any dents',
      isSelected: false,
    },
  ],
  notes: [' ', ' ', ' ', ' ', ' '],
};

const oMock = {
  adminData: {
    createdBy: '',
    createdOn: '2023-06-06T10:08:10.829Z',
    updatedBy: '',
    updatedOn: '2023-06-06T10:29:19.686Z',
  },
  caseDisplayId: '536',
  caseId: 'd886b468-ed95-11ed-a6bd-5354a6389ba0',
  customerComplaints: [' ', ' ', ' ', ' ', ' '],
  displayId: 1,
  estimatedCompletionDate: '2023-05-10T11:55:47.397Z',
  id: '16da4bc2-a8cc-4ba6-a7a5-ef69802ce177',
  milometer: 4863,
  registeredProduct: {
    dateOfPurchase: '2023-04-14T00:00:00Z',
    model: 'TATA Nexon XMA',
    vehicleNumber: 'KA01MJ5010',
  },
  servicesSelected: [
    {
      adminData: {
        createdBy: '',
        createdOn: '2023-06-06T10:08:10.829Z',
        updatedBy: '',
        updatedOn: '2023-06-06T10:29:19.686Z',
      },
      endTime: '2023-05-08T11:58:41.288Z',
      id: 'a9643834-b16f-4bd8-81e7-3e9ff0ebed81',
      notes: null,
      observation: null,
      price: '99.99',
      service: 'Brake pad replacement',
      startTime: '2023-05-08T11:58:27.609Z',
      status: 'Z23',
      statusDescription: 'translatedText',
      technician: JSON.stringify({
        name: 'Tony Mathew',
        btpUserId: 'b4042340-3a8b-42b3-b983-5db33caa331b',
      }),
    },
    {
      adminData: {
        createdBy: '',
        createdOn: '2023-06-06T10:08:10.829Z',
        updatedBy: '',
        updatedOn: '2023-06-06T10:29:19.686Z',
      },
      endTime: '2023-05-08T11:58:49.673Z',
      id: 'c4b45224-db39-47ed-9ea5-50dc9cee9162',
      notes: null,
      observation: null,
      price: '2499',
      service: 'Change Tyre',
      startTime: '2023-05-08T11:58:00.516Z',
      status: 'Z23',
      statusDescription: 'translatedText',
      technician: JSON.stringify({
        name: 'Tony Mathew',
        btpUserId: 'b4042340-3a8b-42b3-b983-5db33caa331b',
      }),
    },
  ],
  status: 'COMPLETED',
  statusDescription: 'translatedText',
};
