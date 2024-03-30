import { Box, Typography } from "@mui/material";
import SubjectList from "./components/SubjectList";
import ArchivedSubjectList from "./components/SubjectArchivedList";

const Subjects = () => {
  return (
    <Box style={{ height: 400, width: '100%' }}>
      <Typography variant="h5" data-testid="subject-text">
        Subjects
      </Typography>
      <SubjectList />
      <Typography variant="h5" data-testid="archived-subject-text">
        Archived Subjects
      </Typography>
      <ArchivedSubjectList />
    </Box>
  );
};

export default Subjects;
