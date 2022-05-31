// This file contains the UX for the teams on the About page

// Material UI Bits
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Button from "../Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { HalvedWidthOnHighResolution, StackDirectionColumnToRow } from "../../common/vars";

// People and Teams
import { People } from "../../data/people";
import { Team as TeamType, Teams } from "../../data/teams";

export type TeamProps = {
  stackSpacing: number;
  team: TeamType;
};

const Team: React.FC<TeamProps> = (props) => {
  const { stackSpacing, team } = props;
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
        variant="h5"
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
        <Button href={team.URL} text="Learn More" />
        <AvatarGroup
          sx={{
            [theme.breakpoints.down("lg")]: {
              marginBlockEnd: stackSpacingDynamic,
            },
            "& .MuiAvatar-root": {
              border: "4px solid black",
              boxSizing: "border-box",
            },
          }}
          spacing={30}
        >
          {team.Members.map((teamMemberName) => {
            const member = People[teamMemberName];

            const avatarStyling = {
              backgroundColor: member?.Picture?.src ? "white" : theme.palette.success.main,
              height: 90,
              width: 90,
            };

            const teamKey = `team-${team.Name.replaceAll(" ", "-")}`;
            const avatarAlt = `${member.Names.First} ${member.Names.Last}`;

            return (
              <Tooltip key={`${teamKey}-tooltip-${avatarAlt}`} title={avatarAlt} arrow>
                <Avatar
                  alt={avatarAlt}
                  key={`${teamKey}-avatar-${avatarAlt}`}
                  src={member?.Picture?.src}
                  sx={avatarStyling}
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
