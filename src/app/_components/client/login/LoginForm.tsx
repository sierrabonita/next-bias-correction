"use client";

import { Box, Button, Field, Fieldset, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import loginSchema from "@/app/schema/loginSchema";
import { PasswordInput } from "@/lib/chakra-ui/components/ui/password-input";

type Props = {
  onSubmit: () => void;
};

export const LoginForm = ({ onSubmit }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root size="lg" maxW="md">
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Email address</Field.Label>
            <Input type="email" bg="white" {...register("email")} />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root>
            <Field.Label>Password</Field.Label>
            <PasswordInput bg="white" {...register("password")} />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
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
