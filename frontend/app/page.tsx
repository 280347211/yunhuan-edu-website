import Link from "next/link";
import { HomePageClient } from "./HomePageClient";

// Server-side data fetching for SEO
async function getHomePageData() {
  let slides = [];
  let news = [];
  let products = [];

  try {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const [slidesRes, newsRes, productsRes] = await Promise.allSettled([
      fetch(`${API_BASE}/api/slides?fid=1`).then((r) => r.json()),
      fetch(`${API_BASE}/api/articles?catid=21&status=1&pageSize=4`).then((r) => r.json()),
      fetch(`${API_BASE}/api/products?catid=12`).then((r) => r.json()),
    ]);

    if (slidesRes.status === "fulfilled") slides = slidesRes.value;
    if (newsRes.status === "fulfilled") news = newsRes.value?.items || [];
    if (productsRes.status === "fulfilled") {
      const prods = productsRes.value;
      if (Array.isArray(prods) && prods.length > 0) {
        products = prods.slice(0, 8);
      }
    }

    // Fallback for products: load all if catid=12 returns empty
    if (products.length === 0 && productsRes.status === "fulfilled") {
      const allProds = await fetch(`${API_BASE}/api/products`).then((r) => r.json());
      if (Array.isArray(allProds)) products = allProds.slice(0, 8);
    }
  } catch (error) {
    // Fallback to client-side data on error
  }

  return { slides, news, products };
}

export default async function IndexPage() {
  const data = await getHomePageData();

  return <HomePageClient initialData={data} />;
}
