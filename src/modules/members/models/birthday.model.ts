import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type BirthdayDocument = Birthday & Document;

@Schema({
  versionKey: undefined,
  timestamps: true,
  id: true,
})
export class Birthday {
  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  member: string;

  @ApiProperty()
  @Prop({
    type: MongooseSchema.Types.Map,
    required: true,
  })
  questions: Record<string, string>;

  @ApiProperty()
  @Prop({
    type: String,
  })
  picture: string;
}

export const BirthdaySchema = SchemaFactory.createForClass(Birthday);
