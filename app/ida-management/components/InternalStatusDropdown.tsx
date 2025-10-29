'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Clock, AlertCircle, CheckCircle } from 'lucide-react'

interface InternalStatusDropdownProps {
  currentStatus: 'pending_review' | 'on_hold' | 'reviewed'
  onStatusChange: (newStatus: 'pending_review' | 'on_hold' | 'reviewed') => void
}

const statusConfig = {
  pending_review: { 
    label: 'Pending Review', 
    color: 'bg-yellow-100 text-yellow-800', 
    icon: Clock 
  },
  on_hold: { 
    label: 'On Hold', 
    color: 'bg-red-100 text-red-800', 
    icon: AlertCircle 
  },
  reviewed: { 
    label: 'Reviewed', 
    color: 'bg-green-100 text-green-800', 
    icon: CheckCircle 
  }
}

export function InternalStatusDropdown({ currentStatus, onStatusChange }: InternalStatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleStatusChange = (newStatus: 'pending_review' | 'on_hold' | 'reviewed') => {
    onStatusChange(newStatus)
    setIsOpen(false)
  }

  const currentConfig = statusConfig[currentStatus]
  const CurrentIcon = currentConfig.icon

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${currentConfig.color} hover:opacity-80 cursor-pointer`}
      >
        <CurrentIcon className="w-4 h-4 mr-2" />
        <span>{currentConfig.label}</span>
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {Object.entries(statusConfig).map(([status, config]) => {
              const Icon = config.icon
              return (
                <button
                  key={status}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleStatusChange(status as 'pending_review' | 'on_hold' | 'reviewed')
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm whitespace-nowrap ${
                    status === currentStatus 
                      ? 'bg-[#F5F4E7] text-gray-500 cursor-not-allowed' 
                      : 'text-gray-700 hover:bg-[#F5F4E7]'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  <span>{config.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
