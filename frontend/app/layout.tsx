import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import GlobalStyles from "./GlobalStyles";

export const metadata: Metadata = {
  title: {
    default: "云幻教育 - 3D/AR/VR教育产品领航者 | CLOUD MAGIC EDU",
    template: "%s | 云幻教育科技",
  },
  description: "云幻教育科技股份有限公司专注于3D/AR/VR教育产品研发，提供虚拟仿真实验解决方案、3D教学资源库、智慧教育装备，服务全国5000余所中小学校。",
  keywords: ["3D教育", "AR教育", "VR教育", "虚拟仿真实验", "云幻教育", "magicloud", "智慧校园", "教育信息化"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <GlobalStyles />
        <TooltipProvider>
          <Toaster />
          <Header />
          {children}
          <Footer />
        </TooltipProvider>
      </body>
    </html>
  );
}
