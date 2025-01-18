import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppointmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const appointments = await this.prismaService.appointment.create({
      data: {
        created_at: createAppointmentDto.created_at,
        date: createAppointmentDto.date,
        end_time: createAppointmentDto.end_time,
        start_time: createAppointmentDto.start_time,
        updated_at: createAppointmentDto.updated_at,
        person_id: createAppointmentDto.person_id,
        reserved_by: createAppointmentDto.reserved_by,
        room: createAppointmentDto.room,
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
