import { Badge, Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { SkillMenu } from "@/app/home/_components/SkillMenu";
import type { Skill } from "@/types/skill";
import StarRating from "./StarRating";

type Props = {
  skills: Skill[];
};

const SkillsContent = (props: Props) => {
  const { skills } = props;
  const layerColorPalette: Record<Skill["layer"], string> = {
    Frontend: "green",
    NativeApp: "orange",
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
          <HStack justify="space-between">
            <Stack gap={1}>
              <Badge
                colorPalette={layerColorPalette[skill.layer]}
                alignSelf="flex-start"
              >
                {skill.layer}
              </Badge>
              <HStack gap={2}>
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
            </Stack>
            <SkillMenu id={skill.id} />
          </HStack>
        </Box>
      ))}
      {skills.length === 0 && (
        <Text color="gray.500">まだスキルが登録されていません</Text>
      )}
    </>
  );
};

export default SkillsContent;
