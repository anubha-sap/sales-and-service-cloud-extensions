import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisteredProductApi } from './open-api/client/registeredProducts';
import { MESSAGES, SESSION } from '../../common/constants';
import { ServerException } from '../../common/filters/server-exception';
import { RegisteredProduct } from '../../extension-modules/common/interfaces';
import { REQUEST } from '@nestjs/core';
import { CustomLogger } from '../../logger/logger.service';

@Injectable()
export class RegisteredProductsService {
  private vehicleNumberExtensionField: string;
  private sscDestination: string;
  private userToken: string;
  private requestId: string;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly logger: CustomLogger,
  ) {
    this.logger.setClassName(RegisteredProductsService.name);
    this.vehicleNumberExtensionField =
      this.request[SESSION].extensionFields.vehicleNumber;
    this.sscDestination = this.request[SESSION].sscDestination;
    this.userToken = this.request[SESSION].userToken;
    this.requestId = this.request[SESSION].reqId;
  }

  async findOne(id: string) {
    try {
      const startTime = new Date().getTime();
      const responseData =
        await RegisteredProductApi.readregisteredproductserviceRegisteredProduct(
          id,
        ).execute({
          destinationName: this.sscDestination,
          jwt: this.userToken,
        });
      const endTime = new Date().getTime();
      this.logger.debug(
        `Time taken by request ${
          this.requestId
        } to get registered-product ${id}: ${
          (endTime - startTime) / 1000
        } seconds`,
      );
      return responseData.value;
    } catch (error) {
      const registeredProductError = new Error(
        error.response?.data?.error?.message || error.message,
      );
      throw new ServerException(
        registeredProductError,
        RegisteredProductsService.name,
        this.findOne.name,
      );
    }
  }

  async getRegisteredProductData(oCase): Promise<RegisteredProduct> {
    // Getting Registered Products - dop, vin, model
    const oRegisteredProducts = oCase.registeredProducts;
    if (!oRegisteredProducts) {
      throw new InternalServerErrorException(
        MESSAGES.NO_REGISTERED_PRODUCTS_IN_CASE,
      );
    }
    const sRegisteredProductsId = oCase.registeredProducts[0].id;
    const oRegisteredProduct = await this.findOne(sRegisteredProductsId);
    const sVehicleNumber: string = oRegisteredProduct.extensions
      ? oRegisteredProduct.extensions[this.vehicleNumberExtensionField]
      : undefined;
    const sDateOfPurchase: string = oRegisteredProduct.referenceDate
      ? oRegisteredProduct.referenceDate
      : '';
    const sModel: string = oRegisteredProduct.referenceProduct?.description
      ? oRegisteredProduct.referenceProduct.description
      : '';

    return {
      vehicleNumber: sVehicleNumber,
      dateOfPurchase: sDateOfPurchase,
      model: sModel,
    };
  }
}
