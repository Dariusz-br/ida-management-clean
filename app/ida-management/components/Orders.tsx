'use client'

import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Truck,
  AlertCircle,
  RotateCcw,
  Archive,
  Smartphone,
  Printer,
  Upload
} from 'lucide-react'
import { Order } from '../page'
import { OrderStatusModal } from './OrderStatusModal'
import { BulkActionsModal } from './BulkActionsModal'
import { OrderActionsDropdown } from './OrderActionsDropdown'
import { StatusDropdown } from './StatusDropdown'
import { InternalStatusDropdown } from './InternalStatusDropdown'
import { DocumentStatusCircles } from './DocumentStatusCircles'
import { getOperationByCountry, getOperationColor, getOperationIcon, getOperationFlagCountry } from '../utils/operations'
import { FlatFlag } from './FlatFlag'
import { sharedOrdersData } from '../data/orders'
import { useOrderSearch } from '../hooks/useSearch'

interface OrdersProps {
  onOrderSelect: (order: Order) => void
  initialSearchTerm?: string
}

const mockOrders: Order[] = sharedOrdersData as Order[]

const statusConfig = {
  processing: { label: 'Processing', color: 'bg-blue-100 text-blue-800', icon: Clock },
  shipment_in_progress: { label: 'Shipment in Progress', color: 'bg-yellow-100 text-yellow-800', icon: Truck },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  on_hold: { label: 'On Hold', color: 'bg-red-100 text-red-800', icon: AlertCircle },
  refunded: { label: 'Refunded', color: 'bg-[#F5F4E7] text-gray-800', icon: RotateCcw }
}

const paymentConfig = {
  paid: { label: 'Paid', color: 'bg-green-100 text-green-800' },
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  failed: { label: 'Failed', color: 'bg-red-100 text-red-800' }
}

