"use client";

import {
  Button,
  ButtonGroup,
  Grid,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";

const ICON_SIZE = 32;
const ICON_BUTTON_SIZE = 44;
const PANE_PADDING_SCALE = 2;
const PANE_BORDER_WIDTH = 1;
const WIDE_PANE_WIDTH = 200;
const NARROW_PANE_WIDTH = ICON_BUTTON_SIZE + PANE_PADDING_SCALE * 4 * 2;
const TRANSITION_BASE = "0.2s cubic-bezier(0.4, 0, 0.2, 1)";

const CollapsibleSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickAccept = async () => {
    try {
      setIsLoggingOut(true);

      await signOut({ callbackUrl: "/", redirect: true });
    } catch (error) {
      console.error("ログアウト中にエラーが発生しました:", error);
      setIsLoggingOut(false);
    }
  };

  const sidebarWidth = isOpen
    ? `${WIDE_PANE_WIDTH}px`
    : `${NARROW_PANE_WIDTH}px`;

  const { data: session } = useSession();
  const role = session?.user?.role;

  return (
    <Stack
      w={sidebarWidth}
      p={PANE_PADDING_SCALE}
      minH={"vh"}
      transition={`width ${TRANSITION_BASE}`}
      borderRightWidth={PANE_BORDER_WIDTH}
      borderRightColor={"gray.300"}
    >
      <Stack>
        <HStack h={`${ICON_BUTTON_SIZE}px`} overflow={"hidden"}>
          <IconButton
            size={"lg"}
            variant="plain"
            aria-label="プロフィール"
            onClick={handleClick}
          >
            <RxAvatar
              style={{ width: `${ICON_SIZE}px`, height: `${ICON_SIZE}px` }}
            />
          </IconButton>
          <Grid
            gridTemplateColumns={isOpen ? "1fr" : "0fr"}
            transition={`grid-template-columns ${TRANSITION_BASE}, opacity ${TRANSITION_BASE}`}
          >
            <Text overflow={"hidden"} textWrap={"nowrap"}>
              {"プロフィール"}
            </Text>
          </Grid>
        </HStack>
        <Grid
          gridTemplateRows={isOpen ? "1fr" : "0fr"}
          transition={`grid-template-rows ${TRANSITION_BASE}`}
        >
          <Stack overflow="hidden">
            <ButtonGroup
              orientation={"vertical"}
              align={"start"}
              size={"sm"}
              variant={"plain"}
            >
              <Button onClick={() => setIsOpenDialog(true)}>
                {"ログアウト"}
              </Button>
            </ButtonGroup>
          </Stack>
        </Grid>
        {
          role === "admin" && null
          // <ButtonGroup
          //   orientation={"vertical"}
          //   align={"start"}
          //   size={"sm"}
          //   variant={"plain"}
          // >
          //   <Button onClick={() => setIsOpenDialog(true)}>
          //     {"ログアウト"}
          //   </Button>
          // </ButtonGroup>
        }
      </Stack>
      <ConfirmDialog
        textBody={"ログアウトします。よろしいですか？"}
        textTitle={"ログアウト確認"}
        isOpen={isOpenDialog}
        isLoading={isLoggingOut}
        onOpenChange={setIsOpenDialog}
        onClickConfirm={handleClickAccept}
      />
    </Stack>
  );
};

export default CollapsibleSidebar;
