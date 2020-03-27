import { ExecutionContext } from '@nestjs/common';
import { UserInterface } from './user.interface';
export declare const setUser: (ctx: ExecutionContext, user: UserInterface) => void;
export declare const getUser: (ctx: ExecutionContext) => UserInterface;
