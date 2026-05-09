import { useState, useEffect } from "react";
import api from "@/lib/api-client";

interface Article {
  id: number;
  title: string;
  content: string;
  summary: string | null;
  cover: string | null;
  category: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useArticles(category?: string, published?: boolean) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (category) params.category = category;
    if (published !== undefined) params.published = String(published);
    const data = await api.get("/articles", { params });
    setArticles(data as unknown as Article[]);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const create = async (data: Omit<Article, "id" | "createdAt" | "updatedAt">) => {
    await api.post("/articles", data);
    await fetch();
  };

  const update = async (id: number, data: Partial<Article>) => {
    await api.put(`/articles/${id}`, data);
    await fetch();
  };

  const remove = async (id: number) => {
    await api.delete(`/articles/${id}`);
    await fetch();
  };

  return { articles, loading, create, update, remove, refetch: fetch };
}
