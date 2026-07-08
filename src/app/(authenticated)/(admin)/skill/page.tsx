import { Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import { getAllSkillsService } from "@/services/skillService";

export const metadata: Metadata = {
  title: "Skills | SkillTracker",
};

const SkillPage = async () => {
  const { data: items } = await getAllSkillsService({
    excludeLoginUserSkills: false,
  });

  return (
    <Stack gap="4">
      <Heading fontSize="3xl" fontWeight="bold">
        スキル管理
      </Heading>
      <Text color="gray.500">登録可能なスキルを管理するページです</Text>
      <Stack gap={2}>
        {items.length > 0 ? (
          items.map((item) => (
            <Box
              key={item.id}
              borderWidth="1px"
              borderRadius="md"
              p={2}
              _hover={{ shadow: "sm" }}
            >
              <HStack justify="space-between">
                <Heading as="h2" size="md">
                  {item.name}
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  {item.layer}
                </Text>
              </HStack>
            </Box>
          ))
        ) : (
          <Text>{"データがありません"}</Text>
        )}
      </Stack>
    </Stack>
  );
};

export default SkillPage;
