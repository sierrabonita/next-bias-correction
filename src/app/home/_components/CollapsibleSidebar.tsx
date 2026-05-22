"use client";

import { Flex, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { RxAvatar } from "react-icons/rx";

const ICON_SIZE = 32;
const ICON_BUTTON_SIZE = 44;
const PANE_PADDING_SCALE = 2;
const WIDE_PANE_WIDTH = 200;
const NARROW_PANE_WIDTH = ICON_BUTTON_SIZE + PANE_PADDING_SCALE * 4 * 2;

const CollapsibleSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const sidebarWidth = isOpen
    ? `${WIDE_PANE_WIDTH}px`
    : `${NARROW_PANE_WIDTH}px`;

  return (
    <Flex
      w={sidebarWidth}
      p={PANE_PADDING_SCALE}
      minH={"100vh"}
      transition="width 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
      borderRightWidth={"1px"}
      borderRightColor={"gray.300"}
    >
      <IconButton
        size={"lg"}
        variant={"outline"}
        aria-label="プロフィール"
        onClick={handleClick}
      >
        <RxAvatar
          style={{ width: `${ICON_SIZE}px`, height: `${ICON_SIZE}px` }}
        />
      </IconButton>
    </Flex>
  );
};

export default CollapsibleSidebar;
