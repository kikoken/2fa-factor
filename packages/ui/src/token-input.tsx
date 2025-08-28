import React, { useState, useRef, KeyboardEvent } from 'react'
import { cn } from './utils'

interface TokenInputProps {
  length?: number
  onComplete?: (token: string) => void
  onChange?: (token: string) => void
  className?: string
  disabled?: boolean
}

export function TokenInput({ 
  length = 6, 
  onComplete, 
  onChange,
  className,
  disabled = false
}: TokenInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const chars = value.slice(0, length).split('')
      const newValues = Array(length).fill('')
      chars.forEach((char, i) => {
        if (i < length && /^\d$/.test(char)) {
          newValues[i] = char
        }
      })
      setValues(newValues)
      
      const token = newValues.join('')
      onChange?.(token)
      
      if (token.length === length) {
        onComplete?.(token)
      }
      
      // Focus last filled input or first empty
      const nextIndex = Math.min(chars.length - 1, length - 1)
      inputRefs.current[nextIndex]?.focus()
      return
    }

    if (value === '' || /^\d$/.test(value)) {
      const newValues = [...values]
      newValues[index] = value
      setValues(newValues)
      
      const token = newValues.join('')
      onChange?.(token)
      
      if (value !== '' && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
      
      if (token.length === length) {
        onComplete?.(token)
      }
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && values[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  return (
    <div className={cn("flex gap-2 justify-center", className)}>
      {values.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={length}
          value={value}
          onChange={(e) => handleChange(index, (e.target as HTMLInputElement).value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={disabled}
          className={cn(
            "w-12 h-12 text-center text-lg font-mono border rounded-md",
            "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            "disabled:bg-gray-100 disabled:cursor-not-allowed",
            value ? "border-blue-500 bg-blue-50" : "border-gray-300"
          )}
        />
      ))}
    </div>
  )
}