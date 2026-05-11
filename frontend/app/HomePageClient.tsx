"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FadeIn, Stagger, HoverLift, fadeUp, motion } from "@/components/MotionPrimitives";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Monitor,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Users,
  Trophy,
  Building2,
  ArrowRight,
} from "lucide-react";

interface Article {
  id: number;
  catid: number;
  title: string;
  description: string;
  thumb: string;
  createtime: number;
  status: number;
}

interface SlideData {
  id: number;
  title: string;
  pic: string;
  link: string;
}

interface Product {
  id: number;
  catid: number;
  title: string;
  description: string;
  thumb: string;
  iocimg: string;
  index_content: string;
}

const defaultHeroSlides = [
  { title: "科技赋能教育", subtitle: "3D/AR/VR教育产品领航者", desc: "以创新技术重塑教学体验，让抽象知识触手可及" },
  { title: "虚拟仿真实验", subtitle: "沉浸式学习新范式", desc: "覆盖物理、化学、生物全学科实验场景" },
  { title: "智慧校园方案", subtitle: "一站式教育信息化", desc: "从实验室建设到教学资源，全方位赋能学校" },
];

const productIcons = [
  { icon: Monitor, title: "3D/AR/VR实验室", color: "#1a56db" },
  { icon: FlaskConical, title: "虚拟仿真实验平台", color: "#3b82f6" },
  { icon: BookOpen, title: "3D教学资源库", color: "#0ea5e9" },
  { icon: GraduationCap, title: "智慧教育装备", color: "#6366f1" },
];

const stats = [
  { icon: Building2, value: "5000+", label: "合作学校" },
  { icon: Users, value: "500万+", label: "服务师生" },
  { icon: Trophy, value: "100+", label: "荣誉资质" },
  { icon: Monitor, value: "200+", label: "产品专利" },
];

interface HomePageClientProps {
  initialData?: {
    slides: SlideData[];
    news: Article[];
    products: Product[];
  };
}

