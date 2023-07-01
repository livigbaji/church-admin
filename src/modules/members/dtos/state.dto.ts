import { ApiProperty } from '@nestjs/swagger';

export class State {
  @ApiProperty({
    example: 'Wakanda',
  })
  name: string;
  @ApiProperty({
    example: 'wacenda',
  })
  alias: string;
  @ApiProperty({
    type: String,
    isArray: true,
    example: ['wecenda', 'wakanda'],
  })
  lgas: string[];
}
