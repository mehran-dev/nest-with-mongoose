import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private readonly prismaService: PrismaService) {}

  getRooms = async () => {
    const rooms = await this.prismaService.room.findMany({});
    return rooms;
  };
}
