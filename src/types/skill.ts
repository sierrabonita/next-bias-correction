export type Skill = {
  id: string;
  name: string;
  layer: "Frontend" | "Backend" | "Infrastructure" | "Other";
  description?: string | null;
};
