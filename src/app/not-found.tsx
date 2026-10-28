import Link from "next/link";

import { Button } from "@/components/ui/button";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h1>
      <p className="text-muted-foreground">
        주소가 바뀌었거나 삭제된 페이지입니다.
      </p>
      <Button asChild>
        <Link href="/">처음으로</Link>
      </Button>
    </main>
  );
}
