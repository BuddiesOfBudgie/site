import React, { useState } from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import type { CustomMetaProps } from "../../components/CustomMeta";
import PageBase from "../../components/PageBase";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { RoadmapItem } from "../../components/roadmap/RoadmapItem";
import Grid2 from "@mui/material/Unstable_Grid2";
import { ItemStatusSelector } from "../../components/roadmap/ItemStatusSelector";
import { useTranslations } from "next-intl";
import type { RequiredMilestoneSummaryItems } from "../../components/roadmap/MilestoneItem";
import { MilestoneItem } from "../../components/roadmap/MilestoneItem";
import NextLink from "../../components/Link";
import { getRoadmapData } from "../../common/getRoadmapData";
import type { GitHubMilestones, GitHubProject } from "../../types";
import { GitHubProjectItemStatus } from "../../types";
import { PopText } from "../../components/pop/PopText";
import { PopButton } from "../../components/pop/PopButton";
import { InterText } from "../../components/InterText";
import { SiteTheme } from "../../theme";

type fubarProps = {
  className: InferGetServerSidePropsType<typeof getServerSideProps>;
};

const Roadmap = ({ className: { milestones, projects } }: fubarProps) => {
  const t = useTranslations();
  const [itemStatus, setItemStatus] = useState<GitHubProjectItemStatus>(GitHubProjectItemStatus.IN_PROGRESS);
  const meta: CustomMetaProps = {
    title: "Roadmap",
  };

  const summaryVersion = Object.values(milestones.summary);
  const filteredMilestones = milestones.milestones.filter((m) => summaryVersion.includes(m.version));

  if (!!milestones.summary.future && !filteredMilestones.find((m) => m.version === milestones.summary.future)) {
    filteredMilestones.push({
      closed: false,
      closedAt: null,
      description: "",
      title: milestones.summary.future,
      url: "",
      version: milestones.summary.future,
    });
  }

  return (
    <PageBase meta={meta}>
      <Container maxWidth="fullhd">
        <Stack alignItems="center" spacing={4}>
          <PopText alignSelf="center" variant="h2">
            {t("Roadmap")}
          </PopText>
          <Stack>
            {t("RoadmapDescriptions")
              .split("\n")
              .map((line, idx) => (
                <InterText
                  alignSelf="center"
                  key={`RoadmapDescription-Line-${idx}`}
                  fontWeight="bold"
                  textAlign="center"
                  variant="subtitle1"
                >
                  {line}
                </InterText>
              ))}
          </Stack>
          {!!milestones.summary.current && !!milestones.summary.upcoming && (
            <Grid2 columns={{ xs: 4, sm: 4, md: 4, lg: 12, xl: 12 }} container minWidth={0.8} spacing={4}>
              {filteredMilestones.map((m) => {
                const keyPrefix = `MilestoneItem-${m.version}`;

                return (
                  <Grid2 key={keyPrefix} xs={4}>
                    <MilestoneItem
                      key={`MilestoneItem-${m.version}`}
                      summary={milestones.summary as RequiredMilestoneSummaryItems}
                      version={m.version}
                    />
                  </Grid2>
                );
              })}
            </Grid2>
          )}
          <PopText alignSelf="center" variant="h3">
            Budgie 10
          </PopText>
          <InterText
            alignSelf="center"
            fontWeight="bold"
            key="Budgie10RoadmapDescription"
            maxWidth={SiteTheme.breakpoints.values.lg}
            textAlign="center"
            variant="subtitle1"
          >
            {t("Budgie10RoadmapDescription")}
          </InterText>

          {projects.map((p) => (
            <Paper
              elevation={0}
              key={p.title}
              sx={{
                bgcolor: SiteTheme.palette.primary.light,
                borderRadius: "25px",
                padding: "40px",
                width: 1,
              }}
            >
              <Stack direction="column" rowGap={4}>
                <ItemStatusSelector
                  currentStatus={itemStatus}
                  statuses={[
                    GitHubProjectItemStatus.IN_PROGRESS,
                    GitHubProjectItemStatus.TODO,
                    GitHubProjectItemStatus.DONE,
                  ]}
                  setStatus={(status) => setItemStatus(status)}
                />
                <Grid2 columns={{ xs: 4, sm: 4, md: 4, lg: 12, xl: 12 }} container spacing={4}>
                  {p.items
                    .filter((i) => i.status === itemStatus)
                    .map((i) => {
                      const keyPrefix = `${i.type}-${i.content.title}`;

                      return (
                        <Grid2 key={keyPrefix} xs={4}>
                          <RoadmapItem item={i} key={`${keyPrefix}-RoadmapItem`} />
                        </Grid2>
                      );
                    })}
                </Grid2>
                <NextLink href={p.url}>
                  <PopButton
                    sx={{
                      fontWeight: "bold",
                      height: "60px",
                      marginInlineEnd: "auto",
                      minWidth: "180px",
                    }}
                  >
                    {t("SeeMore")}
                  </PopButton>
                </NextLink>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Container>
    </PageBase>
  );
};

export const getServerSideProps: GetServerSideProps<{
  messages: Object;
  milestones: GitHubMilestones;
  projects: GitHubProject[];
}> = async ({ locale, res }) => {
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate");

  const { milestones, projects } = await getRoadmapData(true);

  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
      milestones,
      projects,
    },
  };
};

export default Roadmap;
