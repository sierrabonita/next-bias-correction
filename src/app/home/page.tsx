import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getUserSkillsByIdService } from "@/services/userSkillService";
import SkillsContent from "./_components/SkillsContent";
import SkillsHeader from "./_components/SkillsHeader";

export const metadata: Metadata = {
  title: "Skills | SkillTracker",
};

const SkillPage = async () => {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;

  let skills = [];

  if (id) {
    skills = await getUserSkillsByIdService(id);
  }

  return (
    <Box px={8} py={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <SkillsHeader />
      </Flex>
      <Stack gap={4}>
        {skills ? (
          <SkillsContent skills={skills} />
        ) : (
          <Text>{"データがありません"}</Text>
        )}
      </Stack>
    </Box>
  );
};

export default SkillPage;
