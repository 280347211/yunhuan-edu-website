import express from "express";
import cors from "cors";
import path from "path";
import { env } from "./config/env.js";
import { articleRouter } from "./modules/article.js";
import { imageRouter } from "./modules/image.js";
import { siteConfigRouter } from "./modules/site-config.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), env.UPLOAD_DIR)));

// API routes
app.use("/api/articles", articleRouter);
app.use("/api/images", imageRouter);
app.use("/api/site-config", siteConfigRouter);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});

export default app;
