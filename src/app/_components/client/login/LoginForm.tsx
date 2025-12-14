"use client";

import { Button, Field, Fieldset, Input } from "@chakra-ui/react";

export const LoginForm = () => {
  return (
    <Fieldset.Root size="lg" maxW="md">
      <Fieldset.Content>
        <Field.Root>
          <Field.Label>Email address</Field.Label>
          <Input name="email" type="email" bg="white" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Password</Field.Label>
          <Input name="password" type="password" bg="white" />
        </Field.Root>
      </Fieldset.Content>

      <Fieldset.ErrorText>
        Some fields are invalid. Please check them.
      </Fieldset.ErrorText>

      <Button type="submit" alignSelf="flex-start" bg="blue.500" color="white">
        Login
      </Button>
    </Fieldset.Root>
  );
};
