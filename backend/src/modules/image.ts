import { Router } from "express";
import multer from "multer";
import path from "path";
import { env } from "../config/env.js";
import { prisma } from "../config/db.js";

export const imageRouter = Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, env.UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  },
});

// GET all images
imageRouter.get("/", async (_req, res) => {
  const images = await prisma.image.findMany({ orderBy: { createdAt: "desc" } });
  res.json(images.map((img) => ({ ...img, path: `/uploads/${img.filename}` })));
});

// POST upload image
imageRouter.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const image = await prisma.image.create({
    data: {
      filename: req.file.filename,
      original: req.file.originalname,
      path: `/uploads/${req.file.filename}`,
      alt: req.body.alt || "",
      category: req.body.category || "general",
    },
  });
  res.status(201).json({ ...image, path: `/uploads/${image.filename}` });
});

// DELETE image
imageRouter.delete("/:id", async (req, res) => {
  const img = await prisma.image.findUnique({ where: { id: Number(req.params.id) } });
  if (!img) return res.status(404).json({ error: "Image not found" });

  // Delete file from disk
  const fs = await import("fs");
  const filePath = path.join(env.UPLOAD_DIR, img.filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  await prisma.image.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
});
