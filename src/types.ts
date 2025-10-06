import type { ResponsiveStyleValue } from "@mui/system";

export type PartialBy<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type RequiredBy<T, K extends keyof T> = Pick<Required<T>, K> & Omit<T, K>;
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };


export enum GitHubProjectItemStatus {
  UNKNOWN = "UNKNOWN",
  PROPOSAL_RFC = "PROPOSAL_RFC",
  ACCEPTED_RFC = "ACCEPTED_RFC",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export enum GitHubProjectItemType {
  DRAFT_ISSUE = "DRAFT_ISSUE",
  ISSUE = "ISSUE",
  PULL_REQUEST = "PULL_REQUEST",
  REDACTED = "REDACTED",
}

export type BlogPostMeta = {
  author: string;
  excerpt: string;
  featuredImage: string;
  publishDate: string;
  tags: string[];
  title: string;
};

export type BlogPost = {
  content: string;
  id: string;
} & BlogPostMeta;

export type BlogTagInfo = {
  posts: BlogPost[];
  pages: number;
};

export type BlogTags = Record<string, BlogTagInfo>;

export type NavLink = {
  isButton?: boolean;
  rel?: string;
  subMenu?: NavLink[];
  title: string;
  url?: string;
};

export type GitHubAssignee = {
  avatarUrl: string | null;
  name: string | null;
  url: string | null;
};

export type GitHubMilestone = {
  closed: boolean;
  closedAt: string | null;
  description: string | null;
  title: string;
  url: string;
  version: string;
};

export type GitHubMilestones = {
  summary: GitHubMilestonesSummary;
  milestones: GitHubMilestone[];
};

export type GitHubMilestonesSummary = {
  current: string;
  future: string | null;
  upcoming: string | null;
};

export type GitHubProject = {
  items: GitHubProjectItem[];
  title: string;
  url: string;
};

export type GitHubProjectContent = {
  assignee: GitHubAssignee | null;
  num: number;
  title: string;
  url: string | null;
};

export type GitHubProjectItem = {
  content: GitHubProjectContent;
  isArchived: boolean;
  labels: GitHubProjectLabel[];
  status: GitHubProjectItemStatus;
  type: GitHubProjectItemType;
};

export type GitHubProjectLabel = {
  color: string;
  name: string;
};

export type StackDirectionMap = ResponsiveStyleValue<"column" | "row" | "row-reverse" | "column-reverse">;
