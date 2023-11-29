import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import { CNS_SERVICES } from '../../../../../common/constants';

export const DocumentServiceApi = {
  createdocumentserviceDocument: (
    body:
      | {
          category?: string;
          fileName?: string;
          isSelected?: boolean;
          type?: string;
        }
      | Record<string, any>
      | undefined,
  ) =>
    new OpenApiRequestBuilder<any>('post', CNS_SERVICES.CREATE_DOCUMENT_URL, {
      body,
    }),
};
