'use client'

import { Calendar, ChevronDown } from 'lucide-react'

interface DateFilterButtonProps {
  label: string
  onClick?: () => void
  isOpen?: boolean
  className?: string
}

export function DateFilterButton({ 
  label, 
  onClick, 
  isOpen = false, 
  className = '' 
}: DateFilterButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 border border-[#E8E6CF] rounded-[5px] hover:bg-[#F5F4E7] transition-colors ${className}`}
    >
      <Calendar className="w-4 h-4 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  )
}
