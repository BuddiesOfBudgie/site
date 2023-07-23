// This file contains the logic for our Hero Title used on the About page

import Stack from "@mui/material/Stack";
import { PopText } from "../pop/PopText";

export type HeroTitleProps = {
  maintext: string;
  subtext?: string;
};

const HeroTitle = ({ maintext, subtext }: HeroTitleProps) => {
  return (
    <Stack direction="column">
      <PopText fontWeight={600} variant="h5">
        {subtext ?? "Our"}
      </PopText>
      <PopText color="success.main" borderBottom={"8px solid black"} fontWeight={600} paddingRight={8} variant="h1">
        {maintext}
      </PopText>
    </Stack>
  );
};

export default HeroTitle;
