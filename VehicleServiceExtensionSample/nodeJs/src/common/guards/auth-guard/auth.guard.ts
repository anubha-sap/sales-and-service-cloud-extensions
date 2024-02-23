import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { SCOPES_KEY } from '../../decorators/scopes.decorator';
import { SESSION } from '../../constants';
import { Scope } from '../../../extension-modules/common/enums';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredScopes = this.reflector.getAllAndOverride<Scope[]>(
      SCOPES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredScopes) {
      return true;
    }

    const userScopes = context.switchToHttp().getRequest()[SESSION].scopes;
    return requiredScopes.some((scope) =>
      userScopes.includes(`${process.env.xsappname}.${scope}`),
    );
  }
}
