import { useState, useEffect } from "react";
import { useSiteConfig } from "@/hooks/use-site-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const configGroups = [
  {
    title: "公司基本信息",
    fields: [
      { key: "company_name", label: "公司全称" },
      { key: "company_short", label: "公司简称" },
      { key: "company_en", label: "英文名称" },
      { key: "company_desc", label: "公司简介", multiline: true },
    ],
  },
  {
    title: "联系方式",
    fields: [
      { key: "phone", label: "服务热线" },
      { key: "email", label: "电子邮箱" },
      { key: "address", label: "公司地址" },
      { key: "icp", label: "ICP备案号" },
    ],
  },
  {
    title: "首页横幅",
    fields: [
      { key: "hero_title_1", label: "横幅1标题" },
      { key: "hero_subtitle_1", label: "横幅1副标题" },
      { key: "hero_desc_1", label: "横幅1描述" },
      { key: "hero_title_2", label: "横幅2标题" },
      { key: "hero_subtitle_2", label: "横幅2副标题" },
      { key: "hero_desc_2", label: "横幅2描述" },
      { key: "hero_title_3", label: "横幅3标题" },
      { key: "hero_subtitle_3", label: "横幅3副标题" },
      { key: "hero_desc_3", label: "横幅3描述" },
    ],
  },
];

export default function AdminSettings() {
  const { config, loading, batchUpdate } = useSiteConfig();
  const [form, setForm] = useState<Record<string, string>>({});

  useEffect(() => {
    setForm(config);
  }, [config]);

  const handleSave = async () => {
    try {
      await batchUpdate(form);
      toast.success("设置已保存");
    } catch {
      toast.error("保存失败");
    }
  };

  if (loading) return <div className="p-8 text-center text-[#475569]">加载中...</div>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#0f172a]">网站设置</h1>
        <Button onClick={handleSave} className="text-white border-0" style={{ background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)" }}>
          保存设置
        </Button>
      </div>

      <div className="space-y-6 max-w-3xl">
        {configGroups.map((group) => (
          <Card key={group.title} className="border-[#e2e8f0]">
            <CardContent className="p-6">
              <h3 className="font-bold text-[#0f172a] mb-4">{group.title}</h3>
              <div className="space-y-4">
                {group.fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-[#475569] mb-1.5">
                      {field.label}
                    </label>
                    {field.multiline ? (
                      <textarea
                        value={form[field.key] || ""}
                        onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                        rows={4}
                        className="w-full px-3 py-2 rounded-md border border-[#e2e8f0] text-sm resize-none"
                      />
                    ) : (
                      <Input
                        value={form[field.key] || ""}
                        onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      />
                    )}
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
