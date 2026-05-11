import { useState, useEffect } from "react";
import api from "@/lib/api-client";

interface Product {
  id: number;
  catid: number;
  title: string;
  keywords: string;
  description: string;
  content: string;
  thumb: string;
  iocimg: string;
  pics: string;
  status: number;
  hits: number;
  createtime: number;
  updatetime: number;
  index_content: string;
  advantages: string;
  pronum: string;
}

export function useProducts(params?: { catid?: number; status?: number }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    const p: Record<string, string> = {};
    if (params?.catid) p.catid = String(params.catid);
    if (params?.status !== undefined) p.status = String(params.status);
    const data = await api.get("/products", { params });
    setProducts(data as unknown as Product[]);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, [params?.catid, params?.status]);

  return { products, loading, refetch: fetch };
}
