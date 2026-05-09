import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

/* ── Hero Slides (fallback, can be overridden by site config) ── */
const defaultHeroSlides = [
  { title: "科技赋能教育", subtitle: "3D/AR/VR教育产品领航者", desc: "以创新技术重塑教学体验，让抽象知识触手可及" },
  { title: "虚拟仿真实验", subtitle: "沉浸式学习新范式", desc: "覆盖物理、化学、生物全学科实验场景" },
  { title: "智慧校园方案", subtitle: "一站式教育信息化", desc: "从实验室建设到教学资源，全方位赋能学校" },
];

/* ── Products Data ── */
const products = [
  {
    icon: Monitor,
    title: "3D/AR/VR实验室",
    desc: "沉浸式虚拟实验室解决方案，支持物理、化学、生物等多学科实验操作，让实验课不再受限于设备与场地。",
    color: "#1a56db",
  },
  {
    icon: FlaskConical,
    title: "虚拟仿真实验平台",
    desc: "涵盖中考实验操作全部考点，智能评分系统实时反馈，助力学生实验满分通关。",
    color: "#3b82f6",
  },
  {
    icon: BookOpen,
    title: "教学资源服务",
    desc: "丰富的3D/AR教学课件与互动资源，与教材章节深度匹配，让课堂教学更生动高效。",
    color: "#0ea5e9",
  },
  {
    icon: GraduationCap,
    title: "智慧教育装备",
    desc: "3D互动教学一体机、AR实验台等硬件装备，软硬一体化，打造未来智慧教室。",
    color: "#6366f1",
  },
];

/* ── Stats ── */
const stats = [
  { icon: Building2, value: "5000+", label: "合作学校" },
  { icon: Users, value: "500万+", label: "服务师生" },
  { icon: Trophy, value: "100+", label: "荣誉资质" },
  { icon: Monitor, value: "200+", label: "产品专利" },
];

/* ── Cases ── */
const cases = [
  { title: "华南师范大学附属中学", region: "华南", desc: "3D虚拟实验室全覆盖" },
  { title: "北京市第四中学", region: "华北", desc: "智慧教育示范校建设" },
  { title: "成都市第七中学", region: "西南", desc: "AR实验教学创新实践" },
  { title: "长沙市雅礼中学", region: "华中", desc: "虚拟仿真实验平台部署" },
  { title: "杭州市学军中学", region: "华东", desc: "3D教学资源深度应用" },
  { title: "东北师范大学附属中学", region: "东北", desc: "智慧校园一体化方案" },
];

