import { TwoFactorAuth } from '@2fa-factor/core'
import Link from 'next/link'

export default function HomePage() {
  const twoFA = new TwoFactorAuth({
    appName: '2FA Factor Web',
    issuer: 'Secure Web App'
  })

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            2FA Factor
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Complete Two-Factor Authentication solution with secure token generation, 
            QR code setup, and modern web interface.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link 
              href="/register"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Get Started →
            </Link>
            <Link 
              href="/login"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
              🔐
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Authentication</h3>
            <p className="text-muted-foreground text-sm">
              TOTP-based two-factor authentication with industry-standard security
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
              📱
            </div>
            <h3 className="text-lg font-semibold mb-2">QR Code Setup</h3>
            <p className="text-muted-foreground text-sm">
              Easy setup with popular authenticator apps like Google Authenticator
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
              🔄
            </div>
            <h3 className="text-lg font-semibold mb-2">Backup Codes</h3>
            <p className="text-muted-foreground text-sm">
              Recovery codes for account access when your device is unavailable
            </p>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">System Status</h3>
          <div className="text-left max-w-md mx-auto">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Core System:</span>
                <span className="text-green-600 dark:text-green-400">● Online</span>
              </div>
              <div className="flex justify-between">
                <span>App Name:</span>
                <span className="text-muted-foreground">{twoFA.getConfig().appName}</span>
              </div>
              <div className="flex justify-between">
                <span>Issuer:</span>
                <span className="text-muted-foreground">{twoFA.getConfig().issuer}</span>
              </div>
              <div className="flex justify-between">
                <span>Secret Length:</span>
                <span className="text-muted-foreground">{twoFA.getConfig().secretLength} chars</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}