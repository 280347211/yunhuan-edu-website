import { Router } from "express";
import { prisma } from "../config/db.js";

export const configRouter = Router();

// GET all config (returns key-value map using varname as key)
configRouter.get("/", async (_req, res) => {
  const configs = await prisma.dc_config.findMany();
  const result: Record<string, string> = {};
  configs.forEach((c) => {
    if (c.varname) result[c.varname] = c.value || "";
  });
  res.json(result);
});

// GET config by group
configRouter.get("/group/:groupid", async (req, res) => {
  const configs = await prisma.dc_config.findMany({
    where: { groupid: Number(req.params.groupid) },
  });
  const result: Record<string, string> = {};
  configs.forEach((c) => {
    if (c.varname) result[c.varname] = c.value || "";
  });
  res.json(result);
});

// GET single config
configRouter.get("/:varname", async (req, res) => {
  const config = await prisma.dc_config.findFirst({ where: { varname: req.params.varname } });
  if (!config) return res.status(404).json({ error: "Config not found" });
  res.json(config);
});

// PUT update config
configRouter.put("/:varname", async (req, res) => {
  const { value } = req.body;
  const existing = await prisma.dc_config.findFirst({ where: { varname: req.params.varname } });
  if (existing) {
    await prisma.dc_config.update({ where: { id: existing.id }, data: { value } });
  } else {
    await prisma.dc_config.create({ data: { varname: req.params.varname, value, info: req.params.varname, groupid: 2 } });
  }
  res.json({ success: true });
});
