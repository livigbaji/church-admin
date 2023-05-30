import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateAttendance {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  member: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  designation: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  signInTime?: Date;
}
