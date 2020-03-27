import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { RouterModule } from './router/router.module';
import { CompressionModule } from './compression/compression.module';
import { SecurityModule } from './security/security.module';
import { ValidationModule } from './validation/validation.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [
    LoggerModule,
    RouterModule,
    CompressionModule,
    SecurityModule,
    ValidationModule,
    RolesModule,
    PermissionsModule,
  ],
  exports: [
    LoggerModule,
    RouterModule,
    CompressionModule,
    SecurityModule,
    ValidationModule,
    RolesModule,
    PermissionsModule,
  ],
})
export class CommonModules {}
