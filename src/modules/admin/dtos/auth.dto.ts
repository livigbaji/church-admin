import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class NewAuthDTO {
  @IsPhoneNumber('NG')
  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @IsBoolean()
  @IsOptional()
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
