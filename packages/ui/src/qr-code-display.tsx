import React from 'react'
import { cn } from './utils'

interface QRCodeDisplayProps {
  value: string
  size?: number
  className?: string
}

export function QRCodeDisplay({ value, size = 200, className }: QRCodeDisplayProps) {
  // TODO: Implement actual QR code generation
  // For now, show placeholder
  return (
    <div 
      className={cn(
        "flex items-center justify-center bg-white border-2 border-gray-200 rounded-lg",
        className
      )}
      style={{ width: size, height: size }}
    >
      <div className="text-center p-4">
        <div className="text-sm text-gray-500 mb-2">QR Code</div>
        <div className="text-xs text-gray-400 break-all">
          {value.substring(0, 20)}...
        </div>
        <div className="text-xs text-gray-400 mt-2">
          {size}x{size}
        </div>
      </div>
    </div>
  )
}

interface QRCodeSetupProps {
  secret: string
  issuer: string
  accountName: string
  className?: string
}

export function QRCodeSetup({ secret, issuer, accountName, className }: QRCodeSetupProps) {
  const otpAuthUrl = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(accountName)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}`
  
  return (
    <div className={cn("space-y-4", className)}>
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Setup Authenticator</h3>
        <p className="text-sm text-gray-600 mb-4">
          Scan this QR code with your authenticator app
        </p>
      </div>
      
      <div className="flex justify-center">
        <QRCodeDisplay value={otpAuthUrl} size={200} />
      </div>
      
      <div className="text-center">
        <p className="text-xs text-gray-500 mb-2">Or enter this code manually:</p>
        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
          {secret}
        </code>
      </div>
    </div>
  )
}