'use client'

import React, { useState } from 'react'
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
  BarChart3,
  PieChart,
  Activity,
  Globe,
  FileText,
  Settings,
  Bell,
  Download,
  Filter,
  RefreshCw,
  Plus,
  Star,
  Award,
  Zap,
  Shield,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  ExternalLink,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Plus as PlusIcon,
  Trash2,
  Edit3,
  Copy,
  Share2,
  Heart,
  Bookmark,
  Flag,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Building,
  UserCheck,
  UserX,
  Clock3,
  Timer,
  Calendar as CalendarIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  BarChart,
  LineChart,
  PieChart as PieChartIcon,
  Activity as ActivityIcon,
  Globe as GlobeIcon,
  FileText as FileTextIcon,
  Settings as SettingsIcon,
  Bell as BellIcon,
  Download as DownloadIcon,
  Filter as FilterIcon,
  RefreshCw as RefreshCwIcon,
  Plus as PlusIcon2,
  Star as StarIcon,
  Award as AwardIcon,
  Zap as ZapIcon,
  Shield as ShieldIcon,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  CheckCircle2 as CheckCircle2Icon,
  XCircle as XCircleIcon,
  AlertTriangle as AlertTriangleIcon,
  Info as InfoIcon,
  ExternalLink as ExternalLinkIcon,
  ArrowUpRight as ArrowUpRightIcon,
  ArrowDownRight as ArrowDownRightIcon,
  Minus as MinusIcon,
  Trash2 as Trash2Icon,
  Edit3 as Edit3Icon,
  Copy as CopyIcon,
  Share2 as Share2Icon,
  Heart as HeartIcon,
  Bookmark as BookmarkIcon,
  Flag as FlagIcon,
  MessageSquare as MessageSquareIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  MapPin as MapPinIcon,
  Building as BuildingIcon,
  UserCheck as UserCheckIcon,
  UserX as UserXIcon,
  Clock3 as Clock3Icon,
  Timer as TimerIcon
} from 'lucide-react'

interface Dashboard2Props {
  onOrderSelect?: (orderId: string) => void
  onNavigate?: (section: string) => void
  onSearch?: (query: string) => void
}