/* ── News (loaded from API) ── */
interface NewsItem {
  id: number;
  title: string;
  createdAt: string;
}

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [heroSlides, setHeroSlides] = useState(defaultHeroSlides);

  // Load news from API
  useEffect(() => {
    fetch("/api/articles?category=news&published=true")
      .then((r) => r.json())
      .then((data) => setNews(data.slice(0, 4)))
      .catch(() => {});
  }, []);

  // Load hero slides from site config
  useEffect(() => {
    fetch("/api/site-config")
      .then((r) => r.json())
      .then((cfg) => {
        if (cfg.hero_title_1) {
          setHeroSlides([
            { title: cfg.hero_title_1, subtitle: cfg.hero_subtitle_1 || "", desc: cfg.hero_desc_1 || "" },
            { title: cfg.hero_title_2, subtitle: cfg.hero_subtitle_2 || "", desc: cfg.hero_desc_2 || "" },
            { title: cfg.hero_title_3, subtitle: cfg.hero_subtitle_3 || "", desc: cfg.hero_desc_3 || "" },
          ]);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setCurrentSlide((p) => (p - 1 + heroSlides.length) % heroSlides.length);
  const nextSlide = () => setCurrentSlide((p) => (p + 1) % heroSlides.length);

  return (
    <main>
      {/* ═══ Hero Banner ═══ */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 hero-gradient-overlay" />
        {/* Decorative circles */}
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 left-1/6 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(96,165,250,0.3) 0%, transparent 70%)" }}
        />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {heroSlides.map((slide, idx) => (
              <div
                key={idx}
                className={`transition-all duration-700 ${
                  idx === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8 absolute"
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
                  <Button
                    asChild
                    size="lg"
                    className="text-white font-medium border-0"
                    style={{ background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)" }}
                  >
                    <Link to="/products">了解产品</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="text-white border-white/30 hover:bg-white/10 font-medium"
                  >
                    <Link to="/contact">联系我们</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Slide Controls */}
          <div className="flex items-center gap-3 mt-12">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? "w-8 bg-white" : "w-4 bg-white/30"
                }`}
              />
            ))}
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ═══ Products & Solutions ═══ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <p className="section-en">Products & Solutions</p>
            <h2 className="section-cn mt-2">产品与方案</h2>
            <div className="accent-bar mx-auto mt-4" />
          </FadeIn>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <motion.div key={p.title} variants={fadeUp}>
                <HoverLift>
                  <Card className="h-full border-[#e2e8f0] hover:border-[#3b82f6]/30 transition-all duration-300 group">
                    <CardContent className="p-7">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
                        style={{
                          background: `${p.color}10`,
                          color: p.color,
                        }}
                      >
                        <p.icon className="w-7 h-7" />
                      </div>
                      <h3 className="font-bold text-lg text-[#0f172a] mb-3">{p.title}</h3>
                      <p className="text-sm text-[#475569] leading-relaxed mb-4">{p.desc}</p>
                      <Link
                        to="/products"
                        className="inline-flex items-center gap-1 text-sm font-medium transition-colors"
                        style={{ color: p.color }}
                      >
                        了解更多
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </HoverLift>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══ About Us ═══ */}
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
                公司拥有自主知识产权的核心技术，产品覆盖物理、化学、生物等学科，已服务全国5000余所学校，累计服务师生超500万人次，是国内3D教育领域的领军企业。
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <s.icon className="w-5 h-5 text-[#1a56db]" />
                    </div>
                    <div className="text-2xl font-bold text-[#1a56db]">{s.value}</div>
                    <div className="text-xs text-[#475569] mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              <Button
                asChild
                variant="outline"
                className="mt-8 border-[#1a56db] text-[#1a56db] hover:bg-[#1a56db] hover:text-white font-medium"
              >
                <Link to="/about">了解更多</Link>
              </Button>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="relative">
                <img
                  src="/images/about-office.svg"
                  alt="云幻教育科技公司展厅，展示3D虚拟实验设备和智慧教育解决方案"
                  className="rounded-xl shadow-lg w-full object-cover"
                  style={{ aspectRatio: "4/3" }}
                />
                <div
                  className="absolute -bottom-4 -left-4 w-32 h-32 rounded-xl -z-10"
                  style={{ background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)", opacity: 0.15 }}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ Success Cases ═══ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <p className="section-en">Success Cases</p>
            <h2 className="section-cn mt-2">成功案例</h2>
            <div className="accent-bar mx-auto mt-4" />
          </FadeIn>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c) => (
              <motion.div key={c.title} variants={fadeUp}>
                <HoverLift>
                  <Card className="overflow-hidden border-[#e2e8f0] hover:border-[#3b82f6]/30 transition-all duration-300">
                    <div
                      className="h-48 flex items-end p-5"
                      style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1a56db 100%)" }}
                    >
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white mb-2">
                          {c.region}
                        </span>
                        <h3 className="text-white font-bold text-lg">{c.title}</h3>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <p className="text-[#475569] text-sm">{c.desc}</p>
                    </CardContent>
                  </Card>
                </HoverLift>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══ News ═══ */}
      <section className="py-20 lg:py-28" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)" }}>
        <div className="container mx-auto px-6 lg:px-8">
          <FadeIn className="flex items-end justify-between mb-12">
            <div>
              <p className="section-en">News</p>
              <h2 className="section-cn mt-2">新闻动态</h2>
              <div className="accent-bar mt-4" />
            </div>
          </FadeIn>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {news.map((n) => (
              <motion.div key={n.id} variants={fadeUp}>
                <HoverLift>
                  <div className="flex gap-5 p-5 bg-white rounded-xl border border-[#e2e8f0] hover:border-[#3b82f6]/30 transition-all duration-300 cursor-pointer">
                    <div className="flex flex-col items-center justify-center w-16 shrink-0 rounded-lg" style={{ background: "#eff6ff" }}>
                      <span className="text-[#1a56db] font-bold text-lg">{n.createdAt?.split("-")[2]?.slice(0,2) || ""}</span>
                      <span className="text-[#475569] text-xs">{n.createdAt ? n.createdAt.split("-").slice(0,2).join("/") : ""}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-[#0f172a] text-sm leading-relaxed line-clamp-2">
                        {n.title}
                      </h4>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#94a3b8] shrink-0 mt-1" />
                  </div>
                </HoverLift>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══ CTA Banner ═══ */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 80% 20%, rgba(59,130,246,0.3) 0%, transparent 50%)" }}
        />
        <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <h2 className="text-white text-3xl lg:text-4xl font-bold mb-4">
              开启智慧教育新时代
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              让我们一起用科技改变教育，让每一位学生都能享受优质的教学资源
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="text-[#1a56db] bg-white hover:bg-[#f0f4ff] font-medium border-0"
              >
                <Link to="/contact">预约演示</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-white border-white/30 hover:bg-white/10 font-medium"
              >
                <Link to="/products">查看方案</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
