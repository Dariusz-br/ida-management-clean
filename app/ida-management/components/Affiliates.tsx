'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Edit, Trash2, Eye, Users, DollarSign, TrendingUp, Download, MoreHorizontal, CreditCard, Calendar, CheckCircle, Clock, AlertCircle, Send, RotateCcw, X } from 'lucide-react'
import { AffiliateCreateModal } from './AffiliateCreateModal'
import { AffiliateEditModal } from './AffiliateEditModal'
import { AffiliateViewModal } from './AffiliateViewModal'
import { useGenericSearch } from '../hooks/useSearch'

export function Affiliates() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [commissionFilter, setCommissionFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showPayoutModal, setShowPayoutModal] = useState(false)
  const [selectedAffiliate, setSelectedAffiliate] = useState(null)
  const [selectedPayout, setSelectedPayout] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('affiliates') // 'affiliates' or 'payouts'
  const [affiliates, setAffiliates] = useState([
    {
      id: '1',
      name: 'Travel Blog Network',
      contactPerson: 'Sarah Johnson',
      email: 'contact@travelblog.com',
      website: 'travelblog.com',
      phone: '+1-555-0123',
      address: '123 Travel St, New York, NY 10001',
      status: 'active',
      commission: 15,
      paymentMethod: 'bank_transfer',
      bankName: 'Bank of America',
      accountNumber: '1234567890',
      routingNumber: '021000021',
      referralCode: 'TBN123456',
      joinDate: '2024-01-01T00:00:00Z',
      lastActivity: '2024-01-15T10:30:00Z',
      clicks: 2450,
      conversions: 89,
      revenue: 4450,
      earnings: 667.50,
      conversionRate: 3.63,
      notes: 'High-performing travel blog with excellent conversion rates.'
    },
    {
      id: '2',
      name: 'Adventure Guides',
      contactPerson: 'Mike Chen',
      email: 'partners@adventureguides.com',
      website: 'adventureguides.com',
      phone: '+1-555-0456',
      address: '456 Adventure Ave, Los Angeles, CA 90210',
      status: 'active',
      commission: 12,
      paymentMethod: 'paypal',
      paypalEmail: 'payments@adventureguides.com',
      referralCode: 'AG789012',
      joinDate: '2024-01-15T00:00:00Z',
      lastActivity: '2024-01-14T14:20:00Z',
      clicks: 1890,
      conversions: 67,
      revenue: 3350,
      earnings: 402.00,
      conversionRate: 3.54,
      notes: 'Specializes in adventure travel content.'
    },
    {
      id: '3',
      name: 'Global Travel Hub',
      contactPerson: 'Emma Wilson',
      email: 'admin@globaltravel.com',
      website: 'globaltravel.com',
      phone: '+1-555-0789',
      address: '789 Global Blvd, Miami, FL 33101',
      status: 'pending',
      commission: 10,
      paymentMethod: 'stripe',
      stripeAccount: 'acct_1234567890',
      referralCode: 'GTH345678',
      joinDate: '2024-01-20T00:00:00Z',
      lastActivity: '2024-01-20T09:00:00Z',
      clicks: 0,
      conversions: 0,
      revenue: 0,
      earnings: 0,
      conversionRate: 0,
      notes: 'New affiliate partner, awaiting approval.'
    }
  ])

  // Payouts data
  const [payouts, setPayouts] = useState([
    {
      id: '1',
      affiliateId: '1',
      affiliateName: 'Travel Blog Network',
      amount: 667.50,
      status: 'paid',
      paymentMethod: 'bank_transfer',
      paymentDate: '2024-01-15T00:00:00Z',
      processedDate: '2024-01-15T10:30:00Z',
      period: '2024-01-01 to 2024-01-31',
      transactions: 89,
      commission: 15,
      notes: 'Monthly payout for January 2024'
    },
    {
      id: '2',
      affiliateId: '2',
      affiliateName: 'Adventure Guides',
      amount: 402.00,
      status: 'paid',
      paymentMethod: 'paypal',
      paymentDate: '2024-01-15T00:00:00Z',
      processedDate: '2024-01-15T10:30:00Z',
      period: '2024-01-01 to 2024-01-31',
      transactions: 67,
      commission: 12,
      notes: 'Monthly payout for January 2024'
    },
    {
      id: '3',
      affiliateId: '1',
      affiliateName: 'Travel Blog Network',
      amount: 234.75,
      status: 'pending',
      paymentMethod: 'bank_transfer',
      paymentDate: '2024-02-15T00:00:00Z',
      processedDate: null,
      period: '2024-02-01 to 2024-02-14',
      transactions: 34,
      commission: 15,
      notes: 'Mid-month payout for February 2024'
    },
    {
      id: '4',
      affiliateId: '3',
      affiliateName: 'Global Travel Hub',
      amount: 0,
      status: 'pending',
      paymentMethod: 'stripe',
      paymentDate: '2024-02-15T00:00:00Z',
      processedDate: null,
      period: '2024-02-01 to 2024-02-14',
      transactions: 0,
      commission: 10,
      notes: 'No earnings for this period'
    },
    {
      id: '5',
      affiliateId: '2',
      affiliateName: 'Adventure Guides',
      amount: 156.80,
      status: 'failed',
      paymentMethod: 'paypal',
      paymentDate: '2024-01-10T00:00:00Z',
      processedDate: '2024-01-10T14:20:00Z',
      period: '2023-12-16 to 2023-12-31',
      transactions: 23,
      commission: 12,
      notes: 'Payment failed - invalid PayPal email address'
    }
  ])

  const [payoutStatusFilter, setPayoutStatusFilter] = useState('all')
  const [payoutMethodFilter, setPayoutMethodFilter] = useState('all')
  
  // Use search hook for filtering affiliates
  const searchFilteredAffiliates = useGenericSearch(affiliates, searchTerm, ['name', 'contactPerson', 'email', 'website', 'referralCode'])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': return 'bg-[#F5F4E7] text-gray-800'
      default: return 'bg-[#F5F4E7] text-gray-800'
    }
  }

  const getPayoutStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      default: return 'bg-[#F5F4E7] text-gray-800'
    }
  }

  const getPayoutStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      case 'failed': return <AlertCircle className="w-4 h-4" />
      case 'processing': return <Clock className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  // Handler functions
  const handleCreateAffiliate = (affiliateData: any) => {
    setAffiliates(prev => [...prev, affiliateData])
    setShowCreateModal(false)
  }

  const handleEditAffiliate = (affiliateData: any) => {
    setAffiliates(prev => prev.map(affiliate => 
      affiliate.id === affiliateData.id ? affiliateData : affiliate
    ))
    setShowEditModal(false)
    setSelectedAffiliate(null)
  }

  const handleViewAffiliate = (affiliate: any) => {
    setSelectedAffiliate(affiliate)
    setShowViewModal(true)
  }

  const handleEditClick = (affiliate: any) => {
    setSelectedAffiliate(affiliate)
    setShowEditModal(true)
  }

  const handleDeleteAffiliate = (affiliateId: string) => {
    if (confirm('Are you sure you want to delete this affiliate?')) {
      setAffiliates(prev => prev.filter(affiliate => affiliate.id !== affiliateId))
    }
  }

  // Payout handler functions
  const handleProcessPayout = (payoutId: string) => {
    setPayouts(prev => prev.map(payout => 
      payout.id === payoutId 
        ? { ...payout, status: 'processing', processedDate: new Date().toISOString() }
        : payout
    ))
  }

  const handleMarkPaid = (payoutId: string) => {
    setPayouts(prev => prev.map(payout => 
      payout.id === payoutId 
        ? { ...payout, status: 'paid', processedDate: new Date().toISOString() }
        : payout
    ))
  }

  const handleRetryPayout = (payoutId: string) => {
    setPayouts(prev => prev.map(payout => 
      payout.id === payoutId 
        ? { ...payout, status: 'pending', processedDate: null }
        : payout
    ))
  }

  const handleViewPayout = (payout: any) => {
    setSelectedPayout(payout)
    setShowPayoutModal(true)
  }

  // Apply additional filters to search results
  const filteredAffiliates = searchFilteredAffiliates.filter(affiliate => {
    const matchesStatus = statusFilter === 'all' || affiliate.status === statusFilter
    const matchesCommission = commissionFilter === 'all' || 
      (commissionFilter === 'low' && affiliate.commission < 10) ||
      (commissionFilter === 'medium' && affiliate.commission >= 10 && affiliate.commission < 20) ||
      (commissionFilter === 'high' && affiliate.commission >= 20)
    
    return matchesStatus && matchesCommission
  })

  // Filter payouts
  const filteredPayouts = payouts.filter(payout => {
    const matchesStatus = payoutStatusFilter === 'all' || payout.status === payoutStatusFilter
    const matchesMethod = payoutMethodFilter === 'all' || payout.paymentMethod === payoutMethodFilter
    
    return matchesStatus && matchesMethod
  })

  // Calculate totals
  const totalClicks = affiliates.reduce((sum, affiliate) => sum + affiliate.clicks, 0)
  const totalRevenue = affiliates.reduce((sum, affiliate) => sum + affiliate.revenue, 0)
  const totalEarnings = affiliates.reduce((sum, affiliate) => sum + affiliate.earnings, 0)
  
  // Calculate payout totals
  const totalPayouts = payouts.reduce((sum, payout) => sum + payout.amount, 0)
  const paidPayouts = payouts.filter(p => p.status === 'paid').reduce((sum, payout) => sum + payout.amount, 0)
  const pendingPayouts = payouts.filter(p => p.status === 'pending').reduce((sum, payout) => sum + payout.amount, 0)
  const failedPayouts = payouts.filter(p => p.status === 'failed').reduce((sum, payout) => sum + payout.amount, 0)

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: '#FAF9F6' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Affiliates</h1>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-[#E8E6CF] rounded-xl hover:bg-[#F5F4E7]">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-[#00473A] text-white rounded-xl hover:bg-[#00473A]/90"
        >
            <Plus className="w-4 h-4" />
            <span>Add Affiliate</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-1">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('affiliates')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
              activeTab === 'affiliates'
                ? 'bg-[#00473A] text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-[#F5F4E7]'
            }`}
          >
            Affiliates
          </button>
          <button
            onClick={() => setActiveTab('payouts')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
              activeTab === 'payouts'
                ? 'bg-[#00473A] text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-[#F5F4E7]'
            }`}
          >
            Payouts
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      {activeTab === 'affiliates' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Affiliates</p>
                <p className="text-2xl font-bold text-gray-900">{affiliates.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                <p className="text-2xl font-bold text-gray-900">{totalClicks.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">${totalEarnings.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Payouts</p>
                <p className="text-2xl font-bold text-gray-900">${totalPayouts.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid Payouts</p>
                <p className="text-2xl font-bold text-gray-900">${paidPayouts.toFixed(2)}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payouts</p>
                <p className="text-2xl font-bold text-gray-900">${pendingPayouts.toFixed(2)}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed Payouts</p>
                <p className="text-2xl font-bold text-gray-900">${failedPayouts.toFixed(2)}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      {activeTab === 'affiliates' ? (
        <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search affiliates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#E8E6CF] rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-[#F5F4E7] focus:bg-[#F5F4E7] transition-colors"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-[#E8E6CF] rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            <select
              value={commissionFilter}
              onChange={(e) => setCommissionFilter(e.target.value)}
              className="px-3 py-2 border border-[#E8E6CF] rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Commission</option>
              <option value="low">Low (&lt;10%)</option>
              <option value="medium">Medium (10-20%)</option>
              <option value="high">High (&gt;20%)</option>
            </select>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search payouts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#E8E6CF] rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-[#F5F4E7] focus:bg-[#F5F4E7] transition-colors"
              />
            </div>
            <select
              value={payoutStatusFilter}
              onChange={(e) => setPayoutStatusFilter(e.target.value)}
              className="px-3 py-2 border border-[#E8E6CF] rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>
            <select
              value={payoutMethodFilter}
              onChange={(e) => setPayoutMethodFilter(e.target.value)}
              className="px-3 py-2 border border-[#E8E6CF] rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Methods</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="paypal">PayPal</option>
              <option value="stripe">Stripe</option>
            </select>
          </div>
        </div>
      )}

      {/* Tables */}
      {activeTab === 'affiliates' ? (
        <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F4E7]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Affiliate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Earnings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#E8E6CF]">
                {filteredAffiliates.map((affiliate) => (
                  <tr key={affiliate.id} className="hover:bg-[#F5F4E7]">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#E8E6CF] rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {affiliate.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{affiliate.name}</div>
                          <div className="text-sm text-gray-500">{affiliate.contactPerson}</div>
                          <div className="text-xs text-gray-400">{affiliate.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(affiliate.status)}`}>
                        {affiliate.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {affiliate.commission}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {affiliate.clicks.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {affiliate.conversions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${affiliate.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${affiliate.earnings.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleViewAffiliate(affiliate)}
                          className="text-[#00473A] hover:text-[#00473A]/80"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEditClick(affiliate)}
                          className="p-2 text-gray-600 hover:text-gray-800 bg-[#E2EAFF] rounded-xl"
                          title="Edit Affiliate"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteAffiliate(affiliate.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete Affiliate"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F4E7]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Affiliate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transactions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#E8E6CF]">
                {filteredPayouts.map((payout) => (
                  <tr 
                    key={payout.id} 
                    className="hover:bg-[#F5F4E7] cursor-pointer"
                    onClick={() => handleViewPayout(payout)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#E8E6CF] rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {payout.affiliateName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{payout.affiliateName}</div>
                          <div className="text-xs text-gray-400">ID: {payout.affiliateId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${payout.amount.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">{payout.commission}% commission</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getPayoutStatusColor(payout.status)}`}>
                        {getPayoutStatusIcon(payout.status)}
                        <span className="ml-1">{payout.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                        {payout.paymentMethod.replace('_', ' ').toUpperCase()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payout.period}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payout.transactions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {formatDate(payout.paymentDate)}
                      </div>
                      {payout.processedDate && (
                        <div className="text-xs text-gray-500">
                          Processed: {formatDate(payout.processedDate)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {payout.status === 'pending' && (
                          <>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                handleProcessPayout(payout.id)
                              }}
                              className="text-blue-600 hover:text-blue-800"
                              title="Process Payout"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                handleMarkPaid(payout.id)
                              }}
                              className="text-green-600 hover:text-green-800"
                              title="Mark as Paid"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {payout.status === 'failed' && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRetryPayout(payout.id)
                            }}
                            className="text-orange-600 hover:text-orange-800"
                            title="Retry Payout"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewPayout(payout)
                          }}
                          className="text-gray-600 hover:text-gray-800"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      <AffiliateCreateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateAffiliate}
      />

      <AffiliateEditModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setSelectedAffiliate(null)
        }}
        onSave={handleEditAffiliate}
        affiliate={selectedAffiliate}
      />

      <AffiliateViewModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false)
          setSelectedAffiliate(null)
        }}
        affiliate={selectedAffiliate}
      />

      {/* Payout Details Modal */}
      {showPayoutModal && selectedPayout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Payout Details</h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      // Generate and download transfer receipt
                      const receiptData = {
                        payoutId: selectedPayout.id,
                        affiliateName: selectedPayout.affiliateName,
                        amount: selectedPayout.amount,
                        paymentMethod: selectedPayout.paymentMethod,
                        paymentDate: selectedPayout.paymentDate,
                        processedDate: selectedPayout.processedDate,
                        period: selectedPayout.period,
                        transactions: selectedPayout.transactions,
                        commission: selectedPayout.commission
                      }
                      
                      // Create a simple text receipt
                      const receiptText = `
TRANSFER RECEIPT
================
Payout ID: ${receiptData.payoutId}
Affiliate: ${receiptData.affiliateName}
Amount: $${receiptData.amount.toFixed(2)}
Payment Method: ${receiptData.paymentMethod.replace('_', ' ').toUpperCase()}
Payment Date: ${new Date(receiptData.paymentDate).toLocaleDateString()}
Processed Date: ${receiptData.processedDate ? new Date(receiptData.processedDate).toLocaleDateString() : 'N/A'}
Period: ${receiptData.period}
Transactions: ${receiptData.transactions}
Commission Rate: ${receiptData.commission}%
Status: ${selectedPayout.status.toUpperCase()}

Generated: ${new Date().toLocaleString()}
                      `.trim()
                      
                      // Create and download file
                      const blob = new Blob([receiptText], { type: 'text/plain' })
                      const url = window.URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = `transfer-receipt-${selectedPayout.id}.txt`
                      document.body.appendChild(a)
                      a.click()
                      document.body.removeChild(a)
                      window.URL.revokeObjectURL(url)
                    }}
                    className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-xl bg-[#00473A] text-white hover:bg-[#00473A]/90 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Transfer Receipt
                  </button>
                  <button
                    onClick={() => {
                      setShowPayoutModal(false)
                      setSelectedPayout(null)
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Payout Overview */}
                <div className="bg-[#F5F4E7] rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Payout Amount</p>
                      <p className="text-2xl font-bold text-gray-900">${selectedPayout.amount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${getPayoutStatusColor(selectedPayout.status)}`}>
                        {getPayoutStatusIcon(selectedPayout.status)}
                        <span className="ml-1">{selectedPayout.status}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Affiliate Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Affiliate Information</h3>
                  <div className="bg-white border border-[#E8E6CF] rounded-xl p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-[#E8E6CF] rounded-full flex items-center justify-center mr-4">
                        <span className="text-lg font-medium text-gray-700">
                          {selectedPayout.affiliateName.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{selectedPayout.affiliateName}</p>
                        <p className="text-sm text-gray-500">ID: {selectedPayout.affiliateId}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Details</h3>
                  <div className="bg-white border border-[#E8E6CF] rounded-xl p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Payment Method</p>
                        <div className="flex items-center mt-1">
                          <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {selectedPayout.paymentMethod.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Commission Rate</p>
                        <p className="text-sm font-medium text-gray-900">{selectedPayout.commission}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Payment Date</p>
                        <div className="flex items-center mt-1">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {formatDate(selectedPayout.paymentDate)}
                          </span>
                        </div>
                      </div>
                      {selectedPayout.processedDate && (
                        <div>
                          <p className="text-sm text-gray-600">Processed Date</p>
                          <div className="flex items-center mt-1">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">
                              {formatDate(selectedPayout.processedDate)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Period & Transactions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Period & Transactions</h3>
                  <div className="bg-white border border-[#E8E6CF] rounded-xl p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Period</p>
                        <p className="text-sm font-medium text-gray-900">{selectedPayout.period}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Number of Transactions</p>
                        <p className="text-sm font-medium text-gray-900">{selectedPayout.transactions}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedPayout.notes && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes</h3>
                    <div className="bg-white border border-[#E8E6CF] rounded-xl p-4">
                      <p className="text-sm text-gray-700">{selectedPayout.notes}</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-[#E8E6CF]">
                  <button
                    onClick={() => {
                      setShowPayoutModal(false)
                      setSelectedPayout(null)
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-[#E8E6CF] rounded-xl hover:bg-[#F5F4E7]"
                  >
                    Close
                  </button>
                  {selectedPayout.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          handleProcessPayout(selectedPayout.id)
                          setShowPayoutModal(false)
                          setSelectedPayout(null)
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700"
                      >
                        Process Payout
                      </button>
                      <button
                        onClick={() => {
                          handleMarkPaid(selectedPayout.id)
                          setShowPayoutModal(false)
                          setSelectedPayout(null)
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-xl hover:bg-green-700"
                      >
                        Mark as Paid
                      </button>
                    </>
                  )}
                  {selectedPayout.status === 'failed' && (
                    <button
                      onClick={() => {
                        handleRetryPayout(selectedPayout.id)
                        setShowPayoutModal(false)
                        setSelectedPayout(null)
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-xl hover:bg-orange-700"
                    >
                      Retry Payout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
