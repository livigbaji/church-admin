import { Injectable, NotFoundException } from '@nestjs/common';
import { Attendance, AttendanceDocument } from '../models/attendance.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AttendanceCalendarView,
  CreateAttendance,
} from '../dtos/create-attendance.dto';
import { endOfMonth, isValid, startOfMonth } from 'date-fns';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name)
    private readonly attendanceModel: Model<AttendanceDocument>,
  ) {}

  list(month: string, year: string) {
    // TODO add fullname and designation name and unit
    let date = new Date(`${year}-${month}-01`);
    if (!isValid(date)) {
      date = new Date();
    }
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    return this.attendanceModel
      .find({
        createdAt: {
          $gte: monthStart,
          $lte: monthEnd,
        },
      })
      .sort({ createdAt: -1 })
      .then((records) => ({ records }));
  }

  listMemberAttendance(member: string) {
    return this.attendanceModel
      .find({
        member,
      })
      .sort({ createdAt: -1 })
      .then((records) => ({ records }));
  }

  createAttendance(attendance: CreateAttendance) {
    return this.attendanceModel.create({
      member: attendance.member,
      designations: attendance.designation
        ? [
            {
              designation: attendance.designation,
              ...(attendance.signInTime && { timeIn: attendance.signInTime }),
            },
          ]
        : [],
      ...(attendance.signInTime && { signInTime: attendance.signInTime }),
    });
  }

  updateDesignation(attendance: string, designationInput: CreateAttendance) {
    return this.attendanceModel
      .findOneAndUpdate(
        {
          _id: attendance,
          member: designationInput.member,
        },
        {
          $addToSet: {
            designations: {
              designation: designationInput.designation,
              timeIn: designationInput.signInTime,
            },
          },
        },
        {
          new: true,
        },
      )
      .then((member) => {
        if (!member) {
          throw new NotFoundException('Member does not exist or not signed in');
        }
        return member;
      });
  }

  deleteDesignation(attendance: string, designation: string) {
    return this.attendanceModel
      .findOneAndUpdate(
        {
          _id: attendance,
        },
        {
          $pull: {
            designations: designation,
          },
        },
        {
          new: true,
        },
      )
      .then((member) => {
        if (!member) {
          throw new NotFoundException('Member does not exist or not signed in');
        }
        return member;
      });
  }

  getMonthView(month: string, year: string) {
    let date = new Date(`${year}-${month}-01`);
    if (!isValid(date)) {
      date = new Date();
    }
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    return this.attendanceModel
      .aggregate<AttendanceCalendarView>([
        {
          $match: {
            createdAt: {
              $gte: monthStart,
              $lte: monthEnd,
            },
          },
        },
        {
          $group: {
            _id: { $dateToString: { date: '$createdAt', format: '%Y-%m-%d' } },
            members: { $addToSet: '$member' },
          },
        },
        {
          $project: {
            _id: 0,
            date: '$_id',
            members: { $size: '$members' },
          },
        },
      ])
      .then((records) => ({ records }));
  }
}
