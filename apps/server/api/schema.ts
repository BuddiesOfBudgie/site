import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./graphql";
import { rootDirectory } from "./constants";

export const schema = makeSchema({
  prettierConfig: join(rootDirectory, ".prettierrc.json"),
  types: types,
  outputs: {
    schema: join(__dirname, "..", "schema.graphql"),
    typegen: join(__dirname, "..", "nexus-generated-exports.ts"),
  },
});
