import { Flex, Stack, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import Pagination from "@/components/Pagination";
import { authOptions } from "@/lib/auth";
import { getUserSkillsByIdService } from "@/services/userSkillService";
import type { UserSkill } from "@/types/userSkill";
import UserSkillContent from "./_components/UserSkillContent";
import SkillsHeader from "./_components/UserSkillHeader";

export const metadata: Metadata = {
  title: "Home | SkillTracker",
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
const HomePage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  // 手動入力対策: page指定が複数の場合は最初の値だけを採用する
  const pageParam = Array.isArray(params.page) ? params.page[0] : params.page;

  let pageNum = 1;

  if (pageParam) {
    pageNum = parseInt(pageParam, 10);

    // 文字列("abc")や、0、マイナス値が入力された場合は即座にリダイレクト
    if (Number.isNaN(pageNum) || pageNum < 1) {
      redirect("/home?page=1");
    }
  }

  const session = await getServerSession(authOptions);
  const id = session?.user?.id;

  let userSkill: UserSkill | null = null;

  if (id) {
    userSkill = await getUserSkillsByIdService(id, pageNum.toString());
  }

  // 手動入力対策: 最後のページを超えた場合（オーバーフロー）の対策
  if (userSkill?.meta) {
    if (pageNum > userSkill.meta.last && userSkill.meta.last > 0) {
      redirect(`/home?page=${userSkill.meta.last}`);
    }
  }

  return (
    <>
      <Flex justify="space-between" align="center" mb={6}>
        <SkillsHeader />
      </Flex>
      <Stack gap={4}>
        {userSkill ? (
          <>
            <UserSkillContent userSkill={userSkill} />
            <Pagination meta={userSkill.meta} />
          </>
        ) : (
          <Text>{"データがありません"}</Text>
        )}
      </Stack>
    </>
  );
};

export default HomePage;
