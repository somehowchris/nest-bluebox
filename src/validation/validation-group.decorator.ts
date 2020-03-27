import { ValidationPipe, UsePipes } from '@nestjs/common';

export const UseValidationGroups = (...groups: string[]) => {
  return UsePipes(
    new ValidationPipe({
      groups,
      validateCustomDecorators: true,
      validationError: {
        target: false,
      },
    }),
  );
};
