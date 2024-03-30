import { Box, Typography } from '@mui/material';
import ActiveClassList from './components/ActiveClassList';

const Classes = () => {
  return (
    <Box style={{ height: 400, width: '100%' }}>
      <Typography variant="h5" data-testid="product-text">
        Classes
      </Typography>
      <ActiveClassList />
    </Box>
  );
};

export default Classes;
