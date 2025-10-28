'use client'

import { useState, useEffect } from 'react'
import { X, Percent, DollarSign, Calendar, Users, Hash, BarChart3 } from 'lucide-react'

interface DiscountEditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (discount: any) => void
  discount: any
}

export function DiscountEditModal({ isOpen, onClose, onSave, discount }: DiscountEditModalProps) {
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    type: 'percentage',
    value: '',
    status: 'active',
    usageLimit: '',
    validFrom: '',
    validTo: '',
    minimumOrderAmount: '',
    customerSegment: 'all',
    maxUsesPerCustomer: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (discount) {
      setFormData({
        code: discount.code || '',
        description: discount.description || '',
        type: discount.type || 'percentage',
        value: discount.value?.toString() || '',
        status: discount.status || 'active',
        usageLimit: discount.limit?.toString() || '',
        validFrom: discount.validFrom || '',
        validTo: discount.validTo || '',
        minimumOrderAmount: discount.minimumOrderAmount?.toString() || '',
        customerSegment: discount.customerSegment || 'all',
        maxUsesPerCustomer: discount.maxUsesPerCustomer?.toString() || ''
      })
    }
  }, [discount])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.code.trim()) newErrors.code = 'Discount code is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.value || parseFloat(formData.value) <= 0) newErrors.value = 'Valid value is required'
    if (!formData.validFrom) newErrors.validFrom = 'Start date is required'
    if (!formData.validTo) newErrors.validTo = 'End date is required'
    if (formData.validFrom && formData.validTo && new Date(formData.validFrom) >= new Date(formData.validTo)) {
      newErrors.validTo = 'End date must be after start date'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      const updatedDiscount = {
        ...discount,
        code: formData.code.toUpperCase(),
        description: formData.description,
        type: formData.type,
        value: parseFloat(formData.value),
        status: formData.status,
        limit: formData.usageLimit ? parseInt(formData.usageLimit) : null,
        validFrom: formData.validFrom,
        validTo: formData.validTo,
        minimumOrderAmount: formData.minimumOrderAmount ? parseFloat(formData.minimumOrderAmount) : null,
        customerSegment: formData.customerSegment,
        maxUsesPerCustomer: formData.maxUsesPerCustomer ? parseInt(formData.maxUsesPerCustomer) : null
      }
      onSave(updatedDiscount)
      onClose()
    }
  }

  if (!isOpen || !discount) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Edit Discount</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Usage Statistics */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <BarChart3 className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-sm font-medium text-gray-900">Usage Statistics</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Total Usage:</span>
                <span className="ml-2 font-medium">{discount.usage || 0}</span>
              </div>
              <div>
                <span className="text-gray-600">Usage Limit:</span>
                <span className="ml-2 font-medium">{discount.limit || 'Unlimited'}</span>
              </div>
            </div>
            {discount.limit && (
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${Math.min((discount.usage / discount.limit) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {Math.round((discount.usage / discount.limit) * 100)}% of limit used
                </p>
              </div>
            )}
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Code *
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => handleInputChange('code', e.target.value.toUpperCase())}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.code ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="WELCOME10"
                />
              </div>
              {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Welcome discount for new customers"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Discount Type and Value */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Type
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="percentage"
                    checked={formData.type === 'percentage'}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="mr-2"
                  />
                  <span className="flex items-center">
                    <Percent className="w-4 h-4 mr-1" />
                    Percentage
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="fixed"
                    checked={formData.type === 'fixed'}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="mr-2"
                  />
                  <span className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Fixed Amount
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Value *
              </label>
              <div className="relative">
                {formData.type === 'percentage' ? (
                  <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                ) : (
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                )}
                <input
                  type="number"
                  value={formData.value}
                  onChange={(e) => handleInputChange('value', e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.value ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={formData.type === 'percentage' ? '10' : '5.00'}
                  min="0"
                  step={formData.type === 'percentage' ? '1' : '0.01'}
                />
              </div>
              {errors.value && <p className="text-red-500 text-xs mt-1">{errors.value}</p>}
            </div>
          </div>

          {/* Usage Limits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usage Limit
              </label>
              <input
                type="number"
                value={formData.usageLimit}
                onChange={(e) => handleInputChange('usageLimit', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="1000 (leave empty for unlimited)"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Uses Per Customer
              </label>
              <input
                type="number"
                value={formData.maxUsesPerCustomer}
                onChange={(e) => handleInputChange('maxUsesPerCustomer', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="1 (leave empty for unlimited)"
                min="1"
              />
            </div>
          </div>

          {/* Validity Period */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valid From *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  value={formData.validFrom}
                  onChange={(e) => handleInputChange('validFrom', e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.validFrom ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.validFrom && <p className="text-red-500 text-xs mt-1">{errors.validFrom}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valid To *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  value={formData.validTo}
                  onChange={(e) => handleInputChange('validTo', e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.validTo ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.validTo && <p className="text-red-500 text-xs mt-1">{errors.validTo}</p>}
            </div>
          </div>

          {/* Additional Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Order Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="number"
                  value={formData.minimumOrderAmount}
                  onChange={(e) => handleInputChange('minimumOrderAmount', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="50.00 (leave empty for no minimum)"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Segment
              </label>
              <select
                value={formData.customerSegment}
                onChange={(e) => handleInputChange('customerSegment', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Customers</option>
                <option value="new">New Customers Only</option>
                <option value="returning">Returning Customers Only</option>
                <option value="vip">VIP Customers Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

