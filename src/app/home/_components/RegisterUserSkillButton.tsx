"use client";

import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { RegisterUserSkillDialog } from "./RegisterUserSkillDialog";

export const RegisterUserSkillButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} colorScheme="blue">
        スキルを登録
      </Button>
      <RegisterUserSkillDialog
        open={open}
        onOpenChange={(details) => setOpen(details.open)}
      />
    </>
  );
};
