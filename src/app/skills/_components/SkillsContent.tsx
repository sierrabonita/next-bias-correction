import { Badge, Box, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import type { Skill } from "@/types/skill";
import StarRating from "./StarRating";

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
              <HStack mb={1} gap={3}>
                <Heading as="h2" size="md">
                  {skill.name}
                </Heading>
                <StarRating rating={skill.rating} size="md" />
              </HStack>
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
