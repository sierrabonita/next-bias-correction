import { Box, Center, Heading, Stack } from "@chakra-ui/react";
import { LoginForm } from "@/app/_components/LoginForm";

const TopPage = () => {
  return (
    <Center minH="100vh">
      <Box
        w="full"
        maxW="md"
        bg="gray.100"
        borderWidth="1px"
        borderRadius="lg"
        p="4"
      >
        <Stack gap="4">
          <Heading fontSize="4xl" fontWeight="bold">
            Skill Tracker
          </Heading>
          <LoginForm />
        </Stack>
      </Box>
    </Center>
  );
};

export default TopPage;
