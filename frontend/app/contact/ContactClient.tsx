"use client";

import { useState, useEffect } from "react";
import { FadeIn, Stagger, fadeUp, motion } from "@/components/MotionPrimitives";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

interface ContactClientProps {
  initialConfig?: Record<string, string>;
}

export function ContactClient({ initialConfig }: ContactClientProps) {
  const [config] = useState<Record<string, string>>(initialConfig || {});
  const [formState, setFormState] = useState({ name: "", phone: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {}, []);

  const contactInfo = [
    { icon: Phone, title: "服务热线", content: config.site_tel || "4008-988-168", sub: "周一至周五 9:00-18:00", href: `tel:${config.site_tel || "4008-988-168"}` },
    { icon: Mail, title: "电子邮箱", content: config.site_email || "market@yunhuanedu.com", sub: "商务合作与咨询", href: `mailto:${config.site_email || "market@yunhuanedu.com"}` },
    { icon: MapPin, title: "公司地址", content: config.address ? config.address.split("，")[0] : "广东省深圳市南山区", sub: config.address ? config.address.split("，").slice(1).join("，") || "科技园南区" : "科技园南区英唐大厦三楼", href: null },
    { icon: Clock, title: "工作时间", content: "周一至周五", sub: "9:00 - 18:00", href: null },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone || !formState.message) {
      toast.error("请填写必填信息");
      return;
    }
    setSubmitted(true);
    toast.success("提交成功，我们将尽快与您联系！");
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <main>
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 60% 40%, rgba(59,130,246,0.2) 0%, transparent 50%)" }} />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <FadeIn>
            <p className="text-[#93c5fd] text-sm font-medium tracking-widest uppercase mb-3">Contact Us</p>
            <h1 className="text-white text-4xl lg:text-5xl font-bold mb-4">联系我们</h1>
            <p className="text-white/70 text-lg max-w-2xl">期待与您携手，共同推动教育信息化发展</p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info) => (
              <motion.div key={info.title} variants={fadeUp}>
                <Card className="h-full border-[#e2e8f0] hover:border-[#3b82f6]/30 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: "#eff6ff", color: "#1a56db" }}>
                      <info.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-[#0f172a] mb-2">{info.title}</h3>
                    {info.href ? (
                      <a href={info.href} className="text-[#1a56db] font-medium text-sm hover:underline">{info.content}</a>
                    ) : (
                      <p className="text-[#0f172a] font-medium text-sm">{info.content}</p>
                    )}
                    <p className="text-[#94a3b8] text-xs mt-1">{info.sub}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Stagger>

          {/* Form + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <FadeIn>
              <div className="bg-white rounded-xl border border-[#e2e8f0] p-8">
                <h3 className="font-bold text-xl text-[#0f172a] mb-2">在线留言</h3>
                <p className="text-sm text-[#475569] mb-6">填写以下信息，我们将尽快与您联系</p>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "#eff6ff" }}>
                      <CheckCircle className="w-8 h-8 text-[#1a56db]" />
                    </div>
                    <h4 className="font-bold text-lg text-[#0f172a] mb-2">提交成功</h4>
                    <p className="text-sm text-[#475569]">感谢您的留言，我们的顾问将在24小时内与您联系</p>
                    <Button variant="outline" className="mt-6 border-[#1a56db] text-[#1a56db]" onClick={() => { setSubmitted(false); setFormState({ name: "", phone: "", email: "", company: "", message: "" }); }}>
                      继续留言
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#0f172a] mb-1.5">姓名 <span className="text-red-500">*</span></label>
                        <Input value={formState.name} onChange={handleChange("name")} placeholder="请输入姓名" className="border-[#e2e8f0] focus:border-[#1a56db]" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#0f172a] mb-1.5">电话 <span className="text-red-500">*</span></label>
                        <Input value={formState.phone} onChange={handleChange("phone")} placeholder="请输入联系电话" className="border-[#e2e8f0] focus:border-[#1a56db]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#0f172a] mb-1.5">邮箱</label>
                        <Input type="email" value={formState.email} onChange={handleChange("email")} placeholder="请输入邮箱地址" className="border-[#e2e8f0] focus:border-[#1a56db]" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#0f172a] mb-1.5">学校/单位</label>
                        <Input value={formState.company} onChange={handleChange("company")} placeholder="请输入学校或单位名称" className="border-[#e2e8f0] focus:border-[#1a56db]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0f172a] mb-1.5">留言内容 <span className="text-red-500">*</span></label>
                      <Textarea value={formState.message} onChange={handleChange("message")} placeholder="请描述您的需求或问题" rows={5} className="border-[#e2e8f0] focus:border-[#1a56db] resize-none" />
                    </div>
                    <Button type="submit" className="w-full text-white font-medium border-0" style={{ background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)" }}>
                      <Send className="w-4 h-4 mr-2" /> 提交留言
                    </Button>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* Location */}
            <FadeIn delay={0.2}>
              <div className="rounded-xl overflow-hidden border border-[#e2e8f0] h-full min-h-[400px] flex flex-col">
                <div className="flex-1 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1a56db 100%)" }}>
                  <div className="text-center text-white p-8">
                    <MapPin className="w-12 h-12 mx-auto mb-4 opacity-80" />
                    <h4 className="font-bold text-lg mb-2">{config.address || "广东省深圳市南山区科技园南区"}</h4>
                    <p className="text-white/70 text-sm">云幻教育科技股份有限公司</p>
                    <p className="text-white/50 text-xs mt-4">电话：{config.site_tel || "4008-988-168"}</p>
                    <p className="text-white/50 text-xs mt-1">邮箱：{config.site_email || "market@yunhuanedu.com"}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
