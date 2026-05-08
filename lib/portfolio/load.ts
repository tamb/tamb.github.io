import fs from "node:fs";
import path from "node:path";
import type { GalleryItem } from "@/lib/site-content";
import {
  imageManifestToGalleryItem,
  type ParsedIframeManifest,
  type ParsedPdfManifest,
  type ParsedPortfolioManifest,
  type ParsedSoundcloudManifest,
  parsePortfolioManifest,
} from "./manifest";

export type PortfolioSection = "drawings" | "photography" | "music";

function portfolioRoot(): string {
  return path.join(
    /* turbopackIgnore: true */
    process.cwd(),
    "public",
    "content",
    "portfolio",
  );
}

function sectionDir(section: PortfolioSection): string {
  return path.join(portfolioRoot(), section);
}

const MEDIA_RE = /^media\./i;

function listItemDirs(section: PortfolioSection): string[] {
  const base = sectionDir(section);
  if (!fs.existsSync(base)) return [];
  const names = fs.readdirSync(base, { withFileTypes: true });
  return names
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function readManifestFile(dir: string): ParsedPortfolioManifest {
  const manifestPath = path.join(dir, "manifest.json");
  const raw = fs.readFileSync(manifestPath, "utf8");
  const data: unknown = JSON.parse(raw);
  return parsePortfolioManifest(data);
}

function findMediaFilename(itemDir: string): string | null {
  const files = fs.readdirSync(itemDir);
  const hit = files.find((f) => MEDIA_RE.test(f) && f !== "manifest.json");
  return hit ?? null;
}

type GallerySourceRow = GalleryItem & { order: number; folder: string };

function sortByOrderAndFolder<T extends { order: number; folder: string }>(
  items: T[],
): T[] {
  return [...items].sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.folder.localeCompare(b.folder, undefined, { numeric: true });
  });
}

function publicPathForItem(section: PortfolioSection, folder: string): string {
  return `/content/portfolio/${section}/${folder}`;
}

/**
 * Loads image-type items for a gallery section (drawings or photography).
 * Each folder under `public/content/portfolio/<section>/` should contain
 * `manifest.json` with `type: "image"` and a `media.*` file.
 */
export function loadGallerySection(section: PortfolioSection): GalleryItem[] {
  const base = sectionDir(section);
  const folders = listItemDirs(section);
  const collected: GallerySourceRow[] = [];

  for (const folder of folders) {
    const itemDir = path.join(base, folder);
    let manifest: ParsedPortfolioManifest;
    try {
      manifest = readManifestFile(itemDir);
    } catch {
      continue;
    }
    if (manifest.type !== "image") continue;

    const mediaName = findMediaFilename(itemDir);
    if (!mediaName) {
      throw new Error(
        `Gallery item "${section}/${folder}" is type image but has no media.* file`,
      );
    }

    const publicBase = publicPathForItem(section, folder);
    const gi = imageManifestToGalleryItem(publicBase, mediaName, manifest);
    collected.push({
      ...gi,
      folder,
      order: manifest.order ?? Number.MAX_SAFE_INTEGER,
    });
  }

  return sortByOrderAndFolder(collected).map(
    (row): GalleryItem => ({
      src: row.src,
      alt: row.alt,
      caption: row.caption,
    }),
  );
}

export type MusicEmbedItem =
  | { kind: "soundcloud"; slug: string; title: string; embedUrl: string }
  | {
      kind: "iframe";
      slug: string;
      title: string;
      src: string;
      height?: number;
    }
  | {
      kind: "pdf";
      slug: string;
      title: string;
      /** URL under /content/... */
      src: string;
    };

type MusicSourceRow = MusicEmbedItem & { order: number; folder: string };

function toMusicEmbed(
  folder: string,
  m: ParsedSoundcloudManifest,
): MusicEmbedItem {
  return {
    kind: "soundcloud",
    slug: folder,
    title: m.title,
    embedUrl: m.embedUrl,
  };
}

function toIframeEmbed(
  folder: string,
  m: ParsedIframeManifest,
): MusicEmbedItem {
  return {
    kind: "iframe",
    slug: folder,
    title: m.title,
    src: m.src,
    height: m.height,
  };
}

function toPdfEmbed(
  section: PortfolioSection,
  folder: string,
  m: ParsedPdfManifest,
  itemDir: string,
): MusicEmbedItem {
  const name = m.filename ?? findMediaFilename(itemDir);
  const lower = name?.toLowerCase();
  if (!lower?.endsWith(".pdf")) {
    throw new Error(
      `Portfolio "${section}/${folder}" (pdf) needs media.pdf or a ".pdf" filename in manifest`,
    );
  }
  const abs = path.join(itemDir, name);
  if (!fs.existsSync(abs)) {
    throw new Error(
      `Portfolio "${section}/${folder}" (pdf): missing file "${name}"`,
    );
  }
  const src = `${publicPathForItem(section, folder)}/${name}`;
  return { kind: "pdf", slug: folder, title: m.title, src };
}

/**
 * Loads embed-capable items from `public/content/portfolio/music/`.
 * Supports soundcloud, iframe, and pdf manifests (pdf is rare here but matches the shared model).
 */
export function loadMusicEmbeds(): MusicEmbedItem[] {
  const section: PortfolioSection = "music";
  const base = sectionDir(section);
  const folders = listItemDirs(section);
  const collected: MusicSourceRow[] = [];

  for (const folder of folders) {
    const itemDir = path.join(base, folder);
    const manifest = readManifestFile(itemDir);
    const order = manifest.order ?? Number.MAX_SAFE_INTEGER;
    let item: MusicEmbedItem;
    if (manifest.type === "soundcloud") {
      item = toMusicEmbed(folder, manifest);
    } else if (manifest.type === "iframe") {
      item = toIframeEmbed(folder, manifest);
    } else if (manifest.type === "pdf") {
      item = toPdfEmbed(section, folder, manifest, itemDir);
    } else {
      continue;
    }
    collected.push({ ...item, order, folder });
  }

  return sortByOrderAndFolder(collected).map(
    ({ folder: _f, order: _o, ...item }): MusicEmbedItem => item,
  );
}
