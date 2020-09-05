"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.UseValidationGroups = (...groups) => {
    return common_1.UsePipes(new common_1.ValidationPipe({
        groups,
        validateCustomDecorators: true,
        validationError: {
            target: false,
        },
    }));
};
