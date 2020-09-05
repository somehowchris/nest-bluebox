"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const permissions_constants_1 = require("./permissions.constants");
const user_utils_1 = require("../user/user.utils");
exports.HasPermissions = (...permissions) => common_1.SetMetadata(permissions_constants_1.PERMISSIONS_DECORATOR_KEY, permissions);
exports.Permissions = common_1.createParamDecorator((data, ctx) => {
    return user_utils_1.getUser(ctx) ? user_utils_1.getUser(ctx).permissions : [];
});
