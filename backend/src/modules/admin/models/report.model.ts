import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

@Schema({
  versionKey: undefined,
  timestamps: true,
  _id: false,
})
export class WeeklyActivities {
  @ApiProperty({
    example: {
      week1: 2,
      week2: 4,
      week3: 10,
      week4: 20,
    },
  })
  @Prop({
    required: true,
    type: Types.Map<string>,
  })
  attendance: Record<string, number>;

  @ApiProperty({
    example: {
      week1: 2,
      week2: 4,
      week3: 10,
      week4: 20,
    },
  })
  @Prop({
    required: true,
    type: Types.Map<string>,
  })
  resolution: Record<string, string>;
}

export type ReportDocument = Report & Document;

@Schema({
  versionKey: undefined,
  timestamps: true,
  id: true,
})
export class Report {
  @ApiProperty()
  @Prop({
    type: [Types.ObjectId],
    required: true,
  })
  admin: Types.ObjectId[];

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  month: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  themeOfMonth: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  unitPastor: string;

  @ApiProperty()
  @Prop({
    type: Types.Map<string>,
    required: true,
  })
  spiritualActivities: Record<string, string | number>;

  @ApiProperty()
  @Prop({
    type: Types.Map<string>,
    required: true,
  })
  trainingActivities: Record<string, string | number>;

  @ApiProperty()
  @Prop({
    type: Types.Map<string>,
    required: true,
  })
  socialActivities: Record<string, string | number>;

  @ApiProperty({
    type: WeeklyActivities,
  })
  @Prop({
    type: WeeklyActivities,
    required: true,
  })
  weeklyMeetings: WeeklyActivities;

  @ApiProperty({
    example: '3RD SUNDAY OF EVERY MONTH',
  })
  @Prop({
    type: String,
    required: true,
    default: () => '3RD SUNDAY OF EVERY MONTH',
  })
  meetingDay: string;

  @ApiProperty({
    example: 'Breakthrough technical',
  })
  @Prop({
    type: String,
    required: true,
  })
  topicOfMeeting: string;

  @ApiProperty()
  @Prop({
    type: Number,
    required: true,
  })
  meetingAttendance: number;

  @ApiProperty()
  @Prop({
    type: Number,
    required: true,
  })
  newMeetingAttendance: number;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
    default: () => 'NONE',
  })
  disciplinaryActions: string;

  @ApiProperty()
  @Prop({
    type: [String],
  })
  operationalChallenges: string[];

  @ApiProperty()
  @Prop({
    type: [String],
  })
  recommendations: string[];
}

export const ReportSchema = SchemaFactory.createForClass(Report);
