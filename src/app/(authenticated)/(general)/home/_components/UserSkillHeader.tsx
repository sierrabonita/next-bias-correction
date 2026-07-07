import { Heading } from "@chakra-ui/react";
import { RegisterUserSkillButton } from "@/app/(authenticated)/(general)/home/_components/RegisterUserSkillButton";

const UserSkillHeader = () => {
  return (
    <>
      <Heading as="h1" size="lg">
        My Skills
      </Heading>
      <RegisterUserSkillButton />
    </>
  );
};

export default UserSkillHeader;
