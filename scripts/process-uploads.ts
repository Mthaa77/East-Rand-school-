/**
 * Processes the school-supplied uploads into web-ready assets.
 *  - Crest logo: trimmed + square circular badge + high-res trimmed plate
 *  - Real photos: re-encoded (mozjpeg, progressive) into public/images/real/
 *  - Brand icons are regenerated afterwards by scripts/make-icons.ts
 * Run: bun run scripts/process-uploads.ts
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const UPLOAD = join(ROOT, "upload");
const IMG = join(ROOT, "public", "images");
const REAL = join(IMG, "real");

mkdirSync(REAL, { recursive: true });

async function crest() {
  const src = join(UPLOAD, "Upgrade_and_enhance_logo_2K_202609062108.jpeg");

  // 1. Trim the textured cream margin away.
  const trimmed = sharp(src).trim({ threshold: 30 });
  const buf = await trimmed.toBuffer();
  const meta = await sharp(buf).metadata();
  console.log("crest trimmed:", meta.width, "x", meta.height);

  // 2. Full trimmed plate — used for large editorial display.
  await sharp(buf)
    .resize({ width: 1100, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(join(IMG, "crest.png"));

  // 3. Square crop anchored top-centre — captures the shield + crest top.
  const size = Math.min(meta.width ?? 0, meta.height ?? 0);
  const left = Math.round(((meta.width ?? size) - size) / 2);
  const square = await sharp(buf)
    .extract({ left, top: 0, width: size, height: size })
    .resize(512, 512)
    .png()
    .toBuffer();

  // 4. Circular-masked badge for navbar/footer/icons.
  const mask = Buffer.from(
    `<svg width="512" height="512"><circle cx="256" cy="256" r="254" fill="#fff"/></svg>`
  );
  await sharp(square)
    .composite([{ input: mask, blend: "dest-in" }])
    .png({ compressionLevel: 9 })
    .toFile(join(IMG, "crest-circle.png"));

  console.log("crest assets written");
}

const photos: Array<[string, string]> = [
  ["images (21).jpeg", "brand-banner.jpg"],
  ["images (19).jpeg", "learners-entrance.jpg"],
  ["images (18).jpeg", "learners-stairs.jpg"],
  ["images (17).jpeg", "choir-principal.jpg"],
  ["ersasanitarypads_77281.jpg", "care-drive.jpg"],
];

async function photosProcess() {
  for (const [from, to] of photos) {
    await sharp(join(UPLOAD, from))
      .jpeg({ quality: 84, progressive: true, mozjpeg: true })
      .toFile(join(REAL, to));
    const m = await sharp(join(REAL, to)).metadata();
    console.log("real:", to, m.width + "x" + m.height);
  }
}

await crest();
await photosProcess();
console.log("done");
