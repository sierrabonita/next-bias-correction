import { Icon } from "@chakra-ui/react";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

type Props = {
  filled: boolean;
  size: "xs" | "sm" | "md" | "lg" | "xl";
};

const IconStar = (props: Props) => {
  const { filled, size = "md" } = props;

  return (
    <Icon size={size} color="yellow.400">
      {filled ? <IoIosStar /> : <IoIosStarOutline />}
    </Icon>
  );
};

export default IconStar;
