import { client } from "@buddiesofbudgie/utils";
import { gql } from "@apollo/client";

import type { Milestones } from "@buddiesofbudgie/server";

export const getMilestones = async (): Promise<Milestones> => {
  const {
    data: { Milestones },
  } = await client.query<{ Milestones: Milestones }>({
    query: gql`
      query Milestones {
        Milestones {
          milestones {
            closed
            closedAt
            description
            title
            url
            version
          }
          summary {
            current
            upcoming
            future
          }
        }
      }
    `,
  });

  return Milestones;
};
