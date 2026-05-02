"use client";

import { Button, Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const SkillsHeader = () => {
  const router = useRouter();

  return (
    <>
      <Heading as="h1" size="lg">
        Skills
      </Heading>
      <Button onClick={() => router.push("/skills/new/")} colorScheme="blue">
        スキルを追加
      </Button>
    </>
  );
};

export default SkillsHeader;
