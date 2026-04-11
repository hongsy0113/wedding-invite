import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const largeDir = path.join(rootDir, "public", "image", "optimized", "large");
const thumbDir = path.join(rootDir, "public", "image", "optimized", "thumb");
const outPath = path.join(rootDir, "src", "data", "gallery-images.json");

const isJpg = (name) => name.toLowerCase().endsWith(".jpg");

const largeFiles = fs.existsSync(largeDir)
  ? fs.readdirSync(largeDir).filter(isJpg)
  : [];

const images = largeFiles
  .filter((fileName) => fs.existsSync(path.join(thumbDir, fileName)))
  .sort((a, b) => a.localeCompare(b, "ko", { numeric: true }))
  .map((fileName, idx) => ({
    thumbSrc: `/image/optimized/thumb/${encodeURIComponent(fileName)}`,
    largeSrc: `/image/optimized/large/${encodeURIComponent(fileName)}`,
    alt: `갤러리 이미지 ${idx + 1}`,
  }));

fs.writeFileSync(outPath, `${JSON.stringify(images, null, 2)}\n`, "utf8");
console.log(`Generated ${images.length} gallery entries -> ${outPath}`);
