# Multi-stage Dockerfile for 2FA Factor monorepo

FROM node:18-alpine AS base
RUN corepack enable
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/*/package.json ./packages/
COPY apps/*/package.json ./apps/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build all packages
RUN pnpm build

# Web app stage
FROM base AS web
WORKDIR /app
EXPOSE 3001
CMD ["pnpm", "--filter", "@2fa-factor/web", "start"]

# API server stage  
FROM base AS api
WORKDIR /app
EXPOSE 3000
CMD ["pnpm", "--filter", "@2fa-factor/server", "start"]

# Development stage
FROM base AS development
WORKDIR /app
CMD ["pnpm", "dev"]