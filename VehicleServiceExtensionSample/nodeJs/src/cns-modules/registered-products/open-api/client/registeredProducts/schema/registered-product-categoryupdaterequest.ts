/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

/**
 * Representation of the 'RegisteredProductCategoryupdaterequest' schema.
 */
export type RegisteredProductCategoryupdaterequest =
  | {
      code?: string;
      descriptions?:
        | {
            content?: string;
            languageCode?: string;
          }
        | Record<string, any>[];
    }
  | Record<string, any>;
