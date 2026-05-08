"use client";

import { motion } from "framer-motion";
import { resumePdfPath } from "@/lib/site-content";

export function ResumePdfViewer() {
  return (
    <motion.div
      className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 shadow-xl shadow-violet-950/10"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <iframe
        title="Resume PDF"
        src={`${resumePdfPath}#view=FitH`}
        className="h-[min(82vh,56rem)] w-full border-0 bg-zinc-900"
      />
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800 px-4 py-3 text-sm text-zinc-400">
        <p>
          File lives at{" "}
          <code className="text-zinc-300">
            public/content/resume/resume.pdf
          </code>
        </p>
        <a
          href={resumePdfPath}
          className="font-medium text-violet-300 underline-offset-2 hover:underline"
          download
        >
          Download
        </a>
      </div>
    </motion.div>
  );
}
