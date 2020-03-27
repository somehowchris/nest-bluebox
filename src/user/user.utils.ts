import { ExecutionContext } from '@nestjs/common';
import { UserInterface } from './user.interface';
import { USER_PROPERTY_KEY } from './user.constants';

export const setUser = (ctx: ExecutionContext, user: UserInterface): void => {
  const request = ctx.switchToHttp().getRequest();
  request[USER_PROPERTY_KEY] = user;
  return request;
};

export const getUser = (ctx: ExecutionContext): UserInterface => {
  const request = ctx.switchToHttp().getRequest();
  return request[USER_PROPERTY_KEY];
};
