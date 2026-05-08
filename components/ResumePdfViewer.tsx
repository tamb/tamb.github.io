"use client";

import { motion } from "framer-motion";
import { resumePdfPath } from "@/lib/site-content";

export function ResumePdfViewer() {
  return (
    <motion.div
      className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-50/90 shadow-xl shadow-stone-400/15 dark:border-stone-800 dark:bg-stone-900/40 dark:shadow-amber-950/10"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <iframe
        title="Resume PDF"
        src={`${resumePdfPath}#view=FitH`}
        className="h-[min(82vh,56rem)] w-full border-0 bg-stone-100 dark:bg-stone-900"
      />
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 px-4 py-3 text-sm text-stone-600 dark:border-stone-800 dark:text-stone-400">
        <p>
          File lives at{" "}
          <code className="text-stone-800 dark:text-stone-300">
            public/content/resume/resume.pdf
          </code>
        </p>
        <a
          href={resumePdfPath}
          className="font-medium text-amber-300 underline-offset-2 hover:underline"
          download
        >
          Download
        </a>
      </div>
    </motion.div>
  );
}
