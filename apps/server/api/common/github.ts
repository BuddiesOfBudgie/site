import { graphql } from "@octokit/graphql";
import { Milestone, Organization, ProjectV2 } from "@octokit/graphql-schema";
import { compact, toArray } from "lodash";

const client = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

type GetMilestonesReturn = {
  organization: Organization;
  milestones: Milestone[];
};

export const getMilestones = async (): Promise<GetMilestonesReturn> => {
  const { organization } = await client<{ organization: Organization }>(
    `{
      organization(login:"BuddiesOfBudgie") {
        name
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
    }`
  );

  const milestones = compact(toArray(organization.repository?.milestones?.nodes));
  return { organization, milestones };
};

export const getPublicProjects = async (): Promise<ProjectV2[]> => {
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

  return (organization.projectsV2?.nodes || []).reduce<ProjectV2[]>(
    (list, p) => (p && p.public ? [...list, p] : list),
    []
  );
};
