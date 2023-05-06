import { objectType } from "nexus";

export const Milestone = objectType({
  name: "Milestone",
  definition(t) {
    t.nonNull.boolean("closed");
    t.string("closedAt");
    t.string("description");
    t.nonNull.string("title");
    t.nonNull.string("url");
    t.nonNull.string("version");
  },
});

export const Milestones = objectType({
  name: "Milestones",
  definition(t) {
    t.nonNull.field("summary", { type: MilestonesSummary });
    t.nonNull.list.field("milestones", { type: Milestone });
  },
});

export const MilestonesSummary = objectType({
  name: "MilestonesSummary",
  definition(t) {
    t.nonNull.string("current");
    t.string("upcoming");
    t.string("future");
  },
});
