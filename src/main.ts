import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;

  // security setup
  app.use(helmet());
  app.use(rateLimit({ windowMs: 15*60*1000, max: 100 }));
  app.useGlobalPipes(new ValidationPipe());

  // swagger doc setup
  const config = new DocumentBuilder()
  .setTitle('Ghibli Users API')
  .setDescription('API de usuarios con Studio Ghibli')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // all exceptions filter setup
  app.useGlobalFilters(new AllExceptionsFilter())


  await app.listen(port);

  console.log('Users API Running in port', port )
}
bootstrap();
