"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FadeIn, Stagger, HoverLift, fadeUp, motion } from "@/components/MotionPrimitives";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Monitor,
  FlaskConical,
  BookOpen,
  GraduationCap,
  Cpu,
  CheckCircle,
  ArrowRight,
  Layers,
  Wifi,
  Shield,
} from "lucide-react";
import api from "@/lib/api-client";

interface Product {
  id: number;
  catid: number;
  title: string;
  description: string;
  thumb: string;
  iocimg: string;
  index_content: string;
}

interface Category {
  id: number;
  catname: string;
  en_catname: string;
  children?: Category[];
}

const productCategories = [
  { id: 11, icon: Monitor, title: "3D教育资源库", desc: "丰富的3D互动课件与教学资源，与教材章节深度匹配，覆盖物理、化学、生物、科学、数学等全学科。", features: ["教材章节精准匹配", "3D互动演示模型", "多学科全覆盖", "持续更新迭代"], color: "#1a56db" },
  { id: 12, icon: FlaskConical, title: "3D教育解决方案", desc: "沉浸式虚拟实验室解决方案，打破传统实验的设备与场地限制。", features: ["3D沉浸式实验操作", "AR增强现实叠加", "VR全景实验体验", "AI智能评分系统"], color: "#3b82f6" },
  { id: 13, icon: BookOpen, title: "3D教育设备", desc: "3D互动教学一体机、AR实验台等硬件装备，软硬一体化。", features: ["3D互动教学一体机", "AR实验操作台", "智能中控系统", "一体化解决方案"], color: "#0ea5e9" },
];

const solutions = [
  { icon: Layers, title: "学科实验室建设", desc: "物理、化学、生物等学科虚拟实验室整体规划与建设" },
  { icon: Wifi, title: "智慧校园方案", desc: "校园信息化整体解决方案，实现教学管理与资源共享一体化" },
  { icon: Shield, title: "区域教育云平台", desc: "区域级教育资源平台，实现跨校资源共享与教学协同" },
];

const techAdvantages = [
  "自研3D渲染引擎，画面真实流畅",
  "AI智能评分系统，精准评估实验操作",
  "多端同步，PC/平板/VR设备无缝切换",
  "云端部署，无需本地安装维护",
  "数据安全加密，符合教育信息安全管理标准",
  "7x24小时技术支持，保障教学无忧",
];

