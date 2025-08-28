import { Request, Response, NextFunction } from 'express'

export interface ApiError extends Error {
  statusCode?: number
  code?: string
}

export function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`[Error] ${err.message}`, {
    url: req.url,
    method: req.method,
    ip: req.ip,
    stack: err.stack
  })

  const statusCode = err.statusCode || 500
  const message = process.env.NODE_ENV === 'production' 
    ? (statusCode === 500 ? 'Internal server error' : err.message)
    : err.message

  res.status(statusCode).json({
    error: message,
    code: err.code || 'INTERNAL_ERROR',
    timestamp: new Date().toISOString()
  })
}

export function createError(message: string, statusCode: number = 500, code?: string): ApiError {
  const error = new Error(message) as ApiError
  error.statusCode = statusCode
  error.code = code
  return error
}