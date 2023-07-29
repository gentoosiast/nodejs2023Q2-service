import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import metadata from './metadata';
import { AppModule } from './app.module';
import { DEFAULT_PORT } from './shared/constants/env';
import { description, version as appVersion } from 'package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? DEFAULT_PORT;
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription(description)
    .setVersion(appVersion)
    .build();
  await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();
  await app.listen(port);
}
bootstrap();
