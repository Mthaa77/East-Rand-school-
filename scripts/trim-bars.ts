/**
 * Detects and trims black letterbox bars from gallery-books.jpg (a phone
 * screenshot 540x1200 with black bars top/bottom), then saves as
 * gallery-books-trimmed.jpg. Also downweights the huge matric photo.
 */
import sharp from "sharp";

async function trimBars() {
  const src = "public/images/real/gallery-books.jpg";
  const img = sharp(src);
  const { width, height } = await img.metadata();
  if (!width || !height) throw new Error("no metadata");

  const { data, info } = await img
    .clone()
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // average brightness per row
  const rowBrightness: number[] = [];
  for (let y = 0; y < height; y++) {
    let sum = 0;
    for (let x = 0; x < width; x++) sum += data[y * width + x];
    rowBrightness.push(sum / width);
  }

  const threshold = 16; // near-black rows
  let top = 0;
  let bottom = height - 1;
  while (top < height && rowBrightness[top] < threshold) top++;
  while (bottom > top && rowBrightness[bottom] < threshold) bottom--;

  const cropHeight = bottom - top + 1;
  console.log(`source ${width}x${height}; content rows ${top}..${bottom} (h=${cropHeight})`);

  // small safety inset to avoid residual dark edges
  const inset = Math.max(2, Math.round(height * 0.004));
  const finalTop = Math.min(top + inset, height - 1);
  const finalHeight = Math.max(cropHeight - inset * 2, 100);

  await sharp(src)
    .extract({ left: 0, top: finalTop, width, height: finalHeight })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile("public/images/real/gallery-books-trimmed.jpg");

  const meta = await sharp("public/images/real/gallery-books-trimmed.jpg").metadata();
  console.log(`trimmed -> ${meta.width}x${meta.height}`);
}

trimBars().catch((e) => {
  console.error(e);
  process.exit(1);
});
