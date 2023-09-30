import { ApiProperty } from '@nestjs/swagger';

export enum MaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum UnitMembershipStatus {
  INTERESTED = 'INTERESTED',
  SERVING = 'SERVING',
}

export class Birthday {
  @ApiProperty()
  day: number;

  @ApiProperty()
  month: number;
}
