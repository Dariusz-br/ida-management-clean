'use client'

import { useState, useMemo } from 'react'
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Mail, 
  Phone, 
  Calendar,
  AlertCircle,
  Clock,
  User,
  CreditCard,
  FileText,
  Eye,
  MoreHorizontal,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react'
import { Order } from '../page'
import { abandonedOrdersData } from '../data/orders'
import { StatusDropdown } from './StatusDropdown'
import { InternalStatusDropdown } from './InternalStatusDropdown'
import { OperationDropdown } from './OperationDropdown'
import { DocumentStatusCircles } from './DocumentStatusCircles'
import { OrderActionsDropdown } from './OrderActionsDropdown'
import { FilterPills } from './FilterPills'

interface AbandonedOrdersProps {
  onOrderSelect: (order: Order) => void
  initialSearchTerm?: string
}

export function AbandonedOrders({ onOrderSelect, initialSearchTerm = '' }: AbandonedOrdersProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [statusFilter, setStatusFilter] = useState('all')
  const [reasonFilter, setReasonFilter] = useState('all')
  const [stageFilter, setStageFilter] = useState('all')
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Filter options
  const statusOptions = [
    { id: 'all', label: 'ALL', count: abandonedOrdersData.length },
    { id: 'abandoned', label: 'Abandoned' }
  ]

  const reasonOptions = [
    { id: 'all', label: 'ALL', count: abandonedOrdersData.length },
    { id: 'cart_abandoned', label: 'Cart Abandoned' },
    { id: 'document_upload', label: 'Document Upload' },
    { id: 'payment_failed', label: 'Payment Failed' },
    { id: 'form_abandonment', label: 'Form Abandonment' },
    { id: 'document_rejection', label: 'Document Rejected' }
  ]

  const stageOptions = [
    { id: 'all', label: 'ALL', count: abandonedOrdersData.length },
    { id: 'personal_info', label: 'Personal Info' },
    { id: 'document_verification', label: 'Doc Verification' },
    { id: 'payment', label: 'Payment' },
    { id: 'checkout', label: 'Checkout' }
  ]

  // Filter orders based on search and filters
  const filteredOrders = useMemo(() => {
    return abandonedOrdersData.filter(order => {
      const matchesSearch = 
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      const matchesReason = reasonFilter === 'all' || order.abandonmentReason === reasonFilter
      const matchesStage = stageFilter === 'all' || order.abandonmentStage === stageFilter
      
      return matchesSearch && matchesStatus && matchesReason && matchesStage
    })
  }, [searchTerm, statusFilter, reasonFilter, stageFilter])

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId])
    } else {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(filteredOrders.map(order => order.id))
    } else {
      setSelectedOrders([])
    }
  }

  const getAbandonmentReasonLabel = (reason: string) => {
    const labels: { [key: string]: string } = {
      'cart_abandoned': 'Cart Abandoned',
      'document_upload': 'Document Upload',
      'payment_failed': 'Payment Failed',
      'form_abandonment': 'Form Abandonment',
      'document_rejection': 'Document Rejection'
    }
    return labels[reason] || reason
  }

  const getAbandonmentStageLabel = (stage: string) => {
    const labels: { [key: string]: string } = {
      'personal_info': 'Personal Info',
      'document_verification': 'Document Verification',
      'payment': 'Payment',
      'checkout': 'Checkout'
    }
    return labels[stage] || stage
  }

  const getAbandonmentReasonColor = (reason: string) => {
    const colors: { [key: string]: string } = {
      'cart_abandoned': 'bg-blue-100 text-blue-800',
      'document_upload': 'bg-yellow-100 text-yellow-800',
      'payment_failed': 'bg-red-100 text-red-800',
      'form_abandonment': 'bg-gray-100 text-gray-800',
      'document_rejection': 'bg-orange-100 text-orange-800'
    }
    return colors[reason] || 'bg-gray-100 text-gray-800'
  }

  const getAbandonmentStageColor = (stage: string) => {
    const colors: { [key: string]: string } = {
      'personal_info': 'bg-purple-100 text-purple-800',
      'document_verification': 'bg-yellow-100 text-yellow-800',
      'payment': 'bg-red-100 text-red-800',
      'checkout': 'bg-green-100 text-green-800'
    }
    return colors[stage] || 'bg-gray-100 text-gray-800'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getOperationByCountry = (country: string) => {
    return country === 'USA' ? 'UK OP' : 'China OP'
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display-md text-gray-900">Abandoned Orders</h1>
          <p className="text-body-sm text-gray-600 mt-1">Manage and recover abandoned orders</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 text-button rounded-xl bg-[#F5F4E7] text-gray-800 hover:opacity-80 cursor-pointer">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button className="inline-flex items-center px-4 py-2 text-button rounded-xl bg-[#F5F4E7] text-gray-800 hover:opacity-80 cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-xl">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Abandoned</p>
              <p className="text-2xl font-bold text-gray-900">{abandonedOrdersData.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Recovery Attempts</p>
              <p className="text-2xl font-bold text-gray-900">
                {abandonedOrdersData.reduce((sum, order) => sum + (order.recoveryAttempts || 0), 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Recovered</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-xl">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Lost Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${abandonedOrdersData.reduce((sum, order) => sum + order.amount, 0).toFixed(0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-4">
        <div className="space-y-4">
          {/* Search Input */}
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#E8E6CF] rounded-xl focus:ring-2 focus:ring-[#00473A] focus:border-transparent bg-[#F5F4E7]"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="space-y-3">
            {/* Status Filter Pills */}
            <FilterPills
              options={statusOptions}
              activeOption={statusFilter}
              onOptionChange={setStatusFilter}
            />

            {/* Reason Filter Pills */}
            <FilterPills
              options={reasonOptions}
              activeOption={reasonFilter}
              onOptionChange={setReasonFilter}
            />

            {/* Stage Filter Pills */}
            <FilterPills
              options={stageOptions}
              activeOption={stageFilter}
              onOptionChange={setStageFilter}
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E8E6CF]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Abandoned Orders ({filteredOrders.length})
            </h3>
            <div className="flex items-center space-x-2">
              {selectedOrders.length > 0 && (
                <span className="text-sm text-gray-600">
                  {selectedOrders.length} selected
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E8E6CF]">
            <thead className="bg-[#F5F4E7]">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-[#E8E6CF]"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Abandonment Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recovery Attempts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E8E6CF]">
              {filteredOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className="hover:bg-[#F5F4E7] cursor-pointer"
                  onClick={() => onOrderSelect(order)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={(e) => {
                        e.stopPropagation()
                        handleSelectOrder(order.id, e.target.checked)
                      }}
                      className="rounded border-[#E8E6CF]"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onOrderSelect(order)
                      }}
                      className="text-sm font-medium text-[#00473A] hover:text-[#00473A]/80 cursor-pointer"
                    >
                      {order.orderId}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#E8E6CF] rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {order.customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                        <div className="text-sm text-gray-500">{order.customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {order.productType === 'digital' ? (
                        <FileText className="w-4 h-4 text-blue-600 mr-2" />
                      ) : (
                        <FileText className="w-4 h-4 text-green-600 mr-2" />
                      )}
                      <span className="text-sm text-gray-900">
                        {order.productType === 'digital' ? 'Digital IDP' : 'Print + Digital'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${order.amount.toFixed(2)} {order.currency}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAbandonmentReasonColor(order.abandonmentReason || '')}`}>
                      {getAbandonmentReasonLabel(order.abandonmentReason || '')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAbandonmentStageColor(order.abandonmentStage || '')}`}>
                      {getAbandonmentStageLabel(order.abandonmentStage || '')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900">{order.recoveryAttempts || 0}</span>
                      {order.recoveryAttempts && order.recoveryAttempts > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle recovery attempt action
                          }}
                          className="ml-2 text-[#00473A] hover:text-[#00473A]/80"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(order.lastActivity || order.date)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onOrderSelect(order)
                        }}
                        className="text-[#00473A] hover:text-[#00473A]/80 p-1 rounded-xl hover:bg-gray-100"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle recovery email action
                        }}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded-xl hover:bg-blue-100"
                        title="Send Recovery Email"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle call action
                        }}
                        className="text-green-600 hover:text-green-800 p-1 rounded-xl hover:bg-green-100"
                        title="Call Customer"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                      <OrderActionsDropdown
                        order={order}
                        onAction={(action, order) => {
                          console.log('Action:', action, 'Order:', order)
                          // Handle different actions here
                          switch (action) {
                            case 'cancel':
                              // Handle cancel order
                              break
                            case 'regenerate_booklet':
                              // Handle regenerate booklet
                              break
                            case 'regenerate_card':
                              // Handle regenerate card
                              break
                            case 'archive':
                              // Handle archive order
                              break
                            case 'view':
                              onOrderSelect(order)
                              break
                            default:
                              break
                          }
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
