import type { NexusGenAllTypes, NexusGenEnums, NexusGenFieldTypes } from "./nexus-generated-exports";

export type Assignee = NexusGenAllTypes["Assignee"];
export type Milestone = NexusGenAllTypes["Milestone"];
export type Milestones = NexusGenAllTypes["Milestones"];
export type MilestonesSummary = NexusGenAllTypes["MilestonesSummary"];
export type Project = NexusGenAllTypes["Project"];
export type ProjectContent = NexusGenAllTypes["ProjectContent"];
export type ProjectItem = NexusGenAllTypes["ProjectItem"];
export type ProjectItemStatus = NexusGenEnums["ProjectItemStatus"];
export type ProjectType = NexusGenEnums["ProjectType"];

export type GetMilestones = NexusGenFieldTypes["Query"]["Milestones"];
export type GetProjects = NexusGenFieldTypes["Query"]["Projects"];
