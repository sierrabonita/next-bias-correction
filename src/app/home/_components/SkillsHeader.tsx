import { Heading } from "@chakra-ui/react";
import { CreateSkillButton } from "@/app/home/_components/CreateSkillButton";

const SkillsHeader = () => {
  return (
    <>
      <Heading as="h1" size="lg">
        Skills
      </Heading>
      <CreateSkillButton />
    </>
  );
};

export default SkillsHeader;
