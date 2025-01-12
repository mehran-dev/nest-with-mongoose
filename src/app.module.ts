import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { HomeModule } from './home/home.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './user/interceptors/user.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { RoomService } from './room/room.service';
import { RoomModule } from './room/room.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [UserModule, PrismaModule, HomeModule, RoomModule, AppointmentModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    RoomService,
  ],
})
export class AppModule {}

// SIGNUP

// SIGNIN

// ME
