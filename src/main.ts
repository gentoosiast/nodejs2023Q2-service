import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@config/interfaces/env-config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { description, version as appVersion } from 'package.json';
import { GlobalExceptionFilter } from '@shared/filters/global/global-exception.filter';
import { LoggingService } from '@shared/services/logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get(LoggingService);
  app.useLogger(logger);
  app.enableCors();
  const configService = app.get(ConfigService<EnvironmentVariables>);
  const port = +configService.get('port', { infer: true });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription(description)
    .setVersion(appVersion)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());

  process.on('unhandledRejection', (err) => {
    logger.error(`Unhandled Rejection: ${JSON.stringify(err)}`);
  });

  process.on('uncaughtException', (err) => {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    logger.error(`Uncaught Exception: ${message}`);
  });

  await app.listen(port);
}
bootstrap();
