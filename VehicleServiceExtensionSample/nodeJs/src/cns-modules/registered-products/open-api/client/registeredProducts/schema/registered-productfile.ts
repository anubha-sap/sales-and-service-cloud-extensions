/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

/**
 * Representation of the 'RegisteredProductfile' schema.
 */
export type RegisteredProductfile =
  | {
      value?:
        | {
            /**
             * Format: "uuid".
             */
            id?: string;
            displayId?: string;
            externalIds?:
              | {
                  id?: string;
                  externalId?: string;
                  communicationSystemDisplayId?: string;
                  /**
                   * Format: "uuid".
                   */
                  communicationSystemId?: string;
                  type?: string;
                }
              | Record<string, any>[];
            status?: 'OBSOLETE' | 'BLOCKED' | 'ACTIVE' | 'IN_PREPARATION';
            account?:
              | {
                  mainContactName?: string;
                  mainContactDisplayId?: string;
                  /**
                   * Format: "uuid".
                   */
                  mainContactId?: string;
                  displayId?: string;
                  name?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                }
              | Record<string, any>;
            individualCustomer?:
              | {
                  displayId?: string;
                  name?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                }
              | Record<string, any>;
            shipToAccount?:
              | {
                  mainContactName?: string;
                  mainContactDisplayId?: string;
                  /**
                   * Format: "uuid".
                   */
                  mainContactId?: string;
                  displayId?: string;
                  name?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                }
              | Record<string, any>;
            shipToIndividualCustomer?:
              | {
                  displayId?: string;
                  name?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                }
              | Record<string, any>;
            billToAccount?:
              | {
                  mainContactName?: string;
                  mainContactDisplayId?: string;
                  /**
                   * Format: "uuid".
                   */
                  mainContactId?: string;
                  displayId?: string;
                  name?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                }
              | Record<string, any>;
            billToIndividualCustomer?:
              | {
                  displayId?: string;
                  name?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                }
              | Record<string, any>;
            payerAccount?:
              | {
                  mainContactName?: string;
                  mainContactDisplayId?: string;
                  /**
                   * Format: "uuid".
                   */
                  mainContactId?: string;
                  displayId?: string;
                  name?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                }
              | Record<string, any>;
            payerIndividualCustomer?:
              | {
                  displayId?: string;
                  name?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                }
              | Record<string, any>;
            ownerAccount?:
              | {
                  mainContactName?: string;
                  mainContactDisplayId?: string;
                  /**
                   * Format: "uuid".
                   */
                  mainContactId?: string;
                  displayId?: string;
                  name?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                }
              | Record<string, any>;
            ownerIndividualCustomer?:
              | {
                  displayId?: string;
                  name?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                }
              | Record<string, any>;
            serviceTechnicianTeam?:
              | {
                  displayId?: string;
                  name?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                }
              | Record<string, any>;
            responsiblePlanner?:
              | {
                  displayId?: string;
                  name?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                }
              | Record<string, any>;
            serviceTechnician?:
              | {
                  displayId?: string;
                  name?: string;
                  /**
                   * Format: "email".
                   */
                  email?: string;
                  phone?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                }
              | Record<string, any>;
            employeeResponsible?:
              | {
                  displayId?: string;
                  name?: string;
                  /**
                   * Format: "email".
                   */
                  email?: string;
                  phone?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                }
              | Record<string, any>;
            descriptions?:
              | {
                  content?: string;
                  languageCode?: string;
                }
              | Record<string, any>[];
            description?: string;
            address?:
              | {
                  postalAddress?:
                    | {
                        buildingId?: string;
                        cityName?: string;
                        countryCode?: string;
                        countryName?: string;
                        stateCode?: string;
                        stateName?: string;
                        countyName?: string;
                        districtName?: string;
                        floorId?: string;
                        houseId?: string;
                        additionalHouseId?: string;
                        roomId?: string;
                        streetName?: string;
                        streetPostalCode?: string;
                        timeZoneCode?: string;
                        streetPrefixName?: string;
                        streetSuffixName?: string;
                        additionalStreetPrefixName?: string;
                        additionalStreetSuffixName?: string;
                        careOfName?: string;
                        poBoxDeviatingCityName?: string;
                        poBoxDeviatingCountryCode?: string;
                        poBoxID?: string;
                        poBoxPostalCode?: string;
                        poBoxStateCode?: string;
                        formattedPostalAddress?: string;
                      }
                    | Record<string, any>;
                  geographicalLocation?:
                    | {
                        latitude?: string;
                        longitude?: string;
                      }
                    | Record<string, any>;
                }
              | Record<string, any>;
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
            registeredProductCategory?:
              | {
                  description?: string;
                  code?: string;
                }
              | Record<string, any>;
            referenceProduct?:
              | {
                  displayId?: string;
                  description?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                }
              | Record<string, any>;
            parentRegisteredProduct?:
              | {
                  displayId?: string;
                  name?: string;
                  serialId?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                }
              | Record<string, any>;
            parentInstallationPoint?:
              | {
                  displayId?: string;
                  name?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                }
              | Record<string, any>;
            parentInstalledBase?:
              | {
                  displayId?: string;
                  name?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                }
              | Record<string, any>;
            /**
             * Format: "date-time".
             */
            referenceDate?: string;
            serialId?: string;
            warranty?:
              | {
                  displayId?: string;
                  name?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                  /**
                   * Format: "date-time".
                   */
                  endDate?: string;
                  /**
                   * Format: "date-time".
                   */
                  startDate?: string;
                }
              | Record<string, any>;
            salesOffice?:
              | {
                  displayId?: string;
                  name?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                }
              | Record<string, any>;
            salesGroup?:
              | {
                  displayId?: string;
                  name?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                }
              | Record<string, any>;
            salesOrganisation?:
              | {
                  displayId?: string;
                  name?: string;
                  /**
                   * Format: "uuid".
                   */
                  id?: string;
                }
              | Record<string, any>;
            divisionCode?: string;
            divisionCodeDescription?: string;
            distributionChannelCode?: string;
            distributionChannelDescription?: string;
            internalNotes?:
              | {
                  content?: string;
                  languageCode?: string;
                }
              | Record<string, any>[];
            customerInformation?:
              | {
                  content?: string;
                  languageCode?: string;
                }
              | Record<string, any>[];
          }
        | Record<string, any>;
    }
  | Record<string, any>;
