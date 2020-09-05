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
var SeedService_1;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const seed_util_1 = require("./seed.util");
const path = require("path");
const glob = require("glob");
let SeedService = SeedService_1 = class SeedService {
    constructor(connection) {
        this.connection = connection;
        this.logger = new common_1.Logger(SeedService_1.name);
    }
    run(seeds) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield Promise.all(seeds.map((el) => __awaiter(this, void 0, void 0, function* () {
                const entityManager = this.connection.createEntityManager();
                const start = new Date().getTime();
                this.logger.log(`Running ${el.constructor.name}`);
                const failedRun = err => {
                    this.logger.error(`${el.constructor.name} Failed`, err.toString());
                    return err.toString();
                };
                try {
                    return new Promise(resolveRun => {
                        entityManager
                            .transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                            el.run(manager)
                                .catch(err => resolveRun(failedRun(err)))
                                .then(() => {
                                this.logger.log(`Ending ${el.constructor.name} after ${(new Date().getTime() - start) / 1000} seconds`);
                                resolveRun({});
                            });
                        }))
                            .catch(err => resolveRun(failedRun(err)));
                    });
                }
                catch (e) {
                    return failedRun(e);
                }
            })));
            const failedSeeds = results.filter(el => typeof el === 'string');
            if (failedSeeds.length > 0) {
                this.logger.warn(`${failedSeeds.length} seed attemts failed`);
            }
            this.logger.log(`${results.filter(el => typeof el === 'object').length} seeds succeeded`);
        });
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            const projectRoot = seed_util_1.findProjectRoot();
            const info = seed_util_1.readJsonFile(path.join(projectRoot, 'package.json'));
            this.logger.log('Loading seeds in context of project: ' + info.name);
            return new Promise((resolve, reject) => {
                const event = glob(path.join(projectRoot, '**/*.seed.js'), {}, (err, files = []) => __awaiter(this, void 0, void 0, function* () {
                    if (files.length === 0) {
                        reject(new Error('No seeds found.'));
                    }
                    const seedsPerFile = files.map(el => {
                        const seed = require(el);
                        const seeds = [];
                        Object.keys(seed).forEach(expo => {
                            if (typeof seed[expo] === 'function') {
                                try {
                                    const seedInstance = new seed[expo]();
                                    if (seedInstance.run &&
                                        typeof seedInstance.run === 'function') {
                                        this.logger.log(`Found seed ${seed[expo].name}`);
                                        return seeds.push(seedInstance);
                                    }
                                }
                                finally {
                                }
                            }
                        });
                        return seeds;
                    });
                    if (seedsPerFile === []) {
                        return resolve([]);
                    }
                    if (seedsPerFile === [seedsPerFile[0]]) {
                        return resolve([...seedsPerFile[0]]);
                    }
                    const totalSeeds = seedsPerFile.reduce((prev, curr) => (prev ? [...prev, ...curr] : [...curr]), []);
                    resolve(totalSeeds);
                }));
                event.on('error', err => reject(err));
            });
        });
    }
};
SeedService = SeedService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], SeedService);
exports.SeedService = SeedService;
