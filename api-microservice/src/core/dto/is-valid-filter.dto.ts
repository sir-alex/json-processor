import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsValidFilters(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidFilters',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (typeof value !== 'object' || Array.isArray(value)) return false;

          for (const key in value) {
            const filter = value[key];
            if (
              filter.min !== undefined &&
              filter.max !== undefined &&
              typeof filter.min === 'number' &&
              typeof filter.max === 'number' &&
              filter.min > filter.max
            ) {
              return false;
            }
          }
          return true;
        },
        defaultMessage(_args: ValidationArguments) {
          return 'Invalid filters structure or conditions';
        },
      },
    });
  };
}
