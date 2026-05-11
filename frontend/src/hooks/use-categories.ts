import { useState, useEffect } from "react";
import api from "@/lib/api-client";

interface Category {
  id: number;
  catname: string;
  en_catname: string;
  catdir: string;
  parentid: number;
  module: string;
  image: string;
  description: string;
  ismenu: number;
  listorder: number;
  url: string;
  children?: Category[];
}

export function useCategories(params?: { parentid?: number; ismenu?: number }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    const p: Record<string, string> = {};
    if (params?.parentid !== undefined) p.parentid = String(params.parentid);
    if (params?.ismenu !== undefined) p.ismenu = String(params.ismenu);
    const data = await api.get("/categories", { params });
    setCategories(data as unknown as Category[]);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, [params?.parentid, params?.ismenu]);

  return { categories, loading, refetch: fetch };
}

export function useCategoryTree() {
  const [tree, setTree] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/categories/tree").then((data) => {
      setTree(data as unknown as Category[]);
      setLoading(false);
    });
  }, []);

  return { tree, loading };
}
