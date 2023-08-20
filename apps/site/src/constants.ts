import type { StackDirectionMap } from "./types";
export const DOMAIN_NO_PREFIX = "buddiesofbudgie.org";
export const DOMAIN = `https://${DOMAIN_NO_PREFIX}`;
export const ORG = "Buddies of Budgie";

export const FALLBACK_BUDGIE_VERSION = "10.8";

// HalvedWidthOnHighResolution is our Object that contains width attributes that encourage full-width on lower res and half on high
export const HalvedWidthOnHighResolution = {
  xs: "100%",
  sm: "100%",
  md: "100%",
  lg: "48%",
  xl: "48%",
};

// StackDirectionColumnToRow is our Object to dynamically change our mobile column to desktop row layout
export const StackDirectionColumnToRow: StackDirectionMap = {
  xs: "column",
  sm: "column",
  md: "column",
  lg: "row",
  xl: "row",
  subfullhd: "row",
  fullhd: "row",
};

export enum Uris {
  DOCUMENTATION = "https://docs.buddiesofbudgie.org",
  GET_BUDGIE = "https://docs.buddiesofbudgie.org/user/getting-budgie/",
}
