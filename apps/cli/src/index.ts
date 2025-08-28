#!/usr/bin/env node

/**
 * CLI tool for 2FA management and testing
 */

import { TwoFactorAuth } from '@2fa-factor/core';

function showHelp(): void {
  console.log(`
🔐 2FA Factor CLI

Usage: 2fa <command> [options]

Commands:
  generate         Generate a new secret
  qr <secret>      Generate QR code for secret
  token <secret>   Generate current TOTP token
  verify <secret> <token>  Verify a token
  help             Show this help

Options:
  --help, -h       Show help
  --version, -v    Show version
`);
}

function main(): void {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === 'help' || command === '--help' || command === '-h') {
    showHelp();
    return;
  }

  if (command === '--version' || command === '-v') {
    console.log('2fa-factor CLI v1.0.0');
    return;
  }

  const core = new TwoFactorAuth();

  switch (command) {
    case 'generate':
      console.log('🔑 Generated secret: [TODO - implement secret generation]');
      break;
    
    case 'qr':
      const secret = args[1];
      if (!secret) {
        console.error('❌ Error: Secret required for QR code generation');
        process.exit(1);
      }
      console.log(`📱 QR code for secret ${secret}: [TODO - implement QR generation]`);
      break;
    
    case 'token':
      const tokenSecret = args[1];
      if (!tokenSecret) {
        console.error('❌ Error: Secret required for token generation');
        process.exit(1);
      }
      console.log(`🔢 Current token: [TODO - implement TOTP generation]`);
      break;
    
    case 'verify':
      const verifySecret = args[1];
      const verifyToken = args[2];
      if (!verifySecret || !verifyToken) {
        console.error('❌ Error: Secret and token required for verification');
        process.exit(1);
      }
      console.log(`✅ Token verification: [TODO - implement verification]`);
      break;
    
    default:
      console.error(`❌ Unknown command: ${command}`);
      console.log('Run "2fa help" for usage information');
      process.exit(1);
  }
}

if (require.main === module) {
  main();
}