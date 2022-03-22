import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config as awsconfig } from 'aws-sdk';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('EnDondeMeVacuno API')
    .setDescription('Listado de endpoints de la aplicación')
    .setVersion('1.0')
    .addTag('endondemavacuno')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  awsconfig.update({
    region: 'us-east-2',
  });
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(5000);
}
bootstrap();
