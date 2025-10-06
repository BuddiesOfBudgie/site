import React from "react";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Chip } from "@mui/material";
import { Avatar } from "@/components/Avatar";
import { useTranslations } from "next-intl";
import Color from "color";
import { GoIssueOpened } from "react-icons/go";
import { TbGitPullRequest, TbFlag } from "react-icons/tb";
import NextLink from "../Link";
import { GitHubProjectItemType, type GitHubProjectItem } from "../../types";
import { inter } from "../../fonts";
import { PopText } from "../pop/PopText";
import { InterText } from "../InterText";
import { SiteTheme } from "../../theme";

type RoadmapItemProps = {
  item: GitHubProjectItem;
};

export const RoadmapItem = ({ item }: RoadmapItemProps) => {
  const { content, labels, type } = item;
  const { assignee, num, title, url } = content;
  const key = `${type}-${content.title}`;
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
          {type === GitHubProjectItemType.DRAFT_ISSUE && <TbFlag size={24} />}
          {type === GitHubProjectItemType.ISSUE && <GoIssueOpened />}
          {type === GitHubProjectItemType.PULL_REQUEST && <TbGitPullRequest />}
          <InterText sx={{ color: SiteTheme.palette.misc.greyish, fontWeight: "bold" }} variant="subtitle1">
            {t(`RoadmapItemType.${type}`, { num })}
          </InterText>
        </Stack>
        {url && (
          <NextLink
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
            <PopText
              minHeight="3rem"
              sx={{
                cursor: "pointer",
                lineHeight: "1.5rem",
                lineClamp: 2,
              }}
              variant="h6"
            >
              {title}
            </PopText>
          </NextLink>
        )}
        {labels.length > 0 && (
          <Stack direction="row" gap={1}>
            {labels.map((label) => (
              <Chip
                className={inter.className}
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
        {!!assignee?.avatarUrl && !!assignee?.url && (
          <NextLink href={assignee.url} key={`${key}-Assignee-Link`} target={assignee.url ? "_blank" : "_self"}>
            <Avatar
              alt={assignee.name ?? ""}
              showTooltip
              size={60}
              src={assignee.avatarUrl}
              sx={{
                border: `4px solid ${SiteTheme.palette.misc.lightgrey}`,
              }}
            />
          </NextLink>
        )}
      </Stack>
    </Paper>
  );
};
