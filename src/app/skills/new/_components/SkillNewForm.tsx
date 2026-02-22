"use client";

import { Box } from "@chakra-ui/layout";
import {
  Alert,
  Button,
  Field,
  Heading,
  HStack,
  Input,
  NativeSelect,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const skillFormSchema = z.object({
  name: z
    .string()
    .min(1, "スキル名を入力してください")
    .max(50, "スキル名は50文字以内で入力してください"),
  level: z
    .string()
    .min(1, "レベルを選択してください")
    .refine((val) => ["beginner", "intermediate", "advanced"].includes(val)),
  description: z
    .string()
    .max(500, "説明は500文字以内で入力してください")
    .optional()
    .or(z.literal("")),
});

type SkillFormValues = z.infer<typeof skillFormSchema>;

export const SkillNewForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: "",
      level: "intermediate",
      description: "",
    },
  });

  const onSubmit = async (values: SkillFormValues) => {
    setServerError(null);

    try {
      const res = await fetch("/api/skils", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        let message = "スキルの保存に失敗しました。";

        try {
          const data = await res.json();
          if (typeof data?.message === "string") {
            message = data.message;
          }
        } catch {
          console.error;
        }
        throw new Error(message);
      }

      router.push("/skills");
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("スキルの保存に失敗しました。");
      }
    }
  };

  const handleCancel = () => router.push("/skills");

  return (
    <Box maxW="lg" mx="auto" px={8} py={6}>
      <Heading as="h1" size="lg" mb={6}>
        スキルを追加
      </Heading>
      {serverError && (
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Description>{serverError}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        borderWidth="1px"
        borderRadius="md"
        p={6}
      >
        <VStack gap={4} align="stretch">
          <Field.Root invalid={!!errors.name}>
            <Field.Label>スキル名</Field.Label>
            <Input {...register("name")} />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.level}>
            <Field.Label>レベル</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field {...register("level")}>
                <option value="beginner">初級</option>
                <option value="intermediate">中級</option>
                <option value="advanced">上級</option>
              </NativeSelect.Field>
            </NativeSelect.Root>
            <Field.ErrorText>{errors.level?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.description}>
            <Field.Label>説明</Field.Label>
            <Textarea
              {...register("description")}
              placeholder="スキルの利用経験や学習予定などを記載できます（任意）"
              rows={4}
            />
            <Field.ErrorText>{errors.level?.message}</Field.ErrorText>
          </Field.Root>

          <HStack>
            <Button variant="ghost" onClick={handleCancel}>
              キャンセル
            </Button>
            <Button colorScheme="blue" type="submit" loading={isSubmitting}>
              保存
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};
