import { Box, Typography } from '@mui/material';
import SubjectList from '../subjects/components/SubjectList';
import TeacherList from '../teachers/components/TeacherList';

const Dashboard = () => {
  return (
    <Box style={{ height: 400, width: '100%' }}>
      <Typography variant="h5" data-testid="subject-text">
        Subjects
      </Typography>
      <SubjectList />
      <Typography variant="h5" data-testid="teachers-text">
        Teachers
      </Typography>
      <TeacherList />
    </Box>
  );
};

export default Dashboard;
