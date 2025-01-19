import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  imports: [],
  controllers: [HomeController],
  providers: [
    HomeService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class HomeModule {}
