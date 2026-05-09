import { useState } from "react";
import { useArticles } from "@/hooks/use-articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function AdminArticles() {
  const { articles, loading, create, update, remove } = useArticles();
  const [editing, setEditing] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    summary: "",
    category: "news",
    published: false,
  });

  const resetForm = () => {
    setForm({ title: "", content: "", summary: "", category: "news", published: false });
    setEditing(null);
  };

  const handleEdit = (article: (typeof articles)[0]) => {
    setForm({
      title: article.title,
      content: article.content,
      summary: article.summary || "",
      category: article.category,
      published: article.published,
    });
    setEditing(article.id);
    setOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.content) {
      toast.error("标题和内容为必填项");
      return;
    }
    try {
      if (editing) {
        await update(editing, form);
        toast.success("文章已更新");
      } else {
        await create(form);
        toast.success("文章已创建");
      }
      setOpen(false);
      resetForm();
    } catch {
      toast.error("操作失败");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("确定删除这篇文章吗？")) {
      await remove(id);
      toast.success("文章已删除");
    }
  };

  const togglePublish = async (article: (typeof articles)[0]) => {
    await update(article.id, { published: !article.published });
    toast.success(article.published ? "已取消发布" : "已发布");
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  if (loading) return <div className="p-8 text-center text-[#475569]">加载中...</div>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#0f172a]">文章管理</h1>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="text-white border-0" style={{ background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)" }}>
              <Plus className="w-4 h-4 mr-2" />
              新建文章
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogTitle>{editing ? "编辑文章" : "新建文章"}</DialogTitle>
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-1.5">标题</label>
                <Input value={form.title} onChange={handleChange("title")} placeholder="文章标题" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-1.5">摘要</label>
                <Input value={form.summary} onChange={handleChange("summary")} placeholder="文章摘要" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-1.5">分类</label>
                <select
                  value={form.category}
                  onChange={handleChange("category")}
                  className="w-full px-3 py-2 rounded-md border border-[#e2e8f0] text-sm"
                >
                  <option value="news">企业新闻</option>
                  <option value="policy">教育政策</option>
                  <option value="industry">行业资讯</option>
                  <option value="media">媒体报道</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0f172a] mb-1.5">内容</label>
                <Textarea
                  value={form.content}
                  onChange={handleChange("content")}
                  placeholder="文章正文内容"
                  rows={10}
                  className="resize-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={form.published}
                  onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="published" className="text-sm text-[#0f172a]">立即发布</label>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => { setOpen(false); resetForm(); }}>取消</Button>
                <Button onClick={handleSubmit} className="text-white border-0" style={{ background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)" }}>
                  {editing ? "保存修改" : "创建文章"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {articles.map((a) => (
          <Card key={a.id} className="border-[#e2e8f0] hover:border-[#3b82f6]/20 transition-colors">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${a.published ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}>
                      {a.published ? "已发布" : "草稿"}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-[#f1f5f9] text-[#475569]">
                      {a.category === "news" ? "企业新闻" : a.category === "policy" ? "教育政策" : a.category === "industry" ? "行业资讯" : "媒体报道"}
                    </span>
                  </div>
                  <h3 className="font-medium text-[#0f172a] truncate">{a.title}</h3>
                  {a.summary && <p className="text-sm text-[#475569] mt-1 truncate">{a.summary}</p>}
                  <p className="text-xs text-[#94a3b8] mt-2">{new Date(a.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => togglePublish(a)} title={a.published ? "取消发布" : "发布"}>
                    {a.published ? <EyeOff className="w-4 h-4 text-[#475569]" /> : <Eye className="w-4 h-4 text-[#475569]" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(a)} title="编辑">
                    <Pencil className="w-4 h-4 text-[#475569]" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(a.id)} title="删除">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
