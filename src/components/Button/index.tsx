import { FC } from 'react';
import { Button as Btn, ButtonProps, CircularProgress } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
}

const Button: FC<CustomButtonProps> = (props) => {
  const { loading = false } = props;
  if (loading) {
    return (
      <Btn {...props} disabled={true}>
        <CircularProgress size={20} className="mr-2 my-1" />
      </Btn>
    );
  }
  return <Btn {...props}>{props.children}</Btn>;
};

export default Button;
