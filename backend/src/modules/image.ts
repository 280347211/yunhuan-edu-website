import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { env } from "../config/env.js";

export const imageRouter = Router();

// Ensure upload directory exists
const uploadDir = path.resolve(process.cwd(), env.UPLOAD_DIR);
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
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

// GET all images (list files from upload directory)
imageRouter.get("/", async (_req, res) => {
  try {
    const files = fs.readdirSync(uploadDir);
    const images = files
      .filter((f) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f))
      .map((f, idx) => {
        const stat = fs.statSync(path.join(uploadDir, f));
        return {
          id: idx + 1,
          filename: f,
          original: f,
          path: `/uploads/${f}`,
          size: stat.size,
          createdAt: stat.mtime.toISOString(),
        };
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json(images);
  } catch {
    res.json([]);
  }
});

// POST upload image
imageRouter.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.status(201).json({
    filename: req.file.filename,
    original: req.file.originalname,
    path: `/uploads/${req.file.filename}`,
    size: req.file.size,
  });
});

// DELETE image
imageRouter.delete("/:filename", async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadDir, filename);

  // Security check: prevent directory traversal
  if (!filePath.startsWith(uploadDir)) {
    return res.status(400).json({ error: "Invalid filename" });
  }

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Image not found" });
  }
});
