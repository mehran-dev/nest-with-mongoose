export class CreateAppointmentDto {
  id: string;
  reserved_by_id: string;
  reserved_by: object;
  room_id: string;
  room: object;
  date: Date;
  created_at: Date;
  updated_at: Date;
  start_time: string;
  end_time: string;
}
