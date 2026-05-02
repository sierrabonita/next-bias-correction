import { Badge, Box, Flex, Heading, Text } from "@chakra-ui/react";
import type { Skill } from "@/types/skill";

type Props = {
  skills: Skill[];
};

const SkillsContent = (props: Props) => {
  const { skills } = props;
  const levelColorScheme: Record<Skill["level"], string> = {
    beginner: "green",
    intermediate: "yellow",
    advanced: "red",
  };

  return (
    <>
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
    </>
  );
};

export default SkillsContent;
