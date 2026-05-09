import { Router } from "express";
import { prisma } from "../config/db.js";

export const articleRouter = Router();

// GET all articles
articleRouter.get("/", async (req, res) => {
  const { category, published } = req.query;
  const where: Record<string, unknown> = {};
  if (category) where.category = category;
  if (published !== undefined) where.published = published === "true";

  const articles = await prisma.article.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  res.json(articles);
});

// GET single article
articleRouter.get("/:id", async (req, res) => {
  const article = await prisma.article.findUnique({ where: { id: Number(req.params.id) } });
  if (!article) return res.status(404).json({ error: "Article not found" });
  res.json(article);
});

// POST create article
articleRouter.post("/", async (req, res) => {
  const { title, content, summary, cover, category, published } = req.body;
  const article = await prisma.article.create({
    data: { title, content, summary, cover, category, published },
  });
  res.status(201).json(article);
});

// PUT update article
articleRouter.put("/:id", async (req, res) => {
  const { title, content, summary, cover, category, published } = req.body;
  const article = await prisma.article.update({
    where: { id: Number(req.params.id) },
    data: { title, content, summary, cover, category, published },
  });
  res.json(article);
});

// DELETE article
articleRouter.delete("/:id", async (req, res) => {
  await prisma.article.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
});
