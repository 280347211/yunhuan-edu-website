import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api-client";

interface Article {
  id: number;
  catid: number;
  title: string;
  keywords: string;
  description: string;
  content: string;
  thumb: string;
  status: number;
  hits: number;
  createtime: number;
  updatetime: number;
  username: string;
}

interface ArticleResponse {
  items: Article[];
  total: number;
  page: number;
  pageSize: number;
}

export function useArticles(params?: { catid?: number; status?: number; keyword?: string; page?: number; pageSize?: number }) {
  const [data, setData] = useState<ArticleResponse>({ items: [], total: 0, page: 1, pageSize: 20 });
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const p: Record<string, string> = {};
      if (params?.catid) p.catid = String(params.catid);
      if (params?.status !== undefined) p.status = String(params.status);
      if (params?.keyword) p.keyword = params.keyword;
      if (params?.page) p.page = String(params.page);
      if (params?.pageSize) p.pageSize = String(params.pageSize);
      const result = await api.get("/articles", { params: p });
      setData(result as unknown as ArticleResponse);
    } catch {
      // ignore
    }
    setLoading(false);
  }, [params?.catid, params?.status, params?.keyword, params?.page, params?.pageSize]);

  useEffect(() => { fetch(); }, [fetch]);

  const create = async (data: Partial<Article>) => {
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

  return { ...data, items: data.items, loading, create, update, remove, refetch: fetch };
}
