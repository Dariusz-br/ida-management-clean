'use client'

import { useState } from 'react'
import { Download, Filter, Calendar, TrendingUp, Users, ShoppingCart, DollarSign, BarChart3, PieChart } from 'lucide-react'
import { ReportsExportModal } from './ReportsExportModal'
import { OrdersReport } from './OrdersReport'
import { CustomerReport } from './CustomerReport'
import { FunnelAnalysis } from './FunnelAnalysis'
import { MinimalTabs } from './MinimalTabs'
import { DateFilterButton } from './DateFilterButton'

export function Reports() {
  const [selectedReport, setSelectedReport] = useState('revenue')
  const [dateRange, setDateRange] = useState('today')
  const [isDateOpen, setIsDateOpen] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)

  const reportTypes = [
    { id: 'revenue', label: 'Revenue Report', icon: DollarSign },
    { id: 'orders', label: 'Orders Report', icon: ShoppingCart },
    { id: 'customers', label: 'Customer Report', icon: Users },
    { id: 'funnel', label: 'Funnel Analysis', icon: TrendingUp }
  ]

  const reportTabs = [
    { id: 'revenue', label: 'Revenue Report', icon: DollarSign },
    { id: 'orders', label: 'Orders Report', icon: ShoppingCart },
    { id: 'customers', label: 'Customer Report', icon: Users },
    { id: 'funnel', label: 'Funnel Analysis', icon: TrendingUp }
  ]

  const mockRevenueData = [
    { month: 'Jan', revenue: 45000, orders: 1200 },
    { month: 'Feb', revenue: 52000, orders: 1400 },
    { month: 'Mar', revenue: 48000, orders: 1300 },
    { month: 'Apr', revenue: 61000, orders: 1600 },
    { month: 'May', revenue: 55000, orders: 1500 },
    { month: 'Jun', revenue: 67000, orders: 1800 }
  ]

  const handleExport = (exportData: any) => {
    console.log('Exporting report:', exportData)
    // In a real app, this would generate and download the file
    alert(`Report exported: ${exportData.filename}`)
  }

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: '#FAF9F6' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex items-center space-x-3">
          <DateFilterButton 
            label="Today" 
            onClick={() => setIsDateOpen(!isDateOpen)} 
            isOpen={isDateOpen}
          />
          <button 
            onClick={() => setShowExportModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#00473A] text-white rounded-xl hover:bg-[#00473A]/90"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-6">
        <MinimalTabs
          tabs={reportTabs}
          activeTab={selectedReport}
          onTabChange={setSelectedReport}
          label="Select Report Type"
        />
      </div>

      {/* Date Range Selection removed as requested; using quick Today button in header */}

      {/* Revenue Report */}
      {selectedReport === 'revenue' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">$318,000</p>
                  <p className="text-sm text-green-600">+12.5% from last period</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">8,800</p>
                  <p className="text-sm text-green-600">+8.2% from last period</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Order Value</p>
                  <p className="text-2xl font-bold text-gray-900">$36.14</p>
                  <p className="text-sm text-green-600">+4.1% from last period</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
            <div className="h-64 flex items-end space-x-2">
              {mockRevenueData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-green-500 rounded-t"
                    style={{ height: `${(data.revenue / 70000) * 200}px` }}
                  ></div>
                  <div className="mt-2 text-xs text-gray-600">{data.month}</div>
                  <div className="text-xs font-medium text-gray-900">${(data.revenue / 1000).toFixed(0)}k</div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Table */}
          <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF]">
            <div className="px-6 py-4 border-b border-[#E8E6CF]">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Breakdown</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F5F4E7]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Month
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      AOV
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Growth
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#E8E6CF]">
                  {mockRevenueData.map((data, index) => {
                    const prevRevenue = index > 0 ? mockRevenueData[index - 1].revenue : data.revenue
                    const growth = ((data.revenue - prevRevenue) / prevRevenue * 100).toFixed(1)
                    const aov = (data.revenue / data.orders).toFixed(2)
                    
                    return (
                      <tr key={index} className="hover:bg-[#faf9f5]">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {data.month}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${data.revenue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {data.orders.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${aov}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${
                            parseFloat(growth) >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {parseFloat(growth) >= 0 ? '+' : ''}{growth}%
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Orders Report */}
      {selectedReport === 'orders' && <OrdersReport />}

      {/* Customer Report */}
      {selectedReport === 'customers' && <CustomerReport />}

      {/* Funnel Analysis */}
      {selectedReport === 'funnel' && <FunnelAnalysis />}

      {/* Export Modal */}
      <ReportsExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
      />
    </div>
  )
}
