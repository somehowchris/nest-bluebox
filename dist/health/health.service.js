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
var HealthService_1;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
let HealthService = HealthService_1 = class HealthService {
    constructor(memoryHealthIndicator, diskHealthIndicator) {
        this.memoryHealthIndicator = memoryHealthIndicator;
        this.diskHealthIndicator = diskHealthIndicator;
        this.logger = new common_1.Logger(HealthService_1.name);
        this.healthIndicators = [];
        this.register(() => this.memoryHealthIndicator.checkHeap('memory_heap', 150 * 1024 * 1024), 'memory_heap');
        this.register(() => this.memoryHealthIndicator.checkRSS('memory_rss', 150 * 1024 * 1024), 'memory_rss');
        this.register(() => this.diskHealthIndicator.checkStorage('storage', {
            threshold: 0.8,
            path: '/',
        }), 'storage');
    }
    register(indicator, name) {
        this.logger.log(name ? `Adding ${name} to the health checks` : 'Adding health check');
        this.healthIndicators.push(indicator);
    }
    getStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('Checking service availability');
            const results = yield Promise.all(this.healthIndicators.map(el => el(this.logger).catch(err => (err.causes ? Object.assign({}, err.causes) : err))));
            return results.reduce((prev, current) => (Object.assign({}, prev, current)), {});
        });
    }
};
HealthService = HealthService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [terminus_1.MemoryHealthIndicator,
        terminus_1.DiskHealthIndicator])
], HealthService);
exports.HealthService = HealthService;
