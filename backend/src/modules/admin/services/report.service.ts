import { Injectable } from '@nestjs/common';
import { ReportDocument, Report } from '../models/report.model';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { MembersService } from 'backend/src/modules/members/services/members.service';
import { Model } from 'mongoose';
import { AttendanceService } from 'backend/src/modules/attendance/services/attendance.service';
import { MemberCount, ReportDTO, ReportResponse } from '../dtos/report.dto';
import * as ejs from 'ejs';
import { readFileSync } from 'fs';
import HTMLtoDOCX = require('html-to-docx');

const getReportMonth = () => {
  const today = new Date();
  return `${today.getFullYear()}${today.getMonth() + 1}`;
};

@Injectable()
export class ReportService {
  private readonly templateDir = this.configSerivce.get(
    'TEMPLATE_DIR',
  ) as string;

  constructor(
    @InjectModel(Report.name)
    private readonly reportModel: Model<ReportDocument>,
    private readonly memberService: MembersService,
    private readonly configSerivce: ConfigService,
    private readonly attendanceService: AttendanceService,
  ) {}

  async weeklyAttendance() {
    const attendance = await this.attendanceService.getDailyReport();
    const template = readFileSync(
      `${this.templateDir}/deacon-report.template.ejs`,
      {
        encoding: 'utf8',
      },
    );
    return HTMLtoDOCX(ejs.render(template, attendance), null, {
      table: { row: { cantSplit: true } },
      footer: true,
      pageNumber: true,
    });
  }

  dashboard() {
    return {
      birthdaysUpcoming: 0,
      totalMembers: 0,
      totalSubunits: 0,
      absentLastWeek: 0,
      attendancePerMonth: [],
      femaleVsMales: MemberCount,
      servingVsNonServing: { serving: 0, nonServing: 0 },
      services: [],
    };
  }

  async deaconReport(
    download?: boolean,
    month?: string,
  ): Promise<string | ReportResponse> {
    month = month || getReportMonth();
    const report = await this.reportModel
      .findOne({
        month,
      })
      .exec();
    // TODO: prev month attendance
    const prevMonth = { male: 0, female: 0 };
    // TODO: new members this month
    const intakes = { male: 0, female: 0 };
    // TODO: members in attendance for last 3 months
    const activeMembers = { male: 0, female: 0 };
    // TODO: get birthdayCount month
    const birthdayCount = 0;

    const finalReport = {
      ...report.toObject(),
      prevMonth,
      intakes,
      activeMembers,
      birthdayCount,
    };

    if (download) {
      const template = readFileSync(
        `${this.templateDir}/weekly-attendance.template.ejs`,
        {
          encoding: 'utf8',
        },
      );
      return HTMLtoDOCX(ejs.render(template, finalReport), null, {
        table: { row: { cantSplit: true } },
        footer: true,
        pageNumber: true,
      });
    }

    return finalReport;
  }

  modifyDeaconReport(report: ReportDTO, month?: string) {
    month = month || getReportMonth();
    return this.reportModel.findOneAndUpdate(
      {
        month: month,
      },
      {
        $set: report,
        $setOnInsert: {
          month,
        },
      },
      {
        new: true,
        upsert: true,
      },
    );
  }
}
