import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { ResumePdfViewer } from "@/components/ResumePdfViewer";

export const metadata: Metadata = {
  title: "Resume",
  description: "Résumé / CV as an embedded PDF.",
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl flex-1 px-4 py-14 sm:py-16">
      <FadeIn className="mb-10 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
          About
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
          Resume
        </h1>
        <p className="max-w-2xl text-stone-600 dark:text-stone-400">
          Replace the bundled sample PDF with your own export. The viewer uses
          the browser PDF engine inside an iframe — no extra scripts required.
        </p>
      </FadeIn>
      <ResumePdfViewer />
    </div>
  );
}
