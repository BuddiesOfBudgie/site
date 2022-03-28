/**
 * This is our simple "Not Found" 404 message box
 */

// Material UI Components
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

const NotFound : React.FC = () => {
	return (
		<Paper elevation={8}>
			<Stack
				alignItems="center"
				direction="column"
				justifyContent="center"
				spacing={4}
			>
				<Typography sx={{ fontWeight: "bold"}} variant="h1">404</Typography>
				<Typography variant="h4">This content could not be found.</Typography>
			</Stack>
		</Paper>
	)
}

export default NotFound;