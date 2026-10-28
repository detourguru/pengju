import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex flex-1 items-center justify-center p-8">
      <LoaderCircle
        className="text-muted-foreground size-8 animate-spin"
        aria-hidden
      />
      <span className="sr-only">불러오는 중</span>
    </main>
  );
}
