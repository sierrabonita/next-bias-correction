import { Badge, Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { SkillMenu } from "@/app/home/_components/SkillMenu";
import type { UserSkill, UserSkillData } from "@/types/userSkill";
import StarRating from "./StarRating";

type Props = {
  userSkill: UserSkill;
};

const SkillsContent = (props: Props) => {
  const { userSkill } = props;
  const { data: items } = userSkill;
  const layerColorPalette: Record<UserSkillData["skill"]["layer"], string> = {
    Frontend: "green",
    NativeApp: "orange",
    Backend: "blue",
    Infrastructure: "purple",
    Other: "gray",
  };

  return (
    <>
      {items.map((item) => (
        <Box
          key={item.id}
          borderWidth="1px"
          borderRadius="md"
          p={4}
          _hover={{ shadow: "sm" }}
        >
          <HStack justify="space-between">
            <Stack gap={1}>
              <Badge
                colorPalette={layerColorPalette[item.skill.layer]}
                alignSelf="flex-start"
              >
                {item.skill.layer}
              </Badge>
              <HStack gap={2}>
                <Heading as="h2" size="md">
                  {item.skill.name}
                </Heading>
                <StarRating rating={item.rating} size="md" />
              </HStack>
              {item.description && (
                <Text fontSize="sm" color="gray.600">
                  {item.description}
                </Text>
              )}
            </Stack>
            <SkillMenu userSkillId={item.id} />
          </HStack>
        </Box>
      ))}
      {items.length === 0 && (
        <Text color="gray.500">まだスキルが登録されていません</Text>
      )}
    </>
  );
};

export default SkillsContent;
