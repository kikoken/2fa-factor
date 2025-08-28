/**
 * Server-side 2FA validation and API
 */

export interface ServerConfig {
  port?: number;
  secretKey?: string;
}

export class TwoFactorServer {
  private config: ServerConfig;

  constructor(config: ServerConfig = {}) {
    this.config = {
      port: config.port || 3000,
      secretKey: config.secretKey || 'default-secret-key',
    };
  }

  public validateToken(secret: string, token: string): boolean {
    console.log(`[Server] Validating token for secret: ${secret.substring(0, 4)}***`);
    // TODO: Implement actual TOTP validation
    return token.length === 6 && /^\d{6}$/.test(token);
  }

  public start(): void {
    console.log(`[Server] Starting on port ${this.config.port}`);
    // TODO: Implement actual server
  }
}

export * from '@2fa-factor/core';