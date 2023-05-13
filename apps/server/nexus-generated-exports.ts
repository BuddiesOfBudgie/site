/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {}

export interface NexusGenEnums {
  ProjectItemStatus: "ACCEPTED_RFC" | "DONE" | "IN_PROGRESS" | "PROPOSAL_RFC" | "TODO" | "UNKNOWN";
  ProjectType: "DRAFT_ISSUE" | "ISSUE" | "PULL_REQUEST" | "REDACTED";
}

export interface NexusGenScalars {
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenObjects {
  Assignee: {
    // root type
    avatarUrl?: string | null; // String
    name?: string | null; // String
    url?: string | null; // String
  };
  Milestone: {
    // root type
    closed: boolean; // Boolean!
    closedAt?: string | null; // String
    description?: string | null; // String
    title: string; // String!
    url: string; // String!
    version: string; // String!
  };
  Milestones: {
    // root type
    milestones: NexusGenRootTypes["Milestone"][]; // [Milestone!]!
    summary: NexusGenRootTypes["MilestonesSummary"]; // MilestonesSummary!
  };
  MilestonesSummary: {
    // root type
    current: string; // String!
    future?: string | null; // String
    upcoming?: string | null; // String
  };
  Project: {
    // root type
    items: NexusGenRootTypes["ProjectItem"][]; // [ProjectItem!]!
    title: string; // String!
    url: string; // String!
  };
  ProjectContent: {
    // root type
    assignee?: NexusGenRootTypes["Assignee"] | null; // Assignee
    num: number; // Int!
    title: string; // String!
    url?: string | null; // String
  };
  ProjectItem: {
    // root type
    content: NexusGenRootTypes["ProjectContent"]; // ProjectContent!
    isArchived: boolean; // Boolean!
    labels: NexusGenRootTypes["ProjectItemLabel"][]; // [ProjectItemLabel!]!
    status: NexusGenEnums["ProjectItemStatus"]; // ProjectItemStatus!
    type: NexusGenEnums["ProjectType"]; // ProjectType!
  };
  ProjectItemLabel: {
    // root type
    color: string; // String!
    name: string; // String!
  };
  Query: {};
}

export interface NexusGenInterfaces {}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenObjects;

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums;

export interface NexusGenFieldTypes {
  Assignee: {
    // field return type
    avatarUrl: string | null; // String
    name: string | null; // String
    url: string | null; // String
  };
  Milestone: {
    // field return type
    closed: boolean; // Boolean!
    closedAt: string | null; // String
    description: string | null; // String
    title: string; // String!
    url: string; // String!
    version: string; // String!
  };
  Milestones: {
    // field return type
    milestones: NexusGenRootTypes["Milestone"][]; // [Milestone!]!
    summary: NexusGenRootTypes["MilestonesSummary"]; // MilestonesSummary!
  };
  MilestonesSummary: {
    // field return type
    current: string; // String!
    future: string | null; // String
    upcoming: string | null; // String
  };
  Project: {
    // field return type
    items: NexusGenRootTypes["ProjectItem"][]; // [ProjectItem!]!
    title: string; // String!
    url: string; // String!
  };
  ProjectContent: {
    // field return type
    assignee: NexusGenRootTypes["Assignee"] | null; // Assignee
    num: number; // Int!
    title: string; // String!
    url: string | null; // String
  };
  ProjectItem: {
    // field return type
    content: NexusGenRootTypes["ProjectContent"]; // ProjectContent!
    isArchived: boolean; // Boolean!
    labels: NexusGenRootTypes["ProjectItemLabel"][]; // [ProjectItemLabel!]!
    status: NexusGenEnums["ProjectItemStatus"]; // ProjectItemStatus!
    type: NexusGenEnums["ProjectType"]; // ProjectType!
  };
  ProjectItemLabel: {
    // field return type
    color: string; // String!
    name: string; // String!
  };
  Query: {
    // field return type
    Milestones: NexusGenRootTypes["Milestones"] | null; // Milestones
    Projects: Array<NexusGenRootTypes["Project"] | null> | null; // [Project]
  };
}

export interface NexusGenFieldTypeNames {
  Assignee: {
    // field return type name
    avatarUrl: "String";
    name: "String";
    url: "String";
  };
  Milestone: {
    // field return type name
    closed: "Boolean";
    closedAt: "String";
    description: "String";
    title: "String";
    url: "String";
    version: "String";
  };
  Milestones: {
    // field return type name
    milestones: "Milestone";
    summary: "MilestonesSummary";
  };
  MilestonesSummary: {
    // field return type name
    current: "String";
    future: "String";
    upcoming: "String";
  };
  Project: {
    // field return type name
    items: "ProjectItem";
    title: "String";
    url: "String";
  };
  ProjectContent: {
    // field return type name
    assignee: "Assignee";
    num: "Int";
    title: "String";
    url: "String";
  };
  ProjectItem: {
    // field return type name
    content: "ProjectContent";
    isArchived: "Boolean";
    labels: "ProjectItemLabel";
    status: "ProjectItemStatus";
    type: "ProjectType";
  };
  ProjectItemLabel: {
    // field return type name
    color: "String";
    name: "String";
  };
  Query: {
    // field return type name
    Milestones: "Milestones";
    Projects: "Project";
  };
}

export interface NexusGenArgTypes {}

export interface NexusGenAbstractTypeMembers {}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false;
    resolveType: true;
    __typename: false;
  };
};

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes["inputNames"] | NexusGenTypes["enumNames"] | NexusGenTypes["scalarNames"];
  allOutputTypes:
    | NexusGenTypes["objectNames"]
    | NexusGenTypes["enumNames"]
    | NexusGenTypes["unionNames"]
    | NexusGenTypes["interfaceNames"]
    | NexusGenTypes["scalarNames"];
  allNamedTypes: NexusGenTypes["allInputTypes"] | NexusGenTypes["allOutputTypes"];
  abstractTypes: NexusGenTypes["interfaceNames"] | NexusGenTypes["unionNames"];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {}
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {}
  interface NexusGenPluginSchemaConfig {}
  interface NexusGenPluginArgConfig {}
}
