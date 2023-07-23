import type { NextPage } from "next";
import type { CustomMetaProps } from "../../components/CustomMeta";
import { Teams } from "../../data/teams";

// Material UI Bits
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

// Our components
import HeroTitle from "../../components/about/HeroTitle";
import PageBase from "../../components/PageBase";
import Team from "../../components/about/Team";
import ValuesBanner from "../../components/about/ValuesBanner";

// Images
import { GitHub, Matrix } from "../../components/Vectors";
import { SiteTheme } from "@buddiesofbudgie/ui";
import { useTranslations } from "next-intl";
import NextLink from "../../components/Link";
import { StackDirectionColumnToRow } from "../../constants";
import Grid2 from "@mui/material/Unstable_Grid2";
import { BodyText } from "../../components/about/BodyText";
import { PopButton } from "../../components/pop/PopButton";

export const meta: CustomMetaProps = {
  title: "About",
};

const AboutPageSpacing = 4;

type CollaborateData = {
  alt: string;
  buttonHref: string;
  buttonText?: string;
  description: string;
  image: JSX.Element;
};

const About: NextPage = () => {
  const t = useTranslations();

  const collaborateInfo: CollaborateData[] = [
    {
      alt: "GitHub",
      buttonHref: "https://github.com/BuddiesOfBudgie",
      buttonText: "Source Code",
      description:
        "Budgie Desktop and all of our organization’s source code (including this site!) is entirely open source and developed on GitHub. We leverage GitHub for tracking issues and desired improvements in our software or our organization, as well as GitHub’s discussion forums for long-form public discussions.",
      image: GitHub(),
    },
    {
      alt: "Matrix",
      buttonHref: "https://matrix.to/#/#buddies-of-budgie:matrix.org",
      buttonText: "Join Our Matrix Space",
      description:
        "The vast majority of our collaboration, support, and general discussions happen on our public Matrix Space. Matrix is an open standard for interoperable, decentralised, and real-time communication, with Spaces being a way to group rooms and people together. You can use free, open source software like Element get involved with the project.",
      image: Matrix(),
    },
  ];

  return (
    <PageBase meta={meta}>
      <Container maxWidth="fullhd" sx={{ paddingBlock: "2em 4em" }}>
        <Stack alignItems="flex-start" rowGap={AboutPageSpacing} sx={{ pT: AboutPageSpacing }}>
          <BodyText>{t("About.FoundedText")}</BodyText>
          <HeroTitle maintext="Values" />
          <BodyText>{t("About.Values.Generic")}</BodyText>
          <ValuesBanner
            description={t("About.Values.Independence.Description")}
            value={t("About.Values.Independence.Value")}
          />
          <ValuesBanner
            description={t("About.Values.Transparency.Description")}
            value={t("About.Values.Transparency.Value")}
          />
          <ValuesBanner
            description={t("About.Values.UserCentric.Description")}
            value={t("About.Values.UserCentric.Value")}
          />
          <HeroTitle maintext="Organize" subtext="How We" />
          <BodyText>
            Buddies of Budgie is organized into scoped teams that helps to ensure the organization and our platform is
            able to be continuously improved while minimizing bottlenecks and maximizing the potential for involvement.
            From marketing and community engagement, to distribution of Budgie Desktop, translations and more - you can
            be sure to find a place to get involved.
          </BodyText>
          <Grid2
            columns={{
              xs: 6,
              sm: 6,
              md: 6,
              lg: 12,
            }}
            container
            columnSpacing={2}
            margin={0}
            rowGap={4}
            width={1}
          >
            {Teams.map((team) => {
              return <Team key={`Team-${team.Name.replaceAll(" ", "-")}`} team={team} />;
            })}
          </Grid2>
          <HeroTitle maintext="Collaborate" subtext="How We" />
          <Stack direction="column" spacing={AboutPageSpacing} width="100%">
            {collaborateInfo.map((info) => {
              const { alt, buttonHref, buttonText, description, image } = info;

              return (
                <Stack
                  alignItems="center"
                  direction={StackDirectionColumnToRow}
                  key={`Collaborate-${alt}`}
                  spacing={AboutPageSpacing}
                  sx={{
                    [SiteTheme.breakpoints.down("lg")]: {
                      alignItems: "flex-start",
                    },
                    [SiteTheme.breakpoints.up("lg")]: {
                      alignItems: "center",
                    },
                  }}
                >
                  <Box
                    alignItems="top"
                    display="inline-flex"
                    sx={{ "& > svg": { maxWidth: "100%" } }}
                    justifyContent="center"
                    minWidth={200}
                    width={200}
                  >
                    {image}
                  </Box>
                  <Stack
                    alignItems="flex-start"
                    direction="column"
                    justifyItems="space-between"
                    spacing={AboutPageSpacing}
                    sx={{
                      [SiteTheme.breakpoints.down("md")]: {
                        marginBlockStart: "2vh",
                      },
                      [SiteTheme.breakpoints.up("lg")]: {
                        marginInlineStart: "5vw",
                      },
                    }}
                  >
                    <BodyText>{description}</BodyText>
                    <NextLink href={buttonHref}>
                      <PopButton>{buttonText ?? t("LearnMore")}</PopButton>
                    </NextLink>
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

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    messages: (await import(`../../messages/${locale}.json`)).default,
  },
});

export default About;
