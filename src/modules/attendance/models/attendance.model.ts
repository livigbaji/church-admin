import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema({
  versionKey: undefined,
  _id: false,
})
export class AttendanceDesignation {
  @ApiProperty()
  @Prop({
    type: Date,
    default: Date.now,
  })
  timeIn: Date;

  @ApiProperty({
    type: String,
  })
  @Prop({
    type: Types.ObjectId,
  })
  designation: Types.ObjectId;
}

export const AttendanceDesignationSchema = SchemaFactory.createForClass(
  AttendanceDesignation,
);

@Schema({
  versionKey: undefined,
  timestamps: true,
})
export class Attendance {
  @ApiProperty({
    type: String,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  member: Types.ObjectId;

  @ApiProperty({
    type: AttendanceDesignation,
    isArray: true,
  })
  @Prop({
    type: [AttendanceDesignationSchema],
  })
  designations: AttendanceDesignation[];

  @ApiProperty()
  @Prop({
    type: Date,
    default: Date.now,
  })
  signInTime: Date;

  @ApiProperty()
  @Prop({
    type: Date,
    default: () => null,
  })
  signOutTime: Date;

  @ApiProperty()
  @Prop({
    type: String,
    default: () => 'default',
  })
  service: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
