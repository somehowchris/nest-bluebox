import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_DECORATOR_KEY } from './permissions.constants';
import { getUser } from '../user/user.utils';

@Injectable()
export class PermissionsGuard implements CanActivate {
  private readonly logger = new Logger(PermissionsGuard.name);

  constructor(private reflector: Reflector) {
    this.logger.log('PermissionsGuard loaded');
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permissions = this.reflector.get<string[]>(
      PERMISSIONS_DECORATOR_KEY,
      context.getHandler(),
    );

    if (permissions === undefined) {
      return true;
    }

    const user = getUser(context);

    this.logger.log(
      (!!user
        ? `Checking if ${user.username} has the permissions`
        : 'Not user found but needed the needed permissions were: ') +
        permissions.join(', '),
    );

    if (
      !(
        user &&
        user.permissions &&
        user.permissions.filter(
          userPermission =>
            permissions.findIndex(permission => permission === userPermission) >
            -1,
        ).length === permissions.length
      )
    ) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Needed permission(s) not provided',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
