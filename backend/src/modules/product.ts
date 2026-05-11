import { Router } from "express";
import { prisma } from "../config/db.js";

export const productRouter = Router();

// GET products (supports ?catid=&status=)
productRouter.get("/", async (req, res) => {
  const { catid, status, keyword } = req.query;
  const where: Record<string, unknown> = {};
  if (catid) where.catid = Number(catid);
  if (status !== undefined) where.status = Number(status);
  if (keyword) where.title = { contains: String(keyword) };

  const items = await prisma.dc_product.findMany({
    where,
    orderBy: { listorder: "asc" },
  });
  res.json(items);
});

// GET single product
productRouter.get("/:id", async (req, res) => {
  const product = await prisma.dc_product.findUnique({ where: { id: Number(req.params.id) } });
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// POST create product
productRouter.post("/", async (req, res) => {
  const data = req.body;
  const now = Math.floor(Date.now() / 1000);
  const product = await prisma.dc_product.create({
    data: {
      catid: data.catid || 0,
      userid: data.userid || 1,
      username: data.username || "admin",
      title: data.title,
      keywords: data.keywords || "",
      description: data.description || "",
      content: data.content || "",
      thumb: data.thumb || "",
      iocimg: data.iocimg || "",
      status: data.status ?? 1,
      listorder: data.listorder || 0,
      createtime: now,
      updatetime: now,
      pics: data.pics || "",
      content_b: data.content_b || "",
      index_content: data.index_content || "",
      advantages: data.advantages || "",
      pronum: data.pronum || "",
    },
  });
  res.status(201).json(product);
});

// PUT update product
productRouter.put("/:id", async (req, res) => {
  const data = req.body;
  const now = Math.floor(Date.now() / 1000);
  const product = await prisma.dc_product.update({
    where: { id: Number(req.params.id) },
    data: { ...data, updatetime: now },
  });
  res.json(product);
});

// DELETE product
productRouter.delete("/:id", async (req, res) => {
  await prisma.dc_product.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
});
