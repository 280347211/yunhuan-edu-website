import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navItems = [
  { label: "首页", path: "/" },
  { label: "关于我们", path: "/about" },
  { label: "产品服务", path: "/products" },
  { label: "联系我们", path: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
              style={{ background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)" }}
            >
              云
            </div>
            <div className="flex flex-col">
              <span
                className={`font-bold text-base leading-tight transition-colors duration-300 ${
                  scrolled ? "text-[#0f172a]" : "text-white"
                }`}
              >
                云幻教育
              </span>
              <span
                className={`text-xs leading-tight transition-colors duration-300 ${
                  scrolled ? "text-[#475569]" : "text-white/70"
                }`}
              >
                CLOUD MAGIC EDU
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? scrolled
                        ? "text-[#1a56db]"
                        : "text-white"
                      : scrolled
                        ? "text-[#475569] hover:text-[#1a56db] hover:bg-[#f1f5f9]"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full"
                      style={{ background: scrolled ? "#1a56db" : "#ffffff" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:400-888-8888"
              className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                scrolled ? "text-[#1a56db]" : "text-white"
              }`}
            >
              <Phone className="w-4 h-4" />
              400-888-8888
            </a>
            <Button
              asChild
              className="text-sm font-medium text-white border-0"
              style={{ background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)" }}
            >
              <Link to="/contact">免费体验</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={scrolled ? "text-[#0f172a]" : "text-white"}
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0">
                <SheetTitle className="sr-only">导航菜单</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-6 border-b border-[#e2e8f0]">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                        style={{ background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)" }}
                      >
                        云
                      </div>
                      <span className="font-bold text-[#0f172a]">云幻教育</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileOpen(false)}
                      className="text-[#475569]"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <nav className="flex flex-col py-4">
                    {navItems.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`px-6 py-3 text-base font-medium transition-colors ${
                            isActive
                              ? "text-[#1a56db] bg-[#eff6ff]"
                              : "text-[#0f172a] hover:bg-[#f8fafc]"
                          }`}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>
                  <div className="mt-auto p-6 border-t border-[#e2e8f0]">
                    <a
                      href="tel:400-888-8888"
                      className="flex items-center gap-2 text-sm text-[#1a56db] font-medium mb-4"
                    >
                      <Phone className="w-4 h-4" />
                      400-888-8888
                    </a>
                    <Button
                      asChild
                      className="w-full text-white font-medium"
                      style={{ background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)" }}
                    >
                      <Link to="/contact">免费体验</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
