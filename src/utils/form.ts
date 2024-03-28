import { useCallback } from 'react';
import * as Yup from 'yup';

interface ValidationSchema<T> extends Yup.Schema<T> {}

interface ValidationResult<T> {
  values: Record<string, any> | Awaited<T>;
  errors: Record<string, { type: string; message: string }>;
}

const useYupValidationResolver = <T>(
  validationSchema: ValidationSchema<T>
): ((data: T) => Promise<ValidationResult<T>>) =>
  useCallback(
    async (data: T): Promise<ValidationResult<T>> => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors: any) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (
              allErrors: Record<string, any>,
              currentError: Yup.ValidationError
            ) => ({
              ...allErrors,
              [currentError.path as string]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

export default useYupValidationResolver;
