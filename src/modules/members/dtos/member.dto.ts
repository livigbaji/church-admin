import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { MaritalStatus, Gender } from 'src/types';

export class CreateMemberDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  middleName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    enum: MaritalStatus,
  })
  @IsEnum(MaritalStatus)
  maritalStatus: MaritalStatus;

  @ApiProperty({
    enum: Gender,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsString()
  homeCell: string;

  @ApiProperty()
  @IsDateString()
  joinedUnitAt: Date;

  @ApiProperty()
  @IsDateString()
  newBirthAt: Date;

  @ApiProperty()
  @IsDateString()
  baptizedAt: Date;

  @ApiProperty({
    type: String,
    isArray: true,
  })
  @IsString({ each: true })
  occupation: string[];

  @IsString()
  @ApiProperty()
  birthday: string;

  @ApiProperty({
    isArray: true,
    type: String,
  })
  @IsPhoneNumber('NG', { each: true })
  phoneNumber: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  reference: string;

  @ApiProperty()
  @IsString()
  qualification: string;

  @ApiProperty({
    type: String,
    isArray: true,
  })
  @IsString({ each: true })
  otherUnits: string[];

  @ApiProperty({
    type: String,
    isArray: true,
  })
  @IsString({ each: true })
  hobbies: string[];

  @ApiProperty()
  @IsString({ each: true })
  @IsNotEmpty()
  nextofKin: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nextOfKinNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  village: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  homeTown: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lga: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state: string;
}
