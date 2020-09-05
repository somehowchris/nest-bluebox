"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizeFirstLetter = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
};
exports.camel2underscore = (value) => {
    return value
        .replace(/(?:^|\.?)([A-Z])/g, (x, y) => {
        return '_' + y.toUpperCase();
    })
        .replace(/^_/, '');
};
