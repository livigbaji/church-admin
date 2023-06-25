import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Leadership } from '../models/leadership.model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LeadershipDTO {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  member: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  position: string;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional()
  unit?: string;

  @IsInt()
  @IsPositive()
  @ApiProperty()
  ranking: number;
}

export class LeadershipResponse {
  @ApiProperty({
    isArray: true,
    type: Leadership,
  })
  data: Leadership[];
}
