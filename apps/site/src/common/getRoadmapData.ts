import type {
  GitHubMilestone,
  GitHubMilestones,
  GitHubProject,
  GitHubProjectItem,
  GitHubProjectItemStatus,
  GitHubProjectItemType,
} from "../types";
import type { Issue, Organization, ProjectV2Item, PullRequest } from "@octokit/graphql-schema";
import type { SemVer } from "semver";
import { coerce, compare, parse, gt } from "semver";

import { githubClient } from "./client";
import { FALLBACK_BUDGIE_VERSION } from "../constants";
import { A, F, S, pipe } from "@mobily/ts-belt";

type ItemWithUrl = Issue | PullRequest;

interface ExtendedProjectV2Item extends ProjectV2Item {
  labels: { labels: { nodes: { color: string; name: string }[] } } | null;
  status: {
    name: string;
  } | null;
}

type RoadmapData = {
  milestones: GitHubMilestones;
  projects: GitHubProject[];
};

export const getRoadmapData = async (showOnlyB10: boolean): Promise<RoadmapData> => {
  const { organization } = await githubClient<{ organization: Organization }>(
    `
          {
            organization(login: "BuddiesOfBudgie") {
              name
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
              repository(name:"budgie-desktop") {
                milestones(first: 10) {
                  nodes {
                      closed
                      closedAt
                      description
                      title
                      url
                  }
                }
                releases(first: 1, orderBy: {direction: DESC, field: CREATED_AT}) {
                  nodes {
                    tagName
                  }
                }
              }
            }
          }
    `
  );

  const cleanVer = (version: string) => {
    const noV = version.startsWith("v") ? version.substring(1) : version;
    return noV.length === 4 ? noV + ".0" : noV;
  };

  const milestonesList = pipe(
    organization.repository?.milestones?.nodes,
    F.defaultTo([]),
    A.reduce<GitHubMilestone, GitHubMilestone[]>([], (list, m) => {
      if (!m) return list;
      const version = coerce(cleanVer(m.title))?.version;
      return version
        ? [
            ...list,
            {
              closed: m.closed,
              closedAt: m.closedAt,
              description: m.description ?? null,
              title: m.title,
              url: m.url,
              version,
            },
          ]
        : list;
    }),
    A.sort((a, b) => compare(a.version, b.version)),
    F.toMutable
  );

  const { nodes: latestReleaseNodes } = organization.repository?.releases ?? { nodes: null };
  const latestReleaseTag = cleanVer(
    (latestReleaseNodes ? latestReleaseNodes[0]?.tagName : milestonesList[0].title) ?? FALLBACK_BUDGIE_VERSION
  );
  const latestRelease = parse(latestReleaseTag, { loose: true }) as SemVer;

  const upcomingMilestones = milestonesList.reduce<GitHubMilestone[]>((list, m) => {
    const parsedVersion = parse(m.version, { loose: true });
    return !!parsedVersion && gt(parsedVersion, latestRelease) ? [...list, m] : list;
  }, []);

  const upcomingVersion = upcomingMilestones[0];

  const milestoneInfo: GitHubMilestones = {
    summary: {
      current: latestRelease?.version ?? latestReleaseTag,
      upcoming: upcomingVersion.version,
      future: `${latestRelease.major + 1}.0`,
    },
    milestones: milestonesList,
  };

  const projects = (organization.projectsV2?.nodes ?? []).reduce<GitHubProject[]>((list, p) => {
    if (!p?.public || A.isEmpty(F.defaultTo(p?.items?.nodes, []))) return list;
    if (showOnlyB10 && p.title !== "Budgie 10") return list;

    const items: GitHubProjectItem[] = (p.items.nodes ?? []).reduce<GitHubProjectItem[]>((list, i) => {
      if (!i) return list;
      const eI: ExtendedProjectV2Item = i as ExtendedProjectV2Item;

      const status = pipe(
        eI.status?.name,
        F.defaultTo("unknown"),
        S.replaceAll(" ", "_"),
        S.toUpperCase,
        F.coerce<GitHubProjectItemStatus>
      );
      const labels = eI.labels?.labels.nodes
        ? eI.labels?.labels.nodes
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((l) => ({ ...l, color: `#${l.color}` }))
        : [];

      const url = F.coerce<string>(eI.type !== "DRAFT_ISSUE" ? F.coerce<ItemWithUrl>(i.content).url : p.url);

      const num = Number(url.split("/").at(-1));

      const user = (eI.content?.assignees?.nodes?.filter((u) => !!u) ?? []).at(0);

      return [
        ...list,
        {
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
          status: status,
          type: F.coerce<GitHubProjectItemType>(eI.type),
        },
      ];
    }, []);

    return [
      ...list,
      {
        items,
        title: p.title,
        url: p.url as string,
      },
    ];
  }, []);

  return {
    milestones: milestoneInfo,
    projects,
  };
};
