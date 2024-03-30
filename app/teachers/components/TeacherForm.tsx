'use client';

import FormError from '@/src/components/Error/FormError';
import { useSnackbar } from '@/src/hooks/useSnackbar';
import { useSubject } from '@/src/hooks/useSubject';
import { useTeacher } from '@/src/hooks/useTeacher';
import { Subject } from '@/src/services/subject';
import { Teacher } from '@/src/services/teacher';
import useYupValidationResolver from '@/src/utils/form';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { FC, useEffect } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import * as yup from 'yup';

type TeacherFormProps = {
  data?: Teacher;
  onSubmitSuccess?: (...args: any) => void;
  onSubmitError?: (...args: any) => void;
};

let teacherSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  employeeId: yup.string().required(),
  gender: yup.string().required(),
  subject: yup.object().required(),
});

const TeacherForm: FC<TeacherFormProps> = ({
  data,
  onSubmitError,
  onSubmitSuccess,
}) => {
  const { showSnackbar } = useSnackbar();
  const resolver = useYupValidationResolver(teacherSchema);
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver });
  const { createTeacher, updateTeacher, setTeacher, teacher, refreshTeachers } =
    useTeacher();
  const { subjects, refreshSubjects, setFilter: subjectFilter } = useSubject();

  useEffect(() => {
    subjectFilter({
      page: 1,
      size: 1000,
    });
    refreshSubjects();
  }, []);

  useEffect(() => {
    setValue('name', teacher?.name as string);
    setValue('email', teacher?.email as string);
    setValue('employeeId', teacher?.employeeId as string);
    setValue('gender', teacher?.gender as string);
    setValue('subject', teacher?.subject as Subject);
  }, [teacher]);

  useEffect(() => {
    setTeacher(data as Teacher);
  }, [data]);

  const formRegister = (name: keyof Teacher) => {
    return {
      defaultValue: teacher ? teacher[name] : null,
      value: teacher ? teacher[name] : null,
      onChange: (e: any) => {
        setTeacher({ ...teacher, [name]: e.target.value } as Teacher);
      },
    };
  };

  const formSubmitHandler = (d: Teacher) => {
    if (data) {
      updateTeacher(data.id as string, d)
        .then((res) => {
          showSnackbar('Teacher updated successfully', 'success');
          onSubmitSuccess && onSubmitSuccess(res);
          refreshTeachers();
        })
        .catch((e) => {
          const data = e.response.data;
          showSnackbar(data.message, 'error');
          onSubmitError && onSubmitError(data);
        });
    } else {
      createTeacher(d)
        .then((res) => {
          showSnackbar('Teacher created successfully', 'success');
          onSubmitSuccess && onSubmitSuccess(res);
          refreshTeachers();
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
      <form onSubmit={handleSubmit((d) => formSubmitHandler(d as Teacher))}>
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
        <FormError errorMessage={errors.name} />
        <TextField
          margin="normal"
          fullWidth
          id="email"
          label="Email"
          autoComplete="email"
          autoFocus
          error={!!errors.email}
          {...formRegister('email')}
        />
        <FormError errorMessage={errors.email} />
        <TextField
          margin="normal"
          fullWidth
          id="employeeId"
          label="Employee ID"
          autoComplete="employeeId"
          autoFocus
          error={!!errors.employeeId}
          {...formRegister('employeeId')}
        />
        <FormError errorMessage={errors.employeeId} />
        <FormControl error={!!errors.gender} className="flex w-full my-2">
          <FormLabel id="gender">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="gender"
            className="ml-2"
            row
            {...formRegister('gender')}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
          <FormError errorMessage={errors.gender as FieldError} />
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          id="subject"
          label="Subject"
          name="subject"
          autoComplete="subject"
          autoFocus
          select
          value={teacher?.subject ? teacher?.subject.id : ''}
          onChange={(e) => {
            setTeacher({
              ...teacher,
              subject: subjects?.items?.find(
                (subject) => subject.id === e.target.value
              ) as Subject,
            } as Teacher);
          }}
        >
          {subjects?.items?.map((subject) => (
            <MenuItem
              key={subject.id}
              value={subject.id}
              selected={
                !!teacher?.subject && teacher?.subject.id === subject.id
              }
            >
              {subject.code} - {subject.name}
            </MenuItem>
          ))}
        </TextField>
        <div className="flex w-full justify-center">
          <Button type="submit" fullWidth>
            Save
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default TeacherForm;
