import { Assignee } from "./assignee";

export type ProjectType = "DRAFT_ISSUE" | "ISSUE" | "PULL_REQUEST";

export enum ProjectItemStatusRanking {
  UNKNOWN = -1,
  PROPOSAL_RFC = 0,
  ACCEPTED_RFC = 1,
  TODO = 2,
  IN_PROGRESS = 3,
  DONE = 4,
}

export type ProjectItemStatus = keyof typeof ProjectItemStatusRanking;

export type ProjectsV2 = {
  nodes: Project[];
};

export type Project = {
  items: ProjectItem[];
  public: boolean;
  title: string;
  url: string;
};

export type ProjectItem = {
  content: ProjectContent;
  isArchived: boolean;
  labels: ProjectItemLabel[];
  status: ProjectItemStatus;
  type: ProjectType;
};

export type ProjectItemLabel = {
  color: string;
  name: string;
};

export type ProjectContent = {
  assignee: Assignee;
  num: number;
  title: string;
  url: string;
};
