// This file contains our values banner component for the About page

// Material UI Bits
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

type ValuesBannerProps = {
  description: string;
  value: string;
};

const ValuesBanner = ({ description, value }: ValuesBannerProps) => {
  return (
    <Stack>
      <Typography fontWeight={800} margin={0} variant="h4">
        {value}
      </Typography>
      <Typography
        sx={{
          fontWeight: "normal",
          lineHeight: 2,
          whiteSpace: "pre-line",
        }}
        variant="h6"
      >
        {description}
      </Typography>
    </Stack>
  );
};

export default ValuesBanner;
