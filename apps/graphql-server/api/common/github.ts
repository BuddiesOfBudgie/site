import * as dotenv from "dotenv";
import { join } from "path";
const rootPath = join(__dirname, "..", "..", "..", "..", ".env");
dotenv.config({ path: rootPath });

import { graphql } from "@octokit/graphql";
export const client = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

export default client;
