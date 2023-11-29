import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SESSION } from '../constants';
import { retrieveJwt, decodeJwt } from '@sap-cloud-sdk/connectivity';
import { CustomLogger } from '../../logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(
    private readonly logger: CustomLogger,
    private readonly configService: ConfigService,
  ) {
    this.logger.setClassName(SessionMiddleware.name);
  }
  use(req: Request, res: Response, next: NextFunction) {
    const lang = req.headers['accept-language'];

    const userToken: string = retrieveJwt(req);
    if (!userToken) {
      throw new UnauthorizedException();
    }
    const decodedToken = decodeJwt(userToken);

    // Fetching case statuses from environment variables
    const caseStatuses = {
      booked: this.configService.get('case_status_booked'),
      closed: this.configService.get('case_status_closed'),
      completed: this.configService.get('case_status_completed'),
      serviceCompleted: this.configService.get('case_status_service_completed'),
      serviceInProcess: this.configService.get(
        'case_status_service_in_process',
      ),
    };

    // Fetching extension fields from environment variables
    const extensionFields = {
      jobCardId: this.configService.get('extension_field_jobcard_id'),
      milometer: this.configService.get('extension_field_milometer'),
      serviceFormId: this.configService.get('extension_field_service_form_id'),
      vehicleNumber: this.configService.get('extension_field_vehicle_number'),
    };

    req[SESSION] = {
      reqId: uuid(),
      language: lang,
      userToken,
      userId: decodedToken.user_id,
      log: this.configService.get('logLevel'),
      sscDestination: this.configService.get('destination'),
      caseStatuses,
      extensionFields,
    };

    console.log('\n');
    this.logger.log(`Request recieved for user: ${req[SESSION].userId}`);
    this.logger.debug(`Request session: ${JSON.stringify(req[SESSION])}`);

    next();
  }
}
