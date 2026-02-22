"use client";

// TODO: ライブラリを直接呼ぶのは `@/lib/` 配下にする予定だが当面はこのまま呼ぶ
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { Skill } from "@/app/skills/page";

type SkillsPageClientProps = {
  skills: Skill[];
};

const levelColorScheme: Record<Skill["level"], string> = {
  beginner: "green",
  intermediate: "yellow",
  advanced: "red",
};

export const SkillsPageClient = ({ skills }: SkillsPageClientProps) => {
  return (
    <Box px={8} py={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1" size="lg">
          Skills
        </Heading>
        <Button colorScheme="blue">スキルを追加</Button>
      </Flex>
      <Stack gap={4}>
        {skills.map((skill) => (
          <Box
            key={skill.id}
            borderWidth="1px"
            borderRadius="md"
            p={4}
            _hover={{ shadow: "sm" }}
          >
            <Flex justify="space-between" align="flex-start" gap={4}>
              <Box>
                <Heading as="h2" size="md" mb={1}>
                  {skill.name}
                </Heading>
                {skill.description && (
                  <Text fontSize="sm" color="gray.600">
                    {skill.description}
                  </Text>
                )}
              </Box>
              <Badge
                colorScheme={levelColorScheme[skill.level]}
                alignSelf="flex-start"
              >
                {skill.level}
              </Badge>
            </Flex>
          </Box>
        ))}
        {skills.length === 0 && (
          <Text color="gray.500">まだスキルが登録されていません</Text>
        )}
      </Stack>
    </Box>
  );
};
