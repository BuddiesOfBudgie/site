import { enumType, extendType, objectType } from "nexus";
import client from "../common/github";
import { Organization } from "@octokit/graphql-schema";
import { chain, lte, toArray, toString } from "lodash";
import { SemVer, coerce, compare, parse, gt } from "semver";
import { FALLBACK_BUDGIE_VERSION } from "../constants";
import { NexusGenFieldTypes } from "../../nexus-typegen";

export const Milestone = objectType({
  name: "Milestone",
  definition(t) {
    t.nonNull.boolean("closed");
    t.string("closedAt");
    t.nonNull.string("description");
    t.nonNull.string("title");
    t.nonNull.string("url");
    t.string("version");
  },
});

export const Milestones = objectType({
  name: "Milestones",
  definition(t) {
    t.nonNull.field("summary", { type: Summary });
    t.nonNull.list.field("milestones", { type: Milestone });
  },
});

export const Summary = objectType({
  name: "Summary",
  definition(t) {
    t.string("current");
    t.string("upcoming");
    t.string("future");
  },
});

export const MilestonesQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("Milestones", {
      type: Milestones,
      async resolve() {
        const { organization } = await client<{ organization: Organization }>(
          `{
          organization(login:"BuddiesOfBudgie") {
            name
            repository(name:"budgie-desktop") {
              milestones(first: 10) {
                nodes {
                    closed
                    closedAt
                    description
                    title
                    url
                }
              }
              releases(first: 1, orderBy: {direction: DESC, field: CREATED_AT}) {
                nodes {
                  tagName
                }
              }
            }
          }
        }`
        );

        const milestones: NexusGenFieldTypes["Milestone"][] = chain(toArray(organization.repository?.milestones?.nodes))
          .compact()
          .map((m) => ({
            closed: m.closed,
            closedAt: m.closedAt,
            description: m.description || "",
            title: m.title,
            url: m.url,
            version: coerce(m.title)?.version ?? null,
          }))
          .filter((m) => !!m.version)
          .sort((a, b) => compare(a.version as string, b.version as string))
          .value();

        //console.log("milestones", milestones);

        const { nodes: latestReleaseNodes } = organization.repository?.releases ?? { nodes: null };
        const latestReleaseTag =
          (latestReleaseNodes ? latestReleaseNodes[0]?.tagName : milestones[0].title) ?? FALLBACK_BUDGIE_VERSION;

        const latestRelease = parse(latestReleaseTag) as SemVer;

        const upcomingMilestones = chain(milestones)
          .map((m) => parse(m.version))
          .filter((v) => !!v && gt(v, latestRelease))
          .compact()
          .value();

        const upcomingVersion = upcomingMilestones[0];

        const summary: NexusGenFieldTypes["Summary"] = {
          current: latestRelease?.version ?? latestReleaseTag,
          upcoming: upcomingVersion.version,
          future: toString(latestRelease.major + 1) + ".0",
        };

        return {
          summary,
          milestones,
        };
      },
    });
  },
});
