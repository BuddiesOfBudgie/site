import React, { useState } from "react";
import type { InferGetServerSidePropsType } from "next/types";
import type { CustomMetaProps } from "../../components/CustomMeta";
import PageBase from "../../components/PageBase";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import type { ProjectItemStatus } from "@buddiesofbudgie/server";
import { SHOW_ONLY_B10 } from "../../common/vars";
import Stack from "@mui/material/Stack";
import { Button, SiteTheme } from "@buddiesofbudgie/ui";
import { RoadmapItem } from "../../components/roadmap/RoadmapItem";
import { snakeCase } from "lodash";
import Grid2 from "@mui/material/Unstable_Grid2";
import { ItemStatusSelector } from "../../components/roadmap/ItemStatusSelector";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import type { RequiredMilestoneSummaryItems } from "../../components/roadmap/MilestoneItem";
import { MilestoneItem } from "../../components/roadmap/MilestoneItem";
import { getProjects } from "../../common/getProjects";
import { getMilestones } from "../../common/getMilestones";
import NextLink from "../../components/Link";

type fubarProps = {
  className: InferGetServerSidePropsType<typeof getServerSideProps>;
};

const Roadmap = ({ className: { milestones, projects } }: fubarProps) => {
  const t = useTranslations();
  const [itemStatus, setItemStatus] = useState<ProjectItemStatus>("IN_PROGRESS");
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
          <Typography alignSelf="center" sx={{ fontWeight: "bold" }} variant="h2">
            {t("Roadmap")}
          </Typography>
          <Stack>
            {t("RoadmapDescriptions")
              .split("\n")
              .map((line, idx) => (
                <Typography
                  alignSelf="center"
                  key={`RoadmapDescription-Line-${idx}`}
                  sx={{ fontWeight: "bold" }}
                  textAlign="center"
                  variant="subtitle1"
                >
                  {line}
                </Typography>
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
          <Typography alignSelf="center" sx={{ fontWeight: "bold" }} variant="h3">
            Budgie 10
          </Typography>
          <Typography
            alignSelf="center"
            key="Budgie10RoadmapDescription"
            maxWidth={SiteTheme.breakpoints.values.lg}
            sx={{ fontWeight: "bold" }}
            textAlign="center"
            variant="subtitle1"
          >
            {t("Budgie10RoadmapDescription")}
          </Typography>

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
                  statuses={["IN_PROGRESS", "TODO", "DONE"]}
                  setStatus={setItemStatus}
                />
                <Grid2 columns={{ xs: 4, sm: 4, md: 4, lg: 12, xl: 12 }} container spacing={4}>
                  {p.items
                    .filter((i) => i.status === itemStatus)
                    .map((i) => {
                      const keyPrefix = `${i.type}-${snakeCase(i.content.title)}`;

                      return (
                        <Grid2 key={keyPrefix} xs={4}>
                          <RoadmapItem item={i} key={`${keyPrefix}-RoadmapItem`} />
                        </Grid2>
                      );
                    })}
                </Grid2>
                <NextLink href={p.url}>
                  <Button
                    color="success"
                    sx={{
                      borderRadius: "60px",
                      color: SiteTheme.palette.primary.light,
                      fontWeight: "bold",
                      height: "60px",
                      marginInlineEnd: "auto",
                      minWidth: "180px",
                    }}
                  >
                    {t("SeeMore")}
                  </Button>
                </NextLink>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Container>
    </PageBase>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const milestones = await getMilestones();
  const projects = await getProjects();
  const filteredProjects = SHOW_ONLY_B10 ? projects.filter((p) => p.title === "Budgie 10") : projects;

  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
      milestones,
      projects: filteredProjects,
    },
  };
};

export default Roadmap;
