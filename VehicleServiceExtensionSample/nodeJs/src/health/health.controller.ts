import { Controller, Get, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { HealthService as AppHealthService } from './health.service';

@Controller('healthz')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private typeOrmHealthIndicator: TypeOrmHealthIndicator,
    private readonly appHealthService: AppHealthService,
  ) {}
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () => this.appHealthService.isServerRunning('Check app status'),
      () => this.http.pingCheck('google', 'https://google.com'),
      () => this.typeOrmHealthIndicator.pingCheck('database'),
    ]);
  }
}
