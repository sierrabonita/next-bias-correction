// TODO: ライブラリを直接呼ぶのは `@/lib/` 配下にする予定だが当面はこのまま呼ぶ
import { Box, Flex, Stack } from "@chakra-ui/react";
import type { Metadata } from "next";
import { fetchSkills } from "@/services/skillService";
// import type { Skill } from "@/types/skill";
import SkillsContent from "./_components/SkillsContent";
import SkillsHeader from "./_components/SkillsHeader";

export const metadata: Metadata = {
  title: "Skills | SkillTracker",
};

// const dummySkills: Skill[] = [
//   {
//     id: "react",
//     name: "React",
//     layer: "Frontend",
//     rating: 5,
//     description: "SPA構築・Hooks・パフォーマンス最適化など。",
//   },
//   {
//     id: "nextjs",
//     name: "Next.js",
//     layer: "Frontend",
//     rating: 4,
//     description: "App Router / SSR / SSG / ルーティング設計。",
//   },
//   {
//     id: "nestjs",
//     name: "NestJS",
//     layer: "Backend",
//     rating: 1,
//     description: "認証・CRUD API・Prismaを用いたAPI実装。",
//   },
// ];

const SkillPage = async () => {
  const skills = await fetchSkills();

  return (
    <Box px={8} py={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <SkillsHeader />
      </Flex>
      <Stack gap={4}>
        <SkillsContent skills={skills} />
      </Stack>
    </Box>
  );
};

export default SkillPage;
