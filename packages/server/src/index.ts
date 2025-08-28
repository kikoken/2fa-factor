import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'

import { authRouter } from './routes/auth'
import { twoFactorRouter } from './routes/2fa'
import { userRouter } from './routes/user'
import { errorHandler } from './middleware/error-handler'
import { logger } from './middleware/logger'

// Load environment variables
dotenv.config()

const app: Express = express()
const PORT = process.env.API_PORT || 3000

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.WEB_URL || 'http://localhost:3001',
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
app.use(limiter)

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Logging
app.use(logger)

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

// API routes
app.use('/api/auth', authRouter)
app.use('/api/2fa', twoFactorRouter)
app.use('/api/user', userRouter)

// Error handling
app.use(errorHandler)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 2FA Factor API Server running on http://localhost:${PORT}`)
    console.log(`📋 Environment: ${process.env.NODE_ENV || 'development'}`)
    console.log(`🔧 Health check: http://localhost:${PORT}/health`)
  })
}

export { app }
export * from '@2fa-factor/core'