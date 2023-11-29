import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import { CNS_SERVICES } from '../../../../../common/constants';

export const AccountsApi = {
  getAccountsApi: (id: string) =>
    new OpenApiRequestBuilder<any>('get', `${CNS_SERVICES.ACCOUNTS}/{id}`, {
      pathParameters: { id },
    }),
};
