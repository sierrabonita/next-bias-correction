"use client";

import { Button, HStack, Text } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { PagyMeta } from "@/types/paginateResponse";

type PaginationProps = {
  meta: PagyMeta;
};

const Pagination = ({ meta }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // if (meta.last <= 1) return null;

  // ページ変更時のURL書き換え処理
  const handlePageChange = (newPage: number) => {
    // 現在のクエリパラメータを保持したまま page だけを更新する
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("page", newPage.toString());

    // スクロール位置を一番上に戻しつつ遷移
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let start = Math.max(1, meta.page - Math.floor(maxVisiblePages / 2));
    const end = Math.min(meta.last, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <HStack gap={2} justify="center" mt={8}>
      <Text fontSize="sm" color="gray.500" mr={4}>
        全 {meta.count} 件中 {meta.from} - {meta.to} 件を表示
      </Text>

      {/* 「前へ」ボタン */}
      <Button
        size="sm"
        onClick={() => handlePageChange(meta.page - 1)}
        disabled={meta.page === 1}
      >
        前へ
      </Button>

      {/* ページ番号ボタン */}
      {getPageNumbers().map((pageNum) => (
        <Button
          key={pageNum}
          size="sm"
          colorPalette={pageNum === meta.page ? "blue" : "gray"}
          variant={pageNum === meta.page ? "solid" : "outline"}
          onClick={() => handlePageChange(pageNum)}
        >
          {pageNum}
        </Button>
      ))}

      {/* 「次へ」ボタン */}
      <Button
        size="sm"
        onClick={() => handlePageChange(meta.page + 1)}
        disabled={meta.page === meta.last}
      >
        次へ
      </Button>
    </HStack>
  );
};

export default Pagination;
