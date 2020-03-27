import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { PERMISSIONS_DECORATOR_KEY } from './permissions.constants';
import { getUser } from '../user/user.utils';

export const HasPermissions = (...permissions: string[]) =>
  SetMetadata(PERMISSIONS_DECORATOR_KEY, permissions);

export const Permissions = createParamDecorator<
  any,
  ExecutionContext,
  string[]
>((data: any, ctx: ExecutionContext) => {
  return getUser(ctx) ? getUser(ctx).permissions : [];
});
