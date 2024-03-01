import { EXTENSION_FIELDS } from '../../../src/common/constants';

export const RegisteredProductDetail = {
  vehicleNumber: 'KA01MJ5010',
  dateOfPurchase: '2023-04-14T00:00:00Z',
  model: 'TATA Nexon XMA',
};

export const RegisteredProduct = {
  id: '04e29c42-bcdd-4edb-bf57-ba1b3bd81be2',
  displayId: '33',
  referenceProduct: {
    id: '11edd9f9-9b1d-af8e-afdb-812c72a8c000',
    displayId: 'TNE-1',
    description: 'TATA Nexon XMA',
  },
  referenceDate: '2023-04-14T00:00:00Z',
  serialId: 'TATN001',
  status: 'ACTIVE',
  typeCode: 'REGISTERED_PRODUCT',
  individualCustomer: {
    id: '11edd1df-d226-eaee-afdb-81c759a8c000',
    displayId: '1000253',
    name: 'Anirudh DPP',
  },
  descriptions: [
    {
      content: 'TATA Nexon XMA - Registered',
      languageCode: 'en',
    },
  ],
  description: 'TATA Nexon XMA - Registered',
  address: {
    postalAddress: {
      countryCode: 'IN',
      countryName: 'India',
      stateCode: '30',
      stateName: 'Delhi',
    },
  },
  adminData: {
    createdBy: '1aa96e32-a903-11ec-bad9-dd7b9f38f062',
    createdByName: 'Sandra Webber',
    createdOn: '2023-04-14T11:18:46.135Z',
    updatedBy: 'b2bf0296-cbf2-11ed-b3b3-ff531c3c557c',
    updatedByName: 'Rakesh Kumar',
    updatedOn: '2023-04-17T09:02:01.127Z',
  },
  extensions: {
    [`${EXTENSION_FIELDS.VEHICLE_NUMBER}`]: 'KA01MJ5010',
  },
};
