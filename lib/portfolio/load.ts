import fs from "node:fs";
import path from "node:path";
import type { GalleryItem, PortfolioProjectItem } from "@/lib/site-content";
import {
  imageManifestToGalleryItem,
  type ParsedIframeManifest,
  type ParsedOpenSourceManifest,
  type ParsedPdfManifest,
  type ParsedPortfolioManifest,
  type ParsedSoftwareManifest,
  type ParsedSoundcloudManifest,
  parsePortfolioManifest,
} from "./manifest";

export type PortfolioSection =
  | "drawings"
  | "photography"
  | "music"
  | "open-source"
  | "software";

/** `00.media.png`, `01.media.jpg`, … — sorted by numeric prefix */
const NUMBERED_MEDIA_RE = /^(\d+)\.media\./i;
/** Legacy single file `media.<ext>` */
const LEGACY_MEDIA_RE = /^media\./i;

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

/**
 * Lists raster/SVG (and other non-PDF) media files for gallery or project cards.
 * Prefers `NN.media.<ext>` files sorted by `NN`; falls back to `media.<ext>`.
 */
export function listMediaFilenames(itemDir: string): string[] {
  const files = fs.readdirSync(itemDir);
  const numbered = files
    .filter((f) => NUMBERED_MEDIA_RE.test(f))
    .sort((a, b) => {
      const na = Number(/^(\d+)/.exec(a)?.[1] ?? 0);
      const nb = Number(/^(\d+)/.exec(b)?.[1] ?? 0);
      return na - nb;
    });
  if (numbered.length > 0) return numbered;
  const legacy = files.find((f) => LEGACY_MEDIA_RE.test(f));
  return legacy ? [legacy] : [];
}

function listPdfMediaFilenames(itemDir: string): string[] {
  return listMediaFilenames(itemDir).filter((f) =>
    f.toLowerCase().endsWith(".pdf"),
  );
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
 * Each folder should contain `manifest.json` with `type: "image"` and
 * `NN.media.<ext>` files (or legacy `media.<ext>`).
 */
export function loadGallerySection(
  section: "drawings" | "photography",
): GalleryItem[] {
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

    const mediaNames = listMediaFilenames(itemDir).filter(
      (f) => !f.toLowerCase().endsWith(".pdf"),
    );
    if (mediaNames.length === 0) {
      throw new Error(
        `Gallery item "${section}/${folder}" is type image but has no NN.media.<ext> or media.<ext> file`,
      );
    }

    const publicBase = publicPathForItem(section, folder);
    const gi = imageManifestToGalleryItem(publicBase, mediaNames, manifest);
    collected.push({
      ...gi,
      folder,
      order: manifest.order ?? Number.MAX_SAFE_INTEGER,
    });
  }

  return sortByOrderAndFolder(collected).map(
    (row): GalleryItem => ({
      images: row.images,
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

function resolvePdfRelativePath(
  section: PortfolioSection,
  folder: string,
  m: ParsedPdfManifest,
  itemDir: string,
): string {
  if (m.filename) {
    const abs = path.join(itemDir, m.filename);
    if (!fs.existsSync(abs)) {
      throw new Error(
        `Portfolio "${section}/${folder}" (pdf): missing file "${m.filename}"`,
      );
    }
    return m.filename;
  }
  const pdfs = listPdfMediaFilenames(itemDir);
  if (pdfs.length === 0) {
    throw new Error(
      `Portfolio "${section}/${folder}" (pdf) needs a manifest "filename" or a NN.media.pdf / media.pdf`,
    );
  }
  return pdfs[0];
}

function toPdfEmbed(
  section: PortfolioSection,
  folder: string,
  m: ParsedPdfManifest,
  itemDir: string,
): MusicEmbedItem {
  const name = resolvePdfRelativePath(section, folder, m, itemDir);
  if (!name.toLowerCase().endsWith(".pdf")) {
    throw new Error(
      `Portfolio "${section}/${folder}" (pdf): resolved file must end with .pdf`,
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

function projectManifestToItem(
  section: "open-source" | "software",
  folder: string,
  manifest: ParsedOpenSourceManifest | ParsedSoftwareManifest,
  itemDir: string,
): PortfolioProjectItem {
  const imageMedia = listMediaFilenames(itemDir).filter(
    (f) => !f.toLowerCase().endsWith(".pdf"),
  );
  if (imageMedia.length > 0) {
    const alt = manifest.alt?.trim();
    if (!alt) {
      throw new Error(
        `Portfolio "${section}/${folder}" has media files but manifest "alt" is missing or empty`,
      );
    }
  }
  const publicBase = publicPathForItem(section, folder);
  const altBase = manifest.alt ?? "";
  const images = imageMedia.map((name, i) => ({
    src: `${publicBase}/${name}`,
    alt:
      imageMedia.length > 1
        ? `${altBase} (${i + 1})`.trim() || `(${i + 1})`
        : altBase,
  }));

  return {
    folder,
    title: manifest.title,
    description: manifest.description,
    links: manifest.links,
    images,
    imageCaption: manifest.caption,
  };
}

type ProjectSourceRow = PortfolioProjectItem & { order: number };

/**
 * Loads open-source or proprietary software projects from disk.
 */
export function loadProjectSection(
  section: "open-source" | "software",
): PortfolioProjectItem[] {
  const base = sectionDir(section);
  const folders = listItemDirs(section);
  const collected: ProjectSourceRow[] = [];
  const expectedType = section === "open-source" ? "open-source" : "software";

  for (const folder of folders) {
    const itemDir = path.join(base, folder);
    let manifest: ParsedPortfolioManifest;
    try {
      manifest = readManifestFile(itemDir);
    } catch {
      continue;
    }
    if (manifest.type !== expectedType) continue;

    const item = projectManifestToItem(section, folder, manifest, itemDir);
    collected.push({
      ...item,
      order: manifest.order ?? Number.MAX_SAFE_INTEGER,
    });
  }

  return sortByOrderAndFolder(collected).map(
    ({ order: _o, ...item }): PortfolioProjectItem => item,
  );
}
