import type { Metadata } from "next";
import { ProductsClient } from "./ProductsClient";

export const metadata: Metadata = {
  title: "产品与方案 - 3D/AR/VR教育产品矩阵",
  description: "云幻教育提供3D/AR/VR实验室、虚拟仿真实验平台、3D教学资源库、智慧教育装备等全场景教育信息化产品与解决方案。",
};

export default function ProductsPage() {
  return <ProductsClient />;
}
