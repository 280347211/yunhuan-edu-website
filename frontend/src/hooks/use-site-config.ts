import { useState, useEffect } from "react";
import api from "@/lib/api-client";

interface SiteConfig {
  [key: string]: string;
}

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>({});
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    const data = await api.get("/config");
    setConfig(data as unknown as SiteConfig);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const update = async (name: string, value: string) => {
    await api.put(`/config/${name}`, { value });
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  return { config, loading, update, refetch: fetch };
}
