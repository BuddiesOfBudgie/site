import { objectType } from "nexus";

export const Assignee = objectType({
  name: "Assignee",
  definition(t) {
    t.string("avatarUrl");
    t.string("name");
    t.string("url");
  },
});
