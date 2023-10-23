import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { Member } from 'src/modules/members/models/member.model';

export class NewAuthDTO {
  @IsPhoneNumber('NG')
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '2349012345678',
  })
  readonly phone: string;

  @IsString()
  @IsOptional()
  @Length(6)
  @ApiProperty({
    example: '123456',
  })
  readonly otp: string;
}

export class AdminMembers {
  @ApiProperty()
  name: string;

  @ApiProperty()
  loginAt: Date;

  @ApiProperty()
  expiredAt: Date;
}

export class AdminList {
  @ApiProperty({
    type: AdminMembers,
    isArray: true,
  })
  data: AdminMembers[];
}

export class LoggedInuser {
  @ApiProperty()
  member: Member;
  @ApiProperty()
  token: string;
  @ApiProperty()
  expiresAt: Date;
}

export class GenesisResponse {
  @ApiProperty()
  adminIsEmpty: boolean;

  @ApiProperty()
  memberIsEmpty: boolean;
}

export class GeneisErrorResponse {
  @ApiProperty({
    example: 406,
  })
  statusCode: number;
  @ApiProperty({
    example:
      'Application is pristine, setup members import and add a new admin',
  })
  message: string;
  @ApiProperty({
    example: 'Not Acceptable',
  })
  error: number;
}
