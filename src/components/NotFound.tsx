/**
 * This is our simple "Not Found" 404 message box
 */

import Image from 'next/image';

// Material UI Components
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

// Assets
import ThrowAwayComputer from '../../public/images/throw-away-computer.gif';
import { PopText } from './pop/PopText';
import { InterText } from './InterText';

const NotFound = () => {
  return (
    <Paper elevation={8}>
      <Stack alignItems="center" direction="column" justifyContent="center" padding={4} spacing={2}>
        <Image alt="Throw away computer GIF" src={ThrowAwayComputer} />
        <PopText variant="h1">404</PopText>
        <InterText variant="h5">This content could not be found.</InterText>
      </Stack>
    </Paper>
  );
};

export default NotFound;
