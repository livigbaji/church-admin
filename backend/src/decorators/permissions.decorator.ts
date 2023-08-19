import {
  applyDecorators,
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
  CustomDecorator,
  UseGuards,
} from '@nestjs/common';
import { Permission, SessionData } from '../types';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (
  permissions: Permission[],
): CustomDecorator<string> => SetMetadata(PERMISSIONS_KEY, permissions);

class AppNotAllowedException {
  @ApiProperty({ example: 403 })
  statusCode: number;
  @ApiProperty({ example: 'Forbidden resource' })
  message: string;
  @ApiProperty({ example: 'Forbidden' })
  error: string;
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function Auth(permissions: Permission[] | Permission = []) {
  return applyDecorators(
    UseGuards(AuthGuard),
    Permissions(Array.isArray(permissions) ? permissions : [permissions]),
    ApiBearerAuth(),
    ApiForbiddenResponse({
      type: AppNotAllowedException,
    }),
  );
}

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): SessionData => {
    try {
      const request = ctx.switchToHttp().getRequest();
      if (!request.authSession) {
        throw new UnauthorizedException('Unauthorized request');
      }
      return request.authSession;
    } catch (e) {
      throw new UnauthorizedException('Unauthorized request');
    }
  },
);
