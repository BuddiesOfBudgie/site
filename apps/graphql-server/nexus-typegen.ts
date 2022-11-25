/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Assignee: { // root type
    avatarUrl?: string | null; // String
    name?: string | null; // String
    url?: string | null; // String
  }
  Milestone: { // root type
    closed: boolean; // Boolean!
    closedAt?: string | null; // String
    description: string; // String!
    title: string; // String!
    url: string; // String!
    version?: string | null; // String
  }
  Milestones: { // root type
    milestones: Array<NexusGenRootTypes['Milestone'] | null>; // [Milestone]!
    summary: NexusGenRootTypes['Summary']; // Summary!
  }
  Project: { // root type
    items: Array<NexusGenRootTypes['ProjectItem'] | null>; // [ProjectItem]!
    title: string; // String!
    url?: string | null; // String
  }
  ProjectContent: { // root type
    assignee?: NexusGenRootTypes['Assignee'] | null; // Assignee
    num: number; // Int!
    title: string; // String!
    url?: string | null; // String
  }
  ProjectItem: { // root type
    content?: NexusGenRootTypes['ProjectContent'] | null; // ProjectContent
    isArchived: boolean; // Boolean!
    labels: Array<NexusGenRootTypes['ProjectItemLabel'] | null>; // [ProjectItemLabel]!
    status: string; // String!
    type: string; // String!
  }
  ProjectItemLabel: { // root type
    color: string; // String!
    name: string; // String!
  }
  Query: {};
  Summary: { // root type
    current?: string | null; // String
    future?: string | null; // String
    upcoming?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Assignee: { // field return type
    avatarUrl: string | null; // String
    name: string | null; // String
    url: string | null; // String
  }
  Milestone: { // field return type
    closed: boolean; // Boolean!
    closedAt: string | null; // String
    description: string; // String!
    title: string; // String!
    url: string; // String!
    version: string | null; // String
  }
  Milestones: { // field return type
    milestones: Array<NexusGenRootTypes['Milestone'] | null>; // [Milestone]!
    summary: NexusGenRootTypes['Summary']; // Summary!
  }
  Project: { // field return type
    items: Array<NexusGenRootTypes['ProjectItem'] | null>; // [ProjectItem]!
    title: string; // String!
    url: string | null; // String
  }
  ProjectContent: { // field return type
    assignee: NexusGenRootTypes['Assignee'] | null; // Assignee
    num: number; // Int!
    title: string; // String!
    url: string | null; // String
  }
  ProjectItem: { // field return type
    content: NexusGenRootTypes['ProjectContent'] | null; // ProjectContent
    isArchived: boolean; // Boolean!
    labels: Array<NexusGenRootTypes['ProjectItemLabel'] | null>; // [ProjectItemLabel]!
    status: string; // String!
    type: string; // String!
  }
  ProjectItemLabel: { // field return type
    color: string; // String!
    name: string; // String!
  }
  Query: { // field return type
    Milestones: NexusGenRootTypes['Milestones'] | null; // Milestones
    Projects: Array<NexusGenRootTypes['Project'] | null> | null; // [Project]
  }
  Summary: { // field return type
    current: string | null; // String
    future: string | null; // String
    upcoming: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  Assignee: { // field return type name
    avatarUrl: 'String'
    name: 'String'
    url: 'String'
  }
  Milestone: { // field return type name
    closed: 'Boolean'
    closedAt: 'String'
    description: 'String'
    title: 'String'
    url: 'String'
    version: 'String'
  }
  Milestones: { // field return type name
    milestones: 'Milestone'
    summary: 'Summary'
  }
  Project: { // field return type name
    items: 'ProjectItem'
    title: 'String'
    url: 'String'
  }
  ProjectContent: { // field return type name
    assignee: 'Assignee'
    num: 'Int'
    title: 'String'
    url: 'String'
  }
  ProjectItem: { // field return type name
    content: 'ProjectContent'
    isArchived: 'Boolean'
    labels: 'ProjectItemLabel'
    status: 'String'
    type: 'String'
  }
  ProjectItemLabel: { // field return type name
    color: 'String'
    name: 'String'
  }
  Query: { // field return type name
    Milestones: 'Milestones'
    Projects: 'Project'
  }
  Summary: { // field return type name
    current: 'String'
    future: 'String'
    upcoming: 'String'
  }
}

export interface NexusGenArgTypes {
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

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
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}