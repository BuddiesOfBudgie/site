import React, { useMemo } from "react";

import { RequiredBy } from "@buddiesofbudgie/types";
import Paper from "@mui/material/Paper";
import { SiteTheme } from "@buddiesofbudgie/ui";
import Stack from "@mui/material/Stack";
import { Chip, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import type { MilestonesSummary } from "@buddiesofbudgie/server";

export type RequiredMilestoneSummaryItems = RequiredBy<MilestonesSummary, "current" | "upcoming">;

type MilestoneItemProps = {
  summary: RequiredMilestoneSummaryItems;
  version: string;
};

export const MilestoneItem = ({ summary, version }: MilestoneItemProps) => {
  const { current, upcoming } = summary;
  const t = useTranslations();
  const [major, minor, patch] = version.split(".");

  const milestoneType = current === version ? "CURRENT" : upcoming === version ? "UPCOMING" : "FUTURE";
  const isCurrent = milestoneType === "CURRENT";
  const releaseType = isCurrent
    ? patch !== "0"
      ? "BUG_FIX"
      : "LATEST_FEATURE"
    : milestoneType === "UPCOMING"
    ? "UPCOMING_FEATURE"
    : "MAJOR_RELEASE";

  const showFullVersion = isCurrent && patch !== "0";
  const showVersion = useMemo(() => {
    if (milestoneType !== "FUTURE") return `${major}.${minor}`;
    return major;
  }, [major, milestoneType, minor]);

  return (
    <Paper
      elevation={2}
      sx={{
        backgroundColor: SiteTheme.palette.primary.light,
        borderRadius: "25px",
        padding: 3,
      }}
    >
      <Stack direction="column" spacing={1}>
        <Typography color={SiteTheme.palette.misc.greyish} fontWeight="bold" variant="subtitle1">
          {t(`MilestoneTypes.${milestoneType}`)}
        </Typography>
        <Typography fontWeight="bold" variant="h6">
          {t(`ReleaseTypes.${releaseType}`)}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Typography color={SiteTheme.palette.success.main} fontWeight="bold" variant="h2">
            {showVersion}
          </Typography>
          {showFullVersion && (
            <Chip
              color="secondary"
              label={version}
              sx={{ border: "1px solid ", borderColor: SiteTheme.palette.misc.greyish }}
            />
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};
