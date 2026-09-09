/**
 * Generates ERSA brand icons from the official school crest
 * (public/images/crest-circle.png, produced by scripts/process-uploads.ts).
 * Design: deep-ink rounded square, faint gold ring, crest disc at 74%.
 * Outputs: public/icons/icon-192.png, icon-512.png, apple-touch-icon.png,
 *          src/app/icon.png (favicon).
 * Run: bun run scripts/make-icons.ts
 */
import sharp from "sharp";
import { mkdirSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ROOT = process.cwd();
const CREST = join(ROOT, "public", "images", "crest-circle.png");

async function build(size: number): Promise<Buffer> {
  // Rounded-square ink canvas with a subtle gold keyline — matches the site.
  const bg = Buffer.from(
    `<svg width="${size}" height="${size}" viewBox="0 0 1024 1024">
       <defs>
         <radialGradient id="bg" cx="0.3" cy="0.22" r="1.15">
           <stop offset="0" stop-color="#26201A"/>
           <stop offset="0.6" stop-color="#1B1611"/>
           <stop offset="1" stop-color="#131010"/>
         </radialGradient>
       </defs>
       <rect width="1024" height="1024" rx="228" fill="url(#bg)"/>
       <rect x="30" y="30" width="964" height="964" rx="204" fill="none" stroke="#D4AF37" stroke-opacity="0.4" stroke-width="5"/>
     </svg>`
  );
  const crest = await sharp(CREST).resize(Math.round(size * 0.74)).png().toBuffer();
  const offset = Math.round((size - size * 0.74) / 2);
  return sharp(bg)
    .composite([{ input: crest, left: offset, top: offset }])
    .png()
    .toBuffer();
}

async function main() {
  const iconDir = join(ROOT, "public", "icons");
  mkdirSync(iconDir, { recursive: true });
  mkdirSync(dirname(join(ROOT, "src", "app", "icon.png")), { recursive: true });

  await sharp(await build(512)).toFile(join(iconDir, "icon-512.png"));
  await sharp(await build(192)).toFile(join(iconDir, "icon-192.png"));
  await sharp(await build(180)).toFile(join(iconDir, "apple-touch-icon.png"));
  copyFileSync(join(iconDir, "icon-192.png"), join(ROOT, "src", "app", "icon.png"));

  console.log("crest icons written:", iconDir, "+ src/app/icon.png");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
