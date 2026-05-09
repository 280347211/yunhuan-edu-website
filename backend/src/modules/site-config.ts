import { Router } from "express";
import { prisma } from "../config/db.js";

export const siteConfigRouter = Router();

// GET all config
siteConfigRouter.get("/", async (_req, res) => {
  const configs = await prisma.siteConfig.findMany();
  const result: Record<string, string> = {};
  configs.forEach((c) => (result[c.key] = c.value));
  res.json(result);
});

// GET single config
siteConfigRouter.get("/:key", async (req, res) => {
  const config = await prisma.siteConfig.findUnique({ where: { key: req.params.key } });
  if (!config) return res.status(404).json({ error: "Config not found" });
  res.json(config);
});

// PUT update config (upsert)
siteConfigRouter.put("/:key", async (req, res) => {
  const { value } = req.body;
  const config = await prisma.siteConfig.upsert({
    where: { key: req.params.key },
    update: { value },
    create: { key: req.params.key, value },
  });
  res.json(config);
});

// POST batch update configs
siteConfigRouter.post("/batch", async (req, res) => {
  const { configs } = req.body as { configs: Record<string, string> };
  const operations = Object.entries(configs).map(([key, value]) =>
    prisma.siteConfig.upsert({ where: { key }, update: { value }, create: { key, value } })
  );
  await Promise.all(operations);
  res.json({ success: true });
});
