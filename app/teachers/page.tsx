import { Box, Typography } from "@mui/material";
import TeacherList from "./components/TeacherList";
import ArchivedTeacherList from "./components/TeacherArchivedList";

const Teachers = () => {
  return (
    <Box style={{ height: 400, width: '100%' }}>
      <Typography variant="h5" data-testid="product-text">
        Teachers
      </Typography>
      <TeacherList />

      <Typography variant="h5" data-testid="product-text">
        Archived Teachers
      </Typography>
      <ArchivedTeacherList />
    </Box>
  );
};

export default Teachers;
