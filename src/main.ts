import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as CookieParser from 'cookie-parser';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(CookieParser());
  app.setGlobalPrefix('/api/v1');
  const config = new DocumentBuilder()
    .setTitle('Nestjs JWT')
    .setDescription('The Nestjs JWT app API description')
    .setVersion('1.0')
    .addTag('NestJs JWT')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
