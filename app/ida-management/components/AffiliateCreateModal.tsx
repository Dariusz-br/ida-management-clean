'use client'

import { useState } from 'react'
import { X, Save, Building2, Mail, Phone, MapPin, DollarSign, Link, FileText, User } from 'lucide-react'

interface AffiliateCreateModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (affiliateData: any) => void
}

export function AffiliateCreateModal({ isOpen, onClose, onCreate }: AffiliateCreateModalProps) {
  const [newAffiliate, setNewAffiliate] = useState({
    name: '',
    contactPerson: '',
    email: '',
    website: '',
    phone: '',
    address: '',
    commission: 10,
    paymentMethod: 'bank_transfer',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    paypalEmail: '',
    stripeAccount: '',
    status: 'pending',
    notes: '',
    referralCode: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCreating, setIsCreating] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!newAffiliate.name.trim()) {
      newErrors.name = 'Company name is required'
    }
    if (!newAffiliate.contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person is required'
    }
    if (!newAffiliate.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(newAffiliate.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!newAffiliate.website.trim()) {
      newErrors.website = 'Website is required'
    }
    if (newAffiliate.commission < 1 || newAffiliate.commission > 50) {
      newErrors.commission = 'Commission must be between 1% and 50%'
    }
    if (newAffiliate.paymentMethod === 'bank_transfer' && !newAffiliate.bankName.trim()) {
      newErrors.bankName = 'Bank name is required for bank transfer'
    }
    if (newAffiliate.paymentMethod === 'paypal' && !newAffiliate.paypalEmail.trim()) {
      newErrors.paypalEmail = 'PayPal email is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateReferralCode = () => {
    const prefix = newAffiliate.name.split(' ').map(word => word[0]).join('').toUpperCase()
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `${prefix}${random}`
  }

  const handleCreate = async () => {
    if (!validateForm()) return

    setIsCreating(true)
    
    // Generate referral code if not provided
    if (!newAffiliate.referralCode.trim()) {
      setNewAffiliate(prev => ({ ...prev, referralCode: generateReferralCode() }))
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const affiliateData = {
      ...newAffiliate,
      id: Date.now().toString(),
      joinDate: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      clicks: 0,
      conversions: 0,
      revenue: 0,
      earnings: 0,
      conversionRate: 0
    }

    onCreate(affiliateData)
    setIsCreating(false)
    onClose()
    
    // Reset form
    setNewAffiliate({
      name: '',
      contactPerson: '',
      email: '',
      website: '',
      phone: '',
      address: '',
      commission: 10,
      paymentMethod: 'bank_transfer',
      bankName: '',
      accountNumber: '',
      routingNumber: '',
      paypalEmail: '',
      stripeAccount: '',
      status: 'pending',
      notes: '',
      referralCode: ''
    })
    setErrors({})
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Affiliate</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
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
                  value={newAffiliate.name}
                  onChange={(e) => setNewAffiliate(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter company name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person *</label>
                <input
                  type="text"
                  value={newAffiliate.contactPerson}
                  onChange={(e) => setNewAffiliate(prev => ({ ...prev, contactPerson: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.contactPerson ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter contact person name"
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
                  value={newAffiliate.email}
                  onChange={(e) => setNewAffiliate(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="contact@company.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website *</label>
                <input
                  type="url"
                  value={newAffiliate.website}
                  onChange={(e) => setNewAffiliate(prev => ({ ...prev, website: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.website ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="https://company.com"
                />
                {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={newAffiliate.phone}
                  onChange={(e) => setNewAffiliate(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={newAffiliate.address}
                  onChange={(e) => setNewAffiliate(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="123 Main St, City, State 12345"
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
                  value={newAffiliate.commission}
                  onChange={(e) => setNewAffiliate(prev => ({ ...prev, commission: parseInt(e.target.value) || 0 }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.commission ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.commission && <p className="text-red-500 text-xs mt-1">{errors.commission}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  value={newAffiliate.paymentMethod}
                  onChange={(e) => setNewAffiliate(prev => ({ ...prev, paymentMethod: e.target.value }))}
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
            {newAffiliate.paymentMethod === 'bank_transfer' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name *</label>
                  <input
                    type="text"
                    value={newAffiliate.bankName}
                    onChange={(e) => setNewAffiliate(prev => ({ ...prev, bankName: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.bankName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Bank of America"
                  />
                  {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                  <input
                    type="text"
                    value={newAffiliate.accountNumber}
                    onChange={(e) => setNewAffiliate(prev => ({ ...prev, accountNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="1234567890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Routing Number</label>
                  <input
                    type="text"
                    value={newAffiliate.routingNumber}
                    onChange={(e) => setNewAffiliate(prev => ({ ...prev, routingNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="021000021"
                  />
                </div>
              </div>
            )}

            {newAffiliate.paymentMethod === 'paypal' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PayPal Email *</label>
                <input
                  type="email"
                  value={newAffiliate.paypalEmail}
                  onChange={(e) => setNewAffiliate(prev => ({ ...prev, paypalEmail: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.paypalEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="paypal@company.com"
                />
                {errors.paypalEmail && <p className="text-red-500 text-xs mt-1">{errors.paypalEmail}</p>}
              </div>
            )}

            {newAffiliate.paymentMethod === 'stripe' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stripe Account ID</label>
                <input
                  type="text"
                  value={newAffiliate.stripeAccount}
                  onChange={(e) => setNewAffiliate(prev => ({ ...prev, stripeAccount: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="acct_1234567890"
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
                  value={newAffiliate.status}
                  onChange={(e) => setNewAffiliate(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Referral Code</label>
                <div className="flex">
                  <input
                    type="text"
                    value={newAffiliate.referralCode}
                    onChange={(e) => setNewAffiliate(prev => ({ ...prev, referralCode: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Will be auto-generated if empty"
                  />
                  <button
                    type="button"
                    onClick={() => setNewAffiliate(prev => ({ ...prev, referralCode: generateReferralCode() }))}
                    className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={newAffiliate.notes}
                onChange={(e) => setNewAffiliate(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={3}
                placeholder="Additional notes about this affiliate..."
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
            onClick={handleCreate}
            disabled={isCreating}
            className="flex items-center space-x-2 px-4 py-2 bg-[#00473A] text-white rounded-lg hover:bg-[#00473A]/90 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isCreating ? 'Creating...' : 'Create Affiliate'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

