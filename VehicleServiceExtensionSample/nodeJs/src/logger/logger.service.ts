import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DEFAULT_LOG_LEVEL } from '../common/constants';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger implements LoggerService {
  private className: string;

  constructor(@Inject(REQUEST) private request) {}

  setClassName(className: string) {
    this.className = className;
  }

  getLogLevel() {
    const logLevel = this.request.session?.log;
    return logLevel >= 0 && logLevel <= 4 ? logLevel : DEFAULT_LOG_LEVEL;
  }

  error(message: any) {
    if (this.getLogLevel() >= 1) {
      Logger.error(this.formatMessage(message));
    }
  }

  warn(message: string) {
    if (this.getLogLevel() >= 2) {
      Logger.warn(this.formatMessage(message));
    }
  }

  log(message: string) {
    if (this.getLogLevel() >= 3) {
      Logger.log(this.formatMessage(message));
    }
  }

  debug(message: string) {
    if (this.getLogLevel() >= 4) {
      Logger.debug(this.formatMessage(message));
    }
  }

  formatMessage(message: string) {
    return `[${this.className}] - ${message}`;
  }
}
