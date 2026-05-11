import type { Metadata } from "next";
import { AboutClient } from "./AboutClient";

async function getAboutData() {
  let config: Record<string, string> = {};
  try {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    config = await fetch(`${API_BASE}/api/config`).then((r) => r.json());
  } catch {}
  return config;
}

export async function generateMetadata(): Promise<Metadata> {
  const config = await getAboutData();
  return {
    title: "关于云幻 - 公司简介与文化理念",
    description: config.seo_description || "云幻教育科技股份有限公司是一家专注于3D/AR/VR教育产品研发的高新技术企业，致力于将前沿科技与教育教学深度融合。",
  };
}

export default async function AboutPage() {
  const config = await getAboutData();
  return <AboutClient initialConfig={config} />;
}
