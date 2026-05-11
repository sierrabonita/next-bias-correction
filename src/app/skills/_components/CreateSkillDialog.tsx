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
import { createSkillAction } from "@/actions/skillAction";
import { type CreateSkillDto, skillSchema } from "@/schemas/skillSchema";

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

export const CreateSkillDialog = ({ open, onOpenChange }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateSkillDto>({
    resolver: zodResolver(skillSchema),
    defaultValues: { name: "", rating: 3, layer: "" },
  });

  const onSubmit = async (data: CreateSkillDto) => {
    await createSkillAction(data);

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

                <Field.Root invalid={!!errors.layer}>
                  <Field.Label>カテゴリ</Field.Label>
                  <Controller
                    control={control}
                    name="layer"
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
                  <Field.ErrorText>{errors.layer?.message}</Field.ErrorText>
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
