"use client";

import { Box, Button, Field, Fieldset, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type Props = {
  onSubmit: () => void;
};

export const LoginForm = ({ onSubmit }: Props) => {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root size="lg" maxW="md">
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Email address</Field.Label>
            <Input type="email" bg="white" {...register("email")} />
          </Field.Root>

          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input type="password" bg="white" {...register("password")} />
          </Field.Root>
        </Fieldset.Content>

        <Fieldset.ErrorText>
          Some fields are invalid. Please check them.
        </Fieldset.ErrorText>

        <Button
          type="submit"
          alignSelf="flex-start"
          bg="blue.500"
          color="white"
        >
          Login
        </Button>
      </Fieldset.Root>
    </Box>
  );
};
