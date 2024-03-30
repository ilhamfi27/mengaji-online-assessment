import { Box, Typography } from '@mui/material';
import ActiveClassList from './components/ActiveClassList';
import ArchivedActiveClassList from './components/ActiveClassArchivedList';

const Classes = () => {
  return (
    <Box style={{ height: 400, width: '100%' }}>
      <Typography variant="h5" data-testid="classes-text">
        Classes
      </Typography>
      <ActiveClassList />
      <Typography variant="h5" data-testid="archived-classes-text">
        Archived Classes
      </Typography>
      <ArchivedActiveClassList />
    </Box>
  );
};

export default Classes;
