import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { TransactionType } from 'backend/src/types/transaction.types';

export type TransactionDocument = Transaction & Document;

@Schema({
  versionKey: undefined,
  _id: false,
  timestamps: true,
})
export class Transaction {
  @ApiProperty()
  @Prop({
    type: Number,
    required: true,
  })
  amount: number;

  @ApiProperty({
    type: String,
    enum: TransactionType,
  })
  @Prop({
    type: String,
    enum: TransactionType,
    required: true,
  })
  txType: TransactionType;

  @ApiProperty({
    type: String,
    example: 'March Donations',
  })
  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @ApiProperty({
    type: String,
    example: 'Donations',
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  category: Types.ObjectId;

  @ApiPropertyOptional({
    type: String,
    example: 'David',
  })
  @Prop({
    type: Types.ObjectId,
    default: () => null,
  })
  member: Types.ObjectId;

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

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
