import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getUserSkillsByIdService } from "@/services/userSkillService";
import CollapsibleSidebar from "./_components/CollapsibleSidebar";
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
    <HStack alignItems={"start"} gap={0}>
      <CollapsibleSidebar />
      <Box flex={1} px={8} py={6} minH={"100vh"}>
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
    </HStack>
  );
};

export default SkillPage;
