/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type {
  RegisteredProductCategoryqueryresponse,
  RegisteredProductCategorycreaterequest,
  RegisteredProductCategoryfile,
  RegisteredProductCategoryupdaterequest,
} from './schema';
/**
 * Representation of the 'RegisteredProductCategoryApi'.
 * This API is part of the 'registeredProducts_specification' service.
 */
export const RegisteredProductCategoryApi = {
  /**
   * Shows all registered product categories in the system.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  queryregisteredproductserviceRegisteredProductCategory: () =>
    new OpenApiRequestBuilder<RegisteredProductCategoryqueryresponse>(
      'get',
      '/sap/c4c/api/v1/registered-product-service/registeredProductCategories',
    ),
  /**
   * Creates a new registered product category with the details send in the request.
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createregisteredproductserviceRegisteredProductCategory: (
    body: RegisteredProductCategorycreaterequest | undefined,
  ) =>
    new OpenApiRequestBuilder<RegisteredProductCategoryfile>(
      'post',
      '/sap/c4c/api/v1/registered-product-service/registeredProductCategories',
      {
        body,
      },
    ),
  /**
   * Updates an entire registered product category for the given registered product category code.
   * @param id - Registered product category code
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  updateregisteredproductserviceRegisteredProductCategory: (
    id: string,
    body: RegisteredProductCategoryupdaterequest | undefined,
  ) =>
    new OpenApiRequestBuilder<RegisteredProductCategoryfile>(
      'put',
      '/sap/c4c/api/v1/registered-product-service/registeredProductCategories/{id}',
      {
        pathParameters: { id },
        body,
      },
    ),
  /**
   * Deletes the registered product category for the given registered product category code.
   * @param id - Registered product category code
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  deleteregisteredproductserviceRegisteredProductCategory: (id: string) =>
    new OpenApiRequestBuilder<RegisteredProductCategoryfile>(
      'delete',
      '/sap/c4c/api/v1/registered-product-service/registeredProductCategories/{id}',
      {
        pathParameters: { id },
      },
    ),
};
