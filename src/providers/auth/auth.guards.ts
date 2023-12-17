import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

import { ErrorMessages } from '../../commons/enums/error-messages';
import { getErrorName } from '../../commons/helpers/get-error-name';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractBearerToken(request.headers);

    if (!token) {
      this.handleUnauthorizedException({
        name: getErrorName(ErrorMessages.INVALID_TOKEN),
        message: ErrorMessages.INVALID_TOKEN,
      });
    }

    try {
      const { exp: timeToExpireToken, roles } = this.jwtService.decode(token);

      if (this.validateIfTokenIsExpired(timeToExpireToken)) {
        this.handleUnauthorizedException({
          name: getErrorName(ErrorMessages.EXPIRED_TOKEN),
          message: ErrorMessages.EXPIRED_TOKEN,
        });
      }

      request.userRoles = roles;

      return true;
    } catch (error) {
      if (error?.status === HttpStatus.UNAUTHORIZED) throw error;

      this.handleUnauthorizedException({
        name: getErrorName(ErrorMessages.INVALID_TOKEN),
        message: ErrorMessages.INVALID_TOKEN,
      });
    }
  }

  private extractBearerToken(headers: any): string {
    const [type, token] = headers.authorization.split(' ');

    return type === 'Bearer' ? token : undefined;
  }

  private handleUnauthorizedException(data: {
    name: string;
    message: ErrorMessages;
  }) {
    throw new UnauthorizedException({
      ...data,
    });
  }

  private validateIfTokenIsExpired(timeToExpireToken: number): boolean {
    return Date.now() >= timeToExpireToken * 1000;
  }
}
