import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getUserSkillsByIdService } from "@/services/userSkillService";
import type { UserSkill } from "@/types/userSkill";
import CollapsibleSidebar from "./_components/CollapsibleSidebar";
import SkillsContent from "./_components/SkillsContent";
import SkillsHeader from "./_components/SkillsHeader";

export const metadata: Metadata = {
  title: "Skills | SkillTracker",
};

const SkillPage = async () => {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;

  let userSkill: UserSkill | null = null;

  if (id) {
    userSkill = await getUserSkillsByIdService(id);
  }

  return (
    <HStack alignItems={"start"} gap={0}>
      <CollapsibleSidebar />
      <Box flex={1} px={8} py={6} minH={"100vh"}>
        <Flex justify="space-between" align="center" mb={6}>
          <SkillsHeader />
        </Flex>
        <Stack gap={4}>
          {userSkill ? (
            <SkillsContent userSkill={userSkill} />
          ) : (
            <Text>{"データがありません"}</Text>
          )}
        </Stack>
      </Box>
    </HStack>
  );
};

export default SkillPage;
