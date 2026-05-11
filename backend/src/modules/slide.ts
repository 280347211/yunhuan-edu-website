import { Router } from "express";
import { prisma } from "../config/db.js";

export const slideRouter = Router();

// GET slides (supports ?fid= for slide group)
slideRouter.get("/", async (req, res) => {
  const { fid } = req.query;
  const where: Record<string, unknown> = { status: 1 };
  if (fid) where.fid = Number(fid);

  const items = await prisma.dc_slide_data.findMany({
    where,
    orderBy: { listorder: "asc" },
  });
  res.json(items);
});

// GET single slide
slideRouter.get("/:id", async (req, res) => {
  const slide = await prisma.dc_slide_data.findUnique({ where: { id: Number(req.params.id) } });
  if (!slide) return res.status(404).json({ error: "Slide not found" });
  res.json(slide);
});
