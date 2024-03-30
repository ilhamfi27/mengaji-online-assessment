'use client';

import FormError from '@/src/components/Error/FormError';
import { useSnackbar } from '@/src/hooks/useSnackbar';
import { useActiveClass } from '@/src/hooks/useActiveClass';
import { ActiveClass } from '@/src/services/active-class';
import useYupValidationResolver from '@/src/utils/form';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Teacher } from '@/src/services/teacher';
import { Subject } from '@/src/services/subject';
import DateTimePicker from '@/src/components/DateTimePicker';
import { useTeacher } from '@/src/hooks/useTeacher';
import { useSubject } from '@/src/hooks/useSubject';

type ActiveClassFormProps = {
  data?: ActiveClass;
  onSubmitSuccess?: (...args: any) => void;
  onSubmitError?: (...args: any) => void;
};

let activeClassSchema = yup.object({
  name: yup.string().required(),
  dateAndTime: yup.date().required(),
  duration: yup.number().required(),
  teacher: yup.object().required(),
  subject: yup.object().required(),
});

const ActiveClassForm: FC<ActiveClassFormProps> = ({
  data,
  onSubmitError,
  onSubmitSuccess,
}) => {
  const { showSnackbar } = useSnackbar();
  const resolver = useYupValidationResolver(activeClassSchema);
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver });
  const {
    createActiveClass,
    updateActiveClass,
    setActiveClass,
    activeClass,
    refreshActiveClasss,
  } = useActiveClass();

  const { teachers, refreshTeachers, setFilter: teacherFilter } = useTeacher();

  useEffect(() => {
    setValue('name', activeClass?.name as string);
    setValue('dateAndTime', activeClass?.dateAndTime as Date);
    setValue('duration', activeClass?.duration as number);
    setValue('teacher', activeClass?.teacher as Teacher);
  }, [activeClass]);

  useEffect(() => {
    setActiveClass(data as ActiveClass);
  }, [data]);

  useEffect(() => {
    teacherFilter({
      page: 1,
      size: 1000,
    });
    refreshTeachers();
  }, []);

  const formRegister = (name: keyof ActiveClass) => {
    return {
      defaultValue: activeClass ? activeClass[name] : null,
      value: activeClass ? activeClass[name] : null,
      onChange: (e: any) => {
        setActiveClass({
          ...activeClass,
          [name]: e.target.value,
        } as ActiveClass);
      },
    };
  };

  const formSubmitHandler = (d: ActiveClass) => {
    if (data) {
      updateActiveClass(data.id as string, d)
        .then((res) => {
          showSnackbar('Class updated successfully', 'success');
          onSubmitSuccess && onSubmitSuccess(res);
          refreshActiveClasss();
        })
        .catch((e) => {
          const data = e.response.data;
          showSnackbar(data.message, 'error');
          onSubmitError && onSubmitError(data);
        });
    } else {
      createActiveClass(d)
        .then((res) => {
          showSnackbar('Class created successfully', 'success');
          onSubmitSuccess && onSubmitSuccess(res);
          refreshActiveClasss();
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

          formSubmitHandler(d as ActiveClass);
        })}
      >
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
        <DateTimePicker
          className="w-full !mt-2"
          label="Date and Time"
          onChange={(date) => {
            setActiveClass({
              ...activeClass,
              dateAndTime: date?.toDate(),
            } as ActiveClass);
          }}
        />
        <TextField
          margin="normal"
          fullWidth
          id="duration"
          label="Duration in Hour"
          autoComplete="duration"
          autoFocus
          error={!!errors.duration}
          {...formRegister('duration')}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="teacher"
          label="Teacher"
          name="teacher"
          autoComplete="teacher"
          autoFocus
          select
          // value={formValue && formValue.product.id}
          // onChange={(e) => {
          //   setFormValue({
          //     ...formValue,
          //     product: products.find(
          //       (product) => product.id === Number(e.target.value)
          //     ),
          //   } as DiscountRules);
          // }}
        >
          {teachers?.items?.map((teacher) => (
            <MenuItem
              key={teacher.id}
              value={teacher.id}
              selected={activeClass?.teacher.id === teacher.id}
            >
              {teacher.employeeId} - {teacher.name} ({teacher.email})
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

export default ActiveClassForm;