export function ProductsClient() {
  const [activeTab, setActiveTab] = useState(11);
  const [products, setProducts] = useState<Record<number, Product[]>>({});
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.get("/categories", { params: { parentid: 2 } }).then((d) => {
      const cats = (d as unknown as Category[]).filter((c) => c.catname.includes("产品") || c.id >= 11);
      if (cats.length > 0) {
        setCategories(cats);
        setActiveTab(cats[0].id);
      }
    }).catch(() => {});

    api.get("/products").then((d) => {
      const prods = (d as unknown as Product[]) || [];
      const grouped: Record<number, Product[]> = {};
      prods.forEach((p) => {
        if (!grouped[p.catid]) grouped[p.catid] = [];
        grouped[p.catid].push(p);
      });
      setProducts(grouped);
    }).catch(() => {});
  }, []);

  const activeCat = categories.find((c) => c.id === activeTab) || productCategories.find((c) => c.id === activeTab) || productCategories[0];
  const activeProducts = products[activeTab] || [];
  const activeFallback = productCategories.find((c) => c.id === activeTab) || productCategories[0];
  const tabs = categories.length > 0 ? categories : productCategories;

  return (
    <main>
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 70% 30%, rgba(59,130,246,0.2) 0%, transparent 50%)" }} />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <FadeIn>
            <p className="text-[#93c5fd] text-sm font-medium tracking-widest uppercase mb-3">Products &amp; Solutions</p>
            <h1 className="text-white text-4xl lg:text-5xl font-bold mb-4">产品服务</h1>
            <p className="text-white/70 text-lg max-w-2xl">覆盖全学科、全场景的3D/AR/VR教育产品矩阵，一站式教育信息化解决方案</p>
          </FadeIn>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <p className="section-en">Product System</p>
            <h2 className="section-cn mt-2">产品体系</h2>
            <div className="accent-bar mx-auto mt-4" />
          </FadeIn>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {tabs.map((cat) => {
              const fallback = productCategories.find((c) => c.id === cat.id);
              const IconComp = fallback?.icon || Monitor;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === cat.id
                      ? "text-white shadow-md"
                      : "text-[#475569] bg-[#f1f5f9] hover:bg-[#e2e8f0]"
                  }`}
                  style={activeTab === cat.id ? { background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)" } : undefined}
                >
                  <IconComp className="w-4 h-4" />
                  {(cat as any).catname || (cat as any).title}
                </button>
              );
            })}
          </div>

          {/* Active Category Detail */}
          <FadeIn key={activeTab}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl font-bold text-[#0f172a] mb-4">{(activeCat as any).catname || (activeCat as any).title || activeFallback.title}</h3>
                <p className="text-[#475569] leading-relaxed mb-6">{activeFallback.desc}</p>
                <ul className="space-y-3 mb-8">
                  {activeFallback.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 shrink-0" style={{ color: activeFallback.color }} />
                      <span className="text-[#0f172a] text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="text-white font-medium border-0" style={{ background: `linear-gradient(135deg, ${activeFallback.color} 0%, #3b82f6 100%)` }}>
                  <Link href="/contact">申请试用</Link>
                </Button>
              </div>
              <div>
                {activeProducts.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {activeProducts.slice(0, 4).map((p) => (
                      <Card key={p.id} className="border-[#e2e8f0] hover:border-[#3b82f6]/30 transition-all duration-300">
                        <CardContent className="p-4">
                          {p.thumb ? (
                            <img src={p.thumb} alt={p.title} className="w-full h-32 object-cover rounded-lg mb-3" />
                          ) : (
                            <div className="w-full h-32 bg-[#f1f5f9] rounded-lg mb-3 flex items-center justify-center">
                              <Monitor className="w-8 h-8 text-[#94a3b8]" />
                            </div>
                          )}
                          <h4 className="font-medium text-sm text-[#0f172a] line-clamp-2">{p.title}</h4>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <img src="/images/product-lab.svg" alt={`${(activeCat as any).catname || (activeCat as any).title || ''}产品展示`} className="rounded-xl shadow-lg w-full object-cover" style={{ aspectRatio: "16/10" }} />
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 lg:py-28" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)" }}>
        <div className="container mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <p className="section-en">Solutions</p>
            <h2 className="section-cn mt-2">解决方案</h2>
            <div className="accent-bar mx-auto mt-4" />
          </FadeIn>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solutions.map((s) => (
              <motion.div key={s.title} variants={fadeUp}>
                <HoverLift>
                  <Card className="h-full border-[#e2e8f0] hover:border-[#3b82f6]/30 transition-all duration-300">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "#eff6ff", color: "#1a56db" }}>
                        <s.icon className="w-8 h-8" />
                      </div>
                      <h3 className="font-bold text-lg text-[#0f172a] mb-3">{s.title}</h3>
                      <p className="text-sm text-[#475569] leading-relaxed mb-5">{s.desc}</p>
                      <Link href="/contact" className="inline-flex items-center gap-1 text-sm font-medium text-[#1a56db] hover:gap-2 transition-all">
                        了解详情 <ArrowRight className="w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </HoverLift>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Tech Advantages */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <FadeIn>
              <p className="section-en">Technical Advantages</p>
              <h2 className="section-cn mt-2">技术优势</h2>
              <div className="accent-bar mt-4 mb-8" />
              <div className="grid grid-cols-1 gap-4">
                {techAdvantages.map((t, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "#eff6ff", color: "#1a56db" }}>
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span className="text-[#0f172a] text-sm leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <img src="/images/technology-core.svg" alt="云幻核心技术架构" className="rounded-xl shadow-lg w-full object-cover" style={{ aspectRatio: "4/3" }} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 20% 80%, rgba(59,130,246,0.3) 0%, transparent 50%)" }} />
        <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <h2 className="text-white text-3xl lg:text-4xl font-bold mb-4">想了解更多产品详情？</h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">我们的解决方案顾问将为您提供一对一专业咨询</p>
            <Button asChild size="lg" className="text-[#1a56db] bg-white hover:bg-[#f0f4ff] font-medium border-0">
              <Link href="/contact">立即咨询</Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
