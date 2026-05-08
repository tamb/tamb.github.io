import type { GalleryItem } from "@/lib/site-content";

export type ParsedImageManifest = {
  type: "image";
  order?: number;
  alt: string;
  caption: string;
};

export type ParsedSoundcloudManifest = {
  type: "soundcloud";
  order?: number;
  title: string;
  embedUrl: string;
};

export type ParsedIframeManifest = {
  type: "iframe";
  order?: number;
  title: string;
  src: string;
  height?: number;
};

export type ParsedPdfManifest = {
  type: "pdf";
  order?: number;
  title: string;
  /** If omitted, `media.pdf` in the same folder is used. */
  filename?: string;
};

export type ParsedPortfolioManifest =
  | ParsedImageManifest
  | ParsedSoundcloudManifest
  | ParsedIframeManifest
  | ParsedPdfManifest;

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

function readOrder(rec: Record<string, unknown>): number | undefined {
  const o = rec.order;
  if (o === undefined) return undefined;
  if (typeof o === "number" && Number.isFinite(o)) return o;
  if (typeof o === "string" && o.trim() !== "") {
    const n = Number(o);
    if (Number.isFinite(n)) return n;
  }
  return undefined;
}

function parseImage(rec: Record<string, unknown>): ParsedImageManifest {
  const alt = rec.alt;
  const caption = rec.caption;
  if (typeof alt !== "string" || typeof caption !== "string") {
    throw new Error('Image manifest requires string "alt" and "caption"');
  }
  return {
    type: "image",
    order: readOrder(rec),
    alt,
    caption,
  };
}

function parseSoundcloud(
  rec: Record<string, unknown>,
): ParsedSoundcloudManifest {
  const title = rec.title;
  const embedUrl = rec.embedUrl;
  if (typeof title !== "string" || typeof embedUrl !== "string") {
    throw new Error(
      'SoundCloud manifest requires string "title" and "embedUrl"',
    );
  }
  return {
    type: "soundcloud",
    order: readOrder(rec),
    title,
    embedUrl,
  };
}

function parseIframe(rec: Record<string, unknown>): ParsedIframeManifest {
  const title = rec.title;
  const src = rec.src;
  if (typeof title !== "string" || typeof src !== "string") {
    throw new Error('iframe manifest requires string "title" and "src"');
  }
  const height = rec.height;
  let heightNum: number | undefined;
  if (height !== undefined) {
    if (typeof height === "number" && Number.isFinite(height))
      heightNum = height;
    else if (typeof height === "string" && height.trim() !== "") {
      const n = Number(height);
      if (Number.isFinite(n)) heightNum = n;
    }
  }
  return {
    type: "iframe",
    order: readOrder(rec),
    title,
    src,
    height: heightNum,
  };
}

function parsePdf(rec: Record<string, unknown>): ParsedPdfManifest {
  const title = rec.title;
  if (typeof title !== "string") {
    throw new Error('pdf manifest requires string "title"');
  }
  const filename = rec.filename;
  if (
    filename !== undefined &&
    (typeof filename !== "string" || filename.length === 0)
  ) {
    throw new Error(
      'pdf manifest "filename" must be a non-empty string if set',
    );
  }
  return {
    type: "pdf",
    order: readOrder(rec),
    title,
    filename: filename as string | undefined,
  };
}

export function parsePortfolioManifest(json: unknown): ParsedPortfolioManifest {
  if (!isRecord(json)) {
    throw new Error("Manifest must be a JSON object");
  }
  const t = json.type;
  if (t === "image") return parseImage(json);
  if (t === "soundcloud") return parseSoundcloud(json);
  if (t === "iframe") return parseIframe(json);
  if (t === "pdf") return parsePdf(json);
  throw new Error(
    `Unknown manifest type: ${String(t)}. Use image | soundcloud | iframe | pdf.`,
  );
}

export function imageManifestToGalleryItem(
  publicBasePath: string,
  mediaName: string,
  manifest: ParsedImageManifest,
): GalleryItem {
  const src = `${publicBasePath}/${mediaName}`;
  return { src, alt: manifest.alt, caption: manifest.caption };
}
