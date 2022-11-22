import { ProjectsV2 } from "./projects";
import { Repository } from "./repository";

export type Organization = {
  name: string;
  projectsV2?: ProjectsV2;
  repository?: Repository;
};
