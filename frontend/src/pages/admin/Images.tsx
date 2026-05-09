import { useRef, useState } from "react";
import { useImages } from "@/hooks/use-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

export default function AdminImages() {
  const { images, loading, upload, remove } = useImages();
  const fileRef = useRef<HTMLInputElement>(null);
  const [altText, setAltText] = useState("");
  const [category, setCategory] = useState("general");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    for (const file of Array.from(files)) {
      await upload(file, altText, category);
    }
    toast.success(`已上传 ${files.length} 张图片`);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleDelete = async (id: number) => {
    if (confirm("确定删除这张图片吗？")) {
      await remove(id);
      toast.success("图片已删除");
    }
  };

  const copyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    toast.success("图片路径已复制");
  };

  if (loading) return <div className="p-8 text-center text-[#475569]">加载中...</div>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#0f172a]">图片管理</h1>
      </div>

      {/* Upload Area */}
      <Card className="border-dashed border-2 border-[#e2e8f0] mb-8 hover:border-[#3b82f6]/40 transition-colors">
        <CardContent className="p-8">
          <div className="flex flex-col items-center gap-4">
            <Upload className="w-10 h-10 text-[#94a3b8]" />
            <p className="text-[#475569] text-sm">点击下方按钮选择图片上传</p>
            <div className="flex items-center gap-3">
              <Input
                placeholder="图片描述（alt）"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="w-48"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2 rounded-md border border-[#e2e8f0] text-sm"
              >
                <option value="general">通用</option>
                <option value="banner">横幅</option>
                <option value="product">产品</option>
                <option value="case">案例</option>
                <option value="about">关于</option>
              </select>
              <Button asChild className="text-white border-0" style={{ background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)" }}>
                <label className="cursor-pointer">
                  选择图片
                  <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
                </label>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {images.map((img) => (
          <Card key={img.id} className="overflow-hidden group border-[#e2e8f0]">
            <div className="relative aspect-square bg-[#f8fafc]">
              <img
                src={img.path}
                alt={img.alt || img.original}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => copyPath(img.path)}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => handleDelete(img.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-3">
              <p className="text-xs text-[#0f172a] truncate">{img.original}</p>
              <p className="text-xs text-[#94a3b8] mt-0.5">{img.category}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12 text-[#94a3b8]">暂无图片，请上传</div>
      )}
    </div>
  );
}
