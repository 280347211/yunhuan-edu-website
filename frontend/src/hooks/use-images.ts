import { useState, useEffect } from "react";
import api from "@/lib/api-client";

interface ImageItem {
  id: number;
  filename: string;
  original: string;
  path: string;
  alt: string | null;
  category: string | null;
  createdAt: string;
}

export function useImages() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    const data = await api.get("/images");
    setImages(data as unknown as ImageItem[]);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const upload = async (file: File, alt?: string, category?: string) => {
    const form = new FormData();
    form.append("file", file);
    if (alt) form.append("alt", alt);
    if (category) form.append("category", category);
    await api.post("/images", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    await fetch();
  };

  const remove = async (id: number) => {
    await api.delete(`/images/${id}`);
    await fetch();
  };

  return { images, loading, upload, remove, refetch: fetch };
}
