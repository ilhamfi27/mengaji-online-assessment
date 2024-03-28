import { Box, Typography } from "@mui/material";
import TeacherList from "./components/TeacherList";

const Teachers = () => {
  return (
    <Box style={{ height: 400, width: '100%' }}>
      <Typography variant="h5" data-testid="product-text">
        Teachers
      </Typography>
      <TeacherList />
    </Box>
  );
};

export default Teachers;
