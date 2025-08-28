# 2FA Factor - Monorepo Setup Documentation

## Project Structure

```
2fa-factor/                        # Root monorepo
├── packages/                      # Shared packages
│   ├── core/                     # @2fa-factor/core
│   │   ├── src/index.ts         # Core 2FA logic
│   │   ├── package.json         # Core package config
│   │   └── tsconfig.json        # Core TS config
│   ├── client/                   # @2fa-factor/client
│   │   ├── src/index.ts         # Client library
│   │   ├── package.json         # Client package config
│   │   └── tsconfig.json        # Client TS config
│   └── server/                   # @2fa-factor/server
│       ├── src/index.ts         # Server API
│       ├── package.json         # Server package config
│       └── tsconfig.json        # Server TS config
├── apps/                         # Applications
│   ├── demo/                     # @2fa-factor/demo
│   │   ├── src/index.ts         # Demo application
│   │   ├── package.json         # Demo app config
│   │   └── tsconfig.json        # Demo TS config
│   └── cli/                      # @2fa-factor/cli
│       ├── src/index.ts         # CLI tool
│       ├── package.json         # CLI app config
│       └── tsconfig.json        # CLI TS config
├── .claude/                      # Claude-specific files
├── pnpm-workspace.yaml          # Workspace configuration
├── tsconfig.json                # Root TS project references
├── package.json                 # Root workspace config
├── .gitignore                   # Git ignore rules
└── CLAUDE.md                    # Claude guidance
```

## Monorepo Workflow

### Root Level Commands

- `pnpm install` - Install all dependencies for the entire monorepo
- `pnpm build` - Build all packages and apps (`pnpm -r build`)
- `pnpm dev` - Run development mode for all packages (`pnpm -r dev`)
- `pnpm clean` - Clean all dist/ directories (`pnpm -r clean`)
- `pnpm test` - Run tests for all packages (`pnpm -r test`)

### Package-Specific Commands

- `pnpm --filter @2fa-factor/core build` - Build only core package
- `pnpm --filter @2fa-factor/demo dev` - Run demo app in development
- `pnpm --filter @2fa-factor/cli start` - Run CLI application

### Development Process

1. **Install Dependencies**: `pnpm install` (installs for entire workspace)
2. **Development**: Use `pnpm dev` or target specific packages with `--filter`
3. **Building**: `pnpm build` builds all packages in dependency order
4. **Testing**: Individual packages can be tested or run all with `pnpm test`

## TypeScript Configuration

### Project References Architecture
- **Root tsconfig.json**: Contains project references to all packages/apps
- **Package tsconfigs**: Extend root config with package-specific settings
- **Composite builds**: Enable efficient incremental compilation
- **Declaration maps**: Support for IDE navigation across packages

### Configuration Details
- Target: ES2022 with modern Node.js support
- Strict mode enabled for type safety
- Project references enable cross-package imports
- Source maps and declarations for debugging and consumption

## Current Implementation

### TwoFactorAuth Class
- Basic configuration management for 2FA settings
- Extensible structure for future 2FA implementation
- Type-safe configuration interface

### Hello World Features
- Console application with structured output
- Configuration display
- Ready for 2FA feature development

## Future Development Notes

### 2FA Implementation Areas
1. **Secret Generation**: Cryptographically secure secret generation
2. **QR Code Generation**: For authenticator app setup
3. **TOTP Implementation**: Time-based One-Time Password generation
4. **Token Verification**: Validating user-provided tokens
5. **Backup Codes**: Recovery codes for account access

### Security Considerations
- Use cryptographically secure random number generation
- Implement proper time-window validation for TOTP
- Follow RFC 6238 for TOTP implementation
- Secure storage of secrets (never log or expose)

## Dependencies

### Development Dependencies
- `typescript`: TypeScript compiler
- `ts-node`: TypeScript execution for Node.js
- `@types/node`: Node.js type definitions

### Future Production Dependencies (planned)
- `speakeasy` or `otplib`: TOTP/HOTP implementation
- `qrcode`: QR code generation
- `crypto`: Built-in Node.js crypto module (no install needed)