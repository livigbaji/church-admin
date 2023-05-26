import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UnitDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  parentUnit: string;

  @ApiProperty()
  @IsString({ each: true })
  responsibilities: string[];

  @ApiProperty()
  @IsPositive()
  @IsInt()
  servingNumber: number;
}

export class UnitDesignationDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsPositive()
  @IsInt()
  idealMembers: number;
}
