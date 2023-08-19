import { Module, forwardRef } from '@nestjs/common';
import { AttendanceController } from './controllers/attendance.controller';
import { AttendanceService } from './services/attendance.service';
import { Attendance, AttendanceSchema } from './models/attendance.model';
import { MongooseModule } from '@nestjs/mongoose';
import { MembersModule } from '../members/members.module';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Attendance.name, schema: AttendanceSchema },
    ]),
    forwardRef(() => MembersModule),
    forwardRef(() => AdminModule),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [AttendanceService],
})
export class AttendanceModule {}
