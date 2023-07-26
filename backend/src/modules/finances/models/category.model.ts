import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({
  versionKey: undefined,
  _id: false,
  timestamps: true,
})
export class Category {
  @ApiProperty({
    example: 'Donations',
  })
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @ApiProperty({
    example:
      'Free will donations from members of the unit in the month of march',
  })
  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @ApiProperty()
  @Prop({
    type: Number,
    default: () => 0,
  })
  balance: number;

  @ApiProperty({
    type: String,
    example: 'Clarus',
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  createdBy: Types.ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
