"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_levels_enum_1 = require("./log-levels.enum");
const string_1 = require("../utils/string");
const winston_1 = require("winston");
const safe_1 = require("colors/safe");
const colorPerLevel = (level, defaultColor) => {
    switch (level) {
        case log_levels_enum_1.LogLevels.ERROR:
            return safe_1.red;
        case log_levels_enum_1.LogLevels.WARN:
            return safe_1.yellow;
        default:
            return defaultColor;
    }
};
const formatMeta = (env) => {
    return env.nodeEnv === 'development'
        ? meta => meta['0'] && meta['0'].startsWith && meta['0'].startsWith('Error')
            ? meta['0']
            : JSON.parse(JSON.stringify(meta))
        : meta => JSON.stringify(meta);
};
const localDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
};
exports.nestLikeConsoleFormat = (env) => winston_1.format.printf((_a) => {
    var { context, level, timestamp, message } = _a, meta = __rest(_a, ["context", "level", "timestamp", "message"]);
    return (`${safe_1.bold(colorPerLevel(level, safe_1.blue)(`[${string_1.capitalizeFirstLetter(env.app.name)}]`))} ` +
        `${colorPerLevel(level, safe_1.blue)(string_1.capitalizeFirstLetter(level))}\t` +
        ('undefined' !== typeof timestamp
            ? colorPerLevel(level, safe_1.white)(`${localDate(timestamp)} `)
            : '') +
        ('undefined' !== typeof context
            ? colorPerLevel(level, safe_1.white)(`${safe_1.yellow('[' + context + ']')} `)
            : '') +
        `${colorPerLevel(level, safe_1.cyan)(message)} - ` +
        `${colorPerLevel(level, safe_1.grey)(formatMeta(env)(meta))}`);
});
