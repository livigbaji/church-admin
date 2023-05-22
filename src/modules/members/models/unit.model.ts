import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UnitDocument = Unit & Document;

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
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
