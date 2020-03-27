import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInterface } from './user.interface';
import { USER_PROPERTY_KEY } from './user.constants';

export const User = createParamDecorator<any, ExecutionContext, UserInterface>(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request[USER_PROPERTY_KEY];
  },
);
