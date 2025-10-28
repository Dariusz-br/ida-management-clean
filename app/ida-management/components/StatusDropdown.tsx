'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Clock, Truck, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react'

interface StatusDropdownProps {
  currentStatus: string
  onStatusChange: (newStatus: string) => void
  disabled?: boolean
}

const statusConfig = {
  processing: { 
    label: 'Processing', 
    color: 'bg-blue-100 text-blue-800', 
    icon: Clock,
    nextStatuses: ['shipment_in_progress', 'completed', 'on_hold', 'refunded']
  },
  shipment_in_progress: { 
    label: 'Shipment in Progress', 
    color: 'bg-yellow-100 text-yellow-800', 
    icon: Truck,
    nextStatuses: ['processing', 'completed', 'on_hold', 'refunded']
  },
          completed: { 
            label: 'Completed', 
            color: 'bg-green-100 text-green-800', 
            icon: CheckCircle,
            nextStatuses: ['processing', 'shipment_in_progress', 'on_hold', 'refunded']
          },
  on_hold: { 
    label: 'On Hold', 
    color: 'bg-red-100 text-red-800', 
    icon: AlertCircle,
    nextStatuses: ['processing', 'shipment_in_progress', 'completed', 'refunded']
  },
  refunded: { 
    label: 'Refunded', 
    color: 'bg-[#F5F4E7] text-gray-800', 
    icon: RotateCcw,
    nextStatuses: ['processing', 'shipment_in_progress', 'completed', 'on_hold']
  }
}

export function StatusDropdown({ currentStatus, onStatusChange, disabled = false }: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleStatusChange = (newStatus: string) => {
    console.log('StatusDropdown: Changing status to:', newStatus)
    onStatusChange(newStatus)
    setIsOpen(false)
  }

  const currentConfig = statusConfig[currentStatus as keyof typeof statusConfig]
  const CurrentIcon = currentConfig?.icon || Clock
  const availableStatuses = currentConfig?.nextStatuses || []

  // Include current status in available options
  const allAvailableStatuses = [currentStatus, ...availableStatuses]
  
  console.log('StatusDropdown: Current status:', currentStatus, 'Available statuses:', availableStatuses)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          console.log('StatusDropdown: Button clicked, disabled:', disabled, 'isOpen:', isOpen)
          !disabled && setIsOpen(!isOpen)
        }}
        disabled={disabled}
        className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
          disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:opacity-80 cursor-pointer'
        } ${currentConfig?.color || 'bg-[#F5F4E7] text-gray-800'}`}
      >
        <CurrentIcon className="w-4 h-4 mr-2" />
        {currentConfig?.label || currentStatus}
        {!disabled && (
          <ChevronDown className="w-4 h-4 ml-2" />
        )}
      </button>

      {isOpen && !disabled && (
        <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {allAvailableStatuses.map((status) => {
              const config = statusConfig[status as keyof typeof statusConfig]
              const Icon = config?.icon || Clock
              const isCurrentStatus = status === currentStatus
              
              return (
                <button
                  key={status}
                  onClick={() => !isCurrentStatus && handleStatusChange(status)}
                  disabled={isCurrentStatus}
                  className={`w-full flex items-center px-3 py-2 text-sm whitespace-nowrap ${
                    isCurrentStatus 
                      ? 'bg-[#F5F4E7] text-gray-500 cursor-not-allowed' 
                      : 'text-gray-700 hover:bg-[#F5F4E7]'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {config?.label || status}
                  {isCurrentStatus && (
                    <span className="ml-auto text-xs text-gray-500">(Current)</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
