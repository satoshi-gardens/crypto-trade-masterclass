export type ResourceType = "guide" | "video" | "tool";

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
}

export interface ResourceCategory {
  id: string;
  title: string;
  description: string;
  items: Resource[];
}