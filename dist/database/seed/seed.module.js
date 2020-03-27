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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database.module");
const env_module_1 = require("../../env/env.module");
const seed_environment_validation_1 = require("./seed-environment.validation");
const seed_service_1 = require("./seed.service");
const logger_module_1 = require("../../logger/logger.module");
const environment_constants_1 = require("../../env/environment.constants");
let SeedModule = class SeedModule {
    constructor(seedService) {
        this.seedService = seedService;
    }
    seed() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.seedService
                    .load()
                    .then(seeds => {
                    this.seedService
                        .run(seeds)
                        .then(() => {
                        resolve();
                    })
                        .catch(err => reject(err));
                })
                    .catch(err => reject(err));
            });
        });
    }
};
SeedModule = __decorate([
    common_1.Module({
        imports: [
            logger_module_1.LoggerModule,
            env_module_1.EnvironmentModule.register(seed_environment_validation_1.SeedEnvironmentValidation),
            database_module_1.DatabaseModule.registerAsync({
                useFactory: (env) => {
                    return Object.assign({}, env.database, { autoLoadEntities: true });
                },
                inject: [environment_constants_1.ENVIRONMENT],
            }),
        ],
        providers: [seed_service_1.SeedService],
    }),
    __metadata("design:paramtypes", [seed_service_1.SeedService])
], SeedModule);
exports.SeedModule = SeedModule;
