import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Roles } from './roles.decorator';
import { Roles as RolesEnum } from 'src/commons/enums/roles';
import { ErrorMessages } from 'src/commons/enums/error-messages';
import { getErrorName } from 'src/commons/helpers/get-error-name';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const userRoles: Array<RolesEnum> = request.userRoles;

    const hasRole = userRoles.some((role) => roles.includes(role));

    if (!hasRole) {
      throw new ForbiddenException({
        name: getErrorName(
          ErrorMessages.USER_NOT_AUTHORIZED_TO_ACCESS_THIS_RESOURCE,
        ),
        message: ErrorMessages.USER_NOT_AUTHORIZED_TO_ACCESS_THIS_RESOURCE,
      });
    }

    return hasRole;
  }
}
