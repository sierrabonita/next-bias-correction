import { Heading } from "@chakra-ui/react";
import { RegisterUserSkillButton } from "@/app/home/_components/RegisterUserSkillButton";

const SkillsHeader = () => {
  return (
    <>
      <Heading as="h1" size="lg">
        Skills
      </Heading>
      <RegisterUserSkillButton />
    </>
  );
};

export default SkillsHeader;
