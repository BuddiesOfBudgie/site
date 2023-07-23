// This file contains the UX for the teams on the About page

import { useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import { People } from "../../data/people";
import type { Team as TeamType } from "../../data/teams";
import { useTranslations } from "next-intl";
import NextLink from "../Link";
import Grid2 from "@mui/material/Unstable_Grid2";
import { BodyText } from "./BodyText";
import { PopText } from "../pop/PopText";
import { PopButton } from "../pop/PopButton";

export type TeamProps = {
  team: TeamType;
};

const Team: React.FC<TeamProps> = ({ team }: TeamProps) => {
  const t = useTranslations();
  const theme = useTheme();

  return (
    <Grid2 xs={6}>
      <Stack direction="column" height={1}>
        <PopText variant="h6">{team.Name}</PopText>
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
            <PopButton bw href={team.URL}>
              {t("LearnMore")}
            </PopButton>
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
