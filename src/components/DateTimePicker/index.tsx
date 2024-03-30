import { FC } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  DateTimePicker as DTPicker,
  DateTimePickerProps,
} from '@mui/x-date-pickers/DateTimePicker';
import { PickerValidDate } from '@mui/x-date-pickers';

const DateTimePicker: FC<
  DateTimePickerProps<PickerValidDate, any> &
    React.RefAttributes<HTMLDivElement>
> = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DTPicker {...props} />
    </LocalizationProvider>
  );
};

export default DateTimePicker;
