import { UserType } from '.prisma/client';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseEnumPipe,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcryptjs';

import { ApiTags } from '@nestjs/swagger';
import { RoomService } from './room.service';

@ApiTags('room') // Tag for Swagger grouping
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('/x')
  async signup(@Body() body: null) {
    return this.roomService.getRooms();
  }
  @Post('/x')
  async addNewRoom(@Body() body: null) {
    return this.roomService.addRooms();
  }
}
