import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject, Logger, Optional } from '@nestjs/common';
import { JWT_SECRET, JWT_SECRET_ISSUER } from './jwt.constants';
import { UserInterface } from '../user/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    @Inject(JWT_SECRET) private readonly publicKey: string,
    @Optional() @Inject(JWT_SECRET_ISSUER) private readonly issuer: string,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: publicKey,
      issuer,
      jsonWebTokenOptions: {
        ignoreExpiration: false,
        ignoreNotBefore: false,
        issuer,
      },
    });
    this.logger.log('Initialized jwt strategy');
  }

  validate(payload: UserInterface): UserInterface {
    return payload;
  }
}
