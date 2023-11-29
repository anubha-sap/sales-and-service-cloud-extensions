/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type {
  RegisteredProductqueryresponse,
  RegisteredProductcreaterequest,
  RegisteredProductfile,
  RegisteredProductupdaterequest,
  RegisteredProductpatchupdaterequest,
} from './schema';
/**
 * Representation of the 'RegisteredProductApi'.
 * This API is part of the 'registeredProducts_specification' service.
 */
export const RegisteredProductApi = {
  /**
   * Shows all registered product entities that matches the supplied query parameters.
   * @param queryParameters - Object containing the following keys: $top, $skip, $search, $orderby, $filter, $select, $count.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  queryregisteredproductserviceRegisteredProduct: (queryParameters?: {
    $top?: number;
    $skip?: number;
    $search?: string;
    $orderby?: string;
    $filter?: string;
    $select?: string;
    $count?: boolean;
  }) =>
    new OpenApiRequestBuilder<RegisteredProductqueryresponse>(
      'get',
      '/sap/c4c/api/v1/registered-product-service/registeredProducts',
      {
        queryParameters,
      },
    ),
  /**
   * Creates a new registered product entity with the details send in the request.
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createregisteredproductserviceRegisteredProduct: (
    body: RegisteredProductcreaterequest | undefined,
  ) =>
    new OpenApiRequestBuilder<RegisteredProductfile>(
      'post',
      '/sap/c4c/api/v1/registered-product-service/registeredProducts',
      {
        body,
      },
    ),
  /**
   * Shows the registered product entity for the given registered product ID.
   * @param id - Registered product ID
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readregisteredproductserviceRegisteredProduct: (id: string) =>
    new OpenApiRequestBuilder<RegisteredProductfile>(
      'get',
      '/sap/c4c/api/v1/registered-product-service/registeredProducts/{id}',
      {
        pathParameters: { id },
      },
    ),
  /**
   * Updates an entire registered product entity for the given registered product ID.
   * @param id - Registered product ID
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  updateregisteredproductserviceRegisteredProduct: (
    id: string,
    body: RegisteredProductupdaterequest | undefined,
  ) =>
    new OpenApiRequestBuilder<RegisteredProductfile>(
      'put',
      '/sap/c4c/api/v1/registered-product-service/registeredProducts/{id}',
      {
        pathParameters: { id },
        body,
      },
    ),
  /**
   * Modifies the registered product entity for the given registered product ID.
   * @param id - Registered product ID
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  modifyregisteredproductserviceRegisteredProduct: (
    id: string,
    body: RegisteredProductpatchupdaterequest | undefined,
  ) =>
    new OpenApiRequestBuilder<RegisteredProductfile>(
      'patch',
      '/sap/c4c/api/v1/registered-product-service/registeredProducts/{id}',
      {
        pathParameters: { id },
        body,
      },
    ),
  /**
   * Deletes the registered product entity for the given registered product ID.
   * @param id - Registered product ID
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deleteregisteredproductserviceRegisteredProduct: (id: string) =>
    new OpenApiRequestBuilder<RegisteredProductfile>(
      'delete',
      '/sap/c4c/api/v1/registered-product-service/registeredProducts/{id}',
      {
        pathParameters: { id },
      },
    ),
};
