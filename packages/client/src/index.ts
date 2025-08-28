/**
 * Client-side 2FA integration library
 */

export interface ClientConfig {
  baseUrl?: string;
  timeout?: number;
}

export class TwoFactorClient {
  private config: ClientConfig;

  constructor(config: ClientConfig = {}) {
    this.config = {
      baseUrl: config.baseUrl || 'http://localhost:3000',
      timeout: config.timeout || 5000,
    };
  }

  public async verifyToken(token: string): Promise<boolean> {
    console.log(`[Client] Verifying token: ${token}`);
    // TODO: Implement actual verification
    return true;
  }
}

export * from '@2fa-factor/core';