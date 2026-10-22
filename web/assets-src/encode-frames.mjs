// Encode Blender PNG renders into the WebP sets used by BottleSequence.
// Usage (from web/): node assets-src/encode-frames.mjs <dir-with-rollon_0001.png...>
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const src = process.argv[2];
if (!src) throw new Error("Pass the directory of rendered PNG frames.");

const sets = [
  { dir: "public/bottle/d", width: 864, quality: 74 },
  { dir: "public/bottle/m", width: 576, quality: 70 },
];

const files = (await readdir(src)).filter((f) => /^rollon_\d{4}\.png$/.test(f)).sort();
for (const set of sets) {
  await mkdir(set.dir, { recursive: true });
  let bytes = 0;
  for (const [i, f] of files.entries()) {
    const out = path.join(set.dir, `${String(i + 1).padStart(4, "0")}.webp`);
    const info = await sharp(path.join(src, f))
      .resize({ width: set.width })
      .webp({ quality: set.quality, effort: 6, smartSubsample: true })
      .toFile(out);
    bytes += info.size;
  }
  console.log(`${set.dir}: ${files.length} frames, ${(bytes / 1024 / 1024).toFixed(2)} MB`);
}
