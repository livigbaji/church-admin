import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Transaction } from '../models/transaction.model';

export class NewTransactionDTO {
  @IsMongoId()
  @IsString()
  @IsOptional()
  @ApiProperty()
  member: string;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  amount: number;

  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  category: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}

export class TransferDTO {
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  amount: number;

  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  categoryFrom: string;

  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  categoryTo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}

export class CompleteTransaction {
  @ApiProperty()
  balance: number;

  @ApiProperty()
  transaction: Transaction;
}

export class CompleteTransfer {
  @ApiProperty()
  balance: number;

  @ApiProperty({
    type: Transaction,
    isArray: true,
  })
  transactions: Transaction[];
}
