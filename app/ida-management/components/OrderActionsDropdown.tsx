'use client'

import { useState, useRef, useEffect } from 'react'
import { MoreHorizontal, RotateCcw, FileText, CreditCard, Archive, Eye } from 'lucide-react'

interface OrderActionsDropdownProps {
  order: any
  onAction: (action: string, order: any) => void
}

export function OrderActionsDropdown({ order, onAction }: OrderActionsDropdownProps) {
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
        className="text-gray-400 hover:text-gray-600 p-1 rounded-xl hover:bg-gray-100"
        title="More actions"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
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

