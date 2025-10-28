'use client'

import { useState, useEffect } from 'react'
import { X, Save, Building2, Mail, Phone, MapPin, DollarSign, Link, FileText, User, TrendingUp, BarChart3 } from 'lucide-react'

interface AffiliateEditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (affiliateData: any) => void
  affiliate: any
}

export function AffiliateEditModal({ isOpen, onClose, onSave, affiliate }: AffiliateEditModalProps) {
  const [editedAffiliate, setEditedAffiliate] = useState(affiliate)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (affiliate) {
      setEditedAffiliate(affiliate)
    }
  }, [affiliate])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!editedAffiliate.name.trim()) {
      newErrors.name = 'Company name is required'
    }
    if (!editedAffiliate.contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person is required'
    }
    if (!editedAffiliate.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(editedAffiliate.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!editedAffiliate.website.trim()) {
      newErrors.website = 'Website is required'
    }
    if (editedAffiliate.commission < 1 || editedAffiliate.commission > 50) {
      newErrors.commission = 'Commission must be between 1% and 50%'
    }
    if (editedAffiliate.paymentMethod === 'bank_transfer' && !editedAffiliate.bankName.trim()) {
      newErrors.bankName = 'Bank name is required for bank transfer'
    }
    if (editedAffiliate.paymentMethod === 'paypal' && !editedAffiliate.paypalEmail.trim()) {
      newErrors.paypalEmail = 'PayPal email is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return

    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onSave(editedAffiliate)
    setIsSaving(false)
    onClose()
  }

  if (!isOpen || !affiliate) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Affiliate - {affiliate.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Performance Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center mb-4">
              <BarChart3 className="w-5 h-5 mr-2" />
              Performance Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{affiliate.clicks.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Clicks</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{affiliate.conversions}</p>
                <p className="text-sm text-gray-600">Conversions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">${affiliate.revenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Revenue</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">${affiliate.earnings.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Earnings</p>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Building2 className="w-5 h-5 mr-2" />
              Company Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  value={editedAffiliate.name}
                  onChange={(e) => setEditedAffiliate((prev: any) => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person *</label>
                <input
                  type="text"
                  value={editedAffiliate.contactPerson}
                  onChange={(e) => setEditedAffiliate((prev: any) => ({ ...prev, contactPerson: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.contactPerson ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.contactPerson && <p className="text-red-500 text-xs mt-1">{errors.contactPerson}</p>}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  value={editedAffiliate.email}
                  onChange={(e) => setEditedAffiliate((prev: any) => ({ ...prev, email: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website *</label>
                <input
                  type="url"
                  value={editedAffiliate.website}
                  onChange={(e) => setEditedAffiliate((prev: any) => ({ ...prev, website: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.website ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={editedAffiliate.phone || ''}
                  onChange={(e) => setEditedAffiliate((prev: any) => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={editedAffiliate.address || ''}
                  onChange={(e) => setEditedAffiliate((prev: any) => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Commission & Payment */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Commission & Payment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Commission Rate (%) *</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={editedAffiliate.commission}
                  onChange={(e) => setEditedAffiliate((prev: any) => ({ ...prev, commission: parseInt(e.target.value) || 0 }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.commission ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.commission && <p className="text-red-500 text-xs mt-1">{errors.commission}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  value={editedAffiliate.paymentMethod}
                  onChange={(e) => setEditedAffiliate((prev: any) => ({ ...prev, paymentMethod: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                  <option value="stripe">Stripe</option>
                  <option value="check">Check</option>
                </select>
              </div>
            </div>

            {/* Payment Details */}
            {editedAffiliate.paymentMethod === 'bank_transfer' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name *</label>
                  <input
                    type="text"
                    value={editedAffiliate.bankName || ''}
                    onChange={(e) => setEditedAffiliate((prev: any) => ({ ...prev, bankName: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.bankName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                  <input
                    type="text"
                    value={editedAffiliate.accountNumber || ''}
                    onChange={(e) => setEditedAffiliate((prev: any) => ({ ...prev, accountNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Routing Number</label>
                  <input
                    type="text"
                    value={editedAffiliate.routingNumber || ''}
                    onChange={(e) => setEditedAffiliate((prev: any) => ({ ...prev, routingNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {editedAffiliate.paymentMethod === 'paypal' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PayPal Email *</label>
                <input
                  type="email"
                  value={editedAffiliate.paypalEmail || ''}
                  onChange={(e) => setEditedAffiliate((prev: any) => ({ ...prev, paypalEmail: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.paypalEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.paypalEmail && <p className="text-red-500 text-xs mt-1">{errors.paypalEmail}</p>}
              </div>
            )}

            {editedAffiliate.paymentMethod === 'stripe' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stripe Account ID</label>
                <input
                  type="text"
                  value={editedAffiliate.stripeAccount || ''}
                  onChange={(e) => setEditedAffiliate((prev: any) => ({ ...prev, stripeAccount: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editedAffiliate.status}
                  onChange={(e) => setEditedAffiliate((prev: any) => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Referral Code</label>
                <div className="flex">
                  <input
                    type="text"
                    value={editedAffiliate.referralCode}
                    onChange={(e) => setEditedAffiliate((prev: any) => ({ ...prev, referralCode: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const prefix = editedAffiliate.name.split(' ').map((word: string) => word[0]).join('').toUpperCase()
                      const random = Math.random().toString(36).substring(2, 8).toUpperCase()
                      setEditedAffiliate((prev: any) => ({ ...prev, referralCode: `${prefix}${random}` }))
                    }}
                    className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200"
                  >
                    Regenerate
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={editedAffiliate.notes || ''}
                onChange={(e) => setEditedAffiliate((prev: any) => ({ ...prev, notes: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