export function HomePageClient({ initialData }: HomePageClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [news] = useState<Article[]>(initialData?.news || []);
  const [slides] = useState<SlideData[]>(initialData?.slides || []);
  const [products] = useState<any[]>(
    (initialData?.products && initialData.products.length > 0)
      ? initialData.products
      : productIcons.map((p, i) => ({ id: i, catid: 0, title: p.title, description: "", thumb: "", iocimg: "", index_content: "" }))
  );
  const [heroSlides] = useState(defaultHeroSlides);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const prevSlide = () => setCurrentSlide((p) => (p - 1 + heroSlides.length) % heroSlides.length);
  const nextSlide = () => setCurrentSlide((p) => (p + 1) % heroSlides.length);

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp * 1000);
    return d.toLocaleDateString("zh-CN");
  };

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 hero-gradient-overlay" />
        {slides.length > 0 && slides[currentSlide] && (
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-30"
            style={{ backgroundImage: `url(${slides[currentSlide].pic})` }}
          />
        )}
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)" }}
        />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {heroSlides.map((slide, idx) => (
              <div
                key={idx}
                className={`transition-all duration-700 ${
                  idx === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 absolute"
                }`}
                style={{ display: idx === currentSlide ? "block" : "none" }}
              >
                <p className="text-[#93c5fd] text-sm font-medium tracking-widest uppercase mb-4">
                  {slide.subtitle}
                </p>
                <h1 className="text-white text-4xl lg:text-6xl font-bold leading-tight mb-6">
                  {slide.title}
                </h1>
                <p className="text-white/70 text-lg mb-8 max-w-xl">{slide.desc}</p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="text-white font-medium border-0" style={{ background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)" }}>
                    <Link href="/products">了解产品</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/10 font-medium">
                    <Link href="/contact">联系我们</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-12">
            <button onClick={prevSlide} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            {heroSlides.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentSlide(idx)} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-8 bg-white" : "w-4 bg-white/30"}`} />
            ))}
            <button onClick={nextSlide} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Products & Solutions */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <p className="section-en">Products &amp; Solutions</p>
            <h2 className="section-cn mt-2">产品与方案</h2>
            <div className="accent-bar mx-auto mt-4" />
          </FadeIn>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(products.length > 0 ? products : productIcons.map((p, i) => ({ id: i, title: p.title, description: "3D教育解决方案，打破传统实验的设备与场地限制", thumb: "", iocimg: "" }))).map((p, idx) => {
              const iconInfo = productIcons[idx] || productIcons[0];
              const IconComp = iconInfo.icon;
              return (
                <motion.div key={p.id || idx} variants={fadeUp}>
                  <HoverLift>
                    <Card className="h-full border-[#e2e8f0] hover:border-[#3b82f6]/30 transition-all duration-300 group">
                      <CardContent className="p-7">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300" style={{ background: `${iconInfo.color}10`, color: iconInfo.color }}>
                          <IconComp className="w-7 h-7" />
                        </div>
                        <h3 className="font-bold text-lg text-[#0f172a] mb-3">{p.title}</h3>
                        <p className="text-sm text-[#475569] leading-relaxed mb-4 line-clamp-3">{p.description || p.index_content || "3D教育解决方案，打破传统实验的设备与场地限制"}</p>
                        <Link href="/products" className="inline-flex items-center gap-1 text-sm font-medium transition-colors" style={{ color: iconInfo.color }}>
                          了解更多 <ArrowRight className="w-4 h-4" />
                        </Link>
                      </CardContent>
                    </Card>
                  </HoverLift>
                </motion.div>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* About Us */}
      <section className="py-20 lg:py-28" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)" }}>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <FadeIn>
              <p className="section-en">About Us</p>
              <h2 className="section-cn mt-2">关于云幻教育</h2>
              <div className="accent-bar mt-4 mb-6" />
              <p className="text-[#475569] leading-relaxed mb-4">
                云幻教育科技股份有限公司是一家专注于3D/AR/VR教育产品研发的高新技术企业，致力于将前沿科技与教育教学深度融合，为全国中小学校提供优质的虚拟仿真实验解决方案。
              </p>
              <p className="text-[#475569] leading-relaxed mb-8">
                公司拥有自主知识产权的核心技术，产品覆盖物理、化学、生物等学科，已服务全国5000余所学校，是国内3D教育领域的领军企业。
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <s.icon className="w-5 h-5 text-[#1a56db] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-[#1a56db]">{s.value}</div>
                    <div className="text-xs text-[#475569] mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              <Button asChild variant="outline" className="mt-8 border-[#1a56db] text-[#1a56db] hover:bg-[#1a56db] hover:text-white font-medium">
                <Link href="/about">了解更多</Link>
              </Button>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="relative">
                <img src="/images/about-office.svg" alt="云幻教育科技公司展厅" className="rounded-xl shadow-lg w-full object-cover" style={{ aspectRatio: "4/3" }} />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-xl -z-10" style={{ background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)", opacity: 0.15 }} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <FadeIn className="flex items-end justify-between mb-12">
            <div>
              <p className="section-en">News</p>
              <h2 className="section-cn mt-2">新闻动态</h2>
              <div className="accent-bar mt-4" />
            </div>
          </FadeIn>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {news.length > 0 ? news.map((n) => (
              <motion.div key={n.id} variants={fadeUp}>
                <HoverLift>
                  <div className="flex gap-5 p-5 bg-white rounded-xl border border-[#e2e8f0] hover:border-[#3b82f6]/30 transition-all duration-300 cursor-pointer">
                    <div className="flex flex-col items-center justify-center w-16 shrink-0 rounded-lg" style={{ background: "#eff6ff" }}>
                      <span className="text-[#1a56db] font-bold text-sm">
                        {n.createtime ? new Date(n.createtime * 1000).getDate() : ""}
                      </span>
                      <span className="text-[#475569] text-xs">
                        {n.createtime ? new Date(n.createtime * 1000).getMonth() + 1 + "/" + new Date(n.createtime * 1000).getFullYear() : ""}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-[#0f172a] text-sm leading-relaxed line-clamp-2">{n.title}</h4>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#94a3b8] shrink-0 mt-1" />
                  </div>
                </HoverLift>
              </motion.div>
            )) : (
              // Fallback when no news data
              Array.from({ length: 4 }).map((_, i) => (
                <motion.div key={`fallback-${i}`} variants={fadeUp}>
                  <div className="flex gap-5 p-5 bg-white rounded-xl border border-[#e2e8f0]">
                    <div className="flex flex-col items-center justify-center w-16 shrink-0 rounded-lg" style={{ background: "#eff6ff" }}>
                      <span className="text-[#1a56db] font-bold text-sm">{15 + i}</span>
                      <span className="text-[#475569] text-xs">1/2025</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-[#0f172a] text-sm leading-relaxed">云幻教育最新动态资讯</h4>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#94a3b8] shrink-0 mt-1" />
                  </div>
                </motion.div>
              ))
            )}
          </Stagger>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 80% 20%, rgba(59,130,246,0.3) 0%, transparent 50%)" }} />
        <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <h2 className="text-white text-3xl lg:text-4xl font-bold mb-4">开启智慧教育新时代</h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">让我们一起用科技改变教育，让每一位学生都能享受优质的教学资源</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="text-[#1a56db] bg-white hover:bg-[#f0f4ff] font-medium border-0">
                <Link href="/contact">预约演示</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/10 font-medium">
                <Link href="/products">查看方案</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
