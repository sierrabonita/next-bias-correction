import { Badge, Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { SkillMenu } from "@/app/home/_components/SkillMenu";
import type { UserSkill } from "@/types/userSkill";
import StarRating from "./StarRating";

type Props = {
  userSkills: UserSkill[];
};

const SkillsContent = (props: Props) => {
  const { userSkills } = props;
  const layerColorPalette: Record<UserSkill["skill"]["layer"], string> = {
    Frontend: "green",
    NativeApp: "orange",
    Backend: "blue",
    Infrastructure: "purple",
    Other: "gray",
  };

  return (
    <>
      {userSkills.map((userSkill) => (
        <Box
          key={userSkill.id}
          borderWidth="1px"
          borderRadius="md"
          p={4}
          _hover={{ shadow: "sm" }}
        >
          <HStack justify="space-between">
            <Stack gap={1}>
              <Badge
                colorPalette={layerColorPalette[userSkill.skill.layer]}
                alignSelf="flex-start"
              >
                {userSkill.skill.layer}
              </Badge>
              <HStack gap={2}>
                <Heading as="h2" size="md">
                  {userSkill.skill.name}
                </Heading>
                <StarRating rating={userSkill.rating} size="md" />
              </HStack>
              {userSkill.description && (
                <Text fontSize="sm" color="gray.600">
                  {userSkill.description}
                </Text>
              )}
            </Stack>
            <SkillMenu id={userSkill.id} />
          </HStack>
        </Box>
      ))}
      {userSkills.length === 0 && (
        <Text color="gray.500">まだスキルが登録されていません</Text>
      )}
    </>
  );
};

export default SkillsContent;
