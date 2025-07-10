import { FC, ReactNode } from 'react'

interface LabelProps {
  children: ReactNode
  required?: boolean
}

export const Label: FC<LabelProps> = ({ children, required }) => {
  return (
    <div className="flex items-center text-sm font-medium text-gray-900">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </div>
  )
} 