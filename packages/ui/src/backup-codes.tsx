import React, { useState } from 'react'
import { Copy, Download, Eye, EyeOff } from 'lucide-react'
import { cn } from './utils'

interface BackupCodesProps {
  codes: string[]
  className?: string
  onDownload?: () => void
  onCopy?: () => void
}

export function BackupCodes({ codes, className, onDownload, onCopy }: BackupCodesProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopyCode = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const handleCopyAll = async () => {
    try {
      const allCodes = codes.join('\n')
      await navigator.clipboard.writeText(allCodes)
      onCopy?.()
    } catch (err) {
      console.error('Failed to copy codes:', err)
    }
  }

  const handleDownload = () => {
    const content = `2FA Backup Codes - ${new Date().toLocaleDateString()}\n\n${codes.join('\n')}\n\nKeep these codes secure and use them only when you cannot access your authenticator app.`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `2fa-backup-codes-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
    onDownload?.()
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Backup Codes</h3>
          <p className="text-sm text-gray-600">
            Save these codes in a secure location. Each code can only be used once.
          </p>
        </div>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-gray-50"
        >
          {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          {isVisible ? 'Hide' : 'Show'}
        </button>
      </div>

      {isVisible && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {codes.map((code, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md font-mono text-sm"
              >
                <span className="select-all">{code}</span>
                <button
                  onClick={() => handleCopyCode(code, index)}
                  className="ml-2 p-1 hover:bg-gray-200 rounded"
                  title="Copy code"
                >
                  {copiedIndex === index ? (
                    <span className="text-green-600 text-xs">✓</span>
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-2 px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
            >
              <Copy size={16} />
              Copy All
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Download size={16} />
              Download
            </button>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-sm text-amber-800">
              <strong>Important:</strong> Store these codes securely and do not share them. 
              Each code can only be used once and they won't be shown again.
            </p>
          </div>
        </>
      )}
    </div>
  )
}