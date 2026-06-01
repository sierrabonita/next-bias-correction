"use client";

import { Box, Button, Field, Fieldset, Input, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/lib/chakra-ui/components/ui/password-input";
import { type SignUpDto, signUpSchema } from "@/schemas/signUpSchema";

export const SignUpForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // TODO: 新規作成APIと連携
  const onSubmit = async (data: SignUpDto) => {
    console.log("送信データ:", data);

    setIsLoading(true);
    setErrorMessage("");
    setIsLoading(false);
    router.push("/home");
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root size="lg" maxW="md">
        <Fieldset.Content>
          <Field.Root invalid={!!errors.email}>
            <Field.Label>Email address</Field.Label>
            <Input type="email" bg="white" {...register("email")} />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Field.Label>Password</Field.Label>
            <PasswordInput bg="white" {...register("password")} />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.confirmPassword}>
            <Field.Label>Confirm Password</Field.Label>
            <PasswordInput bg="white" {...register("confirmPassword")} />
            <Field.ErrorText>{errors.confirmPassword?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>

        <Button
          type="submit"
          alignSelf="flex-start"
          bg="blue.500"
          color="white"
          loading={isLoading}
        >
          Sign Up
        </Button>
        {errorMessage && <Text color={"red"}>{errorMessage}</Text>}
      </Fieldset.Root>
    </Box>
  );
};
