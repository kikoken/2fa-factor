/**
 * Demo application showcasing 2FA implementation
 */

import { TwoFactorAuth } from '@2fa-factor/core';
import { TwoFactorClient } from '@2fa-factor/client';

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

  console.log('🔒 Server: Express API available at http://localhost:3000');

  // Demo workflow
  console.log('\n🔄 Demo workflow:');
  console.log('1. Start API server: pnpm --filter @2fa-factor/server dev');
  console.log('2. Start web app: pnpm --filter @2fa-factor/web dev');  
  console.log('3. Visit: http://localhost:3001');
  console.log('4. Test full 2FA flow with UI');

  console.log('\n✅ Demo completed - ready for full stack development!');
}

if (require.main === module) {
  runDemo();
}