# ==============================================================================
# 第一阶段: 依赖安装与静态站点生产编译 (Builder)
# ==============================================================================
FROM node:20-alpine AS builder

# 启用 Corepack 激活原生 pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# 优先拷贝依赖清单并充分利用 Docker 缓存层
COPY package.json pnpm-lock.yaml ./

# 确定性安装锁定版本的生产与构建依赖
RUN pnpm install --frozen-lockfile

# 拷贝全量文档源码与工程配置
COPY . .

# 执行严格生产编译（输出至 docs/.vitepress/dist）
RUN pnpm build

# ==============================================================================
# 第二阶段: 极简 Nginx Alpine 静态托管运行镜像 (Runner ~25MB)
# ==============================================================================
FROM nginx:alpine AS runner

# 清理 Nginx 默认自带的欢迎页面
RUN rm -rf /usr/share/nginx/html/*

# 从构建阶段拷贝编译好的纯静态产物
COPY --from=builder /app/docs/.vitepress/dist /usr/share/nginx/html

# 覆盖定制的生产级 Nginx 配置（支持 Clean URLs、Gzip 压缩与静态长效缓存）
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# 暴露标准 HTTP 服务端口
EXPOSE 80

# 前台启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
