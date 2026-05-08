"use client";

import { motion } from "framer-motion";

export type PortfolioEmbedBlockProps =
  | {
      kind: "soundcloud";
      title: string;
      embedUrl: string;
    }
  | {
      kind: "iframe";
      title: string;
      src: string;
      height?: number;
    }
  | {
      kind: "pdf";
      title: string;
      src: string;
    };

export function PortfolioEmbedBlock(props: PortfolioEmbedBlockProps) {
  const frameHeight =
    props.kind === "iframe"
      ? (props.height ?? 400)
      : props.kind === "soundcloud"
        ? 160
        : undefined;

  return (
    <motion.figure
      className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 shadow-lg shadow-violet-950/10"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <figcaption className="border-b border-zinc-800 px-4 py-3 text-sm font-medium text-zinc-200">
        {props.title}
      </figcaption>
      {props.kind === "pdf" ? (
        <iframe
          title={`PDF: ${props.title}`}
          src={`${props.src}#view=FitH`}
          className="h-[min(70vh,36rem)] w-full border-0 bg-zinc-900"
        />
      ) : (
        <iframe
          title={
            props.kind === "soundcloud"
              ? `SoundCloud: ${props.title}`
              : props.title
          }
          className="w-full border-0 bg-zinc-900"
          style={
            frameHeight !== undefined ? { height: frameHeight } : undefined
          }
          allow={props.kind === "soundcloud" ? "autoplay" : undefined}
          src={props.kind === "soundcloud" ? props.embedUrl : props.src}
        />
      )}
    </motion.figure>
  );
}
