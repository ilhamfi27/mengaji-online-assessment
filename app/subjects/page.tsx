import { Box, Typography } from "@mui/material";
import TeacherList from "./components/SubjectList";

const Subjects = () => {
  return (
    <Box style={{ height: 400, width: '100%' }}>
      <Typography variant="h5" data-testid="product-text">
        Subjects
      </Typography>
      <TeacherList />
    </Box>
  );
};

export default Subjects;
