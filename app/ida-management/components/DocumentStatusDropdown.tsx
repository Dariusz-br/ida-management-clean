'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react'

interface DocumentStatusDropdownProps {
  currentStatus: 'missing' | 'pending' | 'approved' | 'rejected'
  onStatusChange: (newStatus: 'pending' | 'approved' | 'rejected') => void
  onRejectionNote?: (note: string) => void
  disabled?: boolean
}

const statusConfig = {
  pending: { 
    label: 'Pending', 
    color: 'bg-yellow-100 text-yellow-800', 
    icon: Clock,
    description: 'Awaiting review'
  },
  approved: { 
    label: 'Approved', 
    color: 'bg-green-100 text-green-800', 
    icon: CheckCircle,
    description: 'Document approved'
  },
  rejected: { 
    label: 'Rejected', 
    color: 'bg-red-100 text-red-800', 
    icon: XCircle,
    description: 'Document rejected'
  }
}

export function DocumentStatusDropdown({ 
  currentStatus, 
  onStatusChange, 
  onRejectionNote,
  disabled = false 
}: DocumentStatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showRejectionModal, setShowRejectionModal] = useState(false)
  const [rejectionNote, setRejectionNote] = useState('')
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

  const handleStatusChange = (newStatus: 'pending' | 'approved' | 'rejected') => {
    if (newStatus === 'rejected') {
      setShowRejectionModal(true)
    } else {
      onStatusChange(newStatus)
      setIsOpen(false)
    }
  }

  const handleRejectionSave = () => {
    if (rejectionNote.trim()) {
      onStatusChange('rejected')
      onRejectionNote?.(rejectionNote)
      setRejectionNote('')
      setShowRejectionModal(false)
      setIsOpen(false)
    }
  }

  const currentConfig = statusConfig[currentStatus as keyof typeof statusConfig]
  const CurrentIcon = currentConfig?.icon || Clock

  const availableStatuses = Object.keys(statusConfig).filter(status => status !== currentStatus) as ('pending' | 'approved' | 'rejected')[]

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full transition-colors ${
            disabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:opacity-80 cursor-pointer'
          } ${currentConfig?.color || 'bg-gray-100 text-gray-800'}`}
        >
          <CurrentIcon className="w-3 h-3 mr-1" />
          {currentConfig?.label || currentStatus}
          {!disabled && (
            <ChevronDown className="w-3 h-3 ml-1" />
          )}
        </button>

        {isOpen && !disabled && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
            <div className="py-1">
              {availableStatuses.map((status) => {
                const config = statusConfig[status]
                const Icon = config?.icon || Clock
                
                return (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {config?.label || status}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Rejection Note Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 max-w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Document Rejection</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Please provide a reason for rejecting this document. This note will be automatically emailed to the customer.
            </p>
            <textarea
              value={rejectionNote}
              onChange={(e) => setRejectionNote(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full h-24 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
            />
            <div className="flex items-center justify-end space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowRejectionModal(false)
                  setRejectionNote('')
                }}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectionSave}
                disabled={!rejectionNote.trim()}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save & Email
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

