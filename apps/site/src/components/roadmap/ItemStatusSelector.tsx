import type { Dispatch, SetStateAction } from "react";
import React from "react";

import { SiteTheme } from "@buddiesofbudgie/ui";
import Stack from "@mui/material/Stack";
import { useTranslations } from "next-intl";
import type { GitHubProjectItemStatus } from "../../types";
import { Button } from "@mui/material";

type ItemStatusSelectorProps = {
  currentStatus: GitHubProjectItemStatus;
  statuses: GitHubProjectItemStatus[];
  setStatus: Dispatch<SetStateAction<GitHubProjectItemStatus>>;
};

export const ItemStatusSelector = ({ currentStatus, statuses, setStatus }: ItemStatusSelectorProps) => {
  const t = useTranslations();
  return (
    <Stack direction="row" spacing={4}>
      {statuses.map((status) => (
        <Button
          key={status}
          onClick={() => setStatus(status)}
          size="large"
          sx={
            currentStatus === status
              ? {
                  color: SiteTheme.palette.primary.light,
                  fontWeight: "bold",
                }
              : undefined
          }
          variant={currentStatus === status ? "contained" : "outlined"}
        >
          {t(`RoadmapItemStatus.${status}`)}
        </Button>
      ))}
    </Stack>
  );
};
