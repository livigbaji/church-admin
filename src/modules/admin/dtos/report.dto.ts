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
import { WeeklyActivities } from '../models/report.model';

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
    type: WeeklyActivities,
  })
  @ValidateNested()
  weeklyMeetings: WeeklyActivities;

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
