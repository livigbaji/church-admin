import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Gender, MaritalStatus } from 'src/types';

export type MemberDocument = Member & Document;

@Schema({
  versionKey: undefined,
  timestamps: true,
})
export class Member {
  @ApiProperty()
  @Prop({
    required: true,
  })
  firstName: string;

  @ApiProperty()
  @Prop()
  middleName: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  lastName: string;

  @ApiProperty({
    enum: MaritalStatus,
  })
  @Prop({
    required: true,
    type: String,
    enum: MaritalStatus,
  })
  maritalStatus: MaritalStatus;

  @ApiProperty({
    enum: Gender,
  })
  @Prop({
    required: true,
    type: String,
    enum: Gender,
  })
  gender: Gender;

  @ApiProperty()
  @Prop({
    type: String,
  })
  homeCell: string;

  @ApiProperty()
  @Prop({
    type: Date,
    default: Date.now,
  })
  joinedUnitAt: Date;

  @ApiProperty()
  @Prop({
    type: Date,
    default: () => null,
  })
  newBirthAt: Date;

  @ApiProperty()
  @Prop({
    type: Date,
    default: () => null,
  })
  baptizedAt: Date;

  @ApiProperty({
    type: String,
    isArray: true,
  })
  @Prop({
    type: [String],
  })
  occupation: string[];

  @Prop({
    type: String,
    required: true,
  })
  @ApiProperty()
  birthday: string;

  @ApiProperty({
    isArray: true,
    type: String,
  })
  @Prop({
    type: [String],
    required: true,
  })
  phoneNumber: string[];

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  address: string;

  @ApiProperty()
  @Prop({
    type: String,
  })
  reference: string;

  @ApiProperty()
  @Prop({
    type: String,
  })
  qualification: string;

  @ApiProperty({
    type: String,
    isArray: true,
  })
  @Prop({
    type: [String],
  })
  otherUnits: string[];

  @ApiProperty({
    type: String,
    isArray: true,
  })
  @Prop({
    type: [String],
  })
  hobbies: string[];

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  nextofKin: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  nextOfKinNumber: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  village: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  homeTown: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  lga: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  state: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
