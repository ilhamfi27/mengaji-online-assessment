import { Box, Typography } from '@mui/material';
import ActiveClassList from './components/ActiveClassList';
import ArchivedActiveClassList from './components/ActiveClassArchivedList';

const Classes = () => {
  return (
    <Box style={{ height: 400, width: '100%' }}>
      <Typography variant="h5" data-testid="product-text">
        Classes
      </Typography>
      <ActiveClassList />
      <Typography variant="h5" data-testid="product-text">
        Archived Classes
      </Typography>
      <ArchivedActiveClassList />
    </Box>
  );
};

export default Classes;
