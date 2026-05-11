import { Router } from "express";
import { prisma } from "../config/db.js";

export const articleRouter = Router();

// GET articles (supports ?catid=&status=&keyword=)
articleRouter.get("/", async (req, res) => {
  const { catid, status, keyword, page = "1", pageSize = "20" } = req.query;
  const where: Record<string, unknown> = {};
  if (catid) where.catid = Number(catid);
  if (status !== undefined) where.status = Number(status);
  if (keyword) where.title = { contains: String(keyword) };

  const skip = (Number(page) - 1) * Number(pageSize);
  const [items, total] = await Promise.all([
    prisma.dc_article.findMany({
      where,
      orderBy: { listorder: "desc" },
      skip,
      take: Number(pageSize),
    }),
    prisma.dc_article.count({ where }),
  ]);

  res.json({ items, total, page: Number(page), pageSize: Number(pageSize) });
});

// GET single article
articleRouter.get("/:id", async (req, res) => {
  const article = await prisma.dc_article.findUnique({ where: { id: Number(req.params.id) } });
  if (!article) return res.status(404).json({ error: "Article not found" });
  res.json(article);
});

// POST create article
articleRouter.post("/", async (req, res) => {
  const data = req.body;
  const now = Math.floor(Date.now() / 1000);
  const article = await prisma.dc_article.create({
    data: {
      catid: data.catid || 0,
      userid: data.userid || 1,
      username: data.username || "admin",
      title: data.title,
      keywords: data.keywords || "",
      description: data.description || "",
      content: data.content || "",
      thumb: data.thumb || "",
      status: data.status ?? 1,
      listorder: data.listorder || 0,
      createtime: now,
      updatetime: now,
    },
  });
  res.status(201).json(article);
});

// PUT update article
articleRouter.put("/:id", async (req, res) => {
  const data = req.body;
  const now = Math.floor(Date.now() / 1000);
  const article = await prisma.dc_article.update({
    where: { id: Number(req.params.id) },
    data: { ...data, updatetime: now },
  });
  res.json(article);
});

// DELETE article
articleRouter.delete("/:id", async (req, res) => {
  await prisma.dc_article.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
});
