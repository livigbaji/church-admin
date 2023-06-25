import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Leadership } from '../models/leadership.model';
import { ApiProperty } from '@nestjs/swagger';

export class LeadershipDTO {
  @IsMongoId()
  @IsNotEmpty()
  member: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsMongoId()
  @IsOptional()
  unit?: string;

  @IsInt()
  @IsPositive()
  ranking: number;
}

export class LeadershipResponse {
  @ApiProperty()
  data: Leadership[];
}
