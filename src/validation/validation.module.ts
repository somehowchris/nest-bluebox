import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        validateCustomDecorators: true,
        validationError: {
          value: false,
          target: true,
        },
      }),
    },
  ],
})
export class ValidationModule {}

// TODO group based validation
