'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, MapPin, Globe } from 'lucide-react'

interface OperationDropdownProps {
  currentOperation: string
  onOperationChange: (newOperation: string) => void
  disabled?: boolean
}

const operationConfig = {
  'UK OP': { 
    label: 'UK Operation', 
    color: 'bg-blue-100 text-blue-800', 
    icon: MapPin,
    description: 'Handles Europe, North America, South America'
  },
  'China OP': { 
    label: 'China Operation', 
    color: 'bg-red-100 text-red-800', 
    icon: Globe,
    description: 'Handles Asia, Africa, Oceania, and other regions'
  }
}

export function OperationDropdown({ currentOperation, onOperationChange, disabled = false }: OperationDropdownProps) {
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

  const handleOperationChange = (newOperation: string) => {
    console.log('OperationDropdown: Changing operation to:', newOperation)
    onOperationChange(newOperation)
    setIsOpen(false)
  }

  const currentConfig = operationConfig[currentOperation as keyof typeof operationConfig]
  const CurrentIcon = currentConfig?.icon || MapPin
  const availableOperations = Object.keys(operationConfig)
  
  console.log('OperationDropdown: Current operation:', currentOperation, 'Available operations:', availableOperations)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          console.log('OperationDropdown: Button clicked, disabled:', disabled, 'isOpen:', isOpen)
          !disabled && setIsOpen(!isOpen)
        }}
        disabled={disabled}
        className={`inline-flex items-center px-3 py-2 text-sm font-semibold rounded-xl transition-colors ${
          disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:opacity-80 cursor-pointer'
        } ${currentConfig?.color || 'bg-gray-100 text-gray-800'}`}
      >
        <CurrentIcon className="w-4 h-4 mr-2" />
        {currentConfig?.label || currentOperation}
        {!disabled && (
          <ChevronDown className="w-4 h-4 ml-2" />
        )}
      </button>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {availableOperations.map((operation) => {
              const config = operationConfig[operation as keyof typeof operationConfig]
              const Icon = config?.icon || MapPin
              const isCurrentOperation = operation === currentOperation
              
              return (
                <button
                  key={operation}
                  onClick={() => !isCurrentOperation && handleOperationChange(operation)}
                  disabled={isCurrentOperation}
                  className={`w-full flex items-start px-3 py-3 text-sm ${
                    isCurrentOperation 
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">{config?.label || operation}</div>
                    <div className="text-xs text-gray-500 mt-1">{config?.description}</div>
                    {isCurrentOperation && (
                      <span className="text-xs text-gray-500">(Current)</span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

