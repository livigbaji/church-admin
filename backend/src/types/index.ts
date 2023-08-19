import { ApiProperty } from '@nestjs/swagger';
import { MemberDocument } from 'src/modules/members/models/member.model';

export * from './member.types';

export class ValidationException {
  @ApiProperty({
    example: 400,
  })
  statusCode: number;
  @ApiProperty({
    type: String,
    isArray: true,
  })
  message: string[];
  @ApiProperty()
  error: string;
}

export enum Permission {
  SESSION_ADMIN = 'SESSION_ADMIN',
  FINANCE_ADMIN = 'FINANCE_ADMIN',
  ATTENDANCE_ADMIN = 'ATTENDANCE_ADMIN',
  FOLLOW_UP = 'FOLLOW_UP',
  ALL = 'ALL',
}

export interface SessionData {
  user: MemberDocument;
  accountId: string;
  permissions: Permission[];
}
