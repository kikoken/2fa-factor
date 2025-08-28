import { Router, IRouter } from 'express'
import bcrypt from 'bcrypt'
import jwt, { SignOptions } from 'jsonwebtoken'
import { z } from 'zod'
import { createError } from '../middleware/error-handler'
import { AuthRequest, requireAuth } from '../middleware/auth'

const router: IRouter = Router()

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128)
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

// Register endpoint
router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = registerSchema.parse(req.body)
    
    // TODO: Check if user already exists
    // TODO: Hash password and save to database
    
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // TODO: Save user to database
    // For now, just return success
    console.log(`[Auth] User registration attempt: ${email}`)
    
    res.status(201).json({
      message: 'User registered successfully',
      email,
      // Don't return the password hash
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(createError('Invalid input data', 400, 'VALIDATION_ERROR'))
    } else {
      next(error)
    }
  }
})

// Login endpoint
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body)
    
    // TODO: Fetch user from database
    // TODO: Verify password
    // TODO: Check if 2FA is enabled
    
    console.log(`[Auth] Login attempt: ${email}`)
    
    // Mock user for development
    const mockUser = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      email,
      password_hash: await bcrypt.hash('demo123', 12), // Mock hash
      has_2fa: false
    }
    
    const isValidPassword = await bcrypt.compare(password, mockUser.password_hash)
    
    if (!isValidPassword) {
      throw createError('Invalid credentials', 401, 'INVALID_CREDENTIALS')
    }
    
    // Generate JWT
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      throw createError('JWT secret not configured', 500, 'NO_JWT_SECRET')
    }
    
    const signOptions: SignOptions = {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    } as SignOptions
    
    const token = jwt.sign(
      { 
        userId: mockUser.id, 
        email: mockUser.email 
      },
      jwtSecret,
      signOptions
    )
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: mockUser.id,
        email: mockUser.email,
        has_2fa: mockUser.has_2fa
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

// Logout endpoint
router.post('/logout', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    // TODO: Invalidate token (add to blacklist or remove from database)
    console.log(`[Auth] Logout: ${req.user?.email}`)
    
    res.json({ message: 'Logged out successfully' })
  } catch (error) {
    next(error)
  }
})

// Get current user
router.get('/me', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    // TODO: Fetch full user data from database
    console.log(`[Auth] Get user info: ${req.user?.email}`)
    
    res.json({
      user: {
        id: req.user?.id,
        email: req.user?.email,
        has_2fa: false // TODO: Get from database
      }
    })
  } catch (error) {
    next(error)
  }
})

export { router as authRouter }