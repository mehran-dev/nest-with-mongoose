import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class AppointmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const personExists = await this.prismaService.person.findUnique({
      where: { id: '67824448e552aa3391f9c0db' },
    });

    const roomExists = await this.prismaService.room.findUnique({
      where: { id: '678384436ec18c5f2e0dc84d' },
    });

    if (!roomExists) {
      // throw new Error('Room does not exist.');
      console.log('Room does not exist.');
    }
    if (!personExists) {
      // throw new Error('Person  does not exist.');
      console.log('Person  does not exist.');
    }

    const newAppointment = await this.prismaService.appointment.create({
      data: {
        created_at: new Date(parseInt('1737186177422')), // Creation timestamp
        updated_at: new Date(parseInt('1737186177422')), // Update timestamp
        date: new Date(parseInt('1737186177422')), // Appointment date
        // @ts-ignore
        start_time: new Date(parseInt('1737186177422')), // Start time
        // @ts-ignore
        end_time: new Date(parseInt('1737186177422')), // End time
        reserved_by: {
          connect: { id: '67824448e552aa3391f9c0db' }, // Link existing person
        },
        room: {
          connect: { id: '678384436ec18c5f2e0dc84d' }, // Link existing room
        },
      },
    });

    return 'This action adds a new appointment';
  }

  async findAll() {
    const appointments = await this.prismaService.appointment.findMany({});

    if (!appointments.length) {
      throw new NotFoundException();
    }
    return appointments;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
