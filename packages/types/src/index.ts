export type { Assignee } from "./assignee";
export type { Milestone, Milestones, MilestonesSummary } from "./milestones";
export type { Organization } from "./organization";
export type {
  Project,
  ProjectContent,
  ProjectItem,
  ProjectItemStatus,
  ProjectItemStatusRanking,
  ProjectType,
  ProjectsV2,
} from "./projects";
export type { Repository } from "./repository";

export type PartialBy<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type RequiredBy<T, K extends keyof T> = Pick<Required<T>, K> & Omit<T, K>;
