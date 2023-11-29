/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
/**
 * Representation of the 'CaseApi'.
 * This API is part of the 'SalesSvcCloudV2_case' service.
 */
export const CaseApi = {
  /**
   * Specify query parameters to return desired case records from the system.
   * @param queryParameters - Object containing the following keys: $top, $skip, $search, $orderby, $filter, $select, $exclude, $count, $query.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  querycaseserviceCase: (queryParameters?: {
    $top?: number;
    $skip?: number;
    $search?: string;
    $orderby?: string;
    $filter?: string;
    $select?: string;
    $exclude?: string;
    $count?: boolean;
    $query?: string;
  }) =>
    new OpenApiRequestBuilder<
      | {
          /**
           * Format: "int32".
           */
          count?: number;
          value?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                subject?: string;
                priority?: string;
                priorityDescription?: string;
                origin?: string;
                caseType?: string;
                caseTypeDescription?: string;
                status?: string;
                statusDescription?: string;
                escalationStatus?: string;
                registeredProducts?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      serialId?: string;
                    }
                  | Record<string, any>[];
                functionalLocations?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>[];
                productInstallPoints?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>[];
                installedBases?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>[];
                account?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      country?: string;
                      state?: string;
                      streetPostalCode?: string;
                    }
                  | Record<string, any>;
                contact?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      emailId?: string;
                      phoneNumber?: string;
                    }
                  | Record<string, any>;
                individualCustomer?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      emailId?: string;
                    }
                  | Record<string, any>;
                processor?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      emailId?: string;
                    }
                  | Record<string, any>;
                approvers?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      emailId?: string;
                    }
                  | Record<string, any>[];
                serviceTeam?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                    }
                  | Record<string, any>;
                description?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      noteId?: string;
                      content?: string;
                    }
                  | Record<string, any>;
                notes?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      noteId?: string;
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      content?: string;
                    }
                  | Record<string, any>[];
                relatedObjects?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      objectId?: string;
                      type?: string;
                      role?: string;
                    }
                  | Record<string, any>[];
                timePoints?:
                  | {
                      /**
                       * Format: "date-time".
                       */
                      reportedOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      escalatedOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      completedOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      completionDueOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      assignedToCustomerOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      assignedToProcessorOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      initialReviewDueOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      initialReviewCompletedOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      resolutionDueOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      responseDueOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      closedOn?: string;
                    }
                  | Record<string, any>;
                categoryLevel1?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>;
                categoryLevel2?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>;
                /**
                 * Format: "uuid".
                 */
                serviceLevelId?: string;
                durationTerms?:
                  | {
                      /**
                       * Format: "date-time".
                       */
                      durationWithAgent?: string;
                      /**
                       * Format: "date-time".
                       */
                      durationWithCustomer?: string;
                    }
                  | Record<string, any>;
                isRead?: boolean;
                isEndOfPurpose?: boolean;
                isDepersonalized?: boolean;
                adminData?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      createdBy?: string;
                      createdByName?: string;
                      /**
                       * Format: "date-time".
                       */
                      createdOn?: string;
                      /**
                       * Format: "uuid".
                       */
                      updatedBy?: string;
                      updatedByName?: string;
                      /**
                       * Format: "date-time".
                       */
                      updatedOn?: string;
                    }
                  | Record<string, any>;
                extensions?: Record<string, any>;
              }
            | Record<string, any>[];
          info?:
            | {
                code?: string;
                details?:
                  | {
                      message?: string;
                      target?: string;
                      code?: string;
                    }
                  | Record<string, any>[];
                message?: string;
                target?: string;
              }
            | Record<string, any>;
        }
      | Record<string, any>
    >('get', '/sap/c4c/api/v1/case-service/cases', {
      queryParameters,
    }),
  /**
   * Send case information to the system to create a new case entity.
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  createcaseserviceCase: (
    body:
      | {
          subject?: string;
          priority?: string;
          origin?: string;
          caseType?: string;
          status?: string;
          escalationStatus?: string;
          registeredProducts?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                serialId?: string;
              }
            | Record<string, any>[];
          functionalLocations?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
              }
            | Record<string, any>[];
          productInstallPoints?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
              }
            | Record<string, any>[];
          installedBases?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
              }
            | Record<string, any>[];
          account?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                name?: string;
                country?: string;
                state?: string;
                streetPostalCode?: string;
              }
            | Record<string, any>;
          contact?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                name?: string;
                emailId?: string;
                phoneNumber?: string;
              }
            | Record<string, any>;
          individualCustomer?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                name?: string;
                emailId?: string;
              }
            | Record<string, any>;
          processor?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                name?: string;
                emailId?: string;
              }
            | Record<string, any>;
          approvers?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                name?: string;
                emailId?: string;
              }
            | Record<string, any>[];
          serviceTeam?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                name?: string;
              }
            | Record<string, any>;
          description?:
            | {
                /**
                 * Format: "uuid".
                 */
                noteId?: string;
                content?: string;
              }
            | Record<string, any>;
          notes?:
            | {
                /**
                 * Format: "uuid".
                 */
                noteId?: string;
                /**
                 * Format: "uuid".
                 */
                id?: string;
                content?: string;
              }
            | Record<string, any>[];
          timePoints?:
            | {
                /**
                 * Format: "date-time".
                 */
                reportedOn?: string;
                /**
                 * Format: "date-time".
                 */
                escalatedOn?: string;
                /**
                 * Format: "date-time".
                 */
                completedOn?: string;
                /**
                 * Format: "date-time".
                 */
                completionDueOn?: string;
                /**
                 * Format: "date-time".
                 */
                assignedToCustomerOn?: string;
                /**
                 * Format: "date-time".
                 */
                assignedToProcessorOn?: string;
                /**
                 * Format: "date-time".
                 */
                initialReviewDueOn?: string;
                /**
                 * Format: "date-time".
                 */
                initialReviewCompletedOn?: string;
                /**
                 * Format: "date-time".
                 */
                resolutionDueOn?: string;
                /**
                 * Format: "date-time".
                 */
                responseDueOn?: string;
                /**
                 * Format: "date-time".
                 */
                closedOn?: string;
              }
            | Record<string, any>;
          categoryLevel1?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
              }
            | Record<string, any>;
          categoryLevel2?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
              }
            | Record<string, any>;
          extensions?: Record<string, any>;
        }
      | Record<string, any>
      | undefined,
  ) =>
    new OpenApiRequestBuilder<
      | {
          value?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                subject?: string;
                priority?: string;
                priorityDescription?: string;
                origin?: string;
                caseType?: string;
                caseTypeDescription?: string;
                status?: string;
                statusDescription?: string;
                escalationStatus?: string;
                registeredProducts?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      serialId?: string;
                    }
                  | Record<string, any>[];
                functionalLocations?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>[];
                productInstallPoints?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>[];
                installedBases?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>[];
                account?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      country?: string;
                      state?: string;
                      streetPostalCode?: string;
                    }
                  | Record<string, any>;
                contact?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      emailId?: string;
                      phoneNumber?: string;
                    }
                  | Record<string, any>;
                individualCustomer?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      emailId?: string;
                    }
                  | Record<string, any>;
                processor?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      emailId?: string;
                    }
                  | Record<string, any>;
                approvers?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      emailId?: string;
                    }
                  | Record<string, any>[];
                serviceTeam?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                    }
                  | Record<string, any>;
                description?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      noteId?: string;
                      content?: string;
                    }
                  | Record<string, any>;
                notes?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      noteId?: string;
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      content?: string;
                    }
                  | Record<string, any>[];
                relatedObjects?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      objectId?: string;
                      type?: string;
                      role?: string;
                    }
                  | Record<string, any>[];
                timePoints?:
                  | {
                      /**
                       * Format: "date-time".
                       */
                      reportedOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      escalatedOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      completedOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      completionDueOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      assignedToCustomerOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      assignedToProcessorOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      initialReviewDueOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      initialReviewCompletedOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      resolutionDueOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      responseDueOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      closedOn?: string;
                    }
                  | Record<string, any>;
                categoryLevel1?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>;
                categoryLevel2?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>;
                /**
                 * Format: "uuid".
                 */
                serviceLevelId?: string;
                durationTerms?:
                  | {
                      /**
                       * Format: "date-time".
                       */
                      durationWithAgent?: string;
                      /**
                       * Format: "date-time".
                       */
                      durationWithCustomer?: string;
                    }
                  | Record<string, any>;
                isRead?: boolean;
                isEndOfPurpose?: boolean;
                isDepersonalized?: boolean;
                adminData?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      createdBy?: string;
                      createdByName?: string;
                      /**
                       * Format: "date-time".
                       */
                      createdOn?: string;
                      /**
                       * Format: "uuid".
                       */
                      updatedBy?: string;
                      updatedByName?: string;
                      /**
                       * Format: "date-time".
                       */
                      updatedOn?: string;
                    }
                  | Record<string, any>;
                extensions?: Record<string, any>;
              }
            | Record<string, any>;
          info?:
            | {
                code?: string;
                details?:
                  | {
                      message?: string;
                      target?: string;
                      code?: string;
                    }
                  | Record<string, any>[];
                message?: string;
                target?: string;
              }
            | Record<string, any>;
        }
      | Record<string, any>
    >('post', '/sap/c4c/api/v1/case-service/cases', {
      body,
    }),
  /**
   * Query the system for a specific case using the case ID.
   * @param id - Case ID
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  readcaseserviceCase: (id: string) =>
    new OpenApiRequestBuilder<
      | {
          value?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                subject?: string;
                priority?: string;
                priorityDescription?: string;
                origin?: string;
                caseType?: string;
                caseTypeDescription?: string;
                status?: string;
                statusDescription?: string;
                escalationStatus?: string;
                registeredProducts?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      serialId?: string;
                    }
                  | Record<string, any>[];
                functionalLocations?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>[];
                productInstallPoints?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>[];
                installedBases?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>[];
                account?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      country?: string;
                      state?: string;
                      streetPostalCode?: string;
                    }
                  | Record<string, any>;
                contact?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      emailId?: string;
                      phoneNumber?: string;
                    }
                  | Record<string, any>;
                individualCustomer?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      emailId?: string;
                    }
                  | Record<string, any>;
                processor?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      emailId?: string;
                    }
                  | Record<string, any>;
                approvers?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      emailId?: string;
                    }
                  | Record<string, any>[];
                serviceTeam?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                    }
                  | Record<string, any>;
                description?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      noteId?: string;
                      content?: string;
                    }
                  | Record<string, any>;
                notes?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      noteId?: string;
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      content?: string;
                    }
                  | Record<string, any>[];
                relatedObjects?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      objectId?: string;
                      type?: string;
                      role?: string;
                    }
                  | Record<string, any>[];
                timePoints?:
                  | {
                      /**
                       * Format: "date-time".
                       */
                      reportedOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      escalatedOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      completedOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      completionDueOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      assignedToCustomerOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      assignedToProcessorOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      initialReviewDueOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      initialReviewCompletedOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      resolutionDueOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      responseDueOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      closedOn?: string;
                    }
                  | Record<string, any>;
                categoryLevel1?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>;
                categoryLevel2?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>;
                /**
                 * Format: "uuid".
                 */
                serviceLevelId?: string;
                durationTerms?:
                  | {
                      /**
                       * Format: "date-time".
                       */
                      durationWithAgent?: string;
                      /**
                       * Format: "date-time".
                       */
                      durationWithCustomer?: string;
                    }
                  | Record<string, any>;
                isRead?: boolean;
                isEndOfPurpose?: boolean;
                isDepersonalized?: boolean;
                adminData?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      createdBy?: string;
                      createdByName?: string;
                      /**
                       * Format: "date-time".
                       */
                      createdOn?: string;
                      /**
                       * Format: "uuid".
                       */
                      updatedBy?: string;
                      updatedByName?: string;
                      /**
                       * Format: "date-time".
                       */
                      updatedOn?: string;
                    }
                  | Record<string, any>;
                extensions?: Record<string, any>;
              }
            | Record<string, any>;
          info?:
            | {
                code?: string;
                details?:
                  | {
                      message?: string;
                      target?: string;
                      code?: string;
                    }
                  | Record<string, any>[];
                message?: string;
                target?: string;
              }
            | Record<string, any>;
        }
      | Record<string, any>
    >('get', '/sap/c4c/api/v1/case-service/cases/{id}', {
      pathParameters: { id },
    }),
  /**
   * Add attributes to a specific case by ID.
   * @param id - Case ID
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  updatecaseserviceCase: (
    id: string,
    body:
      | {
          subject?: string;
          priority?: string;
          status?: string;
          escalationStatus?: string;
          registeredProducts?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                serialId?: string;
              }
            | Record<string, any>[];
          functionalLocations?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
              }
            | Record<string, any>[];
          productInstallPoints?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
              }
            | Record<string, any>[];
          installedBases?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
              }
            | Record<string, any>[];
          account?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                name?: string;
                country?: string;
                state?: string;
                streetPostalCode?: string;
              }
            | Record<string, any>;
          contact?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                name?: string;
                emailId?: string;
                phoneNumber?: string;
              }
            | Record<string, any>;
          individualCustomer?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                name?: string;
                emailId?: string;
              }
            | Record<string, any>;
          processor?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                name?: string;
                emailId?: string;
              }
            | Record<string, any>;
          approvers?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                name?: string;
                emailId?: string;
              }
            | Record<string, any>[];
          serviceTeam?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                name?: string;
              }
            | Record<string, any>;
          description?:
            | {
                /**
                 * Format: "uuid".
                 */
                noteId?: string;
                content?: string;
              }
            | Record<string, any>;
          notes?:
            | {
                /**
                 * Format: "uuid".
                 */
                noteId?: string;
                /**
                 * Format: "uuid".
                 */
                id?: string;
                content?: string;
              }
            | Record<string, any>[];
          timePoints?:
            | {
                /**
                 * Format: "date-time".
                 */
                reportedOn?: string;
                /**
                 * Format: "date-time".
                 */
                escalatedOn?: string;
                /**
                 * Format: "date-time".
                 */
                completedOn?: string;
                /**
                 * Format: "date-time".
                 */
                completionDueOn?: string;
                /**
                 * Format: "date-time".
                 */
                assignedToCustomerOn?: string;
                /**
                 * Format: "date-time".
                 */
                assignedToProcessorOn?: string;
                /**
                 * Format: "date-time".
                 */
                initialReviewDueOn?: string;
                /**
                 * Format: "date-time".
                 */
                initialReviewCompletedOn?: string;
                /**
                 * Format: "date-time".
                 */
                resolutionDueOn?: string;
                /**
                 * Format: "date-time".
                 */
                responseDueOn?: string;
                /**
                 * Format: "date-time".
                 */
                closedOn?: string;
              }
            | Record<string, any>;
          categoryLevel1?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
              }
            | Record<string, any>;
          categoryLevel2?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
              }
            | Record<string, any>;
          extensions?: Record<string, any>;
        }
      | Record<string, any>
      | undefined,
  ) =>
    new OpenApiRequestBuilder<
      | {
          value?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                subject?: string;
                priority?: string;
                priorityDescription?: string;
                origin?: string;
                caseType?: string;
                caseTypeDescription?: string;
                status?: string;
                statusDescription?: string;
                escalationStatus?: string;
                registeredProducts?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      serialId?: string;
                    }
                  | Record<string, any>[];
                functionalLocations?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>[];
                productInstallPoints?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>[];
                installedBases?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>[];
                account?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      country?: string;
                      state?: string;
                      streetPostalCode?: string;
                    }
                  | Record<string, any>;
                contact?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      emailId?: string;
                      phoneNumber?: string;
                    }
                  | Record<string, any>;
                individualCustomer?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      emailId?: string;
                    }
                  | Record<string, any>;
                processor?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      emailId?: string;
                    }
                  | Record<string, any>;
                approvers?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      emailId?: string;
                    }
                  | Record<string, any>[];
                serviceTeam?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                    }
                  | Record<string, any>;
                description?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      noteId?: string;
                      content?: string;
                    }
                  | Record<string, any>;
                notes?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      noteId?: string;
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      content?: string;
                    }
                  | Record<string, any>[];
                relatedObjects?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      objectId?: string;
                      type?: string;
                      role?: string;
                    }
                  | Record<string, any>[];
                timePoints?:
                  | {
                      /**
                       * Format: "date-time".
                       */
                      reportedOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      escalatedOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      completedOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      completionDueOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      assignedToCustomerOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      assignedToProcessorOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      initialReviewDueOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      initialReviewCompletedOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      resolutionDueOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      responseDueOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      closedOn?: string;
                    }
                  | Record<string, any>;
                categoryLevel1?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>;
                categoryLevel2?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>;
                /**
                 * Format: "uuid".
                 */
                serviceLevelId?: string;
                durationTerms?:
                  | {
                      /**
                       * Format: "date-time".
                       */
                      durationWithAgent?: string;
                      /**
                       * Format: "date-time".
                       */
                      durationWithCustomer?: string;
                    }
                  | Record<string, any>;
                isRead?: boolean;
                isEndOfPurpose?: boolean;
                isDepersonalized?: boolean;
                adminData?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      createdBy?: string;
                      createdByName?: string;
                      /**
                       * Format: "date-time".
                       */
                      createdOn?: string;
                      /**
                       * Format: "uuid".
                       */
                      updatedBy?: string;
                      updatedByName?: string;
                      /**
                       * Format: "date-time".
                       */
                      updatedOn?: string;
                    }
                  | Record<string, any>;
                extensions?: Record<string, any>;
              }
            | Record<string, any>;
          info?:
            | {
                code?: string;
                details?:
                  | {
                      message?: string;
                      target?: string;
                      code?: string;
                    }
                  | Record<string, any>[];
                message?: string;
                target?: string;
              }
            | Record<string, any>;
        }
      | Record<string, any>
    >('put', '/sap/c4c/api/v1/case-service/cases/{id}', {
      pathParameters: { id },
      body,
    }),
  /**
   * Update case attributes in the system.
   * @param id - Case ID
   * @param body - Request body.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  modifycaseserviceCase: (
    id: string,
    body:
      | {
          subject?: string;
          priority?: string;
          status?: string;
          escalationStatus?: string;
          registeredProducts?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                serialId?: string;
              }
            | Record<string, any>[];
          functionalLocations?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
              }
            | Record<string, any>[];
          productInstallPoints?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
              }
            | Record<string, any>[];
          installedBases?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
              }
            | Record<string, any>[];
          account?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                name?: string;
                country?: string;
                state?: string;
                streetPostalCode?: string;
              }
            | Record<string, any>;
          contact?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                name?: string;
                emailId?: string;
                phoneNumber?: string;
              }
            | Record<string, any>;
          individualCustomer?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                name?: string;
                emailId?: string;
              }
            | Record<string, any>;
          processor?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                name?: string;
                emailId?: string;
              }
            | Record<string, any>;
          approvers?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                name?: string;
                emailId?: string;
              }
            | Record<string, any>[];
          serviceTeam?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                name?: string;
              }
            | Record<string, any>;
          description?:
            | {
                /**
                 * Format: "uuid".
                 */
                noteId?: string;
                content?: string;
              }
            | Record<string, any>;
          notes?:
            | {
                /**
                 * Format: "uuid".
                 */
                noteId?: string;
                /**
                 * Format: "uuid".
                 */
                id?: string;
                content?: string;
              }
            | Record<string, any>[];
          timePoints?:
            | {
                /**
                 * Format: "date-time".
                 */
                reportedOn?: string;
                /**
                 * Format: "date-time".
                 */
                escalatedOn?: string;
                /**
                 * Format: "date-time".
                 */
                completedOn?: string;
                /**
                 * Format: "date-time".
                 */
                completionDueOn?: string;
                /**
                 * Format: "date-time".
                 */
                assignedToCustomerOn?: string;
                /**
                 * Format: "date-time".
                 */
                assignedToProcessorOn?: string;
                /**
                 * Format: "date-time".
                 */
                initialReviewDueOn?: string;
                /**
                 * Format: "date-time".
                 */
                initialReviewCompletedOn?: string;
                /**
                 * Format: "date-time".
                 */
                resolutionDueOn?: string;
                /**
                 * Format: "date-time".
                 */
                responseDueOn?: string;
                /**
                 * Format: "date-time".
                 */
                closedOn?: string;
              }
            | Record<string, any>;
          categoryLevel1?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
              }
            | Record<string, any>;
          categoryLevel2?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
              }
            | Record<string, any>;
          extensions?: Record<string, any>;
        }
      | Record<string, any>
      | undefined,
  ) =>
    new OpenApiRequestBuilder<
      | {
          value?:
            | {
                /**
                 * Format: "uuid".
                 */
                id?: string;
                displayId?: string;
                subject?: string;
                priority?: string;
                priorityDescription?: string;
                origin?: string;
                caseType?: string;
                caseTypeDescription?: string;
                status?: string;
                statusDescription?: string;
                escalationStatus?: string;
                registeredProducts?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      serialId?: string;
                    }
                  | Record<string, any>[];
                functionalLocations?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>[];
                productInstallPoints?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>[];
                installedBases?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>[];
                account?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      country?: string;
                      state?: string;
                      streetPostalCode?: string;
                    }
                  | Record<string, any>;
                contact?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      emailId?: string;
                      phoneNumber?: string;
                    }
                  | Record<string, any>;
                individualCustomer?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      emailId?: string;
                    }
                  | Record<string, any>;
                processor?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      emailId?: string;
                    }
                  | Record<string, any>;
                approvers?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                      emailId?: string;
                    }
                  | Record<string, any>[];
                serviceTeam?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                      name?: string;
                    }
                  | Record<string, any>;
                description?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      noteId?: string;
                      content?: string;
                    }
                  | Record<string, any>;
                notes?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      noteId?: string;
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      content?: string;
                    }
                  | Record<string, any>[];
                relatedObjects?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      objectId?: string;
                      type?: string;
                      role?: string;
                    }
                  | Record<string, any>[];
                timePoints?:
                  | {
                      /**
                       * Format: "date-time".
                       */
                      reportedOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      escalatedOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      completedOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      completionDueOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      assignedToCustomerOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      assignedToProcessorOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      initialReviewDueOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      initialReviewCompletedOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      resolutionDueOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      responseDueOn?: string;
                      /**
                       * Format: "date-time".
                       */
                      closedOn?: string;
                    }
                  | Record<string, any>;
                categoryLevel1?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>;
                categoryLevel2?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      id?: string;
                      displayId?: string;
                    }
                  | Record<string, any>;
                /**
                 * Format: "uuid".
                 */
                serviceLevelId?: string;
                durationTerms?:
                  | {
                      /**
                       * Format: "date-time".
                       */
                      durationWithAgent?: string;
                      /**
                       * Format: "date-time".
                       */
                      durationWithCustomer?: string;
                    }
                  | Record<string, any>;
                isRead?: boolean;
                isEndOfPurpose?: boolean;
                isDepersonalized?: boolean;
                adminData?:
                  | {
                      /**
                       * Format: "uuid".
                       */
                      createdBy?: string;
                      createdByName?: string;
                      /**
                       * Format: "date-time".
                       */
                      createdOn?: string;
                      /**
                       * Format: "uuid".
                       */
                      updatedBy?: string;
                      updatedByName?: string;
                      /**
                       * Format: "date-time".
                       */
                      updatedOn?: string;
                    }
                  | Record<string, any>;
                extensions?: Record<string, any>;
              }
            | Record<string, any>;
          info?:
            | {
                code?: string;
                details?:
                  | {
                      message?: string;
                      target?: string;
                      code?: string;
                    }
                  | Record<string, any>[];
                message?: string;
                target?: string;
              }
            | Record<string, any>;
        }
      | Record<string, any>
    >('patch', '/sap/c4c/api/v1/case-service/cases/{id}', {
      pathParameters: { id },
      body,
    }),
};
