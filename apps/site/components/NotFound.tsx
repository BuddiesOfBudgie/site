/**
 * This is our simple "Not Found" 404 message box
 */

import Image from "next/future/image";

// Material UI Components
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

// Assets
import ThrowAwayComputer from "../public/images/throw-away-computer.gif";

const NotFound: React.FC = () => {
  return (
    <Paper elevation={8}>
      <Stack alignItems="center" direction="column" justifyContent="center" padding={4} spacing={2}>
        <Image alt="Throw away computer GIF" src={ThrowAwayComputer} />
        <Typography sx={{ fontWeight: "bold" }} variant="h1">
          404
        </Typography>
        <Typography variant="h5">This content could not be found.</Typography>
      </Stack>
    </Paper>
  );
};

export default NotFound;
