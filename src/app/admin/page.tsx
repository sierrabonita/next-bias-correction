import { Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import CollapsibleSidebar from "@/app/home/_components/CollapsibleSidebar";

export const metadata: Metadata = {
  title: "Admin Home | SkillTracker",
};

const AdminPage = () => {
  return (
    <HStack alignItems={"start"} gap={0}>
      <CollapsibleSidebar />
      <Box flex={1} px={8} py={6} minH={"100vh"}>
        <Stack gap="4">
          <Heading fontSize="3xl" fontWeight="bold">
            管理者画面
          </Heading>
          <Text color="gray.500">管理者専用のページです。</Text>
        </Stack>
      </Box>
    </HStack>
  );
};

export default AdminPage;
