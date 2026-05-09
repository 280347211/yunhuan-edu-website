import { FadeIn, Stagger, HoverLift, fadeUp, motion } from "@/components/MotionPrimitives";
import { Card, CardContent } from "@/components/ui/card";
import {
  Eye,
  Heart,
  Lightbulb,
  Award,
  Target,
  Users,
  Building2,
  TrendingUp,
} from "lucide-react";

const cultureValues = [
  {
    icon: Eye,
    title: "愿景",
    desc: "成为中国最值得信赖的教育科技企业，让优质教育资源触手可及",
  },
  {
    icon: Target,
    title: "使命",
    desc: "以科技创新赋能教育，帮助每一位学生实现更好的学习体验",
  },
  {
    icon: Heart,
    title: "价值观",
    desc: "以用户为中心、追求卓越、开放协作、创新进取",
  },
];

const milestones = [
  { year: "2014", title: "公司成立", desc: "云幻教育在深圳成立，专注3D教育产品研发" },
  { year: "2016", title: "产品突破", desc: "3D虚拟实验室1.0发布，首批合作学校落地" },
  { year: "2018", title: "规模扩张", desc: "服务学校突破1000所，获国家高新技术企业认定" },
  { year: "2020", title: "技术升级", desc: "AR/VR产品线全面发布，虚拟仿真实验平台上线" },
  { year: "2022", title: "行业领先", desc: "服务学校突破3000所，累计服务师生超300万人次" },
  { year: "2024", title: "持续创新", desc: "平台3.0发布，AI智能评分系统上线，服务学校超5000所" },
];

const honors = [
  "国家高新技术企业",
  "深圳市专精特新企业",
  "中国教育装备行业协会会员",
  "3D教育国家标准参编单位",
  "中国虚拟仿真教育创新奖",
  "广东省科技进步奖",
];

const teamFeatures = [
  { icon: Users, value: "300+", label: "员工规模" },
  { icon: Lightbulb, value: "60%", label: "研发人员占比" },
  { icon: Award, value: "200+", label: "知识产权" },
  { icon: Building2, value: "20+", label: "省级分公司" },
];

export default function About() {
  return (
    <main>
      {/* ── Page Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 30% 50%, rgba(59,130,246,0.2) 0%, transparent 50%)" }}
        />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <FadeIn>
            <p className="text-[#93c5fd] text-sm font-medium tracking-widest uppercase mb-3">
              About Us
            </p>
            <h1 className="text-white text-4xl lg:text-5xl font-bold mb-4">关于我们</h1>
            <p className="text-white/70 text-lg max-w-2xl">
              以科技创新赋能教育，让优质教学资源触手可及
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Company Intro ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <FadeIn>
              <p className="section-en">Company Profile</p>
              <h2 className="section-cn mt-2">公司简介</h2>
              <div className="accent-bar mt-4 mb-6" />
              <p className="text-[#475569] leading-relaxed mb-4">
                云幻教育科技股份有限公司成立于2014年，总部位于深圳，是一家专注于3D/AR/VR教育产品研发的高新技术企业。公司秉承"科技赋能教育"的理念，将虚拟现实、增强现实等前沿技术与教育教学深度融合。
              </p>
              <p className="text-[#475569] leading-relaxed mb-4">
                十年来，云幻教育始终坚持以用户需求为导向，持续投入核心技术研发，打造了涵盖3D虚拟实验室、虚拟仿真实验平台、智慧教育装备等完整的产品体系，为全国中小学提供一站式教育信息化解决方案。
              </p>
              <p className="text-[#475569] leading-relaxed mb-8">
                公司先后获得国家高新技术企业、深圳市专精特新企业等荣誉，参与3D教育国家标准制定，是国内3D教育领域的领军企业。
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {teamFeatures.map((f) => (
                  <div key={f.label} className="text-center">
                    <f.icon className="w-5 h-5 text-[#1a56db] mx-auto mb-2" />
                    <div className="text-xl font-bold text-[#1a56db]">{f.value}</div>
                    <div className="text-xs text-[#475569] mt-1">{f.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <img
                src="/images/about-team.svg"
                alt="云幻教育科技公司现代化的办公环境和研发团队工作场景"
                className="rounded-xl shadow-lg w-full object-cover"
                style={{ aspectRatio: "4/3" }}
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Culture & Values ── */}
      <section className="py-20 lg:py-28" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)" }}>
        <div className="container mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <p className="section-en">Culture & Values</p>
            <h2 className="section-cn mt-2">文化理念</h2>
            <div className="accent-bar mx-auto mt-4" />
          </FadeIn>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cultureValues.map((item) => (
              <motion.div key={item.title} variants={fadeUp}>
                <HoverLift>
                  <Card className="h-full border-[#e2e8f0] hover:border-[#3b82f6]/30 transition-all duration-300 text-center">
                    <CardContent className="p-8">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                        style={{ background: "#eff6ff", color: "#1a56db" }}
                      >
                        <item.icon className="w-8 h-8" />
                      </div>
                      <h3 className="font-bold text-xl text-[#0f172a] mb-3">{item.title}</h3>
                      <p className="text-[#475569] text-sm leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </HoverLift>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Honors ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <p className="section-en">Honors & Qualifications</p>
            <h2 className="section-cn mt-2">荣誉资质</h2>
            <div className="accent-bar mx-auto mt-4" />
          </FadeIn>

          <Stagger className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {honors.map((h) => (
              <motion.div key={h} variants={fadeUp}>
                <HoverLift>
                  <div className="flex items-center gap-3 p-5 bg-white rounded-xl border border-[#e2e8f0] hover:border-[#3b82f6]/30 transition-all duration-300">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "#eff6ff", color: "#1a56db" }}
                    >
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-sm text-[#0f172a]">{h}</span>
                  </div>
                </HoverLift>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Development History ── */}
      <section className="py-20 lg:py-28" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)" }}>
        <div className="container mx-auto px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <p className="section-en">Milestones</p>
            <h2 className="section-cn mt-2">发展历程</h2>
            <div className="accent-bar mx-auto mt-4" />
          </FadeIn>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-6 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-0.5 bg-[#e2e8f0]" />

            <Stagger className="flex flex-col gap-10">
              {milestones.map((m, idx) => (
                <motion.div
                  key={m.year}
                  variants={fadeUp}
                  className={`relative flex items-start gap-6 ${
                    idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white z-10"
                    style={{ background: "#1a56db" }}
                  />

                  {/* Content */}
                  <div className={`ml-14 lg:ml-0 lg:w-[calc(50%-2rem)] ${idx % 2 === 0 ? "lg:text-right lg:pr-8" : "lg:text-left lg:pl-8 lg:ml-auto"}`}>
                    <span
                      className="inline-block text-sm font-bold px-3 py-1 rounded-full mb-2"
                      style={{ background: "#eff6ff", color: "#1a56db" }}
                    >
                      {m.year}
                    </span>
                    <h4 className="font-bold text-[#0f172a] mb-1">{m.title}</h4>
                    <p className="text-sm text-[#475569]">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </div>
      </section>
    </main>
  );
}
