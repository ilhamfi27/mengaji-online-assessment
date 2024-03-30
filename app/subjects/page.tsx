import { Box, Typography } from "@mui/material";
import SubjectList from "./components/SubjectList";

const Subjects = () => {
  return (
    <Box style={{ height: 400, width: '100%' }}>
      <Typography variant="h5" data-testid="product-text">
        Subjects
      </Typography>
      <SubjectList />
    </Box>
  );
};

export default Subjects;
