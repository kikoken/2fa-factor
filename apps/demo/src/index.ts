/**
 * Demo application showcasing 2FA implementation
 */

import { TwoFactorAuth } from '@2fa-factor/core';
import { TwoFactorClient } from '@2fa-factor/client';
import { TwoFactorServer } from '@2fa-factor/server';

function runDemo(): void {
  console.log('🎯 2FA Factor Demo Application\n');

  // Initialize core 2FA
  const core = new TwoFactorAuth({
    appName: '2FA Demo',
    issuer: 'Demo Company'
  });

  console.log('📦 Core:', core.greet());

  // Initialize client
  const client = new TwoFactorClient({
    baseUrl: 'http://localhost:3000'
  });

  console.log('📱 Client initialized');

  // Initialize server
  const server = new TwoFactorServer({
    port: 3000
  });

  console.log('🔒 Server initialized');

  // Demo workflow
  console.log('\n🔄 Demo workflow:');
  console.log('1. Generate secret (TODO)');
  console.log('2. Create QR code (TODO)');
  console.log('3. Verify token (TODO)');

  console.log('\n✅ Demo completed - ready for implementation!');
}

if (require.main === module) {
  runDemo();
}