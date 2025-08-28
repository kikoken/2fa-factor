# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a 2FA (Two-Factor Authentication) monorepo with a modular architecture. The project uses pnpm workspaces to manage multiple packages and applications in a single repository.

## Package Manager

This project uses **pnpm** (version 10.12.4) as specified in the packageManager field. Always use pnpm commands instead of npm:

```bash
pnpm install              # Install all dependencies
pnpm build                # Build all packages and apps
pnpm dev                  # Run development mode for all packages
pnpm clean                # Clean all build outputs
```

### Working with specific packages:
```bash
pnpm --filter @2fa-factor/core build    # Build only core package
pnpm --filter @2fa-factor/demo dev       # Run demo in dev mode
pnpm --filter @2fa-factor/cli start      # Run CLI app
```

## Workspace Commands

The monorepo uses pnpm workspaces with the following structure:
- Root package.json manages workspace-wide scripts and dependencies
- Each package/app has its own package.json with specific dependencies
- TypeScript project references enable efficient builds and IDE support

## Monorepo Structure

```
2fa-factor/
├── packages/                 # Shared packages
│   ├── core/                # Core 2FA logic and algorithms
│   ├── client/              # Client-side integration library  
│   └── server/              # Server-side validation and API
├── apps/                    # Applications
│   ├── demo/                # Demo/example application
│   └── cli/                 # CLI tool for 2FA management
├── .claude/                 # Claude Code specific files
├── pnpm-workspace.yaml      # Workspace configuration
├── tsconfig.json           # Root TypeScript configuration
└── CLAUDE.md               # This guidance file
```

### Packages
- **@2fa-factor/core** - Core authentication logic, interfaces, and utilities
- **@2fa-factor/client** - Browser/client-side integration helpers
- **@2fa-factor/server** - Node.js server-side validation and API endpoints

### Applications  
- **@2fa-factor/demo** - Demonstration application showcasing all features
- **@2fa-factor/cli** - Command-line tool for testing and management

## Development Notes

Since this is an early-stage 2FA project, future development will likely involve:
- Authentication libraries and security-focused dependencies
- Proper test framework setup
- Build and development workflow configuration
- Security best practices for handling sensitive authentication data

## Git Configuration

The project is configured to ignore Claude-specific files to keep the repository clean:
- `CLAUDE.md` and `.claude/*` are excluded from version control
- Only `.claude/.gitkeep` is tracked to maintain directory structure