import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const largeDir = path.join(rootDir, "public", "image", "optimized", "large");
const thumbDir = path.join(rootDir, "public", "image", "optimized", "thumb");
const outPath = path.join(rootDir, "src", "data", "gallery-images.json");
const orderPath = path.join(rootDir, "src", "data", "gallery-order.json");

const isJpg = (name) => name.toLowerCase().endsWith(".jpg");

const largeFiles = fs.existsSync(largeDir)
  ? fs.readdirSync(largeDir).filter(isJpg)
  : [];

const sortedLocale = (items) =>
  items.sort((a, b) => a.localeCompare(b, "ko", { numeric: true }));

const optimizedFiles = sortedLocale(
  largeFiles.filter((fileName) => fs.existsSync(path.join(thumbDir, fileName)))
);

const defaultOrderConfig = {
  groups: [
    { name: "studio", prefixes: ["HI"], chunkSize: 3 },
    { name: "porto", prefixes: ["DS"], chunkSize: 3 },
  ],
  appendUnmatched: true,
};

const orderConfig = fs.existsSync(orderPath)
  ? JSON.parse(fs.readFileSync(orderPath, "utf8"))
  : defaultOrderConfig;

const toPositiveInt = (value, fallback) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const groups = Array.isArray(orderConfig.groups) ? orderConfig.groups : [];

const groupItems = groups.map((group) => {
  const prefixes = Array.isArray(group.prefixes)
    ? group.prefixes
        .map((prefix) => String(prefix).toUpperCase())
        .filter(Boolean)
    : [];

  const files = optimizedFiles.filter((fileName) =>
    prefixes.some((prefix) => fileName.toUpperCase().startsWith(prefix))
  );

  const manualOrder = Array.isArray(group.manualOrder)
    ? group.manualOrder.map((name) => String(name))
    : [];
  const fileSet = new Set(files);
  const picked = new Set();
  const manualFiles = manualOrder
    .filter((name) => fileSet.has(name))
    .filter((name) => {
      if (picked.has(name)) return false;
      picked.add(name);
      return true;
    });
  const autoFiles = files.filter((name) => !picked.has(name));
  const mergedFiles = [...manualFiles, ...autoFiles];

  return {
    name: String(group.name ?? ""),
    chunkSize: toPositiveInt(group.chunkSize, 3),
    files: mergedFiles,
    cursor: 0,
  };
});

const orderedFiles = [];

while (groupItems.some((group) => group.cursor < group.files.length)) {
  for (const group of groupItems) {
    if (group.cursor >= group.files.length) {
      continue;
    }

    orderedFiles.push(...group.files.slice(group.cursor, group.cursor + group.chunkSize));
    group.cursor += group.chunkSize;
  }
}

if (orderConfig.appendUnmatched !== false) {
  const picked = new Set(orderedFiles);
  const unmatched = optimizedFiles.filter((fileName) => !picked.has(fileName));
  orderedFiles.push(...unmatched);
}

const images = orderedFiles.map((fileName, idx) => ({
    thumbSrc: `/image/optimized/thumb/${encodeURIComponent(fileName)}`,
    largeSrc: `/image/optimized/large/${encodeURIComponent(fileName)}`,
    alt: `갤러리 이미지 ${idx + 1}`,
  }));

fs.writeFileSync(outPath, `${JSON.stringify(images, null, 2)}\n`, "utf8");
console.log(`Generated ${images.length} gallery entries -> ${outPath}`);
