import { Badge, Box, Flex, Heading, Text } from "@chakra-ui/react";
import type { Skill } from "@/types/skill";

type Props = {
  skills: Skill[];
};

const SkillsContent = (props: Props) => {
  const { skills } = props;
  const layerColorPalette: Record<Skill["layer"], string> = {
    Frontend: "green",
    Backend: "blue",
    Infrastructure: "purple",
    Other: "gray",
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
              colorPalette={layerColorPalette[skill.layer]}
              alignSelf="flex-start"
            >
              {skill.layer}
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
