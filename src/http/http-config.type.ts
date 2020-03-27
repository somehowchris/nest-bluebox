import { HttpModuleOptions } from '@nestjs/common';

export type HttpModuleConfig = HttpModuleOptions & { serviceName?: string };
