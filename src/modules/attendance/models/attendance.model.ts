import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

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
    type: String,
  })
  @Prop({
    type: Types.ObjectId,
  })
  designation: Types.ObjectId;

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
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
