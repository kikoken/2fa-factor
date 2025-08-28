# 2FA System Monorepo - Project Specifications

## Project Overview
A modern TypeScript monorepo implementing a complete Two-Factor Authentication system using Turborepo, Fastify, Next.js, and containerization with Docker.

## Technology Stack

### Core Technologies
- **Monorepo Manager**: Turborepo
- **Backend Framework**: Fastify with TypeScript
- **Frontend Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL + Redis
- **Container**: Docker + Docker Compose

### Development Tools
- **Language**: TypeScript (strict mode)
- **Linting**: ESLint with @typescript-eslint
- **Formatting**: Prettier
- **Git Hooks**: Husky
- **Package Manager**: pnpm (for Turborepo optimization)

### Security & 2FA Libraries
- **TOTP Generation**: `speakeasy`
- **QR Code**: `qrcode`
- **JWT**: `@fastify/jwt`
- **Rate Limiting**: `@fastify/rate-limit`
- **Validation**: `zod`
- **Encryption**: `bcrypt` + `crypto`

## Project Structure
```
2fa-system/
├── packages/
│   ├── shared/
│   │   ├── types/          # Shared TypeScript interfaces
│   │   ├── utils/          # Common utilities
│   │   ├── constants/      # Global constants
│   │   └── validations/    # Zod schemas
│   ├── auth-service/       # Fastify authentication API
│   ├── notification-service/ # Email/SMS service
│   └── web-app/           # Next.js frontend
├── apps/
├── tools/
│   ├── eslint-config/     # Shared ESLint config
│   └── typescript-config/ # Shared TS config
├── docker/
│   ├── postgres/          # DB initialization
│   └── redis/            # Redis config
├── docs/
└── scripts/              # Development scripts
```

## Development Phases

### Phase 1: Project Setup & Infrastructure
**Goal**: Initialize monorepo with development tools and basic structure

#### Tasks:
1. **Initialize Turborepo**
   ```bash
   npx create-turbo@latest 2fa-system --package-manager pnpm
   ```

2. **Setup Development Tools**
   - Configure TypeScript (strict mode)
   - Setup ESLint with @typescript-eslint/recommended
   - Configure Prettier with consistent rules
   - Setup Husky with pre-commit hooks
   - Configure lint-staged

3. **Create Shared Packages**
   - `packages/shared/types`: Common TypeScript interfaces
   - `packages/shared/utils`: Utility functions
   - `packages/shared/constants`: Global constants
   - `packages/shared/validations`: Zod validation schemas

4. **Setup Docker Environment**
   - Create `docker-compose.yml` with PostgreSQL + Redis
   - Setup development environment variables
   - Create database initialization scripts

#### Deliverables:
- ✅ Turborepo configured with pnpm
- ✅ Development tools (ESLint, Prettier, Husky) configured
- ✅ Docker development environment ready
- ✅ Shared packages structure created

### Phase 2: Backend Authentication Service
**Goal**: Create Fastify-based authentication service with basic 2FA

#### Tasks:
1. **Initialize Auth Service**
   ```bash
   # In packages/auth-service/
   pnpm init
   pnpm add fastify @fastify/cors @fastify/jwt @fastify/rate-limit
   pnpm add -D @types/node tsx nodemon
   ```

2. **Database Setup**
   - Design user and 2FA device schemas
   - Setup Prisma or Drizzle ORM
   - Create migration files
   - Setup connection pooling

3. **Core Authentication Features**
   - User registration/login endpoints
   - JWT token generation and validation
   - Password hashing with bcrypt
   - Rate limiting middleware

4. **2FA Implementation**
   - TOTP secret generation
   - QR code generation endpoint
   - TOTP verification endpoint
   - Backup codes generation/verification
   - 2FA enable/disable endpoints

5. **Security Middleware**
   - Request validation (Zod schemas)
   - Rate limiting per IP/user
   - CORS configuration
   - Request logging

#### API Endpoints:
```typescript
// Authentication
POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout

// 2FA Management
POST /2fa/setup          # Generate secret & QR
POST /2fa/verify-setup   # Verify initial TOTP
POST /2fa/verify         # Verify TOTP for login
GET  /2fa/backup-codes   # Generate backup codes
POST /2fa/verify-backup  # Use backup code
DELETE /2fa/disable      # Disable 2FA
```

#### Deliverables:
- ✅ Fastify server with TypeScript
- ✅ Database schema and connections
- ✅ Complete authentication flow
- ✅ TOTP-based 2FA system
- ✅ Comprehensive API documentation

### Phase 3: Frontend Web Application
**Goal**: Create Next.js frontend with complete 2FA user experience

#### Tasks:
1. **Initialize Next.js App**
   ```bash
   # In packages/web-app/
   npx create-next-app@latest . --typescript --tailwind --app
   pnpm add @tanstack/react-query zustand zod react-hook-form
   ```

2. **UI Components Setup**
   - Install and configure shadcn/ui
   - Create reusable components (Button, Input, Card, etc.)
   - Setup responsive layout
   - Configure Tailwind with custom theme

