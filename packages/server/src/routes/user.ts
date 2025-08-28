import { Router, IRouter } from 'express'
import { z } from 'zod'
import { createError } from '../middleware/error-handler'
import { AuthRequest, requireAuth } from '../middleware/auth'

const router: IRouter = Router()

// Validation schemas
const updateProfileSchema = z.object({
  email: z.string().email().optional()
})

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8).max(128)
})

// Get user profile
router.get('/profile', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const user = req.user!
    
    // TODO: Fetch full user profile from database
    console.log(`[User] Get profile: ${user.email}`)
    
    res.json({
      user: {
        id: user.id,
        email: user.email,
        createdAt: new Date().toISOString(), // TODO: Get from database
        emailVerified: true, // TODO: Get from database
        has2FA: false // TODO: Get from database
      }
    })
  } catch (error) {
    next(error)
  }
})

// Update user profile
router.put('/profile', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const user = req.user!
    const updates = updateProfileSchema.parse(req.body)
    
    // TODO: Update user profile in database
    // TODO: If email is changed, send verification email
    
    console.log(`[User] Update profile: ${user.email}`, updates)
    
    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        email: updates.email || user.email
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(createError('Invalid input data', 400, 'VALIDATION_ERROR'))
    } else {
      next(error)
    }
  }
})

// Change password
router.post('/change-password', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const user = req.user!
    const { currentPassword, newPassword } = changePasswordSchema.parse(req.body)
    
    // TODO: Verify current password
    // TODO: Hash new password and save to database
    // TODO: Invalidate all existing sessions
    
    console.log(`[User] Password change: ${user.email}`)
    
    res.json({
      message: 'Password changed successfully'
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(createError('Invalid input data', 400, 'VALIDATION_ERROR'))
    } else {
      next(error)
    }
  }
})

// Get user sessions
router.get('/sessions', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const user = req.user!
    
    // TODO: Get user sessions from database
    const mockSessions = [
      {
        id: '1',
        createdAt: new Date().toISOString(),
        lastAccessedAt: new Date().toISOString(),
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        current: true
      }
    ]
    
    console.log(`[User] Get sessions: ${user.email}`)
    
    res.json({
      sessions: mockSessions
    })
  } catch (error) {
    next(error)
  }
})

// Revoke user session
router.delete('/sessions/:sessionId', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const user = req.user!
    const sessionId = req.params.sessionId
    
    // TODO: Revoke session in database
    console.log(`[User] Revoke session: ${user.email}, sessionId: ${sessionId}`)
    
    res.json({
      message: 'Session revoked successfully'
    })
  } catch (error) {
    next(error)
  }
})

// Delete user account
router.delete('/account', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const user = req.user!
    
    // TODO: Delete user account and all associated data
    // TODO: Invalidate all sessions
    console.log(`[User] Delete account: ${user.email}`)
    
    res.json({
      message: 'Account deleted successfully'
    })
  } catch (error) {
    next(error)
  }
})

export { router as userRouter }