'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Edit, Trash2, Eye, Percent, Calendar, BarChart3, TrendingUp } from 'lucide-react'
import { DiscountCreateModal } from './DiscountCreateModal'
import { DiscountEditModal } from './DiscountEditModal'
import { DiscountViewModal } from './DiscountViewModal'
import { useGenericSearch } from '../hooks/useSearch'

export function Discounts() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedDiscount, setSelectedDiscount] = useState(null)
  const [discounts, setDiscounts] = useState([
    {
      id: '1',
      code: 'WELCOME10',
      description: 'Welcome discount for new customers',
      type: 'percentage',
      value: 10,
      status: 'active',
      usage: 245,
      limit: 1000,
      validFrom: '2024-01-01',
      validTo: '2024-12-31'
    },
    {
      id: '2',
      code: 'SAVE20',
      description: '20% off for VIP customers',
      type: 'percentage',
      value: 20,
      status: 'active',
      usage: 89,
      limit: 500,
      validFrom: '2024-01-15',
      validTo: '2024-03-15'
    },
    {
      id: '3',
      code: 'FREESHIP',
      description: 'Free shipping on orders over $50',
      type: 'fixed',
      value: 5,
      status: 'expired',
      usage: 156,
      limit: 200,
      validFrom: '2023-12-01',
      validTo: '2023-12-31'
    }
  ])
  
  // Use search hook for filtering discounts
  const searchFilteredDiscounts = useGenericSearch(discounts, searchTerm, ['code', 'description', 'type', 'status'])
  
  const filteredDiscounts = searchFilteredDiscounts.filter(discount => {
    const matchesStatus = statusFilter === 'all' || discount.status === statusFilter
    const matchesType = typeFilter === 'all' || discount.type === typeFilter
    
    return matchesStatus && matchesType
  })

  const handleCreateDiscount = (newDiscount: any) => {
    setDiscounts(prev => [...prev, newDiscount])
    setShowCreateModal(false)
  }

  const handleEditDiscount = (updatedDiscount: any) => {
    setDiscounts(prev => prev.map(discount => 
      discount.id === updatedDiscount.id ? updatedDiscount : discount
    ))
    setShowEditModal(false)
    setSelectedDiscount(null)
  }

  const handleViewDiscount = (discount: any) => {
    setSelectedDiscount(discount)
    setShowViewModal(true)
  }

  const handleEditClick = (discount: any) => {
    setSelectedDiscount(discount)
    setShowEditModal(true)
  }

  const handleDeleteDiscount = (discountId: string) => {
    if (confirm('Are you sure you want to delete this discount?')) {
      setDiscounts(prev => prev.filter(discount => discount.id !== discountId))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'expired': return 'bg-red-100 text-red-800'
      case 'inactive': return 'bg-[#F5F4E7] text-gray-800'
      default: return 'bg-[#F5F4E7] text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: '#FAF9F6' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discounts</h1>
          <p className="text-sm text-gray-500">Manage discount codes and promotions</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-[#00473A] text-white rounded-lg hover:bg-[#00473A]/90"
        >
          <Plus className="w-4 h-4" />
          <span>Create Discount</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search discounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#E8E6CF] rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-[#F5F4E7] focus:bg-[#F5F4E7] transition-colors"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-[#E8E6CF] rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="expired">Expired</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-[#E8E6CF] rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>
        </div>
      </div>

      {/* Discounts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F4E7]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valid Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E8E6CF]">
              {filteredDiscounts.map((discount) => (
                <tr key={discount.id} className="hover:bg-[#F5F4E7]">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{discount.code}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{discount.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Percent className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900 capitalize">{discount.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {discount.type === 'percentage' ? `${discount.value}%` : `$${discount.value}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {discount.usage} / {discount.limit}
                    </div>
                    <div className="w-full bg-[#E8E6CF] rounded-full h-2 mt-1">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(discount.usage / discount.limit) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span>{formatDate(discount.validFrom)} - {formatDate(discount.validTo)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(discount.status)}`}>
                      {discount.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewDiscount(discount)}
                        className="text-green-600 hover:text-green-800"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditClick(discount)}
                        className="p-2 text-gray-600 hover:text-gray-800 bg-[#E2EAFF] rounded-lg"
                        title="Edit Discount"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteDiscount(discount.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete Discount"
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
      <DiscountCreateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateDiscount}
      />

      <DiscountEditModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setSelectedDiscount(null)
        }}
        onSave={handleEditDiscount}
        discount={selectedDiscount}
      />

      <DiscountViewModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false)
          setSelectedDiscount(null)
        }}
        discount={selectedDiscount}
      />
    </div>
  )
}
