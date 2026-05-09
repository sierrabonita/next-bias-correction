import { Heading } from "@chakra-ui/react";
import { AddSkillButton } from "@/app/skills/_components/AddSkillButton";

const SkillsHeader = () => {
  return (
    <>
      <Heading as="h1" size="lg">
        Skills
      </Heading>
      <AddSkillButton />
    </>
  );
};

export default SkillsHeader;
