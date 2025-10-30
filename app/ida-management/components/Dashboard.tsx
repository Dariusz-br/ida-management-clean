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
  Calendar,
  Bell,
  Download
} from 'lucide-react'
import { getOperationByCountry, getOperationColor, getOperationIcon, getOperationFlagCountry } from '../utils/operations'
import { sharedOrdersData } from '../data/orders'
import { StatusDropdown } from './StatusDropdown'
import { DateFilterButton } from './DateFilterButton'
import { InternalStatusDropdown } from './InternalStatusDropdown'
import { DocumentStatusCircles } from './DocumentStatusCircles'
import { OrderActionsDropdown } from './OrderActionsDropdown'
import { OrderStatusModal } from './OrderStatusModal'
import { FlatFlag } from './FlatFlag'
// import { useOrderSearch } from '../hooks/useSearch'
import { Order } from '../page'
import { ReportsExportModal } from './ReportsExportModal'

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
  const [showExportModal, setShowExportModal] = useState(false)

  const handleExportRecentOrders = () => {
    try {
      const rows = (sharedOrdersData || []).map((o) => ({
        orderId: o.orderId,
        customer: o.customer.name,
        email: o.customer.email,
        amount: o.amount,
        currency: o.currency,
        status: o.status,
        paymentStatus: o.payment.status,
        date: o.date,
        trackingCarrier: (o as any).tracking?.carrier || '',
        trackingNumber: (o as any).tracking?.number || ''
      }))
      const headers = Object.keys(rows[0] || {
        orderId: '', customer: '', email: '', amount: '', currency: '', status: '', paymentStatus: '', date: '', trackingCarrier: '', trackingNumber: ''
      })
      const csv = [
        headers.join(','),
        ...rows.map(r => headers.map(h => {
          const cell = String((r as any)[h] ?? '')
          const escaped = cell.replace(/"/g, '""')
          return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped
        }).join(','))
      ].join('\n')
      const filename = `recent_orders_${new Date().toISOString().slice(0,10)}.csv`
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (e) {
      alert('Failed to export. Please try again.')
    }
  }

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
  const totalProductOrders = topSellingProducts.reduce((sum, p) => sum + p.orders, 0)
  // Colors mapping by product order: [Digital, Physical, Express]
  const productColors = ['#D6F1A2', '#00473A', '#6B97FF']

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
        <h1 className="text-display-md text-[#333333]">Overview</h1>
        <div className="flex items-center space-x-4">
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
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center space-x-2 px-4 py-2 border border-[#E8E6CF] rounded-lg hover:bg-[#F5F4E7] transition-colors"
          >
            <Download className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Export</span>
          </button>
        </div>
      </div>

      {/* Export Modal */}
      <ReportsExportModal 
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={() => {
          try {
            const rows = (sharedOrdersData || []).map((o) => ({
              orderId: o.orderId,
              customer: o.customer.name,
              email: o.customer.email,
              amount: o.amount,
              currency: o.currency,
              status: o.status,
              paymentStatus: o.payment.status,
              date: o.date,
              trackingCarrier: (o as any).tracking?.carrier || '',
              trackingNumber: (o as any).tracking?.number || ''
            }))
            const headers = Object.keys(rows[0] || {
              orderId: '', customer: '', email: '', amount: '', currency: '', status: '', paymentStatus: '', date: '', trackingCarrier: '', trackingNumber: ''
            })
            const csv = [
              headers.join(','),
              ...rows.map(r => headers.map(h => {
                const cell = String((r as any)[h] ?? '')
                const escaped = cell.replace(/"/g, '""')
                return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped
              }).join(','))
            ].join('\n')
            const filename = `recent_orders_${new Date().toISOString().slice(0,10)}.csv`
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = filename
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
          } catch (e) {
            alert('Failed to export. Please try again.')
          }
        }}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>


      {/* Main Content Grid - 50/50 Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Countries - 50% width */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-[#E0E0E0] dark:border-gray-700">
          <div className="p-6 border-b border-[#E0E0E0]">
            <div className="flex items-center justify-between">
              <h3 className="text-display-sm text-[#333333]">Top Selling Countries</h3>
              <button className="text-button text-[#007BFF] hover:text-[#0056b3] transition-colors">
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-[#E0E0E0] dark:border-gray-700">
          <div className="p-6 border-b border-[#E0E0E0]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#333333]">Top Selling Products</h3>
              <button className="text-sm text-[#007BFF] hover:text-[#0056b3] font-medium transition-colors">
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            {/* Enhanced List inspired by Products page */}
            {(() => { const total = topSellingProducts.reduce((s,p)=>s + p.orders, 0); return (
            <div className="space-y-4">
              {topSellingProducts.map((product, index) => {
                const share = total > 0 ? Math.round((product.orders / total) * 100) : 0
                const badge = product.name.toLowerCase().includes('digital') ? 'Digital' : product.name.toLowerCase().includes('physical') ? 'Physical' : 'Service'
                return (
                  <div key={index} className="flex items-center justify-between gap-4 p-3 rounded-xl border border-[#E8E6CF] hover:bg-[#F5F4E7]/50 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-16 h-16 rounded-[5px] overflow-hidden bg-[#F5F4E7] flex-shrink-0">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-lg">📦</div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-[#111827] truncate">{product.name}</p>
                          <span className="px-2 py-0.5 text-xs rounded-full bg-[#F5F4E7] text-gray-700 border border-[#E8E6CF]">{badge}</span>
                        </div>
                        {/* per-item bar removed; replaced by global stacked bar below */}
                      </div>
                    </div>
                    <div className="flex items-center gap-8 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Total Orders</p>
                        <p className="text-sm font-semibold text-[#111827]">{product.orders.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Revenue</p>
                        <p className="text-sm font-semibold text-[#111827]">{product.revenue}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            )})()}
            {/* Stacked share bar + legend for Top Selling Products */}
            <div className="mt-6">
              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden flex">
                {topSellingProducts.map((p, i) => {
                  const share = totalProductOrders > 0 ? (p.orders / totalProductOrders) * 100 : 0
                  return (
                    <div
                      key={`tsp-stack-${i}`}
                      style={{ width: `${share}%`, backgroundColor: productColors[i % productColors.length] }}
                      className="h-full"
                    />
                  )
                })}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-4">
                {topSellingProducts.map((p, i) => {
                  const share = totalProductOrders > 0 ? Math.round((p.orders / totalProductOrders) * 100) : 0
                return (
                  <div key={`tsp-legend-${i}`} className="flex items-center gap-2">
                      <span
                        className="inline-block w-3 h-3 rounded-sm"
                        style={{ backgroundColor: productColors[i % productColors.length] }}
                      />
                    <span className="text-xs text-gray-700 truncate">{p.name}</span>
                    <span className="text-xs font-semibold text-[#111827]">{share}%</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Live Visitor Activity Funnel - New Design */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-[#E0E0E0] dark:border-gray-700">
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

        {/* Recent Activity (replaces Global Sales Overview) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-[#E0E0E0] dark:border-gray-700">
          <div className="p-6 border-b border-[#E0E0E0]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#333333]">Recent Activity</h3>
              <span className="text-xs text-[#666666] inline-flex items-center">
                <span className="relative flex items-center mr-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Live activity
              </span>
            </div>
          </div>
          <div className="p-0 divide-y divide-[#E8E6CF] max-h-[720px] overflow-y-auto">
            {sharedOrdersData.map((order) => {
              const isCompleted = order.status === 'completed'
              const isShipped = order.status === 'shipment_in_progress'
              const isCreated = order.status === 'processing'
              const paid = order.payment.status === 'paid'
              const hasTracking = Boolean((order as any).tracking && (order as any).tracking.number)
              const trackingCarrier = hasTracking ? (order as any).tracking.carrier : null
              const trackingNumber = hasTracking ? (order as any).tracking.number : null
              const title = hasTracking
                ? 'Tracking Number Added'
                : isCreated
                ? 'New Order Created'
                : paid
                ? 'Payment Received'
                : isShipped
                ? 'Shipment Created'
                : isCompleted
                ? 'Order Completed'
                : 'Order Status Updated'
              const desc = hasTracking
                ? `Tracking ${trackingCarrier || 'carrier'} • ${trackingNumber}`
                : isCreated
                ? `Order #${order.orderId} has been created by ${order.customer.name}`
                : paid
                ? `Payment of $${order.amount.toFixed(2)} received for order #${order.orderId}`
                : isShipped
                ? `Tracking number generated for order #${order.orderId}`
                : isCompleted
                ? `Order #${order.orderId} has been marked as completed`
                : `Order #${order.orderId} status changed to "${order.status.replace(/_/g,' ')}"`
              const priorityBorder = hasTracking
                ? 'border-l-indigo-500'
                : paid
                ? 'border-l-blue-500'
                : isCompleted
                ? 'border-l-green-600'
                : isShipped
                ? 'border-l-purple-500'
                : 'border-l-amber-500'
              return (
                <div
                  key={order.id}
                  className={`px-6 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-l-4 ${priorityBorder}`}
                  onClick={() => onOrderSelect?.(order as Order)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {hasTracking ? (
                        <svg className="w-4 h-4 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h13v10H3z"></path><path d="M16 9h4l1 2v6h-5z"></path><circle cx="7.5" cy="17.5" r="1.5"></circle><circle cx="18.5" cy="17.5" r="1.5"></circle></svg>
                      ) : (
                        <Bell className="w-4 h-4 text-[#00473A]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-[#0f172a] truncate">{title}</h4>
                        <span className="text-xs text-[#64748b] ml-3">
                          {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm text-[#334155] mt-0.5">{desc}</p>
                      {hasTracking && (
                        <div className="mt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              navigator.clipboard?.writeText(String(trackingNumber))
                            }}
                            className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                          >
                            Copy tracking number
                          </button>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-[#00473A] font-medium">{order.orderId}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onOrderSelect?.(order as Order)
                          }}
                          className="flex items-center gap-1 text-xs text-[#00473A] hover:text-[#00473A]/80"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View Order</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] overflow-hidden">
        <div className="p-6 border-b border-[#E8E6CF]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#333333]">Recent Orders</h3>
            <div className="flex items-center space-x-4">
              <DateFilterButton 
                label="Today"
                onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                isOpen={isDateDropdownOpen}
              />
              <button
                onClick={() => setShowExportModal(true)}
                className="flex items-center space-x-2 px-4 py-2 border border-[#E8E6CF] rounded-xl hover:bg-[#F5F4E7]"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
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
                <th className="px-6 py-3 text-left text-label text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-label text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-label text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-label text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-label text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-label text-gray-500 uppercase tracking-wider">
                  Internal Status
                </th>
                <th className="px-6 py-3 text-left text-label text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-label text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-label text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-label text-gray-500 uppercase tracking-wider">
                  Operation
                </th>
                <th className="px-6 py-3 text-left text-label text-gray-500 uppercase tracking-wider">
                  Delivery Type
                </th>
                <th className="px-6 py-3 text-left text-label text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
                <th className="px-6 py-3 text-left text-label text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E8E6CF]">
              {sharedOrdersData.map((order) => {
                return (
                  <tr 
                    key={order.id} 
                    className="hover:bg-[#F5F4E7] cursor-pointer"
                    onClick={() => onOrderSelect?.(order as Order)}
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
                            <span className="text-body-sm text-gray-900 dark:text-white">Digital IDP</span>
                          </>
                        ) : (
                          <>
                            <Printer className="w-4 h-4 text-green-600" />
                            <span className="text-body-sm text-gray-900 dark:text-white">Print + Digital</span>
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
                    <td className="px-6 py-4 whitespace-nowrap text-body-sm text-gray-500">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-body-sm font-medium text-gray-900">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-body-sm text-gray-500">
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
          onClick={(e) => {
            e.stopPropagation()
            onOrderSelect?.(order as Order)
          }}
          className="text-[#00473A] hover:text-[#00473A]/80"
          title="View Order"
        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleStatusModalOpen(order as Order)
                          }}
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-[#E0E0E0] dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-label text-[#666666] dark:text-gray-400 mb-1 truncate">{title}</p>
          <p className="text-display-lg text-[#333333] dark:text-white mb-1">{value}</p>
        </div>
        <div className="p-2 bg-[#F5F4E7] dark:bg-gray-700 rounded-xl ml-3 flex-shrink-0">
          <Icon className="w-4 h-4 text-[#666666] dark:text-gray-300" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className={`text-caption ${getChangeColor()}`}>
            {getChangeIcon()} {change}
          </span>
        </div>
        <span className="text-meta truncate">{description}</span>
      </div>
    </div>
  )
}