"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var JwtStrategy_1;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const jwt_constants_1 = require("./jwt.constants");
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor(publicKey, issuer) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: publicKey,
            issuer,
            jsonWebTokenOptions: {
                ignoreExpiration: false,
                ignoreNotBefore: false,
                issuer,
            },
        });
        this.publicKey = publicKey;
        this.issuer = issuer;
        this.logger = new common_1.Logger(JwtStrategy_1.name);
        this.logger.log('Initialized jwt strategy');
    }
    validate(payload) {
        return payload;
    }
};
JwtStrategy = JwtStrategy_1 = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(jwt_constants_1.JWT_SECRET)),
    __param(1, common_1.Optional()), __param(1, common_1.Inject(jwt_constants_1.JWT_SECRET_ISSUER)),
    __metadata("design:paramtypes", [String, String])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
