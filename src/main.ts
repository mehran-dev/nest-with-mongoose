import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import connectToDatabase from './models/mongod';
// require('dotenv').config(); // Load environment variables from .env

async function bootstrap() {
  await connectToDatabase();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description for my project')
    .setVersion('1.0')
    .addBearerAuth()
    // .addTag('rental API center') // Optional: Add tags
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Access Swagger at /api

  // Connect to MongoDB
  await app.listen(8000);
}
bootstrap();
