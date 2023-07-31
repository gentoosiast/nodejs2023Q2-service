import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DEFAULT_PORT } from './shared/constants/env';
import { description, version as appVersion } from 'package.json';
import { GlobalExceptionFilter } from '@shared/filters/global/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? DEFAULT_PORT;
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription(description)
    .setVersion(appVersion)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors();
  await app.listen(port);
}
bootstrap();
