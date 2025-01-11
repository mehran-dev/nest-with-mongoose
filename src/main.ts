import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
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
<<<<<<< HEAD
  await app.listen(8000);
=======
  await app.listen(3000);
>>>>>>> 7c129a1 (init::fire:it has been started)
}
bootstrap();