3. **Authentication Pages**
   - Login page with form validation
   - Registration page
   - Dashboard (protected route)
   - 2FA setup wizard
   - Account settings page

4. **2FA User Experience**
   - QR code display for setup
   - TOTP input component with auto-focus
   - Backup codes display and download
   - Recovery flow interface
   - Device management

5. **State Management**
   - Authentication store (Zustand)
   - API client with React Query
   - Token management and refresh
   - Route protection

#### Key Components:
```typescript
// Core Components
components/
├── auth/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── TOTPInput.tsx
├── 2fa/
│   ├── SetupWizard.tsx
│   ├── QRCodeDisplay.tsx
│   ├── BackupCodes.tsx
│   └── VerifyTOTP.tsx
├── ui/              # shadcn/ui components
└── layout/
    ├── Header.tsx
    └── ProtectedRoute.tsx
```

#### Deliverables:
- ✅ Next.js app with TypeScript
- ✅ Complete authentication UI
- ✅ 2FA setup and verification flows
- ✅ Responsive design with Tailwind
- ✅ State management and API integration

### Phase 4: Notification Service
**Goal**: Add email/SMS notifications for security events

#### Tasks:
1. **Initialize Notification Service**
   - Setup Fastify microservice
   - Configure email provider (Resend/SendGrid)
   - Setup SMS provider (optional)

2. **Notification Templates**
   - Login attempt notifications
   - 2FA setup confirmation
   - Backup code usage alerts
   - Account security changes

3. **Service Integration**
   - Message queue (Redis/Bull)
   - Event-driven notifications
   - Rate limiting for notifications

#### Deliverables:
- ✅ Notification microservice
- ✅ Email templates and delivery
- ✅ Security event notifications

### Phase 5: Testing & Documentation
**Goal**: Comprehensive testing and documentation

#### Tasks:
1. **Testing Setup**
   - Unit tests (Vitest/Jest)
   - Integration tests
   - E2E tests (Playwright)
   - Test coverage reports

2. **API Documentation**
   - OpenAPI/Swagger documentation
   - Postman collection
   - Code examples

3. **User Documentation**
   - Setup guide
   - API reference
   - Security best practices
   - Deployment guide

#### Deliverables:
- ✅ Test suites with >80% coverage
- ✅ Complete API documentation
- ✅ User and developer guides

### Phase 6: Production Deployment
**Goal**: Production-ready deployment configuration

#### Tasks:
1. **Production Configuration**
   - Environment-specific configs
   - Secrets management
   - Health checks and monitoring

2. **CI/CD Pipeline**
   - GitHub Actions workflows
   - Automated testing
   - Docker image builds
   - Deployment automation

3. **Cloud Deployment**
   - AWS/GCP deployment configs
   - Database migration scripts
   - Load balancer configuration
   - SSL certificates

#### Deliverables:
- ✅ Production deployment pipeline
- ✅ Monitoring and logging
- ✅ Scalable cloud infrastructure

## Development Rules & Standards

### Code Quality Standards
1. **TypeScript**: Strict mode enabled, no `any` types
2. **ESLint**: Zero warnings/errors before commit
3. **Prettier**: Auto-format on save
4. **Git Commits**: Conventional commit messages
5. **Testing**: Required for all new features
6. **Documentation**: JSDoc for all public APIs

### Security Requirements
1. **Input Validation**: All inputs validated with Zod
2. **Rate Limiting**: Applied to all sensitive endpoints
3. **CORS**: Properly configured for production
4. **Secrets**: Never committed to repository
5. **Logging**: Audit logs for security events
6. **HTTPS**: Enforced in production

### Performance Guidelines
1. **Database**: Use connection pooling
2. **Caching**: Redis for session management
3. **API**: Response time < 200ms for auth endpoints
4. **Frontend**: Lazy loading for non-critical components
5. **Docker**: Multi-stage builds for production

### Monitoring & Observability
1. **Health Checks**: All services must have health endpoints
2. **Metrics**: Performance and business metrics
3. **Logging**: Structured JSON logging
4. **Error Tracking**: Centralized error reporting
5. **Uptime**: 99.9% availability target

## Getting Started Commands

```bash
# Project initialization
git clone <repository>
cd 2fa-system
pnpm install

# Development setup
docker-compose up -d  # Start databases
pnpm dev             # Start all services

# Testing
pnpm test            # Run all tests
pnpm test:coverage   # Test coverage report

# Building
pnpm build           # Build all packages
pnpm build --filter=auth-service  # Build specific package

# Linting & Formatting
pnpm lint            # Lint all packages
pnpm format          # Format all code
```

## Environment Variables Template

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/2fa_system"
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-refresh-token-secret"

# 2FA
TOTP_ISSUER="2FA System"
TOTP_WINDOW=1

# Email (optional)
RESEND_API_KEY="your-resend-api-key"
SMTP_HOST="smtp.example.com"

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000  # 15 minutes
```

This specification provides a complete roadmap for building a production-ready 2FA system with modern development practices and security considerations.