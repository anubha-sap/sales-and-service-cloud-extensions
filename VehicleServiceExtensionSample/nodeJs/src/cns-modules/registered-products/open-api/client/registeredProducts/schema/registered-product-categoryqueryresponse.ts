/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

/**
 * Representation of the 'RegisteredProductCategoryqueryresponse' schema.
 */
export type RegisteredProductCategoryqueryresponse =
  | {
      /**
       * Format: "int32".
       */
      count?: number;
      value?:
        | {
            code?: string;
            descriptions?:
              | {
                  content?: string;
                  languageCode?: string;
                }
              | Record<string, any>[];
            description?: string;
          }
        | Record<string, any>[];
    }
  | Record<string, any>;
