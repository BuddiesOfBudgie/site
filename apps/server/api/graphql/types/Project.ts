import { enumType, objectType } from "nexus";
import { Assignee } from "./Assignee";

export const ProjectItemStatus = enumType({
  name: "ProjectItemStatus",
  members: ["UNKNOWN", "PROPOSAL_RFC", "ACCEPTED_RFC", "TODO", "IN_PROGRESS", "DONE"],
});

export const ProjectType = enumType({
  name: "ProjectType",
  members: ["DRAFT_ISSUE", "ISSUE", "PULL_REQUEST", "REDACTED"],
});

export const Project = objectType({
  name: "Project",
  definition(t) {
    t.nonNull.list.nonNull.field("items", { type: ProjectItem });
    t.nonNull.string("title");
    t.nonNull.string("url");
  },
});

export const ProjectItem = objectType({
  name: "ProjectItem",
  definition(t) {
    t.nonNull.field("content", { type: ProjectItemContent });
    t.nonNull.boolean("isArchived");
    t.nonNull.field("status", { type: ProjectItemStatus });
    t.nonNull.list.nonNull.field("labels", { type: ProjectItemLabel });
    t.nonNull.field("type", { type: ProjectType });
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
