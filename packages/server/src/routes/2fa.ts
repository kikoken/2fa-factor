import { Router, IRouter } from 'express'
import speakeasy from 'speakeasy'
import QRCode from 'qrcode'
import { z } from 'zod'
import { createError } from '../middleware/error-handler'
import { AuthRequest, requireAuth } from '../middleware/auth'

const router: IRouter = Router()

// Validation schemas
const verifyTokenSchema = z.object({
  token: z.string().length(6).regex(/^\d{6}$/)
})

const enableTwoFactorSchema = z.object({
  token: z.string().length(6).regex(/^\d{6}$/),
  secret: z.string().min(16)
})

// Setup 2FA - Generate secret and QR code
router.post('/setup', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const user = req.user!
    
    // Generate secret
    const secret = speakeasy.generateSecret({
      name: `${process.env.APP_NAME || '2FA Factor'} (${user.email})`,
      issuer: process.env.APP_ISSUER || '2FA Factor'
    })
    
    // Generate QR code
    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!)
    
    console.log(`[2FA] Setup initiated for user: ${user.email}`)
    
    res.json({
      secret: secret.base32,
      qrCode: qrCodeUrl,
      manualEntryKey: secret.base32,
      issuer: process.env.APP_ISSUER || '2FA Factor'
    })
  } catch (error) {
    next(error)
  }
})

// Enable 2FA - Verify setup token
router.post('/enable', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const user = req.user!
    const { token, secret } = enableTwoFactorSchema.parse(req.body)
    
    // Verify the token
    const verified = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 2 // Allow for time drift
    })
    
    if (!verified) {
      throw createError('Invalid token', 400, 'INVALID_TOKEN')
    }
    
    // TODO: Save secret to database and enable 2FA for user
    // TODO: Generate backup codes
    
    const backupCodes = generateBackupCodes()
    
    console.log(`[2FA] Enabled for user: ${user.email}`)
    
    res.json({
      message: '2FA enabled successfully',
      backupCodes
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(createError('Invalid input data', 400, 'VALIDATION_ERROR'))
    } else {
      next(error)
    }
  }
})

// Disable 2FA
router.post('/disable', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const user = req.user!
    const { token } = verifyTokenSchema.parse(req.body)
    
    // TODO: Verify current token before disabling
    // TODO: Remove 2FA settings from database
    
    console.log(`[2FA] Disabled for user: ${user.email}`)
    
    res.json({
      message: '2FA disabled successfully'
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(createError('Invalid input data', 400, 'VALIDATION_ERROR'))
    } else {
      next(error)
    }
  }
})

// Verify 2FA token
router.post('/verify', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const user = req.user!
    const { token } = verifyTokenSchema.parse(req.body)
    
    // TODO: Get user's secret from database
    const mockSecret = 'JBSWY3DPEHPK3PXP' // This should come from database
    
    // Verify the token
    const verified = speakeasy.totp.verify({
      secret: mockSecret,
      encoding: 'base32',
      token,
      window: 2
    })
    
    if (!verified) {
      throw createError('Invalid token', 400, 'INVALID_TOKEN')
    }
    
    console.log(`[2FA] Token verified for user: ${user.email}`)
    
    res.json({
      verified: true,
      message: 'Token verified successfully'
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(createError('Invalid input data', 400, 'VALIDATION_ERROR'))
    } else {
      next(error)
    }
  }
})

// Get 2FA status
router.get('/status', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const user = req.user!
    
    // TODO: Get 2FA status from database
    const mockStatus = {
      enabled: false,
      hasBackupCodes: false
    }
    
    console.log(`[2FA] Status check for user: ${user.email}`)
    
    res.json({
      enabled: mockStatus.enabled,
      hasBackupCodes: mockStatus.hasBackupCodes
    })
  } catch (error) {
    next(error)
  }
})

// Generate backup codes
function generateBackupCodes(count: number = 10): string[] {
  const codes: string[] = []
  
  for (let i = 0; i < count; i++) {
    // Generate 8-character alphanumeric codes
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()
    codes.push(code)
  }
  
  return codes
}

export { router as twoFactorRouter }