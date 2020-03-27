"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_constants_1 = require("./user.constants");
exports.User = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request[user_constants_1.USER_PROPERTY_KEY];
});
