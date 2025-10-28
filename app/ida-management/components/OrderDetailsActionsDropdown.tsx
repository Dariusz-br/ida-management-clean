'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, RotateCcw, FileText, CreditCard, Archive, Settings } from 'lucide-react'

interface OrderDetailsActionsDropdownProps {
  order: any
  onAction: (action: string, order: any) => void
}

export function OrderDetailsActionsDropdown({ order, onAction }: OrderDetailsActionsDropdownProps) {
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

  const handleAction = (action: string) => {
    onAction(action, order)
    setIsOpen(false)
  }

  const actions = [
    {
      id: 'cancel',
      label: 'Cancel Order (Refund)',
      icon: RotateCcw,
      color: 'text-red-600 hover:bg-red-50',
      disabled: order.status === 'completed' || order.status === 'refunded'
    },
    {
      id: 'regenerate_booklet',
      label: 'Regenerate Booklet',
      icon: FileText,
      color: 'text-blue-600 hover:bg-blue-50',
      disabled: order.status === 'processing' || order.status === 'on_hold'
    },
    {
      id: 'regenerate_card',
      label: 'Regenerate Card',
      icon: CreditCard,
      color: 'text-green-600 hover:bg-green-50',
      disabled: order.status === 'processing' || order.status === 'on_hold'
    },
    {
      id: 'archive',
      label: 'Archive Order',
      icon: Archive,
      color: 'text-gray-600 hover:bg-gray-50',
      disabled: false
    }
  ]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-xl bg-[#F5F4E7] text-gray-800 hover:opacity-80 cursor-pointer"
      >
        <Settings className="w-4 h-4 mr-2" />
        Actions
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {actions.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.id}
                  onClick={() => handleAction(action.id)}
                  disabled={action.disabled}
                  className={`w-full flex items-center px-4 py-2 text-sm ${action.color} ${
                    action.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {action.label}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
