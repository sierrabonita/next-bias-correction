"use client";

import {
  Button,
  createListCollection,
  DialogActionTrigger,
  DialogBackdrop,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Field,
  Input,
  Portal,
  RatingGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// TODO: 外部ファイル化
const skillSchema = z.object({
  name: z
    .string()
    .min(1, "名前を入力してください")
    .max(20, "20文字以内で入力してください"),
  rating: z.number().min(1).max(5),
  category: z.string().min(1, "カテゴリを選択してください"),
  description: z
    .string()
    .max(100, "説明は100文字以内で入力してください")
    .optional()
    .or(z.literal("")),
});

type SkillFormValues = z.infer<typeof skillSchema>;

// TODO: 外部ファイル化
const categories = createListCollection({
  items: [
    { label: "Frontend", value: "frontend" },
    { label: "NativeApp", value: "nativeApp" },
    { label: "Backend", value: "backend" },
    { label: "Infrastructure", value: "infrastructure" },
    { label: "Other", value: "other" },
  ],
});

type Props = {
  open: boolean;
  onOpenChange: (details: { open: boolean }) => void;
};

export const AddSkillDialog = ({ open, onOpenChange }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: { name: "", rating: 3, category: "" },
  });

  const onSubmit = async (data: SkillFormValues) => {
    console.log("バリデーション済みデータ:", data);
    // await createSkill(data);

    onOpenChange({ open: false });
    // 送信後にフォームをクリア
    reset();
  };

  return (
    <DialogRoot open={open} onOpenChange={onOpenChange} placement="center">
      <DialogBackdrop />
      <Portal>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>新規スキル登録</DialogTitle>
            </DialogHeader>

            <DialogBody>
              <Stack gap="5">
                <Field.Root invalid={!!errors.name}>
                  <Field.Label>スキル名</Field.Label>
                  <Input {...register("name")} placeholder="例: Next.js" />
                  <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.rating}>
                  <Field.Label>5段階評価</Field.Label>
                  <Controller
                    control={control}
                    name="rating"
                    render={({ field }) => (
                      <RatingGroup.Root
                        value={field.value}
                        onValueChange={(e) => field.onChange(e.value)}
                        count={5}
                      >
                        <RatingGroup.HiddenInput />
                        <RatingGroup.Control />
                      </RatingGroup.Root>
                    )}
                  />
                </Field.Root>

                <Field.Root invalid={!!errors.category}>
                  <Field.Label>カテゴリ</Field.Label>
                  <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <Select.Root
                        name={field.name}
                        value={[field.value]}
                        onValueChange={(e) => field.onChange(e.value[0])}
                        collection={categories}
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="カテゴリを選択" />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                          <Select.Positioner>
                            <Select.Content>
                              {categories.items.map((category) => (
                                <Select.Item
                                  item={category}
                                  key={category.value}
                                >
                                  {category.label}
                                  <Select.ItemIndicator />
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Portal>
                      </Select.Root>
                    )}
                  />
                  <Field.ErrorText>{errors.category?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.name}>
                  <Field.Label>説明</Field.Label>
                  <Input
                    {...register("description")}
                    placeholder="例: Vite, Next.js, ReactNativeの実装基盤"
                  />
                  <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                </Field.Root>
              </Stack>
            </DialogBody>

            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline">キャンセル</Button>
              </DialogActionTrigger>
              <Button type="submit" loading={isSubmitting} colorPalette="blue">
                保存
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Portal>
    </DialogRoot>
  );
};
