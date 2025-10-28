'use client'

import { useState } from 'react'
import { X, Save, Clock, Truck, CheckCircle, AlertCircle, RotateCcw, FileText } from 'lucide-react'

interface OrderStatusModalProps {
  order: {
    id: string
    orderId: string
    customer: string
    currentStatus: string
    amount: string
  }
  isOpen: boolean
  onClose: () => void
  onSave: (orderData: any) => void
}

export function OrderStatusModal({ order, isOpen, onClose, onSave }: OrderStatusModalProps) {
  const [newStatus, setNewStatus] = useState(order.currentStatus)
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const statusConfig = {
    processing: { 
      label: 'Processing', 
      color: 'bg-blue-100 text-blue-800', 
      icon: Clock,
      description: 'Order is being reviewed and documents are being verified'
    },
    shipment_in_progress: { 
      label: 'Shipment in Progress', 
      color: 'bg-yellow-100 text-yellow-800', 
      icon: Truck,
      description: 'Order is ready to ship and tracking information will be provided'
    },
    completed: { 
      label: 'Completed', 
      color: 'bg-green-100 text-green-800', 
      icon: CheckCircle,
      description: 'Order has been fulfilled and delivered to customer'
    },
    on_hold: { 
      label: 'On Hold', 
      color: 'bg-red-100 text-red-800', 
      icon: AlertCircle,
      description: 'Order requires attention or additional information'
    },
    refunded: { 
      label: 'Refunded', 
      color: 'bg-gray-100 text-gray-800', 
      icon: RotateCcw,
      description: 'Order has been cancelled and refunded to customer'
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!newStatus) {
      newErrors.status = 'Please select a status'
    }
    
    if (newStatus === 'on_hold' && !notes.trim()) {
      newErrors.notes = 'Notes are required when placing order on hold'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        ...order,
        status: newStatus,
        notes: notes.trim(),
        timestamp: new Date().toISOString()
      })
      onClose()
    }
  }

  const getAvailableStatuses = () => {
    const currentStatus = order.currentStatus
    const statusFlow = {
      processing: ['shipment_in_progress', 'on_hold', 'refunded'],
      shipment_in_progress: ['completed', 'on_hold', 'refunded'],
      on_hold: ['processing', 'shipment_in_progress', 'refunded'],
      completed: ['refunded'],
      refunded: []
    }
    
    return statusFlow[currentStatus as keyof typeof statusFlow] || []
  }

  if (!isOpen) return null

  const availableStatuses = getAvailableStatuses()
  const currentStatusConfig = statusConfig[order.currentStatus as keyof typeof statusConfig]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Change Order Status</h2>
            <p className="text-sm text-gray-500">Order: {order.orderId}</p>
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
          {/* Order Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Customer</p>
                <p className="text-sm text-gray-600">{order.customer}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Amount</p>
                <p className="text-sm text-gray-600">${order.amount}</p>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Status</label>
            <div className={`inline-flex items-center px-3 py-2 text-sm font-semibold rounded-full ${currentStatusConfig.color}`}>
              <currentStatusConfig.icon className="w-4 h-4 mr-2" />
              {currentStatusConfig.label}
            </div>
            <p className="text-sm text-gray-500 mt-1">{currentStatusConfig.description}</p>
          </div>

          {/* New Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Status *</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.status ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select new status</option>
              {availableStatuses.map((status) => {
                const config = statusConfig[status as keyof typeof statusConfig]
                return (
                  <option key={status} value={status}>
                    {config.label}
                  </option>
                )
              })}
            </select>
            {errors.status && <p className="text-sm text-red-600 mt-1">{errors.status}</p>}
          </div>

          {/* Status Preview */}
          {newStatus && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${statusConfig[newStatus as keyof typeof statusConfig].color}`}>
                  {(() => {
                    const Icon = statusConfig[newStatus as keyof typeof statusConfig].icon
                    return <Icon className="w-5 h-5" />
                  })()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {statusConfig[newStatus as keyof typeof statusConfig].label}
                  </p>
                  <p className="text-sm text-gray-600">
                    {statusConfig[newStatus as keyof typeof statusConfig].description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Notes
              {newStatus === 'on_hold' && <span className="text-red-500"> *</span>}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none ${
                errors.notes ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Add notes about this status change..."
            />
            {errors.notes && <p className="text-sm text-red-600 mt-1">{errors.notes}</p>}
            {newStatus === 'on_hold' && (
              <p className="text-sm text-gray-500 mt-1">Please explain why this order is being placed on hold.</p>
            )}
          </div>

          {/* Status Change History */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recent Status Changes</label>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Processing → {order.currentStatus}</span>
                <span className="text-gray-400">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Order created</span>
                <span className="text-gray-400">3 hours ago</span>
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
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 text-sm bg-[#00473A] text-white rounded-lg hover:bg-[#00473A]/90"
          >
            <Save className="w-4 h-4" />
            <span>Update Status</span>
          </button>
        </div>
      </div>
    </div>
  )
}
