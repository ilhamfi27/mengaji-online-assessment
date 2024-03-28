import { FC } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

type FormErrorType = {
  errorMessage?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
};

const FormError: FC<FormErrorType> = ({ errorMessage }) => {
  return <span className="text-red-600 italic text-sm">{errorMessage?.message?.toString()}</span>;
};

export default FormError;
