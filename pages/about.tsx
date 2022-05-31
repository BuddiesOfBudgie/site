import type { NextPage } from "next";
import { CustomMetaProps } from "../components/CustomMeta";
import { Teams } from "../data/teams";
import { StackDirectionColumnToRow } from "../common/vars";

// Material UI Bits
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

// Our components
import Button from "../components/Button";
import HeroTitle from "../components/about/HeroTitle";
import PageBase from "../components/PageBase";
import { SiteTheme } from "../styles/theme";
import Team from "../components/about/Team";
import ValuesBanner from "../components/about/ValuesBanner";

// Images
import { GitHub, Matrix } from "../components/Vectors";
import Independent from "../public/images/about/independence.jpg";
import Transparency from "../public/images/about/transparency.jpg";
import UserCentricImage from "../public/images/about/user-centric.jpg";

export const meta: CustomMetaProps = {
  Title: "About",
};

const AboutPageSpacing = 8;

type CollaborateData = {
  Alt: string;
  ButtonHref: string;
  ButtonText?: string;
  Description: string;
  Image: JSX.Element;
};

const CollaborateInfo: CollaborateData[] = [
  {
    Alt: "GitHub",
    ButtonHref: "https://github.com/BuddiesOfBudgie",
    ButtonText: "Source Code",
    Description:
      "Budgie Desktop and all of our organization’s source code (including this site!) is entirely open source and developed on GitHub. We leverage GitHub for tracking issues and desired improvements in our software or our organization, as well as GitHub’s discussion forums for long-form public discussions.",
    Image: GitHub(),
  },
  {
    Alt: "Matrix",
    ButtonHref: "https://matrix.to/#/#buddies-of-budgie:matrix.org",
    ButtonText: "Join Our Matrix Space",
    Description:
      "The vast majority of our collaboration, support, and general discussions happen on our public Matrix Space. Matrix is an open standard for interoperable, decentralised, and real-time communication, with Spaces being a way to group rooms and people together. You can use free, open source software like Element get involved with the project.",
    Image: Matrix(),
  },
];

const About: NextPage = () => {
  return (
    <PageBase meta={meta}>
      <Container maxWidth="fullhd" sx={{ paddingBottom: "4em" }}>
        <Stack alignItems="flex-start" spacing={AboutPageSpacing}>
          <Typography variant="h5">
            Buddies of Budgie was founded to provide a home for the Budgie Desktop, an open source modern desktop
            environment built to provide you immediate access to the things you need.
          </Typography>
          <HeroTitle maintext="Values" />
          <Typography fontWeight={400} variant="h5">
            Our values are central to our decision-making and how we collaborate, communicate, design and work. These
            values were shaped by our community from the start to ensure a diverse, healthy, and welcoming community.
          </Typography>
          <ValuesBanner
            description={`
							Independence is a crucial value to how we operate as an organization. All organizations and projects are equal stakeholders in the future of the organization and most importantly, the future of the Budgie Desktop platform. No singular for-profit or non-profit entity has the sole influence over our direction. 
						`}
            image={Independent}
            value="Independence"
          />
          <ValuesBanner
            description={`
							Transparency has been central to how we function from the start. We want to ensure that everyone is able to understand how the organization and Budgie itself works currently and the intended direction going into the future.
						`}
            image={Transparency}
            value="Transparency"
          />
          <ValuesBanner
            description={`
							Buddies of Budgie and the Budgie desktop itself is built for its users. Users are seen as stakeholders in development and day-to-day operations, with a fundamental part of our consensus model for making changes to the organization and our platform being how do our decisions positively impact the end user’s experience. 

							People should feel encouraged to get involved directly, promoting fairness in our ways of working.
						`}
            image={UserCentricImage}
            value="User-centric"
          />
          <HeroTitle maintext="Organize" subtext="How We" />
          <Typography fontWeight={400} variant="h5">
            Buddies of Budgie is organized into scoped teams that helps to ensure the organization and our platform is
            able to be continuously improved while minimizing bottlenecks and maximizing the potential for involvement.
            From marketing and community engagement, to distribution of Budgie Desktop, translations and more - you can
            be sure to find a place to get involved.
          </Typography>
          <Box display="inline-flex" justifyContent="space-between" flexWrap="wrap">
            {Teams.map((team) => {
              return (
                <Team key={`Team-${team.Name.replaceAll(" ", "-")}`} stackSpacing={AboutPageSpacing} team={team} />
              );
            })}
          </Box>
          <HeroTitle maintext="Collaborate" subtext="How We" />
          <Stack direction="column" spacing={AboutPageSpacing} width="100%">
            {CollaborateInfo.map((info) => {
              const { Alt, ButtonHref, ButtonText, Description, Image } = info;

              return (
                <Stack alignItems="flex-start" direction={StackDirectionColumnToRow} key={`Collaborate-${Alt}`}>
                  <Box
                    alignItems="top"
                    display="inline-flex"
                    sx={{ "& > svg": { maxWidth: "100%" } }}
                    justifyContent="center"
                    minWidth={200}
                    width={200}
                  >
                    {Image}
                  </Box>
                  <Stack
                    alignItems="flex-start"
                    direction="column"
                    justifyItems="space-between"
                    spacing={AboutPageSpacing / 2}
                    sx={{
                      [SiteTheme.breakpoints.down("md")]: {
                        marginBlockStart: "2vh",
                      },
                      [SiteTheme.breakpoints.up("lg")]: {
                        marginInlineStart: "5vw",
                      },
                    }}
                  >
                    <Typography variant="h5">{Description}</Typography>
                    <Button href={ButtonHref} text={ButtonText ?? "Learn More"} />
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </PageBase>
  );
};

export default About;
