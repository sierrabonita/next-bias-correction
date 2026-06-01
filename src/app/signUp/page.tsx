import { Box, Center, Flex, Heading, Link, Stack } from "@chakra-ui/react";
import { SignUpForm } from "@/app/signUp/_components/SignUpForm";

const SignupPage = () => {
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
            Sign Up: Skill Tracker
          </Heading>
          <SignUpForm />
          <Flex justifyContent={"right"}>
            <Link
              href="/"
              variant={"plain"}
              _hover={{ textDecoration: "none" }}
            >
              Log In?
            </Link>
          </Flex>
        </Stack>
      </Box>
    </Center>
  );
};

export default SignupPage;
