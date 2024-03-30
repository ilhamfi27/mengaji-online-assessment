'use client';

import FormError from '@/src/components/Error/FormError';
import { useSnackbar } from '@/src/hooks/useSnackbar';
import { useSubject } from '@/src/hooks/useSubject';
import { Subject } from '@/src/services/subject';
import useYupValidationResolver from '@/src/utils/form';
import { Box, Button, TextField } from '@mui/material';
import { FC, useEffect } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import * as yup from 'yup';

type SubjectFormProps = {
  data?: Subject;
  onSubmitSuccess?: (...args: any) => void;
  onSubmitError?: (...args: any) => void;
};

let subjectSchema = yup.object({
  name: yup.string().required(),
  code: yup.string().required(),
});

const SubjectForm: FC<SubjectFormProps> = ({
  data,
  onSubmitError,
  onSubmitSuccess,
}) => {
  const { showSnackbar } = useSnackbar();
  const resolver = useYupValidationResolver(subjectSchema);
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver });
  const { createSubject, updateSubject, setSubject, subject, refreshSubjects } =
    useSubject();

  useEffect(() => {
    setValue('name', subject?.name as string);
    setValue('code', subject?.code as string);
  }, [subject]);

  useEffect(() => {
    setSubject(data as Subject);
  }, [data]);

  const formRegister = (name: keyof Subject) => {
    return {
      defaultValue: subject ? subject[name] : null,
      value: subject ? subject[name] : null,
      onChange: (e: any) => {
        setSubject({ ...subject, [name]: e.target.value } as Subject);
      },
    };
  };

  const formSubmitHandler = (d: Subject) => {
    if (data) {
      updateSubject(data.id as string, d)
        .then((res) => {
          showSnackbar('Subject updated successfully', 'success');
          onSubmitSuccess && onSubmitSuccess(res);
          refreshSubjects();
        })
        .catch((e) => {
          const data = e.response.data;
          showSnackbar(data.message, 'error');
          onSubmitError && onSubmitError(data);
        });
    } else {
      createSubject(d)
        .then((res) => {
          showSnackbar('Subject created successfully', 'success');
          onSubmitSuccess && onSubmitSuccess(res);
          refreshSubjects();
        })
        .catch((e) => {
          const data = e.response.data;
          showSnackbar(data.message, 'error');
          onSubmitError && onSubmitError(data);
        });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 600,
      }}
    >
      <form
        onSubmit={handleSubmit((d) => {
          console.log();
          
          formSubmitHandler(d as Subject);
        })}
      >
        <TextField
          margin="normal"
          fullWidth
          id="code"
          label="Code"
          autoComplete="code"
          autoFocus
          error={!!errors.name}
          {...formRegister('code')}
        />
        <FormError errorMessage={errors.code as FieldError} />
        <TextField
          margin="normal"
          fullWidth
          id="name"
          label="Name"
          autoComplete="name"
          autoFocus
          error={!!errors.name}
          {...formRegister('name')}
        />
        <FormError errorMessage={errors.name as FieldError} />
        <div className="flex w-full justify-center">
          <Button type="submit" fullWidth>
            Save
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default SubjectForm;
