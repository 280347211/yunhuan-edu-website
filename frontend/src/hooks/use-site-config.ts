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
    const data = await api.get("/site-config");
    setConfig(data as unknown as SiteConfig);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const update = async (key: string, value: string) => {
    await api.put(`/site-config/${key}`, { value });
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const batchUpdate = async (configs: SiteConfig) => {
    await api.post("/site-config/batch", { configs });
    await fetch();
  };

  return { config, loading, update, batchUpdate, refetch: fetch };
}
