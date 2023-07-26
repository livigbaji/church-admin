import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UnitDocument = Unit & Document;

@Schema({
  versionKey: undefined,
  timestamps: true,
})
export class UnitDesignation {
  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @ApiProperty()
  @Prop({
    type: Number,
    required: true,
  })
  idealMembers: number;
}

export const UnitDesignationSchema =
  SchemaFactory.createForClass(UnitDesignation);

@Schema({
  versionKey: undefined,
  timestamps: true,
  id: true,
})
export class Unit {
  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  parentUnit: string;

  @ApiProperty()
  @Prop({
    type: [String],
    required: true,
  })
  responsibilities: string[];

  @ApiProperty({
    isArray: true,
    type: UnitDesignation,
  })
  @Prop({
    type: [UnitDesignationSchema],
  })
  designations: UnitDesignation[];

  @ApiProperty()
  @Prop({
    type: Number,
    required: true,
  })
  servingNumber: number;
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
