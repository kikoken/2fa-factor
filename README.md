# 2FA Factor

A complete Two-Factor Authentication (2FA) system built with modern technologies and designed for easy deployment and community contribution.

## 🚀 Features

- **Complete 2FA Implementation** - TOTP-based authentication with backup codes
- **Modern Frontend** - Next.js 14 with Tailwind CSS and Shadcn/UI components
- **Robust Backend** - Express.js API with JWT authentication and rate limiting
- **Database Ready** - Redis for caching and DuckDB for data storage
- **Docker Support** - Complete development environment with Docker Compose
- **Monorepo Architecture** - Organized codebase with shared packages and applications
- **TypeScript First** - Full type safety across the entire stack

## 🏗️ Architecture

```
2fa-factor/
├── packages/                 # Shared packages
│   ├── core/                # Core 2FA logic and algorithms
│   ├── client/              # Client-side integration library  
│   ├── server/              # Express.js API server
│   └── ui/                  # Shared React components
├── apps/                    # Applications
│   ├── web/                 # Next.js frontend application
│   ├── demo/                # Demo/example application
│   └── cli/                 # CLI tool for 2FA management
└── docker-compose.yml       # Complete dev environment
```

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+
- Docker (optional, for databases)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd 2fa-factor

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Build all packages
pnpm build
```

### Development

#### Option 1: Full Docker Stack
```bash
# Start complete environment (Redis + DuckDB + API + Web)
docker-compose up

# Visit http://localhost:3001 for the web app
# API available at http://localhost:3000
```

#### Option 2: Local Development
```bash
# Start databases only
docker-compose up -d redis duckdb

# Start API server
pnpm --filter @2fa-factor/server dev

# Start web application (in another terminal)
pnpm --filter @2fa-factor/web dev

# Visit http://localhost:3001
```

### Available Scripts

```bash
# Development
pnpm dev                     # Run all packages in development mode
pnpm build                   # Build all packages
pnpm clean                   # Clean all build outputs

# Individual packages
pnpm --filter @2fa-factor/server dev    # API server only
pnpm --filter @2fa-factor/web dev       # Web app only
pnpm --filter @2fa-factor/demo dev      # Demo app only
```

## 📱 Usage

### Web Interface
1. Visit http://localhost:3001
2. Register a new account
3. Set up 2FA with your authenticator app
4. Login with your credentials + 2FA token

### API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/2fa/setup` - Initialize 2FA setup
- `POST /api/2fa/enable` - Enable 2FA with verification
- `POST /api/2fa/verify` - Verify 2FA token

### CLI Tool
```bash
pnpm --filter @2fa-factor/cli dev

# Available commands:
# generate - Generate a new secret
# qr <secret> - Generate QR code
# token <secret> - Generate current TOTP token
# verify <secret> <token> - Verify a token
```

## 🔧 Components

### Core Features
- **TOTP Generation** - Time-based One-Time Passwords using Speakeasy
- **QR Code Generation** - Easy setup with authenticator apps
- **Backup Codes** - Recovery codes for account access
- **JWT Authentication** - Secure session management
- **Rate Limiting** - Protection against brute force attacks

### UI Components
- **QRCodeDisplay** - QR code generation and display
- **TokenInput** - 6-digit token input with navigation
- **BackupCodes** - Backup codes display with copy/download
- **Responsive Design** - Mobile-first approach

### Database Schema
- **Users** - User accounts and authentication
- **2FA Settings** - Secrets and backup codes
- **Sessions** - JWT session management
- **Audit Logs** - Login attempts and verification history

## 🤝 Contributing

This project is designed to be community-friendly and contribution-ready:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** in the appropriate package
4. **Test your changes** (`pnpm build && pnpm test`)
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use existing UI components when possible
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

## 📦 Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - High-quality React components
- **TypeScript** - Type safety and better DX

### Backend
- **Express.js** - Fast, unopinionated web framework
- **Speakeasy** - 2FA token generation and verification
- **JWT** - Secure authentication tokens
- **bcrypt** - Password hashing
- **Helmet & CORS** - Security middleware

### Database
- **DuckDB** - Lightweight, fast SQL database
- **Redis** - In-memory data structure store for caching
- **Docker Compose** - Easy database setup

### Development
- **pnpm Workspaces** - Monorepo package management
- **TypeScript Project References** - Efficient builds
- **ESLint** - Code linting and formatting
- **Docker** - Containerized development environment

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by best practices in 2FA implementation
- Designed for the open source community

---

**Ready to secure your applications with 2FA Factor!** 🔐