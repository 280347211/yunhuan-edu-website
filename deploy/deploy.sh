#!/bin/bash
# ============================================================
# 云幻教育官网 - ECS 部署脚本
# 用途: 在阿里云 2C2G ECS 上一键部署 Next.js + Express + MySQL
# 使用: sudo bash deploy.sh
# ============================================================

set -e
echo "=========================================="
echo " 云幻教育官网 - 部署脚本"
echo "=========================================="

# ---- 配置区（根据实际情况修改）----
PROJECT_DIR="/var/www/yunhuan-edu"
GIT_REPO="https://github.com/280347211/yunhuan-edu-website.git"
MYSQL_ROOT_PASSWORD="${MYSQL_PASSWORD:-root123}"  # 从环境变量读取，默认值仅供开发使用

# ---- 1. 安装系统依赖 ----
echo ""
echo "[1/7] 安装系统依赖..."
apt-get update -qq
apt-get install -y -qq nginx nodejs npm mysql-server curl git

# ---- 2. 安装 pnpm ----
echo "[2/7] 安装 pnpm..."
npm install -g pnpm

# ---- 3. 拉取代码 ----
echo "[3/7] 拉取最新代码..."
if [ ! -d "$PROJECT_DIR" ]; then
    mkdir -p /var/www
    cd /var/www
    git clone "$GIT_REPO" "$PROJECT_DIR"
else
    cd "$PROJECT_DIR"
    git pull origin master
fi

# ---- 4. 安装后端依赖 & 启动 MySQL ----
echo "[4/7] 配置数据库和后端..."
cd "$PROJECT_DIR/backend"
pnpm install --production

# 启动 MySQL（如果没运行）
if ! pgrep -x "mysqld" > /dev/null; then
    service mysql start || mysqld_safe &
    sleep 3
fi

# 创建数据库（如果不存在）
mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS yunhuan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null || true

# 同步数据库表结构
npx prisma db push --skip-generate || true

# ---- 5. 构建前端 ----
echo "[5/7] 构建 Next.js 前端..."
cd "$PROJECT_DIR/frontend"
pnpm install
pnpm build

# ---- 6. 配置 Nginx ----
echo "[6/7] 配置 Nginx..."
cp "$PROJECT_DIR/deploy/nginx.conf" /etc/nginx/conf.d/yunhuan-edu.conf
ln -sf "$PROJECT_DIR/deploy/nginx.conf" /etc/nginx/sites-available/yunhuan-edu.conf 2>/dev/null || true

# 测试配置
nginx -t && service nginx reload || echo "Nginx 配置有误，请检查"

# ---- 7. 启动服务（使用 PM2） ----
echo "[7/7] 启动服务..."
npm install -g pm2 2>/dev/null || true

# 停止旧进程（如果有）
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# 启动 Express 后端 (port 3000)
cd "$PROJECT_DIR/backend"
pm2 start "npx tsx src/index.ts" --name "yunhuan-api" --cwd "$PROJECT_DIR/backend"

# 等待后端启动
sleep 3

# 启动 Next.js SSR 服务 (port 3001)
cd "$PROJECT_DIR/frontend"
pm2 start "npx next start -p 3001" --name "yunhuan-web" --cwd "$PROJECT_DIR/frontend"

# 设置 PM2 开机自启
pm2 save 2>/dev/null || true
pm2 startup 2>/dev/null | bash 2>/dev/null || true

echo ""
echo "=========================================="
echo " 部署完成！"
echo "=========================================="
echo ""
echo "服务状态:"
pm2 status
echo ""
echo "访问地址:"
echo "  http://<ECS公网IP> → 前端网站（Next.js SSR）"
echo "  http://<ECS公网IP>/admin → 管理后台"
echo ""
echo "后续操作:"
echo "  1. 将域名 DNS A 记录指向此 ECS IP"
echo "  2. 申请 SSL 证书并修改 nginx.conf 中的证书路径"
echo "  3. 执行 'nginx -t && service nginx reload' 重载配置"
echo "  4. 提交 sitemap.xml 到百度站长平台"
echo ""
