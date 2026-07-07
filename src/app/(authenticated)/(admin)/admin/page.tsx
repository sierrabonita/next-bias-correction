import { Heading, Stack, Text } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Home | SkillTracker",
};

const AdminPage = () => {
  return (
    <Stack gap="4">
      <Heading fontSize="3xl" fontWeight="bold">
        管理者画面
      </Heading>
      <Text color="gray.500">管理者専用のページです。</Text>
    </Stack>
  );
};

export default AdminPage;
