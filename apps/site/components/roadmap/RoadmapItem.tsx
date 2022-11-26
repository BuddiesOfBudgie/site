import React from "react";

import { ProjectItem } from "@buddiesofbudgie/types";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { camelCase } from "lodash";
import { Chip, Typography } from "@mui/material";
import { Avatar, SiteTheme } from "@buddiesofbudgie/ui";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Color from "color";
import { GoIssueOpened } from "react-icons/go";
import { TbGitPullRequest, TbFlag } from "react-icons/tb";

type RoadmapItemProps = {
  item: ProjectItem;
};

export const RoadmapItem = ({ item }: RoadmapItemProps) => {
  const { content, labels, type } = item;
  const { assignee, num, title, url } = content;
  const key = `${type}-${camelCase(content.title)}`;
  const t = useTranslations();

  return (
    <Paper
      elevation={2}
      key={`${key}-Container`}
      sx={{
        borderRadius: "25px",
        minHeight: "100%",
        padding: 3,
      }}
    >
      <Stack direction="column" gap={2}>
        <Stack alignItems="center" direction="row" columnGap={1}>
          {type === "DRAFT_ISSUE" && <TbFlag size={24} />}
          {type === "ISSUE" && <GoIssueOpened />}
          {type === "PULL_REQUEST" && <TbGitPullRequest />}
          <Typography sx={{ color: SiteTheme.palette.misc.greyish, fontWeight: "bold" }} variant="subtitle1">
            {t(`RoadmapItemType.${type}`, { num })}
          </Typography>
        </Stack>
        <Link
          href={url}
          style={{
            color: SiteTheme.palette.primary.dark,
            display: "inline-flex",
            textDecoration: "underline",
            textDecorationColor: SiteTheme.palette.success.main,
            textDecorationThickness: 3,
          }}
          target="_blank"
        >
          <Typography
            fontWeight="bold"
            minHeight="3rem"
            sx={{
              cursor: "pointer",
              lineHeight: "1.5rem",
              lineClamp: 2,
            }}
            variant="h6"
          >
            {title}
          </Typography>
        </Link>
        {labels.length > 0 && (
          <Stack direction="row" gap={1}>
            {labels.map((label) => (
              <Chip
                color="primary"
                key={`${key}-label-${label.name}`}
                label={label.name}
                sx={{
                  color: Color(label.color).isLight()
                    ? SiteTheme.palette.primary.main
                    : SiteTheme.palette.primary.light,
                  bgcolor: label.color,
                  fontWeight: "bold",
                }}
              />
            ))}
          </Stack>
        )}
        {assignee && (
          <Link href={assignee.url} key={`${key}-Assignee-Link`} target={assignee.url ? "_blank" : "_self"}>
            <Avatar
              alt={assignee.name || ""}
              showTooltip
              size={60}
              src={assignee.avatarUrl}
              sx={{
                border: `4px solid ${SiteTheme.palette.misc.lightgrey}`,
              }}
            />
          </Link>
        )}
      </Stack>
    </Paper>
  );
};
