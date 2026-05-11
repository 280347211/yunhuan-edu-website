"use client";

import { useState } from "react";
import { useArticles } from "@/hooks/use-articles";
import { useCategories } from "@/hooks/use-categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Eye, EyeOff, Search } from "lucide-react";
import { toast } from "sonner";

const catidLabels: Record<number, string> = {
  21: "公司新闻", 22: "教育政策", 23: "3D资讯", 24: "媒体报道", 25: "领导关怀",
  17: "华中案例", 14: "华东案例", 20: "东北案例", 15: "华南案例",
  19: "西南案例", 16: "华北案例", 18: "西北案例",
};

export default function AdminArticles() {
  const [catid, setCatid] = useState<number | undefined>(undefined);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { items: articles, total, loading, create, update, remove } = useArticles({ catid, keyword: searchKeyword });
  const { categories } = useCategories({ parentid: 4 });
  const { categories: caseCategories } = useCategories({ parentid: 3 });

  const [editing, setEditing] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", description: "", catid: 21, status: 1, keywords: "", thumb: "" });

  const resetForm = () => { setForm({ title: "", content: "", description: "", catid: 21, status: 1, keywords: "", thumb: "" }); setEditing(null); };

  const handleEdit = (article: (typeof articles)[0]) => {
    setForm({ title: article.title, content: article.content, description: article.description || "", catid: article.catid, status: article.status, keywords: article.keywords || "", thumb: article.thumb || "" });
    setEditing(article.id);
    setOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.content) { toast.error("标题和内容为必填项"); return; }
    try {
      if (editing) { await update(editing, form); toast.success("文章已更新"); }
      else { await create(form); toast.success("文章已创建"); }
      setOpen(false); resetForm();
    } catch { toast.error("操作失败"); }
  };

  const handleDelete = async (id: number) => { if (confirm("确定删除这篇文章吗？")) { await remove(id); toast.success("文章已删除"); } };
  const togglePublish = async (article: (typeof articles)[0]) => { await update(article.id, { status: article.status === 1 ? 0 : 1 }); toast.success(article.status === 1 ? "已取消发布" : "已发布"); };
  const handleSearch = () => setSearchKeyword(keyword);
  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  if (loading) return <div className="p-8 text-center text-[#475569]">加载中...</div>;
  const allArticleCategories = [...categories, ...caseCategories];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#0f172a]">文章管理</h1>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="text-white border-0" style={{ background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)" }}>
              <Plus className="w-4 h-4 mr-2" /> 新建文章
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogTitle>{editing ? "编辑文章" : "新建文章"}</DialogTitle>
            <div className="space-y-4 mt-4">
              <div><label className="block text-sm font-medium text-[#0f172a] mb-1.5">标题</label><Input value={form.title} onChange={handleChange("title")} placeholder="文章标题" /></div>
              <div><label className="block text-sm font-medium text-[#0f172a] mb-1.5">分类</label>
                <select value={form.catid} onChange={handleChange("catid")} className="w-full px-3 py-2 rounded-md border border-[#e2e8f0] text-sm">
                  {allArticleCategories.map((c) => (<option key={c.id} value={c.id}>{c.catname}</option>))}
                </select>
              </div>
              <div><label className="block text-sm font-medium text-[#0f172a] mb-1.5">摘要</label><Input value={form.description} onChange={handleChange("description")} placeholder="文章摘要" /></div>
              <div><label className="block text-sm font-medium text-[#0f172a] mb-1.5">关键词</label><Input value={form.keywords} onChange={handleChange("keywords")} placeholder="关键词，逗号分隔" /></div>
              <div><label className="block text-sm font-medium text-[#0f172a] mb-1.5">缩略图URL</label><Input value={form.thumb} onChange={handleChange("thumb")} placeholder="图片路径" /></div>
              <div><label className="block text-sm font-medium text-[#0f172a] mb-1.5">内容</label><Textarea value={form.content} onChange={handleChange("content")} placeholder="文章正文内容（支持HTML）" rows={10} className="resize-none" /></div>
              <div className="flex items-center gap-2"><input type="checkbox" id="status" checked={form.status === 1} onChange={(e) => setForm((p) => ({ ...p, status: e.target.checked ? 1 : 0 }))} className="rounded" /><label htmlFor="status" className="text-sm text-[#0f172a]">立即发布</label></div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => { setOpen(false); resetForm(); }}>取消</Button>
                <Button onClick={handleSubmit} className="text-white border-0" style={{ background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)" }}>{editing ? "保存修改" : "创建文章"}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <select value={catid || ""} onChange={(e) => setCatid(e.target.value ? Number(e.target.value) : undefined)} className="px-3 py-2 rounded-md border border-[#e2e8f0] text-sm">
          <option value="">全部分类</option>{allArticleCategories.map((c) => (<option key={c.id} value={c.id}>{c.catname}</option>))}
        </select>
        <div className="flex items-center gap-2">
          <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="搜索文章..." className="w-48" onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
          <Button variant="outline" size="icon" onClick={handleSearch}><Search className="w-4 h-4" /></Button>
        </div>
        <span className="text-sm text-[#94a3b8] ml-auto">共 {total} 篇</span>
      </div>

      {/* Article List */}
      <div className="space-y-3">
        {articles.map((a) => (
          <Card key={a.id} className="border-[#e2e8f0] hover:border-[#3b82f6]/20 transition-colors">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${a.status === 1 ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}>
                      {a.status === 1 ? "已发布" : "草稿"}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-[#f1f5f9] text-[#475569]">{catidLabels[a.catid] || `分类${a.catid}`}</span>
                  </div>
                  <h3 className="font-medium text-[#0f172a] truncate">{a.title}</h3>
                  {a.description && <p className="text-sm text-[#475569] mt-1 truncate">{a.description}</p>}
                  <p className="text-xs text-[#94a3b8] mt-2">{a.createtime ? new Date(a.createtime * 1000).toLocaleDateString("zh-CN") : "-"}{a.username && ` · ${a.username}`}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => togglePublish(a)} title={a.status === 1 ? "取消发布" : "发布"}>
                    {a.status === 1 ? <EyeOff className="w-4 h-4 text-[#475569]" /> : <Eye className="w-4 h-4 text-[#475569]" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(a)} title="编辑"><Pencil className="w-4 h-4 text-[#475569]" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(a.id)} title="删除"><Trash2 className="w-4 h-4 text-red-500" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {articles.length === 0 && <div className="text-center py-12 text-[#94a3b8]">暂无文章</div>}
      </div>
    </div>
  );
}
