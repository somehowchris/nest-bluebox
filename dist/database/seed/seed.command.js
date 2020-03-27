"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const seed_module_1 = require("./seed.module");
const logger_bootstrap_1 = require("../../logger/logger.bootstrap");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        core_1.NestFactory.create(seed_module_1.SeedModule, {
            logger: false,
        })
            .then(app => {
            logger_bootstrap_1.LoggerBootstrap.useLogger(app);
            const logger = new common_1.Logger('Seeder');
            const seeder = app.get(seed_module_1.SeedModule);
            seeder
                .seed()
                .then(() => {
                logger.log('Seeding complete!');
            })
                .catch(error => {
                logger.error('Seeding failed!', error.toString());
            })
                .finally(() => app.close());
        })
            .catch(error => {
            throw error;
        });
    });
}
bootstrap();
