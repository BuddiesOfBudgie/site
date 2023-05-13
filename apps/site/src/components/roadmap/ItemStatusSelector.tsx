import type { Dispatch, SetStateAction } from "react";
import React from "react";

import type { ProjectItemStatus } from "@buddiesofbudgie/server";
import { Button, SiteTheme } from "@buddiesofbudgie/ui";
import Stack from "@mui/material/Stack";
import { useTranslations } from "next-intl";

type ItemStatusSelectorProps = {
  currentStatus: ProjectItemStatus;
  statuses: ProjectItemStatus[];
  setStatus: Dispatch<SetStateAction<ProjectItemStatus>>;
};

export const ItemStatusSelector = ({ currentStatus, statuses, setStatus }: ItemStatusSelectorProps) => {
  const t = useTranslations();
  return (
    <Stack direction="row" spacing={4}>
      {statuses.map((status) => (
        <Button
          color="success"
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
