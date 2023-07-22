// This file contains the UX for the teams on the About page

// Material UI Bits
import { BWButton } from "@buddiesofbudgie/ui";
import { Typography, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

// People and Teams
import { People } from "../../data/people";
import type { Team as TeamType } from "../../data/teams";
import { useTranslations } from "next-intl";
import NextLink from "../Link";
import Grid2 from "@mui/material/Unstable_Grid2";
import { BodyText } from "./BodyText";

export type TeamProps = {
  team: TeamType;
};

const Team: React.FC<TeamProps> = ({ team }: TeamProps) => {
  const t = useTranslations();
  const theme = useTheme();

  return (
    <Grid2 xs={6}>
      <Stack direction="column" height={1}>
        <Typography fontWeight="bold" variant="h6">
          {team.Name}
        </Typography>
        <BodyText sx={{ marginBlock: 2 }}>{team.Description}</BodyText>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{
            marginBlockStart: "auto",
          }}
        >
          <NextLink href={team.URL}>
            <BWButton href={team.URL}>{t("LearnMore")}</BWButton>
          </NextLink>
          <AvatarGroup
            sx={{
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
    </Grid2>
  );
};

export default Team;
