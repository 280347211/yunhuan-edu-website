"use client";

import { useState, useEffect } from "react";
import { useSiteConfig } from "@/hooks/use-site-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Save } from "lucide-react";
import { toast } from "sonner";

const configGroups = [
  {
    title: "网站基本信息",
    keys: [
      { key: "site_name", label: "网站名称", type: "text" },
      { key: "logo", label: "Logo URL", type: "text" },
      { key: "site_email", label: "联系邮箱", type: "text" },
      { key: "phone", label: "联系电话", type: "text" },
      { key: "address", label: "公司地址", type: "textarea" },
      { key: "icp", label: "ICP备案号", type: "text" },
    ],
  },
  {
    title: "SEO设置",
    keys: [
      { key: "seo_title", label: "SEO标题", type: "text" },
      { key: "seo_keywords", label: "关键词", type: "text" },
      { key: "seo_description", label: "网站描述", type: "textarea" },
    ],
  },
  {
    title: "联系方式（前台展示）",
    keys: [
      { key: "site_tel", label: "服务热线", type: "text" },
      { key: "site_url", label: "网站域名", type: "text" },
    ],
  },
];

export default function AdminSettings() {
  const { config, update } = useSiteConfig();
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (config) setForm({ ...config });
  }, [config]);

  const handleSave = async (key: string) => {
    setSaving(true);
    try {
      await update(key, form[key] || "");
      toast.success("已保存");
    } catch { toast.error("保存失败"); }
    setSaving(false);
  };

  const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  if (!config) return <div className="p-8 text-center text-[#475569]">加载中...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#0f172a] mb-6">网站设置</h1>

      <div className="space-y-8">
        {configGroups.map((group) => (
          <Card key={group.title} className="border-[#e2e8f0]">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg text-[#0f172a] mb-4">{group.title}</h3>
              <div className="space-y-4">
                {group.keys.map(({ key, label, type }) => (
                  <div key={key} className="flex items-end gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-[#0f172a] mb-1.5">{label}</label>
                      {type === "textarea" ? (
                        <Textarea value={form[key] || ""} onChange={handleChange(key)} rows={2} className="border-[#e2e8f0]" />
                      ) : (
                        <Input value={form[key] || ""} onChange={handleChange(key)} className="border-[#e2e8f0]" />
                      )}
                    </div>
                    <Button onClick={() => handleSave(key)} disabled={saving} className="shrink-0" style={{ background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)" }} variant="default">
                      <Save className="w-4 h-4 mr-1" /> 保存
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
