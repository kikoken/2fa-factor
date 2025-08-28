FROM node:18-alpine

RUN corepack enable
WORKDIR /app

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/*/package.json ./packages/
COPY apps/web/package.json ./apps/web/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY packages/ ./packages/
COPY apps/web/ ./apps/web/

# Build packages first
RUN pnpm --filter "@2fa-factor/core" build
RUN pnpm --filter "@2fa-factor/client" build
RUN pnpm --filter "@2fa-factor/ui" build

# Build web app
RUN pnpm --filter "@2fa-factor/web" build

EXPOSE 3001

CMD ["pnpm", "--filter", "@2fa-factor/web", "start"]