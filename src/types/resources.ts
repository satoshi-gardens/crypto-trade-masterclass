export type ResourceType = "guide" | "video" | "tool" | "exchange" | "wallet";

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  link?: string;
}

export interface ResourceCategory {
  id: string;
  title: string;
  description: string;
  items: Resource[];
}