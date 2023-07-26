import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Unit, UnitDesignation } from '../models/unit.model';

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
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsPositive()
  @IsInt()
  idealMembers: number;
}

export class UnitResponse {
  @ApiProperty({
    type: Unit,
    isArray: true,
  })
  records: Unit[];
}

export class UnitDesignationResponse {
  @ApiProperty({
    type: UnitDesignation,
    isArray: true,
  })
  records: UnitDesignation[];
}