export function Orders({ onOrderSelect, initialSearchTerm = '' }: OrdersProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState('all')
  const [timeFilter, setTimeFilter] = useState('all')
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showBulkActionsModal, setShowBulkActionsModal] = useState(false)
  const [showArchived, setShowArchived] = useState(false)
  const [orders, setOrders] = useState(mockOrders)
  const [archivedOrders, setArchivedOrders] = useState<Order[]>([])
  const [showImportModal, setShowImportModal] = useState(false)

  const currentOrders = showArchived ? archivedOrders : orders
  
  // Use search hook for filtering orders
  const searchFilteredOrders = useOrderSearch(currentOrders, searchTerm)
  
  const filteredOrders = searchFilteredOrders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesPayment = paymentFilter === 'all' || order.payment.status === paymentFilter
    
    // Time filter logic
    let matchesTime = true
    if (timeFilter !== 'all') {
      const orderDate = new Date(order.createdAt)
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      
      switch (timeFilter) {
        case 'today':
          matchesTime = orderDate >= today
          break
        case 'yesterday':
          matchesTime = orderDate >= yesterday && orderDate < today
          break
        case 'last7days':
          const last7Days = new Date(today)
          last7Days.setDate(last7Days.getDate() - 7)
          matchesTime = orderDate >= last7Days
          break
        case 'last15days':
          const last15Days = new Date(today)
          last15Days.setDate(last15Days.getDate() - 15)
          matchesTime = orderDate >= last15Days
          break
        case 'last30days':
          const last30Days = new Date(today)
          last30Days.setDate(last30Days.getDate() - 30)
          matchesTime = orderDate >= last30Days
          break
      }
    }
    
    return matchesStatus && matchesPayment && matchesTime
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(filteredOrders.map(order => order.id))
    } else {
      setSelectedOrders([])
    }
  }

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders(prev => [...prev, orderId])
    } else {
      setSelectedOrders(prev => prev.filter(id => id !== orderId))
    }
  }

  const handleStatusModalOpen = (order: Order) => {
    setSelectedOrder(order)
    setShowStatusModal(true)
  }

  const handleSaveStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus as any }
        : order
    ))
    setShowStatusModal(false)
  }

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on orders:`, selectedOrders)
    setShowBulkActionsModal(false)
    setSelectedOrders([])
  }

  const handleInternalStatusChange = (orderId: string, newStatus: 'pending_review' | 'on_hold' | 'reviewed') => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, internalStatus: newStatus }
        : order
    ))
  }

  const handleOrderAction = (action: string, order: Order) => {
    switch (action) {
      case 'cancel':
        setOrders(prev => prev.map(o => 
          o.id === order.id ? { ...o, status: 'refunded' } : o
        ))
        alert(`Order ${order.orderId} has been cancelled and refunded.`)
        break
      case 'regenerate_booklet':
        alert(`Booklet regeneration initiated for order ${order.orderId}.`)
        break
      case 'regenerate_card':
        alert(`Card regeneration initiated for order ${order.orderId}.`)
        break
      case 'archive':
        setOrders(prev => prev.filter(o => o.id !== order.id))
        setArchivedOrders(prev => [...prev, { ...order, archived: true }])
        alert(`Order ${order.orderId} has been archived.`)
        break
      default:
        console.log(`Action ${action} not implemented`)
    }
  }

  const handleStatusChange = (orderId: string, newStatus: string) => {
    console.log('Orders: Changing status for order:', orderId, 'to:', newStatus)
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus as any }
        : order
    ))
    
    // Also update archived orders if the order is archived
    setArchivedOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus as any }
        : order
    ))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: '#FAF9F6' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-gray-900">
            {showArchived ? 'Archived Orders' : 'Orders'}
          </h1>
          {showArchived && (
            <span className="px-2 py-1 text-xs font-semibold bg-[#F5F4E7] text-gray-800 rounded-full">
              {archivedOrders.length} archived
            </span>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowArchived(!showArchived)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${
              showArchived 
                ? 'bg-gray-600 text-white hover:bg-gray-700' 
                : 'border border-[#E8E6CF] hover:bg-[#F5F4E7]'
            }`}
          >
            <Archive className="w-4 h-4" />
            <span>{showArchived ? 'Show Active Orders' : 'Show Archived Orders'}</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-[#E8E6CF] rounded-xl hover:bg-[#F5F4E7]">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <button 
            onClick={() => setShowImportModal(true)}
            className="flex items-center space-x-2 px-4 py-2 border border-[#E8E6CF] rounded-xl hover:bg-[#F5F4E7]"
          >
            <Upload className="w-4 h-4" />
            <span>Import tracking</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-[#E8E6CF] rounded-xl hover:bg-[#F5F4E7]">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-[#E8E6CF] rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-[#F5F4E7] focus:bg-[#F5F4E7] transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-[#E8E6CF] rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="processing">Processing</option>
              <option value="shipment_in_progress">Shipment in Progress</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment</label>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="w-full px-3 py-2 border border-[#E8E6CF] rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-[#E8E6CF] rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 days</option>
              <option value="last15days">Last 15 days</option>
              <option value="last30days">Last 30 days</option>
            </select>
          </div>
          <div className="flex items-end">
            {selectedOrders.length > 0 && (
              <button
                onClick={() => setShowBulkActionsModal(true)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                Bulk Actions ({selectedOrders.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
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
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Internal Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Operation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E8E6CF]">
              {filteredOrders.map((order) => {
                return (
                  <tr key={order.id} className="hover:bg-[#F5F4E7]">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={(e) => handleSelectOrder(order.id, e.target.checked)}
                        className="rounded border-[#E8E6CF]"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => onOrderSelect(order)}
          className="text-sm font-medium text-[#00473A] hover:text-[#00473A]/80 cursor-pointer"
        >
                        {order.orderId}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                        <div className="text-sm text-gray-500">{order.customer.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${paymentConfig[order.payment.status as keyof typeof paymentConfig].color}`}>
                        {paymentConfig[order.payment.status as keyof typeof paymentConfig].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusDropdown
                        currentStatus={order.status}
                        onStatusChange={(newStatus) => handleStatusChange(order.id, newStatus)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {order.productType === 'digital' ? (
                          <>
                            <Smartphone className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-900 dark:text-white">Digital IDP</span>
                          </>
                        ) : (
                          <>
                            <Printer className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-900 dark:text-white">Print + Digital</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <InternalStatusDropdown
                        currentStatus={order.internalStatus || 'pending_review'}
                        onStatusChange={(newStatus) => handleInternalStatusChange(order.id, newStatus)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.shipping.country}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getOperationColor(getOperationByCountry(order.shipping.country))}`}>
                        <FlatFlag country={getOperationFlagCountry(getOperationByCountry(order.shipping.country))} size="sm" className="mr-1" />
                        {getOperationByCountry(order.shipping.country)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
          order.deliveryType === 'vip_express' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-[#F5F4E7] text-gray-800'
        }`}>
                        {order.deliveryType === 'vip_express' ? '🟢 VIP Express' : '⚪ Standard'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DocumentStatusCircles 
                        documents={order.documents}
                        orderStatus={order.status}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
        <button
          onClick={() => onOrderSelect(order)}
          className="text-[#00473A] hover:text-[#00473A]/80"
          title="View Order"
        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleStatusModalOpen(order)}
                          className="p-2 text-blue-600 hover:text-blue-800 bg-[#E2EAFF] rounded-xl"
                          title="Change Status"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <OrderActionsDropdown 
                          order={order} 
                          onAction={handleOrderAction}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {selectedOrder && (
        <OrderStatusModal
          order={{
            id: selectedOrder.id,
            orderId: selectedOrder.orderId,
            customer: selectedOrder.customer.name,
            currentStatus: selectedOrder.status,
            amount: selectedOrder.amount.toString()
          }}
          isOpen={showStatusModal}
          onClose={() => setShowStatusModal(false)}
          onSave={(orderData) => handleSaveStatus(orderData.id, orderData.status)}
        />
      )}
      
      <BulkActionsModal
        selectedOrders={selectedOrders}
        isOpen={showBulkActionsModal}
        onClose={() => setShowBulkActionsModal(false)}
        onExecute={handleBulkAction}
      />

      {/* Import Tracking Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Import Tracking Data</h3>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload CSV File
                  </label>
                  <div className="border-2 border-dashed border-[#E8E6CF] rounded-xl p-6 text-center hover:border-[#00473A] transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop your CSV file here, or click to browse
                    </p>
                    <button className="text-sm text-[#00473A] hover:text-[#00473A]/80 font-medium">
                      Choose file
                    </button>
                  </div>
                </div>
                
                <div className="bg-[#F5F4E7] rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">CSV Format Requirements:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Order ID (required)</li>
                    <li>• Tracking Number (required)</li>
                    <li>• Carrier (optional)</li>
                    <li>• Status (optional)</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle import logic here
                    console.log('Import tracking data')
                    setShowImportModal(false)
                  }}
                  className="px-4 py-2 text-sm bg-[#00473A] text-white rounded-xl hover:bg-[#00473A]/90"
                >
                  Import Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
