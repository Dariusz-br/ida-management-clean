'use client'

import { X, Percent, DollarSign, Calendar, Users, Hash, BarChart3, TrendingUp, Clock, Target } from 'lucide-react'

interface DiscountViewModalProps {
  isOpen: boolean
  onClose: () => void
  discount: any
}

export function DiscountViewModal({ isOpen, onClose, discount }: DiscountViewModalProps) {
  if (!isOpen || !discount) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'expired': return 'bg-red-100 text-red-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getUsagePercentage = () => {
    if (!discount.limit) return 0
    return Math.min((discount.usage / discount.limit) * 100, 100)
  }

  const getDaysRemaining = () => {
    const today = new Date()
    const endDate = new Date(discount.validTo)
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const isExpired = () => {
    return new Date() > new Date(discount.validTo)
  }

  const isActive = () => {
    const today = new Date()
    const startDate = new Date(discount.validFrom)
    const endDate = new Date(discount.validTo)
    return today >= startDate && today <= endDate && discount.status === 'active'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{discount.code}</h2>
            <p className="text-sm text-gray-500">{discount.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Status and Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Target className="w-4 h-4 text-gray-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">Status</span>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(discount.status)}`}>
                {discount.status}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                {discount.type === 'percentage' ? (
                  <Percent className="w-4 h-4 text-gray-600 mr-2" />
                ) : (
                  <DollarSign className="w-4 h-4 text-gray-600 mr-2" />
                )}
                <span className="text-sm font-medium text-gray-900">Discount Value</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {discount.type === 'percentage' ? `${discount.value}%` : `$${discount.value}`}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Clock className="w-4 h-4 text-gray-600 mr-2" />
                <span className="text-sm font-medium text-gray-900">Days Remaining</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {isExpired() ? 'Expired' : getDaysRemaining()}
              </span>
            </div>
          </div>

          {/* Usage Statistics */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-sm font-medium text-gray-900">Usage Statistics</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold text-blue-600">{discount.usage || 0}</div>
                <div className="text-sm text-gray-600">Total Uses</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {discount.limit || '∞'}
                </div>
                <div className="text-sm text-gray-600">Usage Limit</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {discount.limit ? `${Math.round(getUsagePercentage())}%` : 'N/A'}
                </div>
                <div className="text-sm text-gray-600">Usage Rate</div>
              </div>
            </div>
            {discount.limit && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${getUsagePercentage()}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {discount.usage} of {discount.limit} uses ({Math.round(getUsagePercentage())}% utilized)
                </p>
              </div>
            )}
          </div>

          {/* Validity Period */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <Calendar className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="text-sm font-medium text-gray-900">Validity Period</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Valid From</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatDate(discount.validFrom)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Valid To</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatDate(discount.validTo)}
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Current Status:</span>
                <span className={`text-sm font-medium ${
                  isActive() ? 'text-green-600' : isExpired() ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {isActive() ? 'Active Now' : isExpired() ? 'Expired' : 'Not Yet Active'}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Usage Restrictions</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Max Uses Per Customer:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {discount.maxUsesPerCustomer || 'Unlimited'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Minimum Order Amount:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {discount.minimumOrderAmount ? `$${discount.minimumOrderAmount}` : 'No minimum'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Customer Targeting</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Customer Segment:</span>
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {discount.customerSegment?.replace('_', ' ') || 'All Customers'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Targeting:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {discount.customerSegment === 'all' ? 'All Customers' : 'Segmented'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
              <h3 className="text-sm font-medium text-gray-900">Performance Metrics</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {discount.usage || 0}
                </div>
                <div className="text-sm text-gray-600">Total Redemptions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {discount.limit ? `${Math.round((discount.usage / discount.limit) * 100)}%` : 'N/A'}
                </div>
                <div className="text-sm text-gray-600">Utilization Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {getDaysRemaining() > 0 ? getDaysRemaining() : 0}
                </div>
                <div className="text-sm text-gray-600">Days Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {discount.usage > 0 ? Math.round(discount.usage / Math.max(getDaysRemaining(), 1)) : 0}
                </div>
                <div className="text-sm text-gray-600">Avg Uses/Day</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

