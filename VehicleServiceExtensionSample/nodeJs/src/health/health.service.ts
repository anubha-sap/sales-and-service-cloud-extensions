import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
@Injectable()
export class HealthService extends HealthIndicator {
  private isServerUp = false;

  async isServerRunning(key: string): Promise<HealthIndicatorResult> {
    const isServerUp = this.isServerUp;
    const result = this.getStatus(key, isServerUp, {
      message: `Server Running: ${isServerUp}`,
    });
    if (isServerUp) {
      return result;
    }

    throw new HealthCheckError('Server is not running', result);
  }

  setServerRunning(serverStatus: boolean): void {
    this.isServerUp = serverStatus;
  }
}
