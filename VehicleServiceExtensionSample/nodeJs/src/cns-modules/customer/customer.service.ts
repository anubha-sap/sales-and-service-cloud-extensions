import { Inject, Injectable } from '@nestjs/common';
import { ServerException } from '../../common/filters/server-exception';
import { IndividualCustomerApi } from './open-api/client/individual-customer/individual-customer-api';
import { AccountsApi } from './open-api/client/account/account-api';
import { REQUEST } from '@nestjs/core';
import { SESSION } from '../../common/constants';
import { CustomLogger } from '../../logger/logger.service';

@Injectable()
export class CustomerService {
  private sscDestination: string;
  private userToken: string;
  private requestId: string;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly logger: CustomLogger,
  ) {
    this.logger.setClassName(CustomerService.name);
    this.sscDestination = this.request[SESSION].sscDestination;
    this.userToken = this.request[SESSION].userToken;
    this.requestId = this.request[SESSION].reqId;
  }
  async getAccountInfo(id: string) {
    try {
      const startTime = new Date().getTime();
      const oAccountInfo = await AccountsApi.getAccountsApi(id).execute({
        destinationName: this.sscDestination,
        jwt: this.userToken,
      });
      const endTime = new Date().getTime();
      this.logger.debug(
        `Time taken by request ${this.requestId} to get account ${id}: ${
          (endTime - startTime) / 1000
        } seconds`,
      );
      return {
        contactNumber:
          oAccountInfo.value.defaultCommunication?.phoneFormattedNumber,
      };
    } catch (error) {
      const oErr = new Error(
        error.response?.data?.error?.message || error.message,
      );
      throw new ServerException(
        oErr,
        CustomerService.name,
        this.getAccountInfo.name,
      );
    }
  }

  async getIndividualCustomerInfo(id: string) {
    try {
      const startTime = new Date().getTime();
      const oCustomerInfo =
        await IndividualCustomerApi.getIndividualCustomerApi(id).execute({
          destinationName: this.sscDestination,
          jwt: this.userToken,
        });
      const endTime = new Date().getTime();
      this.logger.debug(
        `Time taken by request ${
          this.requestId
        } to get individual-customer ${id}: ${
          (endTime - startTime) / 1000
        } seconds`,
      );
      return {
        contactNumber:
          oCustomerInfo.value.defaultCommunication?.mobileFormattedNumber,
      };
    } catch (error) {
      const oErr = new Error(
        error.response?.data?.error?.message || error.message,
      );
      throw new ServerException(
        oErr,
        CustomerService.name,
        this.getIndividualCustomerInfo.name,
      );
    }
  }
}
