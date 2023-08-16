import {
  ValidationOptions,
  ValidationArguments,
  registerDecorator,
} from 'class-validator';
import { Constants } from './../data';

export function IsIPv4(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isIPv4',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') {
            return false;
          }

          const ipPattern = Constants.IPV4_REGEX;
          if (!ipPattern.test(value)) {
            console.log('fffff');
            return false;
          }

          const parts = value.split('.');
          for (const part of parts) {
            const num = parseInt(part, 10);
            if (isNaN(num) || num < 0 || num > 255) {
              return false;
            }
          }

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid IPv4 address`;
        },
      },
    });
  };
}
