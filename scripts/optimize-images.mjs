import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC_IMAGES = path.join(ROOT, "src/assets/mqi-images");
const OUT_DIR = path.join(ROOT, "public/images/mqi");
const MAX_WIDTH = 1280;
const QUALITY = 82;

async function optimizeJpg(inputPath, baseName) {
  const outWebp = path.join(OUT_DIR, `${baseName}.webp`);
  await sharp(inputPath)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outWebp);
  const stats = fs.statSync(outWebp);
  console.log(`  ${baseName}.webp (${Math.round(stats.size / 1024)} KB)`);
  return `/images/mqi/${baseName}.webp`;
}

async function optimizeQuran() {
  const input = path.join(ROOT, "src/assets/quran.png");
  const outDir = path.join(ROOT, "public/images");
  fs.mkdirSync(outDir, { recursive: true });

  const outWebp = path.join(outDir, "quran-hero.webp");
  await sharp(input)
    .resize({ width: 720, withoutEnlargement: true })
    .webp({ quality: 85, alphaQuality: 90 })
    .toFile(outWebp);

  const outPng = path.join(outDir, "quran-hero.png");
  await sharp(input)
    .resize({ width: 720, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toFile(outPng);

  console.log(`quran-hero.webp (${Math.round(fs.statSync(outWebp).size / 1024)} KB)`);
  console.log(`quran-hero.png (${Math.round(fs.statSync(outPng).size / 1024)} KB)`);
}

async function optimizeGrain() {
  const input = path.join(ROOT, "src/assets/grain.jpg");
  const out = path.join(ROOT, "public/images/grain.webp");
  await sharp(input).webp({ quality: 60 }).toFile(out);
  console.log(`grain.webp (${Math.round(fs.statSync(out).size / 1024)} KB)`);
}

async function optimizeArabicSvg() {
  const input = path.join(ROOT, "src/assets/arabic.svg");
  const outDir = path.join(ROOT, "public/images");
  fs.mkdirSync(outDir, { recursive: true });
  fs.copyFileSync(input, path.join(outDir, "arabic.svg"));
  console.log("arabic.svg copied to public/images/");
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = fs.readdirSync(SRC_IMAGES).filter((f) => /\.(jpe?g|png)$/i.test(f));
  console.log(`Optimizing ${files.length} camera images...`);
  const mapping = {};

  for (const file of files) {
    const baseName = path.parse(file).name;
    const url = await optimizeJpg(path.join(SRC_IMAGES, file), baseName);
    mapping[file] = url;
  }

  console.log("Optimizing hero Quran image...");
  await optimizeQuran();

  console.log("Optimizing grain texture...");
  await optimizeGrain();

  await optimizeArabicSvg();

  fs.writeFileSync(path.join(ROOT, "public/images/mqi-mapping.json"), JSON.stringify(mapping, null, 2));
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
