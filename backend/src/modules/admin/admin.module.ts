import { Module, forwardRef } from '@nestjs/common';
import { AdminController } from './controllers/admin.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AdminService } from './services/admin.service';
import { Admin, AdminSchema } from './models/admin.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Login, LoginSchema } from './models/login.model';
import { MembersModule } from '../members/members.module';
import { ReportsController } from './controllers/reports.controller';
import { ReportService } from './services/report.service';
import { AttendanceModule } from '../attendance/attendance.module';
import { ReportSchema, Report } from './models/report.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: Login.name, schema: LoginSchema },
      { name: Report.name, schema: ReportSchema },
    ]),
    forwardRef(() => MembersModule),
    forwardRef(() => AttendanceModule),
  ],
  controllers: [AdminController, AuthController, ReportsController],
  providers: [AuthService, AdminService, ReportService],
  exports: [AuthService],
})
export class AdminModule {}
