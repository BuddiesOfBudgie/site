import { graphql } from "@octokit/graphql";

import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({
  path: resolve(process.cwd(), `../../.env.${process.env.NODE_ENV ?? "development"}`),
});

export const githubClient = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

export const getFullDomainPath = (subPath: string) =>
  `${process.env.DOMAIN ?? "https://buddiesofbudgie.org"}${subPath}`;
