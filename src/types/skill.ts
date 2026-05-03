export type Skill = {
  id: string;
  name: string;
  layer: "Frontend" | "Backend" | "Infrastructure" | "Other";
  rating: 1 | 2 | 3 | 4 | 5;
  description?: string | null;
};
