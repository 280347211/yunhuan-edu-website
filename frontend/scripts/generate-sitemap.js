#!/usr/bin/env node
/**
 * 生成 sitemap.xml 和 robots.txt
 * 用途: 在 ECS 上部署后运行此脚本生成 SEO 文件
 * 运行: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

// 从环境变量或默认值获取数据库配置
const DB_HOST = process.env.MYSQL_HOST || 'localhost';
const DB_PORT = process.env.MYSQL_PORT || 3306;
const DB_USER = process.env.MYSQL_USER || 'root';
const DB_PASS = process.env.MYSQL_PASSWORD || 'root123';
const DB_NAME = process.env.MYSQL_DATABASE || 'yunhuan';
const SITE_URL = (process.env.SITE_URL || 'https://www.magicloudedu.com').replace(/\/$/, '');

// 简单的 MySQL 查询（使用 mysql2 或 raw mysql）
async function query(sql, params = []) {
  // 如果在 Next.js 环境中，使用 fetch 调用 Express API
  const apiUrl = process.env.API_URL || 'http://localhost:3000';

  try {
    const res = await fetch(`${apiUrl}/api/articles?status=1&pageSize=1000`);
    if (res.ok) return { articles: ((await res.json())?.items || []) };

    // Fallback: 返回空数据
    return { articles: [] };
  } catch {
    return { articles: [], products: [], categories: [] };
  }
}

async function generateSitemap() {
  let urls = [];

  // 静态页面
  urls.push({ loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'daily' });
  urls.push({ loc: `${SITE_URL}/about`, priority: '0.8', changefreq: 'weekly' });
  urls.push({ loc: `${SITE_URL}/products`, priority: '0.9', changefreq: 'weekly' });
  urls.push({ loc: `${SITE_URL}/contact`, priority: '0.7', changefreq: 'monthly' });

  try {
    // 文章页面 - 从 API 获取已发布的文章
    const articleRes = await fetch(`${process.env.API_URL || 'http://localhost:3000'}/api/articles?status=1&pageSize=1000`);
    if (articleRes.ok) {
      const data = await articleRes.json();
      const articles = data?.items || [];
      articles.forEach((a) => {
        urls.push({
          loc: `${SITE_URL}/news/${a.id}`,
          lastmod: a.updatetime ? new Date(a.updatetime * 1000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          priority: '0.6',
          changefreq: 'monthly'
        });
      });
    }

    // 产品页面
    const productRes = await fetch(`${process.env.API_URL || 'http://localhost:3000'}/api/products`);
    if (productRes.ok) {
      const products = await productRes.json();
      if (Array.isArray(products)) {
        products.forEach((p) => {
          urls.push({
            loc: `${SITE_URL}/products/${p.id}`,
            priority: '0.6',
            changefreq: 'monthly'
          });
        });
      }
    }
  } catch (e) {
    console.error('获取动态 URL 失败，仅包含静态页面:', e.message);
  }

  // 生成 sitemap.xml
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const xmlFooter = '</urlset>\n';

  const urlEntries = urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n');

  const sitemapXml = xmlHeader + urlEntries + xmlFooter;

  // 生成 robots.txt
  const robotsTxt = `# 云幻教育官网 - Robots.txt
User-agent: *
Allow: /

# 站点地图
Sitemap: ${SITE_URL}/sitemap.xml

# 不允许爬取的路径（管理后台）
Disallow: /admin/
Disallow: /api/

# 百度蜘蛛特别说明
User-agent: Baiduspider
Allow: /
Crawl-delay: 1

# Google
User-agent: Googlebot
Allow: /
Crawl-delay: 1
`;

  // 写入文件
  const outputDir = path.join(__dirname, '..', 'public');
  fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemapXml);
  fs.writeFileSync(path.join(outputDir, 'robots.txt'), robotsTxt);

  console.log(`✅ Sitemap 已生成: ${urls.length} 个 URL`);
  console.log(`   sitemap.xml → ${path.join(outputDir, 'sitemap.xml')}`);
  console.log(`   robots.txt  → ${path.join(outputDir, 'robots.txt')}`);
  console.log(`\n请提交到百度站长平台: https://ziyuan.baidu.com/site/index#/`);
}

generateSitemap().catch(console.error);
