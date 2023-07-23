// This file contains our values banner component for the About page

// Material UI Bits
import Stack from "@mui/material/Stack";
import { BodyText } from "./BodyText";
import { PopText } from "../pop/PopText";

type ValuesBannerProps = {
  description: string;
  value: string;
};

const ValuesBanner = ({ description, value }: ValuesBannerProps) => {
  return (
    <Stack>
      <PopText margin={0} variant="h6">
        {value}
      </PopText>
      <BodyText>{description}</BodyText>
    </Stack>
  );
};

export default ValuesBanner;
