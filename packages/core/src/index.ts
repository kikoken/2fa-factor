/**
 * 2FA Factor - Two-Factor Authentication Implementation
 * Main entry point for the application
 */

export interface TwoFactorConfig {
  appName: string;
  issuer: string;
  secretLength: number;
}

export class TwoFactorAuth {
  private config: TwoFactorConfig;

  constructor(config: Partial<TwoFactorConfig> = {}) {
    this.config = {
      appName: config.appName || '2FA Factor',
      issuer: config.issuer || '2FA Factor App',
      secretLength: config.secretLength || 32,
    };
  }

  public getConfig(): TwoFactorConfig {
    return { ...this.config };
  }

  public greet(): string {
    return `Hello from ${this.config.appName}! 🔐`;
  }
}

// Main execution function
function main(): void {
  console.log('🚀 Starting 2FA Factor Application...\n');
  
  const twoFA = new TwoFactorAuth({
    appName: '2FA Factor',
    issuer: 'Secure Auth System'
  });

  console.log(twoFA.greet());
  console.log('\n📋 Configuration:');
  console.log(JSON.stringify(twoFA.getConfig(), null, 2));
  
  console.log('\n✨ Hello World from 2FA Factor!');
  console.log('🔧 Ready for development...');
}

// Run main function if this file is executed directly
if (require.main === module) {
  main();
}