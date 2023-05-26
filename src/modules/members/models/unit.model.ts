import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UnitDocument = Unit & Document;

@Schema({
  versionKey: undefined,
  timestamps: true,
})
export class UnitDesignation {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: Number,
    required: true,
  })
  idealMembers: number;
}

@Schema({
  versionKey: undefined,
  timestamps: true,
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

  @Prop({
    type: [UnitDesignation],
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
