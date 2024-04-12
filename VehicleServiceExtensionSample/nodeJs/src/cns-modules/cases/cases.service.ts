import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CaseApi } from './open-api/client/SalesSvcCloudV2_case';
import { SESSION } from '../../common/constants';
import { ServerException } from '../../common/filters/server-exception';
import { CustomLogger } from '../../logger/logger.service';

@Injectable()
export class CasesService {
  private sscDestination: string;
  private userToken: string;
  private milometerExtensionField: string;
  private requestId: string;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly logger: CustomLogger,
  ) {
    this.logger.setClassName(CasesService.name);
    this.sscDestination = this.request[SESSION].sscDestination;
    this.userToken = this.request[SESSION].userToken;
    this.milometerExtensionField =
      this.request[SESSION].extensionFields.milometer;
    this.requestId = this.request[SESSION].reqId;
  }
  async getCaseById(caseId: string) {
    try {
      const startTime = new Date().getTime();
      const responseData = await CaseApi.readcaseserviceCase(caseId).execute({
        destinationName: this.sscDestination,
        jwt: this.userToken,
      });
      const endTime = new Date().getTime();
      this.logger.debug(
        `Time taken by request ${this.requestId} to get case ${caseId}: ${
          (endTime - startTime) / 1000
        } seconds`,
      );
      return responseData.value;
    } catch (error) {
      const caseError = new Error(
        error.response?.data?.error?.message || error.message,
      );
      throw new ServerException(
        caseError,
        CasesService.name,
        this.getCaseById.name,
      );
    }
  }

  async updateCase(caseId: string, updateData: Record<string, any>) {
    try {
      const oCase = await this.getCaseById(caseId);
      const sIfMatch = oCase.adminData?.updatedOn;
      const startTime = new Date().getTime();
      const responseData = await CaseApi.modifycaseserviceCase(
        caseId,
        updateData,
      )
        .addCustomHeaders({
          'If-Match': sIfMatch,
        })
        .execute({
          destinationName: this.sscDestination,
          jwt: this.userToken,
        });
      const endTime = new Date().getTime();
      this.logger.debug(
        `Time taken by request ${this.requestId} to update case ${caseId}: ${
          (endTime - startTime) / 1000
        } seconds`,
      );
      return responseData;
    } catch (error) {
      const caseError = new Error(
        error.response?.data?.error?.message || error.message,
      );
      throw new ServerException(
        caseError,
        CasesService.name,
        this.getCaseById.name,
      );
    }
  }

  async getCase(query: Record<string, any>) {
    try {
      const startTime = new Date().getTime();
      this.logger.debug(`Querying case with ${JSON.stringify(query)}`);
      const responseData = await CaseApi.querycaseserviceCase(query).execute({
        destinationName: this.sscDestination,
        jwt: this.userToken,
      });
      const endTime = new Date().getTime();
      this.logger.debug(
        `Time taken by request ${this.requestId} to get case: ${
          (endTime - startTime) / 1000
        } seconds`,
      );
      return responseData.value;
    } catch (error) {
      const caseError = new Error(
        error.response?.data?.error?.message || error.message,
      );
      throw new ServerException(
        caseError,
        CasesService.name,
        this.getCase.name,
      );
    }
  }

  getCaseData(oCase) {
    const sProcessor = oCase.processor?.name;
    const nMilometer = oCase.extensions
      ? oCase.extensions[this.milometerExtensionField]
      : undefined;

    const sEstimatedCompletionDate = oCase.timePoints?.resolutionDueOn;

    let sCustomerName: string;
    if (oCase.individualCustomer) {
      sCustomerName = oCase.individualCustomer.name;
    } else if (oCase.account) {
      sCustomerName = oCase.account.name;
    }

    let sContactNumber: string;
    if (oCase.contact) {
      sContactNumber = oCase.contact.phoneNumber;
    }
    const sCaseDisplayId = oCase.displayId;

    return {
      sProcessor,
      nMilometer,
      sEstimatedCompletionDate,
      sCustomerName,
      sCaseDisplayId,
      sContactNumber,
    };
  }
}
