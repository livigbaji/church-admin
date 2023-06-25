import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { MaritalStatus, Gender } from 'src/types';
import { Member } from '../models/member.model';

export class CreateMemberDTO {
  @ApiProperty({
    example: 'Clarus',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Joseph',
  })
  @IsString()
  middleName: string;

  @ApiProperty({
    example: 'Oyedepo',
  })
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

  @ApiProperty({
    example: 'Fantastic',
  })
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
    examples: ['Driver', 'Electrician'],
  })
  @IsString({ each: true })
  occupation: string[];

  @IsString()
  @ApiProperty()
  birthday: string;

  @ApiProperty({
    isArray: true,
    type: String,
    example: '2347012345678',
  })
  @IsPhoneNumber('NG', { each: true })
  phoneNumber: string[];

  @ApiProperty({
    example: 'Km. 10 Idiroko Rd, 112104, Ota, Ogun State',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  reference: string;

  @ApiProperty({
    example: 'B.Sc',
  })
  @IsString()
  qualification: string;

  @ApiProperty({
    type: String,
    isArray: true,
    examples: ['Follow up', 'Teens'],
  })
  @IsString({ each: true })
  otherUnits: string[];

  @ApiProperty({
    type: String,
    isArray: true,
    examples: ['Singing', 'Dancing'],
  })
  @IsString({ each: true })
  hobbies: string[];

  @ApiProperty({
    example: 'David O. Oyedepo Jr.',
  })
  @IsString()
  @IsNotEmpty()
  nextofKin: string;

  @ApiProperty({
    example: '2347012345678',
  })
  @IsString()
  @IsNotEmpty()
  nextOfKinNumber: string;

  @ApiProperty({
    example: 'Akugom',
  })
  @IsString()
  @IsNotEmpty()
  village: string;

  @ApiProperty({
    example: 'Adim',
  })
  @IsString()
  @IsNotEmpty()
  homeTown: string;

  @ApiProperty({
    example: 'Biase',
  })
  @IsString()
  @IsNotEmpty()
  lga: string;

  @ApiProperty({
    example: 'Cross river',
  })
  @IsString()
  @IsNotEmpty()
  state: string;
}

export class MemberListResponse {
  @ApiProperty({
    type: Member,
    isArray: true,
  })
  records: Member[];
}

export class MemberImportEntry {
  'S-NAME': string;
  STATUS: 'SINGLE' | 'MARRIED';
  GENDER: 'MALE' | 'FEMALE';
  'JOINED UNIT': Date;
  'HOME CELL': string;
  'JOINED LFC': Date;
  'NEW BIRTH': Date;
  BAPTISM: Date;
  OCCUPATION: string;
  BIRTHDAY: Date;
  'PHONE NUMBER': string;
  ADDRESS: string;
  QUALIFICATION: string;
  'NEXT OF KIN': string;
  'NEXT OF KIN NO': string;
  VILLAGE: string;
  'LOCAL GOVT': string;
  'HOME TOWN': string;
  STATE: string;
}

export class MemberExportRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class MemberImportCompleteResponse {
  @ApiProperty()
  synced: number;
}
