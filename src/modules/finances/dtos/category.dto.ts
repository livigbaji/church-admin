import { IsNotEmpty, IsString } from 'class-validator';
import { Category } from '../models/category.model';
import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from '../models/transaction.model';

export class NewCategoryDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}

export class CategoryList {
  @ApiProperty({
    type: Category,
    isArray: true,
  })
  data: Category[];
}

export class CategoryDetails {
  @ApiProperty()
  category: Category;

  @ApiProperty({
    type: Transaction,
    isArray: true,
  })
  transactions: Transaction[];
}
