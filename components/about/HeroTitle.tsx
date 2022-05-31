// This file contains the logic for our Hero Title used on the About page

// Material UI Bits
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";

export type HeroTitleProps = {
  maintext: string;
  subtext?: string;
};

const HeroTitle: React.FC<HeroTitleProps> = (props) => {
  const { maintext, subtext } = props;

  const theme = useTheme();

  return (
    <Stack direction="column">
      <Typography fontWeight={600} variant="h5">
        {subtext ?? "Our"}
      </Typography>
      <Typography
        color={theme.palette.success.main}
        borderBottom={"8px solid black"}
        fontWeight={600}
        paddingRight={8}
        variant="h1"
      >
        {maintext}
      </Typography>
    </Stack>
  );
};

export default HeroTitle;
