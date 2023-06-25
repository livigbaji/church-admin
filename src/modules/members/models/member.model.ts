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
  @ApiProperty({
    type: String,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'Unit',
  })
  unit: Types.ObjectId;

  @ApiProperty()
  @Prop({
    type: String,
    enum: UnitMembershipStatus,
  })
  status: UnitMembershipStatus;

  @ApiProperty()
  @Prop({
    type: Date,
    default: Date.now,
  })
  interestedAt: Date;

  @ApiProperty()
  @Prop({
    type: Date,
    default: () => null,
  })
  startedAt: Date;
}

export const UnitMembershipSchema =
  SchemaFactory.createForClass(UnitMembership);

@Schema({
  versionKey: undefined,
  timestamps: true,
  id: true,
})
export class Member {
  @ApiProperty()
  @Prop({
    required: true,
  })
  firstName: string;

  @ApiProperty()
  @Prop({
    type: String,
    default: () => '',
  })
  middleName: string;

  @ApiProperty()
  @Prop({
    type: String,
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
    default: Date.now,
  })
  joinedCommissionAt: Date;

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

  @ApiProperty({
    type: UnitMembership,
    isArray: true,
  })
  @Prop({
    type: [UnitMembershipSchema],
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

MemberSchema.index(
  {
    firstName: 'text',
    middleName: 'text',
    lastName: 'text',
  },
  {
    name: 'fullname_search',
  },
);
