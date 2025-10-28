'use client'

import React, { useState, useEffect, useRef } from 'react'
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  TrendingDown,
  Search,
  ChevronDown,
  Eye,
  MoreHorizontal,
  Clock,
  RotateCcw,
  Package,
  Target,
  AlertCircle,
  Eye as EyeIcon,
  ArrowRight,
  CheckCircle,
  CreditCard,
  Smartphone,
  Printer,
  Edit,
  Calendar
} from 'lucide-react'
import { getOperationByCountry, getOperationColor, getOperationIcon, getOperationFlagCountry } from '../utils/operations'
import { sharedOrdersData } from '../data/orders'
import { StatusDropdown } from './StatusDropdown'
import { InternalStatusDropdown } from './InternalStatusDropdown'
import { DocumentStatusCircles } from './DocumentStatusCircles'
import { OrderActionsDropdown } from './OrderActionsDropdown'
import { OrderStatusModal } from './OrderStatusModal'
import { FlatFlag } from './FlatFlag'
// import { useOrderSearch } from '../hooks/useSearch'
import { Order } from '../page'

interface KPICardProps {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: React.ComponentType<{ className?: string }>
  description: string
}

interface TopSellingProduct {
  name: string
  orders: number
  revenue: string
  image: string
}

interface FunnelStage {
  name: string
  count: number
  percentage: number
}

interface DashboardProps {
  onOrderSelect?: (order: Order) => void
  onNavigate?: (section: string) => void
  onSearch?: (searchTerm: string) => void
}

