"use client";

import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

type Props = {
  open: boolean;
  onOpenChange: (event: { open: boolean }) => void;
  onDelete: () => void;
};

export const DeleteUserSkillConfirmDialog = (props: Props) => {
  const { open, onOpenChange, onDelete } = props;
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} role="alertdialog">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>削除の確認</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              このアイテムを削除してもよろしいですか？この操作は取り消せません。
            </Dialog.Body>

            <Dialog.Footer gap={3}>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">キャンセル</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={() => onDelete()}>
                削除する
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild position="absolute" top={2} right={2}>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
