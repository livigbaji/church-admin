import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/modules/admin/services/auth.service';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from 'src/decorators/permissions.decorator';
import { Permission, SessionData } from 'src/types';
import { MemberDocument } from 'src/modules/members/models/member.model';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger('AuthGuard');
  constructor(
    private readonly authService: AuthService,
    @Inject(Reflector.name) private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const header: string = req.get('Authentication');

    if (!header || header.slice(0, 7) != 'Bearer') {
      return false;
    }

    const permissions = this.reflector.get<Permission[]>(
      PERMISSIONS_KEY,
      context.getHandler(),
    );

    return this.authService
      .verifySession(header.slice(7))
      .then((verification) => {
        req.authSession = {
          user: verification as MemberDocument,
          accountId: verification.id,
          permissions,
        } as SessionData;

        return true;
      })
      .catch((e) => {
        this.logger.error(e);
        return false;
      });
  }
}
