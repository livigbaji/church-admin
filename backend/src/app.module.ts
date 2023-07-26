import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './modules/members/members.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { AdminModule } from './modules/admin/admin.module';
import { FinancesModule } from './modules/finances/finances.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow('DATABASE_URI') as string,
      }),
    }),
    AttendanceModule,
    AdminModule,
    FinancesModule,
    MembersModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
