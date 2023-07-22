// This file contains our values banner component for the About page

// Material UI Bits
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { BodyText } from "./BodyText";

type ValuesBannerProps = {
  description: string;
  value: string;
};

const ValuesBanner = ({ description, value }: ValuesBannerProps) => {
  return (
    <Stack>
      <Typography fontWeight={800} margin={0} variant="h6">
        {value}
      </Typography>
      <BodyText>{description}</BodyText>
    </Stack>
  );
};

export default ValuesBanner;
