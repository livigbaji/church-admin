import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type LeadershipDocument = Leadership & Document;

@Schema({
  versionKey: undefined,
  timestamps: true,
  id: true,
})
export class Leadership {
  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  member: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  position: string;

  @ApiProperty()
  @Prop({
    type: Date,
    required: true,
  })
  startedAt: Date;

  @ApiProperty()
  @Prop({
    type: Date,
    default: () => null,
  })
  endedAt: Date;

  @ApiProperty()
  @Prop({
    type: String,
    default: () => null,
  })
  unit: string;

  @ApiProperty()
  @Prop({
    type: Number,
    required: true,
  })
  ranking: number;
}

export const LeaderSchema = SchemaFactory.createForClass(Leadership);
