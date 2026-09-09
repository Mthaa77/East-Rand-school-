import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT = '/home/z/my-project/public/images';

const jobs: { file: string; size: string; prompt: string }[] = [
  {
    file: 'hero.png',
    size: '1440x720',
    prompt:
      'Cinematic wide shot of a young South African dancer mid-leap on a dark theater stage, dramatic single golden spotlight beam cutting through darkness, dust particles glowing in light, deep charcoal black background, warm amber rim lighting, documentary photography style, premium editorial quality, high contrast, motion energy, high quality, detailed',
  },
  {
    file: 'disc-visual-arts.png',
    size: '864x1152',
    prompt:
      'Young African teenage artist painting on large canvas in art studio, paintbrush in hand, focused expression, warm golden window light, deep charcoal dark studio background, colorful paint splashes on apron, documentary photography, premium editorial style, cinematic, high quality, detailed',
  },
  {
    file: 'disc-design.png',
    size: '864x1152',
    prompt:
      'Young African design student sketching fashion and product designs at drafting table, warm desk lamp glow in dark studio, sketches and pencils scattered, deep charcoal shadows, golden accent lighting, documentary photography, premium editorial, cinematic mood, high quality, detailed',
  },
  {
    file: 'disc-drama.png',
    size: '864x1152',
    prompt:
      'African teenage drama student performing on stage with expressive gesture, dramatic warm spotlight from above, dark theater background, emotional theatrical moment, deep shadows, golden stage light, documentary photography, premium editorial style, cinematic, high quality, detailed',
  },
  {
    file: 'disc-dance.png',
    size: '864x1152',
    prompt:
      'Young African dancers rehearsing contemporary dance in studio, dynamic motion blur on arms, warm golden side light through window blinds, dark charcoal studio, wooden floor reflections, documentary photography, premium editorial, cinematic energy, high quality, detailed',
  },
  {
    file: 'disc-music.png',
    size: '864x1152',
    prompt:
      'Young African musician playing saxophone in dark rehearsal room, warm golden rim light, brass instrument glowing, sheet music stand, deep charcoal background with soft bokeh, documentary photography, premium editorial style, cinematic, high quality, detailed',
  },
  {
    file: 'impact.png',
    size: '1344x768',
    prompt:
      'Wide shot of youth choir and band performing on grand stage at festival, golden stage lights and warm spotlights, silhouettes of audience in foreground, dark cinematic atmosphere with amber glow, South African school arts festival, documentary photography, premium editorial, high quality, detailed',
  },
  {
    file: 'campus.png',
    size: '1344x768',
    prompt:
      'Group of joyful South African high school learners walking together outside school building, late afternoon warm golden sunlight, township school campus in Daveyton Benoni, some carrying instruments and art portfolios, authentic documentary photography, warm tones, premium editorial, high quality, detailed',
  },
  {
    file: 'gallery-singer.png',
    size: '864x1152',
    prompt:
      'Young African female singer performing into vintage microphone on dark stage, eyes closed in emotion, single warm golden spotlight, deep black background, documentary photography, premium editorial, cinematic, high quality, detailed',
  },
  {
    file: 'gallery-potter.png',
    size: '864x1152',
    prompt:
      'Close-up of young African artist hands shaping clay sculpture in dark art studio, warm golden task light, clay dust in air, deep charcoal shadows, documentary photography, premium editorial style, cinematic detail shot, high quality, detailed',
  },
  {
    file: 'gallery-ballet.png',
    size: '864x1152',
    prompt:
      'Young African ballet dancer en pointe in dramatic pose, dark studio, strong warm golden backlight creating silhouette glow, dust particles in light beam, documentary photography, premium editorial, cinematic, high quality, detailed',
  },
  {
    file: 'gallery-trumpet.png',
    size: '864x1152',
    prompt:
      'Young African trumpet player performing at night jazz event, warm golden stage light, brass trumpet gleaming, dark smoky background with bokeh lights, documentary photography, premium editorial, cinematic, high quality, detailed',
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
