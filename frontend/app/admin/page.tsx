"use client";

import { useArticles } from "@/hooks/use-articles";
import { useProducts } from "@/hooks/use-products";
import { FileText, Package, Eye, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminDashboard() {
  const { items: articles, total: articleTotal } = useArticles({ status: 1 });
  const { products } = useProducts();

  const publishedCount = articles.filter((a) => a.status === 1).length;
  const draftCount = articles.filter((a) => a.status === 0).length;

  const stats = [
    { icon: FileText, label: "文章总数", value: articleTotal, color: "#1a56db" },
    { icon: Eye, label: "已发布", value: publishedCount, color: "#22c55e" },
    { icon: Clock, label: "草稿", value: draftCount, color: "#f59e0b" },
    { icon: Package, label: "产品数", value: products.length, color: "#6366f1" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#0f172a] mb-6">仪表盘</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((s) => (
          <Card key={s.label} className="border-[#e2e8f0]">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${s.color}10`, color: s.color }}>
                <s.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#0f172a]">{s.value}</div>
                <div className="text-sm text-[#475569]">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-lg font-bold text-[#0f172a] mb-4">最近文章</h2>
      <div className="space-y-3">
        {articles.slice(0, 5).map((a) => (
          <div key={a.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#e2e8f0]">
            <div className="flex items-center gap-3">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${a.status === 1 ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}>
                {a.status === 1 ? "已发布" : "草稿"}
              </span>
              <span className="font-medium text-sm text-[#0f172a]">{a.title}</span>
            </div>
            <span className="text-xs text-[#94a3b8]">
              {a.createtime ? new Date(a.createtime * 1000).toLocaleDateString("zh-CN") : "-"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
