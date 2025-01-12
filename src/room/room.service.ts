import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private readonly prismaService: PrismaService) {}

  getRooms = async () => {
    const rooms = await this.prismaService.room.findMany({});
    return rooms;
  };

  addRooms = async () => {
    const rooms = await this.prismaService.room.create({
      data: {
        location: 'RM3#WithBetter$fnzIndeed',
        name: 'New Room',
        personId: '123456789012345678941256',
      },
    });
    return rooms;
  };
}
