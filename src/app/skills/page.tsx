import type { Metadata } from "next";
import { SkillsPageClient } from "@/app/skills/_components/SkillsPageClient";

export const metadata: Metadata = {
  title: "Skills | SkillTracker",
};

export type Skill = {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced";
  description?: string | null;
};

// TODO: 後で Prisma or fetch("/api/skills") に差し替え
const dummySkills: Skill[] = [
  {
    id: "react",
    name: "React",
    level: "advanced",
    description: "SPA構築・Hooks・パフォーマンス最適化など。",
  },
  {
    id: "nextjs",
    name: "Next.js",
    level: "intermediate",
    description: "App Router / SSR / SSG / ルーティング設計。",
  },
  {
    id: "backend",
    name: "Backend (NestJS)",
    level: "beginner",
    description: "認証・CRUD API・Prismaを用いたAPI実装。",
  },
];

export default async function SkillPage() {
  // 今はダミーデータ。後で DB / API に差し替え前提。
  const skills = dummySkills;

  return <SkillsPageClient skills={skills} />;
}
