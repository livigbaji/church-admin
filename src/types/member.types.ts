import { ApiProperty } from '@nestjs/swagger';
import { Member } from 'src/modules/members/models/member.model';

export enum MaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export class MemberListResponse {
  @ApiProperty({
    type: Member,
  })
  members: Member[];
}

export enum UnitMembershipStatus {
  INTERESTED = 'INTERESTED',
  SERVING = 'SERVING',
}
