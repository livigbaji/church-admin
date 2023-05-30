import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AttendanceService } from '../services/attendance.service';
import {
  AttendanceCalendarView,
  AttendanceResponse,
  CreateAttendance,
} from '../dtos/create-attendance.dto';
import { Attendance } from '../models/attendance.model';

@ApiTags('Attendance')
@Controller('attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get('/calendar')
  @ApiOkResponse({
    type: AttendanceCalendarView,
  })
  getCalendarView(@Query('month') month: string, @Query('year') year: string) {
    return this.attendanceService.getMonthView(month, year);
  }

  @Get('/')
  @ApiOkResponse({
    type: AttendanceResponse,
  })
  list(@Query('month') month: string, @Query('year') year: string) {
    return this.attendanceService.list(month, year);
  }

  @Get('/member/:member')
  @ApiOkResponse({
    type: AttendanceResponse,
  })
  listMemberAttendance(@Param('member') member: string) {
    return this.attendanceService.listMemberAttendance(member);
  }

  @Post('/')
  @ApiCreatedResponse({
    type: Attendance,
  })
  create(@Body() attendance: CreateAttendance) {
    return this.attendanceService.createAttendance(attendance);
  }

  @Put('/:attendance/designations')
  @ApiOkResponse({
    type: Attendance,
  })
  updateDesignation(
    @Param('attendance') attendance: string,
    @Body() designation: CreateAttendance,
  ) {
    return this.attendanceService.updateDesignation(attendance, designation);
  }

  @Delete('/:attendance/designations/:designation')
  @ApiOkResponse({
    type: Attendance,
  })
  removeDesignation(
    @Param('attendance') attendance: string,
    @Param('designation') designation: string,
  ) {
    return this.attendanceService.deleteDesignation(attendance, designation);
  }
}
