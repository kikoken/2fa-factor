import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { createError } from './error-handler'

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
  }
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError('No authorization token provided', 401, 'NO_TOKEN')
    }

    const token = authHeader.substring(7)
    const secret = process.env.JWT_SECRET

    if (!secret) {
      throw createError('JWT secret not configured', 500, 'NO_JWT_SECRET')
    }

    const decoded = jwt.verify(token, secret) as any
    req.user = {
      id: decoded.userId,
      email: decoded.email
    }

    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(createError('Invalid token', 401, 'INVALID_TOKEN'))
    } else {
      next(error)
    }
  }
}