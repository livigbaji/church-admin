import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { Gender, MaritalStatus, UnitMembershipStatus } from 'src/types';

export type MemberDocument = Member & Document;

@Schema({
  versionKey: undefined,
  _id: false,
})
export class UnitMembership {
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'Unit',
  })
  unit: Types.ObjectId;

  @Prop({
    type: String,
    enum: UnitMembershipStatus,
  })
  status: UnitMembershipStatus;

  @Prop({
    type: Date,
    default: Date.now,
  })
  interestedAt: Date;

  @Prop({
    type: Date,
    default: () => null,
  })
  startedAt: Date;
}

@Schema({
  versionKey: undefined,
  timestamps: true,
})
export class Member {
  @ApiProperty()
  @Prop({
    required: true,
    text: true,
  })
  firstName: string;

  @ApiProperty()
  @Prop({
    text: true,
  })
  middleName: string;

  @ApiProperty()
  @Prop({
    required: true,
    text: true,
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
    text: true,
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
    text: true,
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
    text: true,
  })
  village: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
    text: true,
  })
  homeTown: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
    text: true,
  })
  lga: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
    text: true,
  })
  state: string;

  @ApiProperty({
    type: UnitMembership,
    isArray: true,
  })
  @Prop({
    type: [UnitMembership],
  })
  units: UnitMembership[];

  @Prop({
    type: Boolean,
    default: () => false,
  })
  deleted: boolean;

  @Prop({
    type: Date,
    default: () => null,
  })
  deletedAt: Date;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
