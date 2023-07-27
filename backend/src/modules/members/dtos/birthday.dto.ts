import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Birthday } from 'src/types';

export class BirthdayForm {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly favouriteColour: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly motivation: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly prayer: string;
}

export class BirthdayResponse {
  @ApiProperty({
    isArray: true,
    type: Birthday,
  })
  data: Birthday[];
}
