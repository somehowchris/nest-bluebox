import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SECURE_HEALTH_ENDPOINT } from './jwt.constants';
import { HEALTH_ENDPOINT_DECORATOR } from '../health/health.constants';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @Inject(SECURE_HEALTH_ENDPOINT)
    private readonly secureHealthEndpoint: boolean,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    if (!this.secureHealthEndpoint) {
      const isHealthEndpoint = this.reflector.get<boolean>(
        HEALTH_ENDPOINT_DECORATOR,
        context.getHandler(),
      );

      if (isHealthEndpoint) {
        return true;
      }
    }
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
