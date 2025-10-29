'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Globe, Package, DollarSign, Users, Filter } from 'lucide-react'
import { DateFilterButton } from './DateFilterButton'
import { getOperationByCountry, getOperationColor, getOperationIcon } from '../utils/operations'
import { FlatFlag } from './FlatFlag'

export function OrdersReport() {
  const [dateRange, setDateRange] = useState('today')
  const [isDateOpen, setIsDateOpen] = useState(false)
  const [selectedOperation, setSelectedOperation] = useState<'all' | 'UK OP' | 'China OP'>('all')

  // Mock data for orders report
  const ordersData = [
    {
      id: '1',
      orderId: 'IAA-24152739',
      customer: 'John Smith',
      country: 'USA',
      operation: 'UK OP',
      status: 'processing',
      amount: 129.00,
      date: '2024-01-15',
      payment: 'paid'
    },
    {
      id: '2',
      orderId: 'IAA-24152740',
      customer: 'Sarah Johnson',
      country: 'Germany',
      operation: 'UK OP',
      status: 'shipment_in_progress',
      amount: 89.50,
      date: '2024-01-15',
      payment: 'paid'
    },
    {
      id: '3',
      orderId: 'IAA-24152741',
      customer: 'Mike Wilson',
      country: 'Japan',
      operation: 'China OP',
      status: 'completed',
      amount: 199.99,
      date: '2024-01-14',
      payment: 'paid'
    },
    {
      id: '4',
      orderId: 'IAA-24152742',
      customer: 'Lisa Chen',
      country: 'China',
      operation: 'China OP',
      status: 'on_hold',
      amount: 149.00,
      date: '2024-01-14',
      payment: 'pending'
    },
    {
      id: '5',
      orderId: 'IAA-24152743',
      customer: 'David Brown',
      country: 'Australia',
      operation: 'China OP',
      status: 'refunded',
      amount: 79.99,
      date: '2024-01-13',
      payment: 'paid'
    },
    {
      id: '6',
      orderId: 'IAA-24152744',
      customer: 'Emma Davis',
      country: 'France',
      operation: 'UK OP',
      status: 'processing',
      amount: 299.99,
      date: '2024-01-13',
      payment: 'paid'
    },
    {
      id: '7',
      orderId: 'IAA-24152745',
      customer: 'James Miller',
      country: 'India',
      operation: 'China OP',
      status: 'on_hold',
      amount: 119.50,
      date: '2024-01-12',
      payment: 'failed'
    },
    {
      id: '8',
      orderId: 'IAA-24152746',
      customer: 'Anna Garcia',
      country: 'Spain',
      operation: 'UK OP',
      status: 'shipment_in_progress',
      amount: 249.99,
      date: '2024-01-12',
      payment: 'paid'
    },
    {
      id: '9',
      orderId: 'IAA-24152747',
      customer: 'Robert Taylor',
      country: 'Italy',
      operation: 'UK OP',
      status: 'completed',
      amount: 179.00,
      date: '2024-01-11',
      payment: 'paid'
    },
    {
      id: '10',
      orderId: 'IAA-24152748',
      customer: 'Maria Rodriguez',
      country: 'Mexico',
      operation: 'UK OP',
      status: 'processing',
      amount: 159.99,
      date: '2024-01-11',
      payment: 'paid'
    }
  ]

  // Calculate metrics
  const totalOrders = ordersData.length
  const ukOpOrders = ordersData.filter(order => order.operation === 'UK OP').length
  const chinaOpOrders = ordersData.filter(order => order.operation === 'China OP').length
  const totalRevenue = ordersData.reduce((sum, order) => sum + order.amount, 0)
  const ukOpRevenue = ordersData.filter(order => order.operation === 'UK OP').reduce((sum, order) => sum + order.amount, 0)
  const chinaOpRevenue = ordersData.filter(order => order.operation === 'China OP').reduce((sum, order) => sum + order.amount, 0)

  // Status distribution
  const statusDistribution = {
    processing: ordersData.filter(order => order.status === 'processing').length,
    shipment_in_progress: ordersData.filter(order => order.status === 'shipment_in_progress').length,
    completed: ordersData.filter(order => order.status === 'completed').length,
    on_hold: ordersData.filter(order => order.status === 'on_hold').length,
    refunded: ordersData.filter(order => order.status === 'refunded').length
  }

  // Country distribution
  const countryStats = ordersData.reduce((acc, order) => {
    acc[order.country] = (acc[order.country] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topCountries = Object.entries(countryStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)

  // Filter data based on selected operation
  const filteredOrders = selectedOperation === 'all' 
    ? ordersData 
    : ordersData.filter(order => order.operation === selectedOperation)

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <DateFilterButton label="Today" onClick={() => setIsDateOpen(!isDateOpen)} isOpen={isDateOpen} />
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedOperation}
              onChange={(e) => setSelectedOperation(e.target.value as 'all' | 'UK OP' | 'China OP')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Operations</option>
              <option value="UK OP">UK Operation</option>
              <option value="China OP">China Operation</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+8% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">UK Operation</p>
              <p className="text-2xl font-bold text-gray-900">{ukOpOrders}</p>
              <p className="text-sm text-gray-500">${ukOpRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FlatFlag country="United Kingdom" size="lg" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">China Operation</p>
              <p className="text-2xl font-bold text-gray-900">{chinaOpOrders}</p>
              <p className="text-sm text-gray-500">${chinaOpRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <span className="text-2xl">🇨🇳</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status Distribution</h3>
          <div className="space-y-3">
            {Object.entries(statusDistribution).map(([status, count]) => {
              const percentage = (count / totalOrders) * 100
              const statusConfig = {
                processing: { label: 'Processing', color: 'bg-blue-500' },
                shipment_in_progress: { label: 'Shipment in Progress', color: 'bg-yellow-500' },
                completed: { label: 'Completed', color: 'bg-green-500' },
                on_hold: { label: 'On Hold', color: 'bg-red-500' },
                refunded: { label: 'Refunded', color: 'bg-gray-500' }
              }
              const config = statusConfig[status as keyof typeof statusConfig]
              
              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${config.color}`}></div>
                    <span className="text-sm font-medium text-gray-700">{config.label}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${config.color}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-12 text-right">{count}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Countries */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Countries by Orders</h3>
          <div className="space-y-3">
            {topCountries.map(([country, count], index) => {
              const percentage = (count / totalOrders) * 100
              return (
                <div key={country} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                    <span className="text-sm font-medium text-gray-700">{country}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-12 text-right">{count}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Operations Comparison */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Operations Performance Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FlatFlag country="United Kingdom" size="lg" />
              <div>
                <h4 className="font-semibold text-gray-900">UK Operation</h4>
                <p className="text-sm text-gray-500">Europe, North & South America</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Orders</span>
                <span className="font-medium">{ukOpOrders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Revenue</span>
                <span className="font-medium">${ukOpRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg Order Value</span>
                <span className="font-medium">${(ukOpRevenue / ukOpOrders).toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🇨🇳</span>
              <div>
                <h4 className="font-semibold text-gray-900">China Operation</h4>
                <p className="text-sm text-gray-500">Asia, Africa, Oceania & Others</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Orders</span>
                <span className="font-medium">{chinaOpOrders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Revenue</span>
                <span className="font-medium">${chinaOpRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg Order Value</span>
                <span className="font-medium">${(chinaOpRevenue / chinaOpOrders).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#F5F4E7]">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    {order.orderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getOperationColor(order.operation as 'UK OP' | 'China OP')}`}>
                      {getOperationIcon(order.operation as 'UK OP' | 'China OP')} {order.operation}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'shipment_in_progress' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'on_hold' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
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
