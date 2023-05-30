import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Attendance } from '../models/attendance.model';

export class CreateAttendance {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  member: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  designation: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  signInTime?: Date;
}

export class AttendanceCalendar {
  @ApiProperty()
  date: string;

  @ApiProperty()
  members: number;
}

export class AttendanceCalendarView {
  @ApiProperty({
    type: AttendanceCalendar,
    isArray: true,
  })
  records: AttendanceCalendar[];
}

export class AttendanceResponse {
  @ApiProperty({
    type: Attendance,
    isArray: true,
  })
  records: Attendance[];
}
