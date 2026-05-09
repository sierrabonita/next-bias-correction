"use client";

import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { AddSkillDialog } from "./AddSkillDialog";

export const AddSkillButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} colorScheme="blue">
        スキルを追加
      </Button>
      <AddSkillDialog
        open={open}
        onOpenChange={(details) => setOpen(details.open)}
      />
    </>
  );
};
