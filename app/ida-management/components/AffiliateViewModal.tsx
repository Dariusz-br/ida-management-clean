'use client'

import { useState } from 'react'
import { X, Copy, Download, Mail, Phone, MapPin, DollarSign, Link, FileText, User, TrendingUp, BarChart3, Calendar, Globe, CreditCard } from 'lucide-react'

interface AffiliateViewModalProps {
  isOpen: boolean
  onClose: () => void
  affiliate: any
}

export function AffiliateViewModal({ isOpen, onClose, affiliate }: AffiliateViewModalProps) {
  const [activeTab, setActiveTab] = useState('overview')

  if (!isOpen || !affiliate) return null

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
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const generateReferralLink = () => {
    return `https://yourdomain.com/ref/${affiliate.referralCode}`
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'payment', label: 'Payment', icon: DollarSign },
    { id: 'links', label: 'Referral Links', icon: Link }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{affiliate.name}</h2>
            <p className="text-sm text-gray-500">{affiliate.email}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Status and Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(affiliate.status)}`}>
                        {affiliate.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Contact Person</span>
                      <span className="text-sm font-medium">{affiliate.contactPerson}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Website</span>
                      <a href={affiliate.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                        {affiliate.website}
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Join Date</span>
                      <span className="text-sm font-medium">{formatDate(affiliate.joinDate)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Activity</span>
                      <span className="text-sm font-medium">{formatDate(affiliate.lastActivity)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
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
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Conversion Rate</span>
                      <span className="text-sm font-medium">{affiliate.conversionRate.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Contact Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{affiliate.email}</span>
                  </div>
                  {affiliate.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{affiliate.phone}</span>
                    </div>
                  )}
                  {affiliate.address && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{affiliate.address}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <a href={affiliate.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                      {affiliate.website}
                    </a>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {affiliate.notes && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Notes
                  </h3>
                  <p className="text-sm text-gray-600">{affiliate.notes}</p>
                </div>
              )}
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Total Clicks</p>
                      <p className="text-2xl font-bold text-blue-900">{affiliate.clicks.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Conversions</p>
                      <p className="text-2xl font-bold text-green-900">{affiliate.conversions}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Conversion Rate</p>
                      <p className="text-2xl font-bold text-purple-900">{affiliate.conversionRate.toFixed(2)}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Revenue and Earnings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Generated</h3>
                  <div className="text-3xl font-bold text-purple-600">${affiliate.revenue.toLocaleString()}</div>
                  <p className="text-sm text-gray-600 mt-2">Total revenue generated through this affiliate</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Commission Earned</h3>
                  <div className="text-3xl font-bold text-orange-600">${affiliate.earnings.toFixed(2)}</div>
                  <p className="text-sm text-gray-600 mt-2">Total commission earned by this affiliate</p>
                </div>
              </div>

              {/* Performance Chart Placeholder */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Over Time</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Performance chart would be displayed here</p>
                </div>
              </div>
            </div>
          )}

          {/* Payment Tab */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Commission Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Commission Rate</span>
                      <span className="text-sm font-medium">{affiliate.commission}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Earnings</span>
                      <span className="text-sm font-medium">${affiliate.earnings.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Payment Method</span>
                      <span className="text-sm font-medium capitalize">{affiliate.paymentMethod.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Information
                  </h3>
                  <div className="space-y-3">
                    {affiliate.paymentMethod === 'bank_transfer' && (
                      <>
                        {affiliate.bankName && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Bank</span>
                            <span className="text-sm font-medium">{affiliate.bankName}</span>
                          </div>
                        )}
                        {affiliate.accountNumber && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Account</span>
                            <span className="text-sm font-medium">****{affiliate.accountNumber.slice(-4)}</span>
                          </div>
                        )}
                      </>
                    )}
                    {affiliate.paymentMethod === 'paypal' && affiliate.paypalEmail && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">PayPal Email</span>
                        <span className="text-sm font-medium">{affiliate.paypalEmail}</span>
                      </div>
                    )}
                    {affiliate.paymentMethod === 'stripe' && affiliate.stripeAccount && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Stripe Account</span>
                        <span className="text-sm font-medium">{affiliate.stripeAccount}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment History Placeholder */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment History</h3>
                <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Payment history would be displayed here</p>
                </div>
              </div>
            </div>
          )}

          {/* Referral Links Tab */}
          {activeTab === 'links' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Link className="w-5 h-5 mr-2" />
                  Referral Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Referral Code</label>
                    <div className="flex">
                      <input
                        type="text"
                        value={affiliate.referralCode}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-50"
                      />
                      <button
                        onClick={() => copyToClipboard(affiliate.referralCode)}
                        className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Referral Link</label>
                    <div className="flex">
                      <input
                        type="text"
                        value={generateReferralLink()}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-50"
                      />
                      <button
                        onClick={() => copyToClipboard(generateReferralLink())}
                        className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Link Performance */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Link Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{affiliate.clicks.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Total Clicks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{affiliate.conversions}</p>
                    <p className="text-sm text-gray-600">Conversions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{affiliate.conversionRate.toFixed(2)}%</p>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

