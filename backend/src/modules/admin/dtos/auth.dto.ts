import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Member } from 'src/modules/members/models/member.model';

export class NewAuthDTO {
  @IsPhoneNumber('NG')
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    format: '2349012345678',
  })
  readonly phone: string;

  @IsBoolean()
  @IsOptional()
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
