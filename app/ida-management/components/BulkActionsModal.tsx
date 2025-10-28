'use client'

import { useState } from 'react'
import { X, Save, Package, FileText, Printer, Download, Mail, AlertCircle } from 'lucide-react'

interface BulkActionsModalProps {
  selectedOrders: string[]
  isOpen: boolean
  onClose: () => void
  onExecute: (action: string, data: any) => void
}

export function BulkActionsModal({ selectedOrders, isOpen, onClose, onExecute }: BulkActionsModalProps) {
  const [selectedAction, setSelectedAction] = useState('')
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const actions = [
    {
      id: 'change_status',
      label: 'Change Status',
      description: 'Update status for all selected orders',
      icon: Package,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'generate_documents',
      label: 'Generate Documents',
      description: 'Generate documents for all selected orders',
      icon: FileText,
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 'queue_print',
      label: 'Queue for Print',
      description: 'Add orders to print queue',
      icon: Printer,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'export_csv',
      label: 'Export CSV',
      description: 'Export order data to CSV file',
      icon: Download,
      color: 'bg-gray-100 text-gray-800'
    },
    {
      id: 'send_email',
      label: 'Send Email',
      description: 'Send email notifications to customers',
      icon: Mail,
      color: 'bg-yellow-100 text-yellow-800'
    }
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!selectedAction) {
      newErrors.action = 'Please select an action'
    }
    
    if (selectedAction === 'send_email' && !notes.trim()) {
      newErrors.notes = 'Email content is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleExecute = () => {
    if (validateForm()) {
      onExecute(selectedAction, {
        orderIds: selectedOrders,
        notes: notes.trim(),
        timestamp: new Date().toISOString()
      })
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Bulk Actions</h2>
            <p className="text-sm text-gray-500">{selectedOrders.length} order{selectedOrders.length > 1 ? 's' : ''} selected</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Action Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Action *</label>
            <div className="space-y-2">
              {actions.map((action) => {
                const Icon = action.icon
                return (
                  <label
                    key={action.id}
                    className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      selectedAction === action.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="action"
                      value={action.id}
                      checked={selectedAction === action.id}
                      onChange={(e) => setSelectedAction(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{action.label}</p>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                  </label>
                )
              })}
            </div>
            {errors.action && <p className="text-sm text-red-600 mt-1">{errors.action}</p>}
          </div>

          {/* Action Details */}
          {selectedAction && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {actions.find(a => a.id === selectedAction)?.label}
                  </p>
                  <p className="text-sm text-gray-600">
                    This action will be applied to {selectedOrders.length} order{selectedOrders.length > 1 ? 's' : ''}.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Notes/Email Content */}
          {selectedAction && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {selectedAction === 'send_email' ? 'Email Content' : 'Notes'}
                {selectedAction === 'send_email' && <span className="text-red-500"> *</span>}
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none ${
                  errors.notes ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder={
                  selectedAction === 'send_email' 
                    ? 'Enter email content to send to customers...'
                    : 'Add notes about this bulk action...'
                }
              />
              {errors.notes && <p className="text-sm text-red-600 mt-1">{errors.notes}</p>}
            </div>
          )}

          {/* Selected Orders Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Selected Orders</label>
            <div className="max-h-32 overflow-y-auto border border-gray-200 rounded-lg">
              <div className="p-3 space-y-1">
                {selectedOrders.map((orderId, index) => (
                  <div key={orderId} className="flex items-center justify-between text-sm">
                    <span className="text-gray-900">{orderId}</span>
                    <span className="text-gray-500">#{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleExecute}
            className="flex items-center space-x-2 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Save className="w-4 h-4" />
            <span>Execute Action</span>
          </button>
        </div>
      </div>
    </div>
  )
}

