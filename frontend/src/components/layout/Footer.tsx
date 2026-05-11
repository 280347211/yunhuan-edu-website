import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const footerLinks = {
  product: {
    title: "产品服务",
    links: [
      { label: "3D/AR/VR实验室", path: "/products" },
      { label: "虚拟仿真实验平台", path: "/products" },
      { label: "智慧教育装备", path: "/products" },
      { label: "教学资源服务", path: "/products" },
    ],
  },
  about: {
    title: "关于我们",
    links: [
      { label: "公司简介", path: "/about" },
      { label: "企业文化", path: "/about" },
      { label: "发展历程", path: "/about" },
      { label: "荣誉资质", path: "/about" },
    ],
  },
  support: {
    title: "服务支持",
    links: [
      { label: "技术支持", path: "/contact" },
      { label: "资料下载", path: "/contact" },
      { label: "常见问题", path: "/contact" },
      { label: "在线留言", path: "/contact" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-[#94a3b8]">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                style={{ background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)" }}
              >
                云
              </div>
              <div>
                <div className="text-white font-bold text-lg">云幻教育</div>
                <div className="text-xs text-[#64748b]">CLOUD MAGIC EDU</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              云幻教育科技股份有限公司专注于3D/AR/VR教育产品研发，致力于用科技赋能教育，为全国中小学校提供优质的虚拟仿真实验解决方案。
            </p>
            <div className="flex flex-col gap-3">
              <a href="tel:400-888-8888" className="flex items-center gap-2 text-sm hover:text-[#3b82f6] transition-colors">
                <Phone className="w-4 h-4" />
                400-888-8888
              </a>
              <a href="mailto:contact@magicloudedu.com" className="flex items-center gap-2 text-sm hover:text-[#3b82f6] transition-colors">
                <Mail className="w-4 h-4" />
                contact@magicloudedu.com
              </a>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>广东省深圳市南山区科技园南区云幻大厦</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold text-sm mb-4">{section.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.path}
                      className="text-sm hover:text-[#3b82f6] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1e293b]">
        <div className="container mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#64748b]">
            Copyright {new Date().getFullYear()} 云幻教育科技股份有限公司 版权所有
          </p>
          <p className="text-xs text-[#64748b]">
            粤ICP备XXXXXXXX号
          </p>
        </div>
      </div>
    </footer>
  );
}
