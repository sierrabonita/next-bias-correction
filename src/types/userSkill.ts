export type UserSkill = {
  id: string;
  rating: 1 | 2 | 3 | 4 | 5;
  description?: string | null;
  skill: {
    id: string;
    name: string;
    layer: "Frontend" | "NativeApp" | "Backend" | "Infrastructure" | "Other";
  };
};
