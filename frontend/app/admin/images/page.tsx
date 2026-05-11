"use client";

import { useState } from "react";
import { useImages } from "@/hooks/use-images";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

export default function AdminImages() {
  const { images, upload: uploadImage, remove: deleteImage } = useImages();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await uploadImage(file);
      toast.success("图片上传成功");
      e.target.value = "";
    } catch { toast.error("上传失败"); } finally { setUploading(false); }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("路径已复制");
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#0f172a]">图片管理</h1>
        <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white cursor-pointer transition-opacity ${uploading ? "opacity-50 cursor-not-allowed" : ""}`} style={{ background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)" }}>
          <Upload className="w-4 h-4" /> 上传图片
          <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="hidden" />
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((img: any) => (
          <Card key={img.filename || img.name} className="group relative overflow-hidden border border-[#e2e8f0] hover:border-[#3b82f6]/30 transition-all">
            <div className="aspect-square bg-[#f1f5f9] relative">
              <img src={img.url || img.path} alt={img.filename || img.name} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => handleCopy(img.url || img.path)} className="p-2 rounded-lg bg-white/90 hover:bg-white text-[#0f172a] transition-colors"><Copy className="w-4 h-4" /></button>
                <button onClick={() => { if (confirm("确定删除？")) { deleteImage(img.filename || img.name); toast.success("图片已删除"); } }} className="p-2 rounded-lg bg-red-500/90 hover:bg-red-500 text-white transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="p-2 truncate text-xs text-[#64748b]" title={img.filename || img.name}>{img.filename || img.name}</div>
          </Card>
        ))}
        {images.length === 0 && <div className="col-span-full text-center py-12 text-[#94a3b8]">暂无图片</div>}
      </div>
    </div>
  );
}
