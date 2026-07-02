"use client";

import {
  Button,
  createListCollection,
  Dialog,
  Field,
  Input,
  type ListCollection,
  Portal,
  RatingGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { createSkillAction, getAllSkillsAction } from "@/actions/skillAction";
import {
  type CreateSkillDto,
  type FetchSkill,
  skillSchema,
} from "@/schemas/skillSchema";

export const useAllCategories = () => {};

type Props = {
  open: boolean;
  onOpenChange: (details: { open: boolean }) => void;
};

export const RegisterUserSkillDialog = ({ open, onOpenChange }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateSkillDto>({
    resolver: zodResolver(skillSchema),
    defaultValues: { name: "", rating: 3, description: "" },
  });

  const [skillListCollection, setSkillListCollection] = useState<
    ListCollection<FetchSkill>
  >(
    createListCollection<FetchSkill>({
      items: [],
      itemToString: (item) => item.name,
      itemToValue: (item) => item.name,
    }),
  );

  const createSkillOptions = useCallback(async () => {
    try {
      const res = await getAllSkillsAction({ excludeLoginUserSkills: true });
      const skills = res.data.map((item: FetchSkill) => {
        return { name: item.name, layer: item.layer };
      });

      const collection = createListCollection<FetchSkill>({
        items: skills,
        itemToString: (item) => item.name,
        itemToValue: (item) => item.name,
      });
      setSkillListCollection(collection);
    } catch (error) {
      console.error("Data fetching error:", error);
    }
  }, []);

  useEffect(() => {
    createSkillOptions();
  }, [createSkillOptions]);

  const onSubmit = async (data: CreateSkillDto) => {
    await createSkillAction(data);

    onOpenChange({ open: false });

    // 送信後にフォームをクリア
    reset();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Dialog.Header>
                <Dialog.Title>新規スキル登録</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <Stack gap="5">
                  <Field.Root invalid={!!errors.name}>
                    <Field.Label>スキル</Field.Label>
                    <Controller
                      control={control}
                      name="name"
                      render={({ field }) => {
                        return (
                          <Select.Root
                            name={field.name}
                            value={[field.value]}
                            onValueChange={(e) => {
                              field.onChange(e.value[0]);
                              // layer をここで設定
                              const selectedItem = e.items[0];
                              if (selectedItem) {
                                setValue("layer", selectedItem.layer, {
                                  shouldValidate: true,
                                });
                              }
                            }}
                            collection={skillListCollection}
                          >
                            <Select.HiddenSelect />
                            <Select.Control>
                              <Select.Trigger>
                                <Select.ValueText placeholder="スキルを選択してください" />
                              </Select.Trigger>
                              <Select.IndicatorGroup>
                                <Select.Indicator />
                              </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                              <Select.Positioner>
                                <Select.Content>
                                  {skillListCollection.items.map((skill) => {
                                    return (
                                      <Select.Item
                                        item={skill}
                                        key={skill.name}
                                      >
                                        {skill.name}
                                        <Select.ItemIndicator />
                                      </Select.Item>
                                    );
                                  })}
                                </Select.Content>
                              </Select.Positioner>
                            </Portal>
                          </Select.Root>
                        );
                      }}
                    />
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

                  <Field.Root invalid={!!errors.name}>
                    <Field.Label>説明</Field.Label>
                    <Input
                      {...register("description")}
                      placeholder="例: Vite, Next.js, ReactNativeの実装基盤"
                    />
                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                  </Field.Root>
                </Stack>
              </Dialog.Body>

              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">キャンセル</Button>
                </Dialog.ActionTrigger>
                <Button
                  type="submit"
                  loading={isSubmitting}
                  colorPalette="blue"
                >
                  保存
                </Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
