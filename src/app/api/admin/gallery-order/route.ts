import fs from "node:fs";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";

type OrderGroup = {
  name: string;
  prefixes: string[];
  chunkSize: number;
  manualOrder: string[];
};

type GalleryOrderConfig = {
  groups: OrderGroup[];
  appendUnmatched: boolean;
};

const defaultConfig: GalleryOrderConfig = {
  groups: [
    { name: "studio", prefixes: ["HI"], chunkSize: 3, manualOrder: [] },
    { name: "porto", prefixes: ["DS"], chunkSize: 3, manualOrder: [] },
  ],
  appendUnmatched: true,
};

const rootDir = process.cwd();
const largeDir = path.join(rootDir, "public", "image", "optimized", "large");
const orderPath = path.join(rootDir, "src", "data", "gallery-order.json");
const adminPassword = process.env.GALLERY_ADMIN_PASSWORD;

function isAuthorized(req: NextRequest) {
  if (!adminPassword) return true;
  return req.headers.get("x-gallery-admin-password") === adminPassword;
}

function readConfig(): GalleryOrderConfig {
  if (!fs.existsSync(orderPath)) {
    return defaultConfig;
  }

  const parsed = JSON.parse(fs.readFileSync(orderPath, "utf8")) as Partial<GalleryOrderConfig>;
  const groups = Array.isArray(parsed.groups)
    ? parsed.groups.map((group) => ({
        name: String(group.name ?? ""),
        prefixes: Array.isArray(group.prefixes) ? group.prefixes.map((v) => String(v).toUpperCase()) : [],
        chunkSize: Number.isInteger(group.chunkSize) && (group.chunkSize ?? 0) > 0 ? (group.chunkSize as number) : 3,
        manualOrder: Array.isArray(group.manualOrder) ? group.manualOrder.map((v) => String(v)) : [],
      }))
    : defaultConfig.groups;

  return {
    groups,
    appendUnmatched: parsed.appendUnmatched !== false,
  };
}

function readOptimizedFiles() {
  if (!fs.existsSync(largeDir)) {
    return [] as string[];
  }
  return fs
    .readdirSync(largeDir)
    .filter((name) => name.toLowerCase().endsWith(".jpg"))
    .sort((a, b) => a.localeCompare(b, "ko", { numeric: true }));
}

function buildEffectiveGroupOrders(config: GalleryOrderConfig, optimizedFiles: string[]) {
  return config.groups.map((group) => {
    const candidates = optimizedFiles.filter((fileName) =>
      group.prefixes.some((prefix) => fileName.toUpperCase().startsWith(prefix))
    );
    const candidateSet = new Set(candidates);
    const picked = new Set<string>();
    const manualOrder = group.manualOrder.filter((name) => {
      if (!candidateSet.has(name) || picked.has(name)) return false;
      picked.add(name);
      return true;
    });
    const autoOrder = candidates.filter((name) => !picked.has(name));

    return {
      ...group,
      effectiveOrder: [...manualOrder, ...autoOrder],
    };
  });
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const config = readConfig();
  const optimizedFiles = readOptimizedFiles();
  const groups = buildEffectiveGroupOrders(config, optimizedFiles);

  return NextResponse.json({
    groups,
    appendUnmatched: config.appendUnmatched,
    hasPassword: Boolean(adminPassword),
  });
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as { groups?: Array<{ name?: string; manualOrder?: string[] }> };
  const config = readConfig();
  const optimizedFiles = readOptimizedFiles();
  const updatedByName = new Map((body.groups ?? []).map((group) => [String(group.name ?? ""), group.manualOrder ?? []]));

  const nextConfig: GalleryOrderConfig = {
    ...config,
    groups: config.groups.map((group) => {
      const incoming = updatedByName.get(group.name);
      if (!incoming) return group;

      const candidates = optimizedFiles.filter((fileName) =>
        group.prefixes.some((prefix) => fileName.toUpperCase().startsWith(prefix))
      );
      const candidateSet = new Set(candidates);
      const deduped = Array.from(new Set(incoming.map((name) => String(name)))).filter((name) => candidateSet.has(name));

      return {
        ...group,
        manualOrder: deduped,
      };
    }),
  };

  fs.writeFileSync(orderPath, `${JSON.stringify(nextConfig, null, 2)}\n`, "utf8");
  const groups = buildEffectiveGroupOrders(nextConfig, optimizedFiles);

  return NextResponse.json({ ok: true, groups });
}
