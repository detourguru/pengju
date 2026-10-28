import { notFound } from "next/navigation";

import { ShareButtons } from "@/components/share-buttons";
import { createMetadata } from "@/lib/metadata";

import { getResult, results } from "./results";
import { TrackResultView } from "./track-result-view";

import type { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(results).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/result/[id]">): Promise<Metadata> {
  const { id } = await params;
  const result = getResult(id);

  if (!result) {
    return {};
  }

  return createMetadata({
    title: result.title,
    description: result.description,
    path: `/result/${id}`,
  });
}

export default async function ResultPage({
  params,
}: PageProps<"/result/[id]">) {
  const { id } = await params;
  const result = getResult(id);

  if (!result) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <TrackResultView resultId={id} />
      <p className="text-muted-foreground text-sm">나의 결과는</p>
      <h1 className="text-3xl font-bold">{result.title}</h1>
      <p>{result.description}</p>
      <div className="mt-6 w-full max-w-xs">
        <ShareButtons
          path={`/result/${id}`}
          title={result.title}
          text={result.description}
        />
      </div>
    </main>
  );
}
