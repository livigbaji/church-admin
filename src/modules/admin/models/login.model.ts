// auth app
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { addHours } from 'date-fns';
import { Document, Types } from 'mongoose';

export type LoginDocument = Login & Document;

@Schema({
  versionKey: undefined,
  timestamps: true,
  _id: false,
})
export class Login {
  @ApiProperty()
  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  member: Types.ObjectId;

  @ApiProperty()
  @Prop({
    type: Date,
    default: () => addHours(new Date(), 6),
  })
  expiresAt: Date;

  @ApiProperty()
  @Prop({
    type: Boolean,
    default: () => true,
  })
  active: boolean;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  ip: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  device: string;

  @ApiProperty()
  @Prop({
    type: Date,
    default: () => null,
  })
  inactiveAt: Date;
}

export const LoginSchema = SchemaFactory.createForClass(Login);
