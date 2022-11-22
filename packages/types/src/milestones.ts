export type Milestones = {
  summary: MilestonesSummary;
  milestones: Milestone[];
};

export type MilestonesSummary = {
  current?: string | null;
  upcoming?: string | null;
  future?: string | null;
};

export type Milestone = {
  closed: boolean;
  closedAt: string | null;
  description: string;
  title: string;
  url: string;
  version: string | null;
};
