import { graphql } from "@octokit/graphql";

export const githubClient = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

export const getFullDomainPath = (subPath: string) =>
  `${process.env.DOMAIN ?? "https://buddiesofbudgie.org"}${subPath}`;
