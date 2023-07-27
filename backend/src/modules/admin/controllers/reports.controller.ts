import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ReportService } from '../services/report.service';
import { DashboardReport, ReportDTO, ReportResponse } from '../dtos/report.dto';
import { Response } from 'express';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
const downloadFormat =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

@ApiTags('Report')
@Controller('/api/reports')
export class ReportsController {
  constructor(private readonly reportService: ReportService) {}

  @Get('/weekly')
  @ApiOperation({
    summary: 'Download weekly report',
  })
  @ApiOkResponse({
    schema: {
      type: 'string',
      format: 'binary',
      example: 'Weekly Report',
    },
  })
  @ApiProduces(downloadFormat)
  @Header('Content-Disposition', 'attachment; filename="weekly-report.docx"')
  async weeklyAttendance(@Res() response: Response) {
    response.contentType(downloadFormat);
    response.download(await this.reportService.weeklyAttendance());
  }

  @ApiOkResponse({
    type: DashboardReport,
  })
  @ApiOperation({
    summary: 'Dashboard statistics',
  })
  @Get('/dashboard')
  dashboard() {
    return this.reportService.dashboard();
  }

  @Get('/monthly/download/:month?')
  @ApiOperation({
    summary: 'Download monthly report for the deacon assembly',
  })
  @ApiOkResponse({
    schema: {
      type: 'string',
      format: 'binary',
      example: 'Weekly Report',
    },
  })
  @ApiParam({
    name: 'month',
    required: false,
  })
  @ApiProduces(downloadFormat)
  @Header('Content-Disposition', 'attachment; filename="deacon-report.docx"')
  async downloadDeaconReport(
    @Res() response: Response,
    @Param('month') month: string,
  ) {
    response.contentType(downloadFormat);
    response.send(
      Buffer.from(
        (await this.reportService.deaconReport(true, month)) as string,
      ),
    );
  }

  @Get('/monthly/:month?')
  @ApiOkResponse({
    type: ReportResponse,
  })
  @ApiParam({
    name: 'month',
    required: false,
  })
  @ApiOperation({
    summary: 'Get Deacon assembly report for the month',
  })
  deaconReport(@Param('month') month: string) {
    return this.reportService.deaconReport(false, month);
  }

  @Post('/monthly/:month?')
  @ApiOkResponse({
    type: ReportResponse,
  })
  @ApiParam({
    name: 'month',
    required: false,
  })
  @ApiOperation({
    summary: 'Create or update Deacon assembly report for the month',
  })
  modifyDeaconReport(@Body() report: ReportDTO, @Param('month') month: string) {
    return this.reportService.modifyDeaconReport(report, month);
  }
}
