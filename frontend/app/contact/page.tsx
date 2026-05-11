import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";

async function getContactData() {
  let config: Record<string, string> = {};
  try {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    config = await fetch(`${API_BASE}/api/config`).then((r) => r.json());
  } catch {}
  return config;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "联系我们 - 业务咨询与商务合作",
    description: "联系云幻教育获取3D/AR/VR教育产品咨询、方案定制、技术支持等服务。服务热线：400-888-8888",
  };
}

export default async function ContactPage() {
  const config = await getContactData();
  return <ContactClient initialConfig={config} />;
}
