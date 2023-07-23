import React, { useMemo } from "react";

import type { RequiredBy } from "@buddiesofbudgie/types";
import Paper from "@mui/material/Paper";
import { SiteTheme } from "@buddiesofbudgie/ui";
import Stack from "@mui/material/Stack";
import { Chip } from "@mui/material";
import { useTranslations } from "next-intl";
import type { GitHubMilestonesSummary } from "../../types";
import { poppins } from "../../fonts";
import { PopText } from "../pop/PopText";
import { InterText } from "../InterText";

export type RequiredMilestoneSummaryItems = RequiredBy<GitHubMilestonesSummary, "current" | "upcoming">;

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
        <PopText color={SiteTheme.palette.misc.greyish} variant="subtitle1">
          {t(`MilestoneTypes.${milestoneType}`)}
        </PopText>
        <InterText fontWeight="bold" variant="h6">
          {t(`ReleaseTypes.${releaseType}`)}
        </InterText>
        <Stack direction="row" spacing={1}>
          <PopText color={SiteTheme.palette.success.main} variant="h2">
            {showVersion}
          </PopText>
          {showFullVersion && (
            <Chip
              className={poppins.className}
              color="secondary"
              label={version}
              sx={{ border: "1px solid ", borderColor: SiteTheme.palette.misc.greyish, fontWeight: "bold" }}
            />
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};
