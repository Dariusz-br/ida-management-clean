'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Edit, Trash2, Eye, Users, DollarSign, TrendingUp, Download, MoreHorizontal } from 'lucide-react'
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
  const [selectedAffiliate, setSelectedAffiliate] = useState(null)
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

  // Apply additional filters to search results
  const filteredAffiliates = searchFilteredAffiliates.filter(affiliate => {
    const matchesStatus = statusFilter === 'all' || affiliate.status === statusFilter
    const matchesCommission = commissionFilter === 'all' || 
      (commissionFilter === 'low' && affiliate.commission < 10) ||
      (commissionFilter === 'medium' && affiliate.commission >= 10 && affiliate.commission < 20) ||
      (commissionFilter === 'high' && affiliate.commission >= 20)
    
    return matchesStatus && matchesCommission
  })

  // Calculate totals
  const totalClicks = affiliates.reduce((sum, affiliate) => sum + affiliate.clicks, 0)
  const totalRevenue = affiliates.reduce((sum, affiliate) => sum + affiliate.revenue, 0)
  const totalEarnings = affiliates.reduce((sum, affiliate) => sum + affiliate.earnings, 0)

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: '#FAF9F6' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Affiliates</h1>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-[#E8E6CF] rounded-lg hover:bg-[#F5F4E7]">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-[#00473A] text-white rounded-lg hover:bg-[#00473A]/90"
        >
            <Plus className="w-4 h-4" />
            <span>Add Affiliate</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Affiliates</p>
              <p className="text-2xl font-bold text-gray-900">{affiliates.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clicks</p>
              <p className="text-2xl font-bold text-gray-900">{totalClicks.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">${totalEarnings.toFixed(2)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search affiliates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#E8E6CF] rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-[#F5F4E7] focus:bg-[#F5F4E7] transition-colors"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-[#E8E6CF] rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
            className="px-3 py-2 border border-[#E8E6CF] rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Commission</option>
            <option value="low">Low (&lt;10%)</option>
            <option value="medium">Medium (10-20%)</option>
            <option value="high">High (&gt;20%)</option>
          </select>
        </div>
      </div>

      {/* Affiliates Table */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] overflow-hidden">
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
                        className="p-2 text-gray-600 hover:text-gray-800 bg-[#E2EAFF] rounded-lg"
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
    </div>
  )
}
