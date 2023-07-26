import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmpty,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class WeeklyActivitiesDTO {
  @ApiProperty({
    example: {
      week1: 2,
      week2: 4,
      week3: 10,
      week4: 20,
    },
  })
  @IsNotEmptyObject()
  attendance: Record<string, number>;

  @ApiProperty({
    example: {
      week1: 2,
      week2: 4,
      week3: 10,
      week4: 20,
    },
  })
  @IsNotEmptyObject()
  resolution: Record<string, string>;
}

export class ReportDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  themeOfMonth: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  unitPastor: string;

  @ApiProperty()
  @IsNotEmptyObject()
  @IsObject()
  spiritualActivities: Record<string, string | number>;

  @ApiProperty()
  @IsNotEmptyObject()
  @IsObject()
  trainingActivities: Record<string, string | number>;

  @ApiProperty()
  @IsNotEmptyObject()
  @IsObject()
  socialActivities: Record<string, string | number>;

  @ApiProperty({
    type: WeeklyActivitiesDTO,
  })
  @ValidateNested()
  weeklyMeetings: WeeklyActivitiesDTO;

  @ApiProperty({
    example: '3RD SUNDAY OF EVERY MONTH',
  })
  @IsString()
  meetingDay: string;

  @ApiProperty({
    example: 'Breakthrough technical',
  })
  @IsString()
  @IsEmpty()
  readonly topicOfMeeting: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  meetingAttendance: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  newMeetingAttendance: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  disciplinaryActions: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  operationalChallenges: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  recommendations: string[];
}

export class MemberCount {
  @ApiProperty()
  male: number;

  @ApiProperty()
  female: number;
}

export class ReportResponse extends ReportDTO {
  @ApiProperty()
  activeMembers: MemberCount;

  @ApiProperty()
  prevMonth: MemberCount;

  @ApiProperty()
  intakes: MemberCount;
}

export class ServingStats {
  @ApiProperty()
  serving: number;

  @ApiProperty()
  nonServing: number;
}

export class ServiceStats {
  @ApiProperty()
  newMembers: MemberCount;

  @ApiProperty()
  oldMembers: MemberCount;
}

export class DashboardReport {
  @ApiProperty()
  birthdaysUpcoming: number;
  @ApiProperty()
  totalMembers: number;
  @ApiProperty()
  totalSubunits: number;
  @ApiProperty()
  absentLastWeek: number;
  @ApiProperty({
    example: {
      Jan: 0,
      Feb: 12,
    },
  })
  attendancePerMonth: Record<string, number>;
  @ApiProperty()
  femaleVsMales: MemberCount;
  @ApiProperty()
  servingVsNonServing: ServingStats;
  @ApiProperty({
    isArray: true,
    type: ServiceStats,
  })
  services: ServiceStats[];
}
