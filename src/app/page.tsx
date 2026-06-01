import { Box, Center, Flex, Heading, Link, Stack } from "@chakra-ui/react";
import { LogInForm } from "@/app/_components/LogInForm";

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
          <LogInForm />

          <Flex justifyContent={"right"}>
            <Link
              href="/signUp/"
              variant={"plain"}
              _hover={{ textDecoration: "none" }}
            >
              Sign Up?
            </Link>
          </Flex>
        </Stack>
      </Box>
    </Center>
  );
};

export default TopPage;