export function Dashboard({ onOrderSelect, onNavigate, onSearch }: DashboardProps) {
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)
  const [selectedDateRange, setSelectedDateRange] = useState('Today')
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleDateRangeChange = (startDate: Date, endDate: Date, label: string) => {
    console.log('Date range selected:', label, startDate, endDate)
    // Here you would typically update a global state or trigger a data fetch
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDateDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Order handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(sharedOrdersData.map(order => order.id))
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

  const handleStatusChange = (orderId: string, newStatus: string) => {
    // Handle status change logic here
    console.log('Status changed for order:', orderId, 'to:', newStatus)
  }

  const handleStatusModalOpen = (order: Order) => {
    setSelectedOrder(order)
    setShowStatusModal(true)
  }

  const handleOrderAction = (action: string, order: Order) => {
    console.log('Order action:', action, 'for order:', order.orderId)
    // Handle order actions here
  }

  const handleInternalStatusChange = (orderId: string, newStatus: 'pending_review' | 'on_hold' | 'reviewed') => {
    // Handle internal status change logic here
    console.log('Internal status changed for order:', orderId, 'to:', newStatus)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // Navigate to orders section
      if (onNavigate) {
        onNavigate('orders')
      }
      
      // Pass search term to parent component
      if (onSearch) {
        onSearch(searchTerm.trim())
      }
      
      console.log('Searching for:', searchTerm.trim())
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // KPI Data
  const kpiData = [
    {
      title: 'Total Revenue',
      value: '$124,500',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
      description: 'vs last month'
    },
    {
      title: 'Total Orders',
      value: '1,247',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: ShoppingCart,
      description: 'vs last month'
    },
    {
      title: 'Conversion Rate',
      value: '26.3%',
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      description: 'vs last month'
    },
    {
      title: 'Refunds',
      value: '$3,240',
      change: '-5.2%',
      changeType: 'negative' as const,
      icon: RotateCcw,
      description: 'vs last month'
    },
    {
      title: 'Avg Order Value',
      value: '$99.80',
      change: '+3.4%',
      changeType: 'positive' as const,
      icon: Package,
      description: 'vs last month'
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      change: '+1.8%',
      changeType: 'positive' as const,
      icon: Target,
      description: 'vs last month'
    },
    {
      title: 'Pending Orders',
      value: '47',
      change: '-12.3%',
      changeType: 'negative' as const,
      icon: AlertCircle,
      description: 'vs last month'
    },
    {
      title: 'Total Visitors',
      value: '12,450',
      change: '+18.7%',
      changeType: 'positive' as const,
      icon: EyeIcon,
      description: 'vs last month'
    }
  ]

  // Top Selling Products
  const topSellingProducts: TopSellingProduct[] = [
    {
      name: 'Digital License',
      orders: 1247,
      revenue: '$89,400',
      image: '/products/digital.jpg'
    },
    {
      name: 'Physical + Digital',
      orders: 892,
      revenue: '$156,800',
      image: '/products/physical.jpg'
    },
    {
      name: 'VIP Express',
      orders: 234,
      revenue: '$45,600',
      image: '/products/vip.jpg'
    }
  ]

  // Live Visitor Activity Funnel Data
  const funnelData = [
    {
      stage: 'Landing Page',
      visitors: 10000,
      percentage: 100,
      icon: Users,
      color: 'bg-blue-500',
      description: 'Total visitors to the site'
    },
    {
      stage: 'Product View',
      visitors: 7500,
      percentage: 75,
      icon: Eye,
      color: 'bg-blue-400',
      description: 'Visitors who viewed products'
    },
    {
      stage: 'Add to Cart',
      visitors: 3200,
      percentage: 32,
      icon: ShoppingCart,
      color: 'bg-yellow-500',
      description: 'Visitors who added items to cart'
    },
    {
      stage: 'Checkout Start',
      visitors: 1800,
      percentage: 18,
      icon: CreditCard,
      color: 'bg-orange-500',
      description: 'Visitors who started checkout'
    },
    {
      stage: 'Payment',
      visitors: 1200,
      percentage: 12,
      icon: CreditCard,
      color: 'bg-red-500',
      description: 'Visitors who reached payment'
    },
    {
      stage: 'Completed',
      visitors: 850,
      percentage: 8.5,
      icon: CheckCircle,
      color: 'bg-green-500',
      description: 'Successful purchases'
    }
  ]

  // Recent Orders Data
  const [recentOrdersData, setRecentOrdersData] = useState(sharedOrdersData.slice(0, 10))
  
  // const filteredOrders = recentOrdersData

  // Payment status configuration
  const paymentConfig = {
    paid: { label: 'Paid', color: 'bg-green-100 text-green-800' },
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    failed: { label: 'Failed', color: 'bg-red-100 text-red-800' }
  }


  // Map recent orders for display
  const recentOrders = recentOrdersData.map(order => ({
    orderId: order.orderId,
    customer: order.customer.name,
    email: order.customer.email,
    payment: order.payment.status,
    status: order.status,
    date: new Date(order.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }),
    amount: order.amount.toFixed(2),
    country: order.shipping.country,
    deliveryType: order.deliveryType,
    documents: { 
      selfie: order.documents.selfie,
      front: order.documents.front, 
      back: order.documents.back 
    }
  }))

  return (
    <div className="p-6 space-y-6 min-h-screen" style={{ backgroundColor: '#FAF9F6' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#333333]">Overview</h1>
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by orders, customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-[#E8E6CF] rounded-lg focus:ring-2 focus:ring-[#007BFF] focus:border-transparent bg-[#F5F4E7] focus:bg-[#F5F4E7] transition-colors"
            />
          </form>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 border border-[#E8E6CF] rounded-lg hover:bg-[#F5F4E7] transition-colors"
            >
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{selectedDateRange}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {isDateDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E8E6CF] rounded-lg shadow-lg z-10">
                <div className="p-2 space-y-1">
                  <button
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-[#F5F4E7] text-sm text-gray-700"
                    onClick={() => {
                      setSelectedDateRange('Today')
                      setIsDateDropdownOpen(false)
                      handleDateRangeChange(new Date(), new Date(), 'Today')
                    }}
                  >
                    Today
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-[#F5F4E7] text-sm text-gray-700"
                    onClick={() => {
                      setSelectedDateRange('Yesterday')
                      setIsDateDropdownOpen(false)
                      const yesterday = new Date()
                      yesterday.setDate(yesterday.getDate() - 1)
                      handleDateRangeChange(yesterday, yesterday, 'Yesterday')
                    }}
                  >
                    Yesterday
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-[#F5F4E7] text-sm text-gray-700"
                    onClick={() => {
                      setSelectedDateRange('Last 7 days')
                      setIsDateDropdownOpen(false)
                      const last7Days = new Date()
                      last7Days.setDate(last7Days.getDate() - 7)
                      handleDateRangeChange(last7Days, new Date(), 'Last 7 days')
                    }}
                  >
                    Last 7 days
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-[#F5F4E7] text-sm text-gray-700"
                    onClick={() => {
                      setSelectedDateRange('Last 15 days')
                      setIsDateDropdownOpen(false)
                      const last15Days = new Date()
                      last15Days.setDate(last15Days.getDate() - 15)
                      handleDateRangeChange(last15Days, new Date(), 'Last 15 days')
                    }}
                  >
                    Last 15 days
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-[#F5F4E7] text-sm text-gray-700"
                    onClick={() => {
                      setSelectedDateRange('Last 30 days')
                      setIsDateDropdownOpen(false)
                      const last30Days = new Date()
                      last30Days.setDate(last30Days.getDate() - 30)
                      handleDateRangeChange(last30Days, new Date(), 'Last 30 days')
                    }}
                  >
                    Last 30 days
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>


      {/* Main Content Grid - 50/50 Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Countries - 50% width */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-[#E0E0E0] dark:border-gray-700">
          <div className="p-6 border-b border-[#E0E0E0]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#333333]">Top Selling Countries</h3>
              <button className="text-sm text-[#007BFF] hover:text-[#0056b3] font-medium transition-colors">
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            {/* Countries Data Table */}
            <div>
              
              {/* Countries Data Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#E8E6CF]">
                  <thead className="bg-[#F5F4E7]">
                    <tr>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Country
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Visits
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Purchases
                      </th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Change
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#E8E6CF]">
                    {[
                      { country: 'United States', visits: 120000, purchases: 5000, change: 12.5, revenue: 500000 },
                      { country: 'Canada', visits: 80000, purchases: 3000, change: 8.2, revenue: 300000 },
                      { country: 'United Kingdom', visits: 70000, purchases: 2800, change: -3.1, revenue: 280000 },
                      { country: 'Germany', visits: 60000, purchases: 2500, change: 5.5, revenue: 250000 },
                      { country: 'Australia', visits: 50000, purchases: 2000, change: 1.8, revenue: 200000 }
                    ].map((country) => (
                      <tr key={country.country} className="hover:bg-[#F5F4E7] transition-colors">
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <FlatFlag country={country.country} size="sm" className="mr-2" />
                            <span className="text-xs font-medium text-[#333333]">{country.country}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">${(country.revenue / 1000).toFixed(0)}K Revenue</div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                          {country.visits >= 1000 ? (country.visits / 1000).toFixed(0) + 'K' : country.visits}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                          {country.purchases >= 1000 ? (country.purchases / 1000).toFixed(0) + 'K' : country.purchases}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs">
                          <div className={`flex items-center ${country.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {country.change > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                            {Math.abs(country.change)}%
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Countries Summary - Compact */}
              <div className="bg-[#F5F4E7] rounded p-2 mt-3 border border-[#E8E6CF]">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-sm font-bold text-[#333333]">5</div>
                    <div className="text-xs text-[#666666]">Countries</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-green-600">$1.5M</div>
                    <div className="text-xs text-[#666666]">Revenue</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-blue-600">380K</div>
                    <div className="text-xs text-[#666666]">Visits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Selling Products - 50% width */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-[#E0E0E0] dark:border-gray-700">
          <div className="p-6 border-b border-[#E0E0E0]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#333333]">Top Selling Products</h3>
              <button className="text-sm text-[#007BFF] hover:text-[#0056b3] font-medium transition-colors">
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 pb-3 border-b border-[#E0E0E0] mb-4">
              <div className="col-span-6">
                <span className="text-sm font-medium text-[#666666]">Product</span>
              </div>
              <div className="col-span-3 text-center">
                <span className="text-sm font-medium text-[#666666]">Total Order</span>
              </div>
              <div className="col-span-3 text-center">
                <span className="text-sm font-medium text-[#666666]">Total Revenue</span>
              </div>
            </div>
            
            {/* Product Rows */}
            <div className="space-y-4">
              {topSellingProducts.map((product, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-[#F0F0F0] last:border-b-0">
                  {/* Product Column */}
                  <div className="col-span-6 flex items-center space-x-3">
                    {/* Product Thumbnail */}
                    <div className="w-12 h-12 bg-[#F5F4E7] rounded-lg overflow-hidden flex-shrink-0">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          {index === 0 && (
                            <div className="w-8 h-8 bg-gradient-to-r from-[#007BFF] to-[#28A745] rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">⚡</span>
                            </div>
                          )}
                          {index === 1 && (
                            <div className="w-8 h-8 bg-[#E8E6CF] rounded flex items-center justify-center">
                              <span className="text-[#666666] text-xs">📱</span>
                            </div>
                          )}
                          {index === 2 && (
                            <div className="w-8 h-8 bg-[#E8E6CF] rounded flex items-center justify-center">
                              <span className="text-[#666666] text-xs">🚚</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Product Name */}
                    <div>
                      <p className="font-medium text-[#333333] text-sm">{product.name}</p>
                    </div>
                  </div>
                  
                  {/* Total Order Column */}
                  <div className="col-span-3 text-center">
                    <p className="text-sm font-bold text-[#333333]">
                      {product.orders.toLocaleString()}
                    </p>
                  </div>
                  
                  {/* Total Revenue Column */}
                  <div className="col-span-3 text-center">
                    <p className="text-sm font-medium text-[#333333]">
                      {product.revenue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Visitor Activity Funnel - New Design */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-[#E0E0E0] dark:border-gray-700">
          <div className="p-6 border-b border-[#E0E0E0]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#333333]">Live Visitor Activity</h3>
              <div className="flex items-center space-x-1 text-xs text-[#666666]">
                <Users className="w-3 h-3" />
                <span>Live tracking</span>
              </div>
            </div>
          </div>
            <div className="p-6">
              {/* Active Customers KPI Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-[#E8E6CF] dark:border-gray-700 p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-[#333333] mb-1">Active Customers</h4>
                    <div className="text-2xl font-bold text-[#333333] mb-2">892</div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-green-500"></div>
                        <span className="text-sm font-medium text-green-600">+15.3%</span>
                      </div>
                      <span className="text-sm text-[#666666]">vs last month</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-[#F5F4E7] rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#333333]" />
                  </div>
                </div>
              </div>

              {/* New Funnel Visualization - Image Style */}
              <div className="space-y-4">
              {funnelData.map((step, index) => {
                const Icon = step.icon
                const isLast = index === funnelData.length - 1
                const nextStep = funnelData[index + 1]
                const dropoffRate = nextStep ? ((step.visitors - nextStep.visitors) / step.visitors * 100).toFixed(1) : 0
                const isImportant = step.stage === 'Payment' || step.stage === 'Completed'
                
                return (
                  <div key={step.stage} className="relative">
                    {/* Stage Row */}
                    <div className="flex items-center space-x-3">
                      {/* Stage Icon */}
                      <div className={`w-8 h-8 ${step.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>

                      {/* Stage Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold text-[#333333]">{step.stage}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-[#666666]">{step.visitors.toLocaleString()}</span>
                            <span className="text-sm font-bold text-[#333333]">{step.percentage}%</span>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-[#E0E0E0] rounded-full h-3 overflow-hidden relative">
                          <div 
                            className={`h-3 ${step.color} rounded-full transition-all duration-1000 ease-out ${
                              isImportant ? 'animate-pulse' : ''
                            }`}
                            style={{ width: `${step.percentage}%` }}
                          ></div>
                          
                          {/* Shine effect for important stages */}
                          {isImportant && (
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Dropoff Information */}
                    {!isLast && (
                      <div className="flex justify-center mt-3 mb-2">
                        <div className="flex items-center space-x-2 text-center">
                          <ArrowRight className="w-3 h-3 text-[#999999]" />
                          <span className="text-sm text-[#999999]">
                            {((step.visitors - nextStep.visitors).toLocaleString())} dropped
                          </span>
                          <span className="text-sm font-bold text-[#DC3545]">
                            -{dropoffRate}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Funnel Summary */}
            <div className="bg-[#F5F4E7] rounded-lg p-4 mt-6 border border-[#E8E6CF]">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-[#333333]">{funnelData[0].visitors.toLocaleString()}</div>
                  <div className="text-sm text-[#666666]">Total</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">{funnelData[funnelData.length - 1].visitors.toLocaleString()}</div>
                  <div className="text-sm text-[#666666]">Done</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600">{funnelData[funnelData.length - 1].percentage}%</div>
                  <div className="text-sm text-[#666666]">Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Sales Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-[#E0E0E0] dark:border-gray-700">
          <div className="p-6 border-b border-[#E0E0E0]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#333333]">Global Sales Overview</h3>
              <div className="flex items-center space-x-1 text-xs text-[#666666]">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Live data</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            {/* World Map */}
            <div className="mb-6">
              <div className="bg-[#F5F4E7] rounded-lg p-4 border border-[#E8E6CF]">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-[#333333]">Global Sales Map</h4>
                  <div className="text-xs text-[#666666] bg-white px-2 py-1 rounded">
                    Total Revenue: $2.2M
                  </div>
                </div>
                
                {/* Realistic World Map with Green Countries */}
                <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <svg viewBox="0 0 800 400" className="w-full h-full">
                    {/* United States - More realistic shape */}
                    <path d="M80 120 Q90 100 110 110 Q130 105 150 120 Q160 140 150 160 Q130 170 110 165 Q90 160 80 140 Z" fill="#10B981" stroke="#E5E7EB" strokeWidth="1" />
                    <text x="115" y="140" className="text-xs fill-white font-semibold">US</text>
                    
                    {/* Canada - Above US */}
                    <path d="M90 80 Q110 70 130 85 Q140 100 130 115 Q110 120 90 110 Q80 95 90 80 Z" fill="#10B981" stroke="#E5E7EB" strokeWidth="1" />
                    <text x="110" y="100" className="text-xs fill-white font-semibold">CA</text>
                    
                    {/* United Kingdom - Island shape */}
                    <path d="M420 100 Q425 95 430 100 Q435 105 430 110 Q425 115 420 110 Q415 105 420 100 Z" fill="#10B981" stroke="#E5E7EB" strokeWidth="1" />
                    <text x="425" y="108" className="text-xs fill-white font-semibold">UK</text>
                    
                    {/* Germany - Central European shape */}
                    <path d="M450 110 Q460 105 470 115 Q475 125 470 135 Q460 140 450 135 Q440 130 445 120 Q450 110 Z" fill="#10B981" stroke="#E5E7EB" strokeWidth="1" />
                    <text x="460" y="125" className="text-xs fill-white font-semibold">DE</text>
                    
                    {/* China - Large Asian country */}
                    <path d="M580 100 Q620 95 660 105 Q680 120 670 140 Q650 150 620 145 Q590 140 580 125 Q575 110 580 100 Z" fill="#10B981" stroke="#E5E7EB" strokeWidth="1" />
                    <text x="625" y="125" className="text-xs fill-white font-semibold">CN</text>
                    
                    {/* Japan - Island chain */}
                    <path d="M700 110 Q705 105 710 110 Q715 115 710 120 Q705 125 700 120 Q695 115 700 110 Z" fill="#10B981" stroke="#E5E7EB" strokeWidth="1" />
                    <text x="705" y="118" className="text-xs fill-white font-semibold">JP</text>
                    
                    {/* India - Triangular shape */}
                    <path d="M520 140 Q540 130 560 140 Q570 160 550 170 Q530 175 520 165 Q515 150 520 140 Z" fill="#10B981" stroke="#E5E7EB" strokeWidth="1" />
                    <text x="545" y="155" className="text-xs fill-white font-semibold">IN</text>
                    
                    {/* Australia - Island continent */}
                    <path d="M650 220 Q680 210 710 220 Q720 240 710 260 Q680 270 650 260 Q640 240 650 220 Z" fill="#10B981" stroke="#E5E7EB" strokeWidth="1" />
                    <text x="680" y="245" className="text-xs fill-white font-semibold">AU</text>
                    
                    {/* Brazil - South American shape */}
                    <path d="M200 200 Q220 190 240 200 Q250 220 240 240 Q220 250 200 240 Q190 220 200 200 Z" fill="#10B981" stroke="#E5E7EB" strokeWidth="1" />
                    <text x="220" y="225" className="text-xs fill-white font-semibold">BR</text>
                    
                    {/* France - European shape */}
                    <path d="M400 120 Q410 115 420 125 Q425 135 420 145 Q410 150 400 145 Q395 135 400 120 Z" fill="#10B981" stroke="#E5E7EB" strokeWidth="1" />
                    <text x="410" y="135" className="text-xs fill-white font-semibold">FR</text>
                    
                    {/* Background continents (grey) */}
                    <path d="M300 100 Q350 90 400 100 Q450 110 500 100 Q550 90 600 100 Q650 110 700 100 Q750 90 780 100 Q790 120 780 140 Q750 150 700 140 Q650 130 600 140 Q550 150 500 140 Q450 130 400 140 Q350 150 300 140 Q270 130 280 110 Q300 100 Z" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1" />
                    
                    {/* Africa */}
                    <path d="M400 180 Q420 170 440 180 Q450 200 440 220 Q420 230 400 220 Q390 200 400 180 Z" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1" />
                    
                    {/* South America background */}
                    <path d="M150 200 Q200 190 250 200 Q300 210 350 200 Q400 190 450 200 Q500 210 550 200 Q600 190 650 200 Q700 210 750 200 Q780 220 750 240 Q700 250 650 240 Q600 230 550 240 Q500 250 450 240 Q400 230 350 240 Q300 250 250 240 Q200 230 150 240 Q120 220 150 200 Z" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1" />
                  </svg>
                  
                  {/* Map Legend */}
                  <div className="absolute bottom-2 left-2 bg-white rounded px-2 py-1 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span>Sales Countries</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="bg-[#F5F4E7] rounded-lg p-4 border border-[#E8E6CF]">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-[#333333]">10</div>
                  <div className="text-sm text-[#666666]">Countries</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">$2.2M</div>
                  <div className="text-sm text-[#666666]">Revenue</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600">555.0K</div>
                  <div className="text-sm text-[#666666]">Visits</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] overflow-hidden">
        <div className="p-6 border-b border-[#E8E6CF]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#333333]">Recent Orders</h3>
            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by orders, customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-[#E8E6CF] rounded-lg focus:ring-2 focus:ring-[#007BFF] focus:border-transparent bg-[#F5F4E7] focus:bg-[#F5F4E7] transition-colors"
                />
              </form>
              <button className="flex items-center space-x-2 px-4 py-2 border border-[#E8E6CF] rounded-lg hover:bg-[#F5F4E7] transition-colors">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Today</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F4E7]">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === sharedOrdersData.length && sharedOrdersData.length > 0}
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
              {sharedOrdersData.map((order) => {
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
          onClick={() => onOrderSelect?.(order as Order)}
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
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${paymentConfig[order.payment.status].color}`}>
                        {paymentConfig[order.payment.status].label}
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
          onClick={() => onOrderSelect?.(order as Order)}
          className="text-[#00473A] hover:text-[#00473A]/80"
          title="View Order"
        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleStatusModalOpen(order as Order)}
                          className="p-2 text-blue-600 hover:text-blue-800 bg-[#E2EAFF] rounded-lg"
                          title="Change Status"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <OrderActionsDropdown 
                          order={order as Order} 
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
          onSave={(orderData) => {
            console.log('Status saved for order:', orderData.id, 'to:', orderData.status)
            setShowStatusModal(false)
          }}
        />
      )}
    </div>
  )
}

function KPICard({ title, value, change, changeType, icon: Icon, description }: KPICardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-green-600'
      case 'negative': return 'text-[#DC3545]'
      default: return 'text-[#666666]'
    }
  }

  const getChangeIcon = () => {
    if (changeType === 'positive') return '↗'
    if (changeType === 'negative') return '↘'
    return '→'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-[#E0E0E0] dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-[#666666] dark:text-gray-400 mb-1 truncate">{title}</p>
          <p className="text-xl font-bold text-[#333333] dark:text-white mb-1">{value}</p>
        </div>
        <div className="p-2 bg-[#F5F4E7] dark:bg-gray-700 rounded-lg ml-3 flex-shrink-0">
          <Icon className="w-4 h-4 text-[#666666] dark:text-gray-300" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className={`text-xs font-semibold ${getChangeColor()}`}>
            {getChangeIcon()} {change}
          </span>
        </div>
        <span className="text-xs text-[#999999] truncate">{description}</span>
      </div>
    </div>
  )
}