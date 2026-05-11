import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl font-bold mb-4" style={{ color: "#1a56db" }}>404</h1>
        <h2 className="text-2xl font-bold text-[#0f172a] mb-4">页面未找到</h2>
        <p className="text-[#475569] mb-8 max-w-md mx-auto">
          您访问的页面不存在或已被移除。请检查网址是否正确，或返回首页继续浏览。
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all hover:shadow-lg"
          style={{ background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)" }}
        >
          返回首页
        </Link>
      </div>
    </main>
  );
}
