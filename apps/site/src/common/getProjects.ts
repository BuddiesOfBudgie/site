import { gql } from "@apollo/client";

import type { Project } from "@buddiesofbudgie/server";
import { client } from "./client";

export const getProjects = async (): Promise<Project[]> => {
  const {
    data: { Projects },
  } = await client.query<{ Projects: Project[] }>({
    query: gql`
      query Projects {
        Projects {
          items {
            content {
              assignee {
                avatarUrl
                name
                url
              }
              num
              title
              url
            }
            isArchived
            labels {
              color
              name
            }
            status
            type
          }
          title
          url
        }
      }
    `,
  });

  return Projects;
};
