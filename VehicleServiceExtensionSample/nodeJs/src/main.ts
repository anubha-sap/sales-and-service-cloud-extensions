import { config } from 'dotenv';
config(); // Load environment variables from .env file
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HealthService } from './health/health.service';
import helmet from 'helmet';
import { json } from 'body-parser';
import { AnyExceptionFilter } from './common/filters/any-exception.filter';
import { ValidationException } from './common/validations/validation.exception';
import { GLOBAL_PREFIX } from './common/constants';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.use(helmet());
  app.use(json());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: false,
      whitelist: true,
      // forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new ValidationException(errors),
    }),
  );
  app.useGlobalFilters(new AnyExceptionFilter());
  app.setGlobalPrefix(GLOBAL_PREFIX);
  const port = 3000;
  await app.listen(port);
  const heathService = await app.get<HealthService>(HealthService);
  heathService.setServerRunning(true);
}
bootstrap();
