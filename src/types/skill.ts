export type Skill = {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced";
  description?: string | null;
};
