"use client";

import { Box, HStack } from "@chakra-ui/react";
import CollapsibleSidebar from "@/app/_components/CollapsibleSidebar";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <HStack alignItems="start" gap={0}>
      <CollapsibleSidebar />
      <Box flex={1} px={8} py={6} minH="100vh">
        {children}
      </Box>
    </HStack>
  );
};

export default AuthenticatedLayout;
