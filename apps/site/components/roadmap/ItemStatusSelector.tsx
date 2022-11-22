import React, { Dispatch, SetStateAction } from "react";

import { ProjectItemStatus } from "@buddiesofbudgie/types";
import { Button, SiteTheme } from "@buddiesofbudgie/ui";
import Stack from "@mui/material/Stack";
import { useTranslations } from "next-intl";

interface ItemStatusSelectorProps {
  currentStatus: ProjectItemStatus;
  statuses: ProjectItemStatus[];
  setStatus: Dispatch<SetStateAction<ProjectItemStatus>>;
}

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
          text={t(`RoadmapItemStatus.${status}`)}
          variant={currentStatus === status ? "contained" : "outlined"}
        />
      ))}
    </Stack>
  );
};
