"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_constants_1 = require("./user.constants");
exports.setUser = (ctx, user) => {
    const request = ctx.switchToHttp().getRequest();
    request[user_constants_1.USER_PROPERTY_KEY] = user;
    return request;
};
exports.getUser = (ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request[user_constants_1.USER_PROPERTY_KEY];
};
