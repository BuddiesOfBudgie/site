// This file contains the UX for the teams on the About page

// Material UI Bits
import { BWButton } from "@buddiesofbudgie/ui";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

// People and Teams
import { People } from "../../data/people";
import type { Team as TeamType } from "../../data/teams";
import { useTranslations } from "next-intl";
import NextLink from "../Link";
import { HalvedWidthOnHighResolution } from "../../constants";

export type TeamProps = {
  stackSpacing: number;
  team: TeamType;
};

const Team: React.FC<TeamProps> = ({ stackSpacing, team }: TeamProps) => {
  const t = useTranslations();
  const theme = useTheme();
  const stackSpacingDynamic = useMediaQuery(theme.breakpoints.up("lg")) ? stackSpacing : stackSpacing / 2;

  return (
    <Stack
      direction="column"
      sx={{ marginBlockEnd: stackSpacingDynamic }}
      spacing={stackSpacingDynamic}
      width={HalvedWidthOnHighResolution}
    >
      <Typography
        fontWeight="bold"
        sx={{
          [theme.breakpoints.between("lg", "fullhd")]: {
            height: 60,
          },
        }}
        variant="h4"
      >
        {team.Name}
      </Typography>
      <Typography
        sx={{
          [theme.breakpoints.between("lg", "fullhd")]: {
            height: 100,
          },
        }}
        variant="h6"
      >
        {team.Description}
      </Typography>
      <Stack
        sx={{
          [theme.breakpoints.down("lg")]: {
            alignItems: "flex-start",
            flexDirection: "column-reverse",
          },
          [theme.breakpoints.up("lg")]: {
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          },
        }}
      >
        <NextLink href={team.URL}>
          <BWButton href={team.URL}>{t("LearnMore")}</BWButton>
        </NextLink>
        <AvatarGroup
          sx={{
            [theme.breakpoints.down("lg")]: {
              marginBlockEnd: stackSpacingDynamic,
            },
            "& .MuiAvatar-root": {
              border: "2px solid black",
              boxSizing: "border-box",
            },
          }}
          spacing={30}
        >
          {team.Members.map((teamMemberName) => {
            const member = People[teamMemberName];

            const teamKey = `team-${team.Name.replaceAll(" ", "-")}`;
            const avatarAlt = `${member.Names.First} ${member.Names.Last}`;

            return (
              <Tooltip key={`${teamKey}-tooltip-${avatarAlt}`} title={avatarAlt} arrow>
                <Avatar
                  alt={avatarAlt}
                  key={`${teamKey}-avatar-${avatarAlt}`}
                  src={member?.Picture?.src}
                  sx={{
                    backgroundColor: member?.Picture?.src ? "white" : theme.palette.success.main,
                    height: 48,
                    marginInlineEnd: 1,
                    width: 48,
                  }}
                >
                  {member.Names.First[0]} {member.Names.Last[0]}
                </Avatar>
              </Tooltip>
            );
          })}
        </AvatarGroup>
      </Stack>
    </Stack>
  );
};

export default Team;
