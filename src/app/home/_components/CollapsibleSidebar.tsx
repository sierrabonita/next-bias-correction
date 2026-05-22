"use client";

import { Box, Flex, HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { RxAvatar } from "react-icons/rx";

const ICON_SIZE = 32;
const ICON_BUTTON_SIZE = 44;
const PANE_PADDING_SCALE = 2;
const PANE_BORDER_WIDTH = 1;
const WIDE_PANE_WIDTH = 200;
const NARROW_PANE_WIDTH = ICON_BUTTON_SIZE + PANE_PADDING_SCALE * 4 * 2;
const TRANSITION_BASE = "0.2s cubic-bezier(0.4, 0, 0.2, 1)";

const CollapsibleSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const sidebarWidth = isOpen
    ? `${WIDE_PANE_WIDTH}px`
    : `${NARROW_PANE_WIDTH}px`;

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
          <Box
            display="grid"
            gridTemplateColumns={isOpen ? "1fr" : "0fr"}
            transition={`grid-template-columns ${TRANSITION_BASE}, opacity ${TRANSITION_BASE}`}
          >
            <Text overflow={"hidden"} textWrap={"nowrap"}>
              {"プロフィール"}
            </Text>
          </Box>
        </HStack>
        <Box
          display="grid"
          gridTemplateRows={isOpen ? "1fr" : "0fr"}
          transition={`grid-template-rows ${TRANSITION_BASE}`}
        >
          <Stack overflow="hidden">
            <Text>{"ログアウト"}</Text>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default CollapsibleSidebar;
