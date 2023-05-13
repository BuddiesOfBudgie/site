import { list, queryField } from "nexus";
import { getPublicProjects } from "../common/github";

import type { Issue, ProjectItemType, ProjectV2Item, PullRequest } from "@octokit/graphql-schema";
import { chain, compact, defaultTo, snakeCase, toUpper } from "lodash";
import { Project } from "./types/Project";
import type { ProjectItem, ProjectItemStatus } from "../../exports";

type ItemWithUrl = Issue | PullRequest;

interface ExtendedProjectV2Item extends ProjectV2Item {
  labels: { labels: { nodes: { color: string; name: string }[] } } | null;
  status: {
    name: string;
  } | null;
}

export const ProjectsQuery = queryField("Projects", {
  type: list(Project),
  async resolve() {
    const projects = await getPublicProjects();
    return projects.map((p) => {
      const items: ProjectItem[] = compact(p.items.nodes ?? []).map((i) => {
        const eI: ExtendedProjectV2Item = i as ExtendedProjectV2Item;

        const status = toUpper(snakeCase(defaultTo(eI.status?.name, "unknown")));
        const labels = eI.labels?.labels.nodes
          ? eI.labels?.labels.nodes
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((l) => ({ ...l, color: `#${l.color}` }))
          : [];

        const url = (eI.type !== "DRAFT_ISSUE" ? (i.content as ItemWithUrl).url : p.url) as string;

        const num = chain(url).split("/").last().toNumber().value();

        const user = chain(eI.content?.assignees?.nodes ?? [])
          .compact()
          .head()
          .value();

        return {
          content: {
            assignee: user
              ? {
                  avatarUrl: user.avatarUrl,
                  name: user.name ?? user.login,
                  url: user.url,
                }
              : null,
            num,
            title: eI.content?.title ?? "",
            url,
          },
          isArchived: eI.isArchived ?? false,
          labels,
          status: status as ProjectItemStatus,
          type: eI.type as ProjectItemType,
        };
      });

      return {
        items,
        title: p.title,
        url: p.url as string,
      };
    });
  },
});
