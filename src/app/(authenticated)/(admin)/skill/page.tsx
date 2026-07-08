import { Heading, Stack, Text } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills | SkillTracker",
};

const SkillPage = () => {
  return (
    <Stack gap="4">
      <Heading fontSize="3xl" fontWeight="bold">
        スキル管理
      </Heading>
      <Text color="gray.500">登録可能なスキルを管理するページです</Text>
    </Stack>
  );
};

export default SkillPage;
