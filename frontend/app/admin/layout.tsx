"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Image, Settings, ArrowLeft, LayoutDashboard } from "lucide-react";

const navItems = [
  { label: "仪表盘", path: "/admin", icon: LayoutDashboard },
  { label: "文章管理", path: "/admin/articles", icon: FileText },
  { label: "图片管理", path: "/admin/images", icon: Image },
  { label: "网站设置", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f172a] text-white shrink-0 flex flex-col">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)" }}>
              云
            </div>
            <div>
              <div className="font-bold text-sm">管理后台</div>
              <div className="text-xs text-[#64748b]">云幻教育</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-3">
          {navItems.map((item) => {
            const isActive = item.path === "/admin" ? pathname === "/admin" : pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                  isActive ? "bg-[#1a56db]/20 text-[#60a5fa]" : "text-[#94a3b8] hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-2 text-sm text-[#64748b] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            返回官网
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
