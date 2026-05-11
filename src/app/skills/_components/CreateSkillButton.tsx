"use client";

import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { CreateSkillDialog } from "./CreateSkillDialog";

export const CreateSkillButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} colorScheme="blue">
        スキルを追加
      </Button>
      <CreateSkillDialog
        open={open}
        onOpenChange={(details) => setOpen(details.open)}
      />
    </>
  );
};
