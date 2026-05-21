import { HStack } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useMemo } from "react";
import IconStar from "@/components/icons/IconStar";

type Props = {
  rating: number;
  size: "xs" | "sm" | "md" | "lg" | "xl";
};

const StarRating = (props: Props) => {
  const { rating, size } = props;

  const ratingIds = useMemo(
    () => Array.from({ length: 5 }, () => nanoid()),
    [],
  );

  return (
    <HStack gap={0}>
      {ratingIds.map((id, index) => {
        return <IconStar key={id} filled={index < rating} size={size} />;
      })}
    </HStack>
  );
};
export default StarRating;
