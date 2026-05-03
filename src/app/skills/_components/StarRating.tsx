import { HStack } from "@chakra-ui/react";
import IconStar from "@/app/ui/icons/IconStar";

type Props = {
  rating: number;
  size: "xs" | "sm" | "md" | "lg" | "xl";
};

const StarRating = (props: Props) => {
  const { rating, size } = props;

  return (
    <HStack gap={0}>
      {[...Array(5)].map((_, i) => (
        <IconStar key={`star-%{i}`} filled={i < rating} size={size} />
      ))}
    </HStack>
  );
};
export default StarRating;
``;
