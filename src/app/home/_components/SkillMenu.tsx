"use client";

import { Menu, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { deleteUserSkillAction } from "@/actions/userSkillAction";
import { DeleteUserSkillConfirmDialog } from "@/app/home/_components/DeleteUserSkillConfirmDialog";

type Props = {
  userSkillId: string;
};

export const SkillMenu = (props: Props) => {
  const { userSkillId } = props;

  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const deleteUserSkill = async () => {
    await deleteUserSkillAction(userSkillId);
    closeDialog();
  };

  return (
    <>
      <Menu.Root open={menuOpen} onOpenChange={(e) => setMenuOpen(e.open)}>
        <Menu.Trigger asChild>
          <RxHamburgerMenu />
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item
                onClick={openDialog}
                value="delete"
                _hover={{ bg: "bg.error", color: "fg.error" }}
              >
                削除
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
      <DeleteUserSkillConfirmDialog
        open={dialogOpen}
        onOpenChange={(e) => setDialogOpen(e.open)}
        onDelete={deleteUserSkill}
      />
    </>
  );
};
