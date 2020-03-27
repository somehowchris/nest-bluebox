import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { ROLES_DECORATOR_KEY } from './roles.constants';
import { getUser } from '../user/user.utils';

export const HasRoles = (...roles: string[]) =>
  SetMetadata(ROLES_DECORATOR_KEY, roles);

export const Roles = createParamDecorator<any, ExecutionContext, string[]>(
  (data: any, ctx: ExecutionContext) => {
    return getUser(ctx) ? getUser(ctx).roles : [];
  },
);
