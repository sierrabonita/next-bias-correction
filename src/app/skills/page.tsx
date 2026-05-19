// TODO: ライブラリを直接呼ぶのは `@/lib/` 配下にする予定だが当面はこのまま呼ぶ
import { Box, Flex, Stack } from "@chakra-ui/react";
import type { Metadata } from "next";
import { getAllSkills } from "@/services/skillService";
import SkillsContent from "./_components/SkillsContent";
import SkillsHeader from "./_components/SkillsHeader";

export const metadata: Metadata = {
  title: "Skills | SkillTracker",
};

// TODO: データ未取得時の表示
const SkillPage = async () => {
  const skills = await getAllSkills();

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
