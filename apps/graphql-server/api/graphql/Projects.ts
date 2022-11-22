import { list, objectType, queryField } from "nexus";
import client from "../common/github";
import { Assignee } from "./Assignee";

import { Issue, Organization, ProjectV2Item, PullRequest } from "@octokit/graphql-schema";
import { chain, compact, defaultTo, replace, snakeCase, toUpper, upperCase } from "lodash";
import { NexusGenFieldTypes } from "../../nexus-typegen";

type ItemWithUrl = Issue | PullRequest;

interface ExtendedProjectV2Item extends ProjectV2Item {
  labels: { labels: { nodes: { color: string; name: string }[] } } | null;
  status: {
    name: string;
  } | null;
}

export const Project = objectType({
  name: "Project",
  definition(t) {
    t.nonNull.list.field("items", { type: ProjectItem });
    t.nonNull.string("title");
    t.string("url");
  },
});

export const ProjectItem = objectType({
  name: "ProjectItem",
  definition(t) {
    t.field("content", { type: ProjectItemContent });
    t.nonNull.boolean("isArchived");
    t.nonNull.string("status");
    t.nonNull.list.field("labels", { type: ProjectItemLabel });
    t.nonNull.string("type");
  },
});

export const ProjectItemContent = objectType({
  name: "ProjectContent",
  definition(t) {
    t.field("assignee", { type: Assignee });
    t.nonNull.int("num");
    t.nonNull.string("title");
    t.string("url");
  },
});

export const ProjectItemLabel = objectType({
  name: "ProjectItemLabel",
  definition(t) {
    t.nonNull.string("color");
    t.nonNull.string("name");
  },
});

export const ProjectsQuery = queryField("Projects", {
  type: list(Project),
  async resolve() {
    const { organization } = await client<{ organization: Organization }>(
      `
          {
            organization(login: "BuddiesOfBudgie") {
              projectsV2(first: 3, orderBy: {field: TITLE, direction: DESC}) {
                nodes {
                  items(first: 15) {
                    nodes {
                      content {
                        ... on DraftIssue {
                          assignees(first: 1) {
                            nodes {
                              avatarUrl(size: 120)
                              name
                              url
                            }
                          }
                          title
                        }
                        ... on Issue {
                          assignees(first: 1) {
                            nodes {
                              avatarUrl(size: 120)
                              name
                              url
                            }
                          }
                          title
                          url
                        }
                        ... on PullRequest {
                          author {
                            avatarUrl(size: 120)
                            url
                          }
                          title
                          url
                        }
                      }
                      labels: fieldValueByName(name: "Labels") {
                        ... on ProjectV2ItemFieldLabelValue {
                          labels(first: 4) {
                            nodes {
                              color
                              name
                            }
                          }
                        }
                      }
                      status: fieldValueByName(name: "Status") {
                        __typename
                        ... on ProjectV2ItemFieldSingleSelectValue {
                          name
                        }
                      }
                      isArchived
                      type
                    }
                  }
                  public
                  title
                  url
                }
              }
            }
          }
          `
    );

    const allProjects = organization.projectsV2?.nodes || [];
    const publicProjects = compact(allProjects.filter((p) => p && p.public));

    const x = publicProjects.map((p) => {
      const items: NexusGenFieldTypes["ProjectItem"][] = compact(p.items.nodes || []).map((i) => {
        const eI: ExtendedProjectV2Item = i as ExtendedProjectV2Item;

        const status = toUpper(snakeCase(defaultTo(eI.status?.name, "unknown")));
        const labels = eI.labels?.labels.nodes
          ? eI.labels?.labels.nodes
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((l) => ({ ...l, color: `#${l.color}` }))
          : [];

        const url = (eI.type !== "DRAFT_ISSUE" ? (i.content as ItemWithUrl).url : p.url) as string;

        const num = chain(url).split("/").last().toNumber().value();

        const user = chain(eI.content?.assignees?.nodes || [])
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
          status,
          type: eI.type as string,
        };
      });

      const project: NexusGenFieldTypes["Project"] = {
        items,
        title: p.title,
        url: p.url as string,
      };

      return project;
    });
    return x;
  },
});
