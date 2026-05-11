import express from "express";
import cors from "cors";
import path from "path";
import { env } from "./config/env.js";
import { articleRouter } from "./modules/article.js";
import { productRouter } from "./modules/product.js";
import { categoryRouter } from "./modules/category.js";
import { slideRouter } from "./modules/slide.js";
import { configRouter } from "./modules/config.js";
import { imageRouter } from "./modules/image.js";

const app = express();

app.use(cors());
app.use(express.json());

// Serve old uploads (compatibility with /Uploads/ paths)
app.use("/Uploads", express.static(path.join(process.cwd(), "public/Uploads")));
app.use("/uploads", express.static(path.join(process.cwd(), env.UPLOAD_DIR)));

// API routes
app.use("/api/articles", articleRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/slides", slideRouter);
app.use("/api/config", configRouter);
app.use("/api/images", imageRouter);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});

export default app;
