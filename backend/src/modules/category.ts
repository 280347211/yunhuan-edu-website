import { Router } from "express";
import { prisma } from "../config/db.js";

export const categoryRouter = Router();

// GET categories (supports ?parentid=&ismenu=)
categoryRouter.get("/", async (req, res) => {
  const { parentid, ismenu, module } = req.query;
  const where: Record<string, unknown> = {};
  if (parentid !== undefined) where.parentid = Number(parentid);
  if (ismenu !== undefined) where.ismenu = Number(ismenu);
  if (module) where.module = String(module);

  const items = await prisma.dc_category.findMany({
    where,
    orderBy: { listorder: "asc" },
  });
  res.json(items);
});

// GET category tree (structured by parentid)
categoryRouter.get("/tree", async (_req, res) => {
  const all = await prisma.dc_category.findMany({
    orderBy: { listorder: "asc" },
  });

  // Build tree
  const map = new Map<number, typeof all[0] & { children: typeof all }>();
  all.forEach((c) => map.set(c.id, { ...c, children: [] }));

  const tree: (typeof all[0] & { children: typeof all })[] = [];
  all.forEach((c) => {
    const node = map.get(c.id)!;
    if (c.parentid === 0) {
      tree.push(node);
    } else {
      const parent = map.get(c.parentid);
      if (parent) parent.children.push(node);
    }
  });

  res.json(tree);
});

// GET single category
categoryRouter.get("/:id", async (req, res) => {
  const cat = await prisma.dc_category.findUnique({ where: { id: Number(req.params.id) } });
  if (!cat) return res.status(404).json({ error: "Category not found" });
  res.json(cat);
});
