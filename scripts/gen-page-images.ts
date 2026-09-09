import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT = '/home/z/my-project/public/images';

// Page-hero images for the multipage upgrade (Task 13).
// Wide cinematic format consistent with hero.png / campus.png.
const jobs: { file: string; size: string; prompt: string }[] = [
  {
    file: 'page-about.png',
    size: '1344x768',
    prompt:
      'Cinematic wide shot backstage at a school theatre, young South African performers preparing in the wings, warm amber worklights, costumes and instrument cases along the walls, deep charcoal shadows with golden rim light, dust in the air, documentary photography, premium editorial quality, high quality, detailed',
  },
  {
    file: 'page-programmes.png',
    size: '1344x768',
    prompt:
      'Wide overhead shot of a creative studio table, saxophone and drumsticks beside sketches, paint brushes, fabric swatches and drafting tools, warm golden lamp light on dark wood, deep charcoal shadows, cinematic documentary photography, premium editorial quality, high quality, detailed',
  },
  {
    file: 'page-admissions.png',
    size: '1344x768',
    prompt:
      'Young South African learner auditioning alone on a dark theatre stage under one warm golden spotlight, silhouettes of adjudicators watching from dimmed front row, hopeful cinematic atmosphere, deep charcoal and amber tones, documentary photography, premium editorial quality, high quality, detailed',
  },
  {
    file: 'page-gallery.png',
    size: '1344x768',
    prompt:
      'Dark gallery wall hung with framed student paintings and photographs lit by small brass picture lights, polished concrete floor reflecting warm light, a young visitor silhouetted looking at art, deep charcoal and gold tones, cinematic documentary photography, premium editorial, high quality, detailed',
  },
  {
    file: 'page-news.png',
    size: '1344x768',
    prompt:
      'School auditorium stage with heavy curtain slightly open revealing warm golden light, rows of empty seats with printed event programmes left on them, atmospheric haze, deep charcoal shadows with amber glow, cinematic documentary photography, premium editorial, high quality, detailed',
  },
  {
    file: 'page-contact.png',
    size: '1344x768',
    prompt:
      'South African township school building exterior at dusk, warm light glowing in classroom windows, dramatic golden and deep blue sky, trees and a quiet street in front, a few learners walking home with instrument cases, cinematic documentary photography, premium editorial, high quality, detailed',
  },
];

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const zai = await ZAI.create();
  for (const job of jobs) {
    const outPath = path.join(OUT, job.file);
    if (fs.existsSync(outPath)) {
      console.log(`skip ${job.file}`);
      continue;
    }
    let ok = false;
    for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
      try {
        const res = await zai.images.generations.create({
          prompt: job.prompt,
          size: job.size,
        });
        const b64 = res.data[0].base64;
        fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
        console.log(`done ${job.file}`);
        ok = true;
      } catch (e) {
        console.error(`fail ${job.file} attempt ${attempt}:`, (e as Error).message);
        await new Promise((r) => setTimeout(r, 1500 * attempt));
      }
    }
  }
  console.log('ALL_DONE');
}

main();
