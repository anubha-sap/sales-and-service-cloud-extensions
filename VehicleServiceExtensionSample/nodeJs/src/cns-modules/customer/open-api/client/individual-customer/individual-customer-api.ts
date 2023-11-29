import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import { CNS_SERVICES } from '../../../../../common/constants';

export const IndividualCustomerApi = {
  getIndividualCustomerApi: (id: string) =>
    new OpenApiRequestBuilder<any>(
      'get',
      `${CNS_SERVICES.INDIVIDUAL_CUSTOMER_URL}/{id}`,
      {
        pathParameters: { id },
      },
    ),
};
