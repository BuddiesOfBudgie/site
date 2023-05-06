import { extendType } from "nexus";
import { toString } from "lodash";
import { SemVer, coerce, compare, parse, gt } from "semver";
import { FALLBACK_BUDGIE_VERSION } from "../constants";
import { Milestones } from "./types/Milestone";
import { Milestone } from "../../exports";
import { getMilestones } from "../common/github";

export const MilestonesQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("Milestones", {
      type: Milestones,
      async resolve() {
        const { organization, milestones: orgMilestones } = await getMilestones();
        const milestones = orgMilestones
          .reduce<Milestone[]>((list, m) => {
            const version = coerce(m.title)?.version;
            return version
              ? [
                  ...list,
                  {
                    closed: m.closed,
                    closedAt: m.closedAt,
                    description: m.description ?? null,
                    title: m.title,
                    url: m.url,
                    version,
                  },
                ]
              : list;
          }, [])
          .sort((a, b) => compare(a.version, b.version));

        const { nodes: latestReleaseNodes } = organization.repository?.releases ?? { nodes: null };
        const latestReleaseTag =
          (latestReleaseNodes ? latestReleaseNodes[0]?.tagName : milestones[0].title) ?? FALLBACK_BUDGIE_VERSION;
        const latestRelease = parse(latestReleaseTag) as SemVer;

        const upcomingMilestones = milestones.reduce<Milestone[]>((list, m) => {
          const parsedVersion = parse(m.version);
          return !!parsedVersion && gt(parsedVersion, latestRelease) ? [...list, m] : list;
        }, []);

        const upcomingVersion = upcomingMilestones[0];

        return {
          summary: {
            current: latestRelease?.version ?? latestReleaseTag,
            upcoming: upcomingVersion.version,
            future: toString(latestRelease.major + 1) + ".0",
          },
          milestones,
        };
      },
    });
  },
});