export function Dashboard2({ onOrderSelect, onNavigate, onSearch }: Dashboard2Props) {
  const [selectedTimeRange, setSelectedTimeRange] = useState('Last 30 days')
  const [selectedMetric, setSelectedMetric] = useState('revenue')
  const [chartType, setChartType] = useState('bar')

  // Mock chart data
  const chartData = [
    { month: 'Jan', revenue: 180000, orders: 1200 },
    { month: 'Feb', revenue: 220000, orders: 1450 },
    { month: 'Mar', revenue: 195000, orders: 1300 },
    { month: 'Apr', revenue: 280000, orders: 1850 },
    { month: 'May', revenue: 320000, orders: 2100 },
    { month: 'Jun', revenue: 290000, orders: 1950 },
    { month: 'Jul', revenue: 350000, orders: 2300 },
    { month: 'Aug', revenue: 310000, orders: 2050 },
    { month: 'Sep', revenue: 275000, orders: 1800 },
    { month: 'Oct', revenue: 240000, orders: 1600 },
    { month: 'Nov', revenue: 260000, orders: 1700 },
    { month: 'Dec', revenue: 300000, orders: 2000 }
  ]

  const maxRevenue = Math.max(...chartData.map(d => d.revenue))
  const maxOrders = Math.max(...chartData.map(d => d.orders))

  // Mock data for different sections
  const kpiData = [
    {
      title: 'Total Revenue',
      value: '$2.4M',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Active Orders',
      value: '1,247',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'New Customers',
      value: '892',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '-2.1%',
      trend: 'down',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Avg Order Value',
      value: '$156',
      change: '+5.7%',
      trend: 'up',
      icon: CreditCard,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    },
    {
      title: 'Refund Rate',
      value: '2.8%',
      change: '-0.5%',
      trend: 'down',
      icon: RotateCcw,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600'
    }
  ]

  const recentActivities = [
    {
      id: '1',
      type: 'order',
      title: 'New order #12345 received',
      time: '2 minutes ago',
      icon: ShoppingCart,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: '2',
      type: 'customer',
      title: 'Customer John Doe registered',
      time: '5 minutes ago',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment processed for order #12344',
      time: '8 minutes ago',
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: '4',
      type: 'alert',
      title: 'Low inventory alert for Product A',
      time: '12 minutes ago',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: '5',
      type: 'system',
      title: 'System backup completed',
      time: '15 minutes ago',
      icon: Shield,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  ]

  const topProducts = [
    {
      id: '1',
      name: 'Digital IDP License',
      sales: 1247,
      revenue: 89400,
      growth: '+12.5%',
      trend: 'up',
      image: '📱'
    },
    {
      id: '2',
      name: 'Physical + Digital Package',
      sales: 892,
      revenue: 156800,
      growth: '+8.2%',
      trend: 'up',
      image: '📦'
    },
    {
      id: '3',
      name: 'Premium Support',
      sales: 456,
      revenue: 45600,
      growth: '+15.3%',
      trend: 'up',
      image: '⭐'
    },
    {
      id: '4',
      name: 'Express Processing',
      sales: 234,
      revenue: 23400,
      growth: '-2.1%',
      trend: 'down',
      image: '⚡'
    }
  ]

  const systemStatus = [
    {
      name: 'API Status',
      status: 'operational',
      uptime: '99.9%',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: '99.8%',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Payment Gateway',
      status: 'operational',
      uptime: '99.7%',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Email Service',
      status: 'degraded',
      uptime: '95.2%',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: '#FAF9F6' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard #2</h1>
          <p className="text-sm text-gray-600 mt-1">Advanced analytics and monitoring</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="appearance-none bg-white border border-[#E8E6CF] rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-[#00473A] focus:border-transparent"
            >
              <option value="Last 7 days">Last 7 days</option>
              <option value="Last 30 days">Last 30 days</option>
              <option value="Last 90 days">Last 90 days</option>
              <option value="Last year">Last year</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#00473A] text-white rounded-lg hover:bg-[#00473A]/90 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                  <Icon className={`w-5 h-5 ${kpi.iconColor}`} />
                </div>
                <div className="flex items-center space-x-1">
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.change}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Analytics</h3>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setChartType('bar')}
                className={`p-2 rounded-lg transition-colors ${
                  chartType === 'bar' 
                    ? 'bg-[#00473A] text-white' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setChartType('line')}
                className={`p-2 rounded-lg transition-colors ${
                  chartType === 'line' 
                    ? 'bg-[#00473A] text-white' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <LineChart className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setChartType('pie')}
                className={`p-2 rounded-lg transition-colors ${
                  chartType === 'pie' 
                    ? 'bg-[#00473A] text-white' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <PieChart className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Interactive Chart */}
          <div className="h-64 bg-white rounded-lg border border-[#E8E6CF] p-4">
            {chartType === 'bar' && (
              <div className="h-full flex items-end justify-between space-x-1">
                {chartData.map((data, index) => {
                  const height = (data.revenue / maxRevenue) * 100
                  return (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="w-full bg-gradient-to-t from-[#00473A] to-[#00473A]/70 rounded-t" 
                           style={{ height: `${height}%`, minHeight: '4px' }}>
                      </div>
                      <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">
                        {data.month}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            
            {chartType === 'line' && (
              <div className="h-full relative">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00473A" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#00473A" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Grid lines */}
                  {[0, 25, 50, 75, 100].map((y, i) => (
                    <line key={i} x1="0" y1={y * 2} x2="400" y2={y * 2} stroke="#E5E7EB" strokeWidth="1"/>
                  ))}
                  
                  {/* Line path */}
                  <path
                    d={`M 0,${200 - (chartData[0].revenue / maxRevenue) * 200} ${chartData.map((data, index) => 
                      `L ${(index / (chartData.length - 1)) * 400},${200 - (data.revenue / maxRevenue) * 200}`
                    ).join(' ')}`}
                    fill="none"
                    stroke="#00473A"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Area under line */}
                  <path
                    d={`M 0,${200 - (chartData[0].revenue / maxRevenue) * 200} ${chartData.map((data, index) => 
                      `L ${(index / (chartData.length - 1)) * 400},${200 - (data.revenue / maxRevenue) * 200}`
                    ).join(' ')} L 400,200 L 0,200 Z`}
                    fill="url(#lineGradient)"
                  />
                  
                  {/* Data points */}
                  {chartData.map((data, index) => (
                    <circle
                      key={index}
                      cx={(index / (chartData.length - 1)) * 400}
                      cy={200 - (data.revenue / maxRevenue) * 200}
                      r="4"
                      fill="#00473A"
                      className="hover:r-6 transition-all cursor-pointer"
                    />
                  ))}
                </svg>
                
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                  <span>${(maxRevenue / 1000000).toFixed(1)}M</span>
                  <span>${(maxRevenue * 0.75 / 1000000).toFixed(1)}M</span>
                  <span>${(maxRevenue * 0.5 / 1000000).toFixed(1)}M</span>
                  <span>${(maxRevenue * 0.25 / 1000000).toFixed(1)}M</span>
                  <span>$0</span>
                </div>
              </div>
            )}
            
            {chartType === 'pie' && (
              <div className="h-full flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Pie slices */}
                    <path
                      d="M 50,50 L 50,10 A 40,40 0 0,1 70,30 Z"
                      fill="#00473A"
                    />
                    <path
                      d="M 50,50 L 70,30 A 40,40 0 0,1 70,70 Z"
                      fill="#10B981"
                    />
                    <path
                      d="M 50,50 L 70,70 A 40,40 0 0,1 30,70 Z"
                      fill="#3B82F6"
                    />
                    <path
                      d="M 50,50 L 30,70 A 40,40 0 0,1 10,50 Z"
                      fill="#F59E0B"
                    />
                    <path
                      d="M 50,50 L 10,50 A 40,40 0 0,1 30,30 Z"
                      fill="#EF4444"
                    />
                    <path
                      d="M 50,50 L 30,30 A 40,40 0 0,1 50,10 Z"
                      fill="#8B5CF6"
                    />
                  </svg>
                  
                  {/* Center text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">$2.4M</div>
                      <div className="text-xs text-gray-500">Total Revenue</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
            <div className="flex items-center space-x-1 text-xs text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>All Systems Operational</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {systemStatus.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-[#E8E6CF]">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${service.bgColor.replace('bg-', 'bg-').replace('50', '500')}`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{service.name}</p>
                    <p className="text-xs text-gray-500">{service.uptime} uptime</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded ${service.bgColor} ${service.color}`}>
                  {service.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-sm text-[#00473A] hover:text-[#00473A]/80 font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${activity.bgColor} flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
            <button className="text-sm text-[#00473A] hover:text-[#00473A]/80 font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 rounded-lg border border-[#E8E6CF] hover:bg-[#F5F4E7] transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#F5F4E7] rounded-lg flex items-center justify-center text-lg">
                    {product.image}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} sales • ${product.revenue.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {product.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {product.growth}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <button className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-[#E8E6CF] hover:bg-[#F5F4E7] transition-colors">
            <Plus className="w-6 h-6 text-[#00473A]" />
            <span className="text-sm font-medium text-gray-700">New Order</span>
          </button>
          
          <button className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-[#E8E6CF] hover:bg-[#F5F4E7] transition-colors">
            <Users className="w-6 h-6 text-[#00473A]" />
            <span className="text-sm font-medium text-gray-700">Add Customer</span>
          </button>
          
          <button className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-[#E8E6CF] hover:bg-[#F5F4E7] transition-colors">
            <Package className="w-6 h-6 text-[#00473A]" />
            <span className="text-sm font-medium text-gray-700">New Product</span>
          </button>
          
          <button className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-[#E8E6CF] hover:bg-[#F5F4E7] transition-colors">
            <FileText className="w-6 h-6 text-[#00473A]" />
            <span className="text-sm font-medium text-gray-700">Generate Report</span>
          </button>
          
          <button className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-[#E8E6CF] hover:bg-[#F5F4E7] transition-colors">
            <Settings className="w-6 h-6 text-[#00473A]" />
            <span className="text-sm font-medium text-gray-700">Settings</span>
          </button>
          
          <button className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-[#E8E6CF] hover:bg-[#F5F4E7] transition-colors">
            <Bell className="w-6 h-6 text-[#00473A]" />
            <span className="text-sm font-medium text-gray-700">Notifications</span>
          </button>
        </div>
      </div>
    </div>
  )
}
