import { useState, useEffect } from "react";
import api from "@/lib/api-client";

interface SlideData {
  id: number;
  fid: number;
  title: string;
  pic: string;
  link: string;
  description: string;
  listorder: number;
}

export function useSlides(fid?: number) {
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (fid) params.fid = String(fid);
    api.get("/slides", { params }).then((data) => {
      setSlides(data as unknown as SlideData[]);
      setLoading(false);
    });
  }, [fid]);

  return { slides, loading };
}
