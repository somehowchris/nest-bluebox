"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const roles_constants_1 = require("./roles.constants");
const user_utils_1 = require("../user/user.utils");
exports.HasRoles = (...roles) => common_1.SetMetadata(roles_constants_1.ROLES_DECORATOR_KEY, roles);
exports.Roles = common_1.createParamDecorator((data, ctx) => {
    return user_utils_1.getUser(ctx) ? user_utils_1.getUser(ctx).roles : [];
});
