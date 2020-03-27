import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { getUser } from '../user/user.utils';
import { ROLES_DECORATOR_KEY } from './roles.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {
    this.logger.log('RolesGuard loaded');
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>(
      ROLES_DECORATOR_KEY,
      context.getHandler(),
    );
    if (roles === undefined) {
      return true;
    }

    const user = getUser(context);

    this.logger.log(
      (!!user
        ? `Checking if ${user.username} has the roles`
        : 'Not user found but needed the needed roles were: ') +
        roles.join(', '),
    );

    if (
      !(
        user &&
        user.roles &&
        user.roles.filter(
          userRole => roles.findIndex(role => role === userRole) > -1,
        ).length === roles.length
      )
    ) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Needed role(s) not provided',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
