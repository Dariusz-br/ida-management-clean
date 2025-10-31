'use client'

import { useState } from 'react'
import { Users, TrendingUp, DollarSign, MapPin, Star, Repeat } from 'lucide-react'

export function CustomerReport() {
  const [dateRange, setDateRange] = useState('today')
  const [segment, setSegment] = useState('all')

  // Mock customer data
  const customersData = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      country: 'USA',
      totalOrders: 12,
      totalSpent: 1548.00,
      avgOrderValue: 129.00,
      lastOrder: '2024-01-15',
      customerSince: '2023-06-15',
      segment: 'high_value',
      satisfaction: 4.8
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      country: 'Germany',
      totalOrders: 8,
      totalSpent: 716.00,
      avgOrderValue: 89.50,
      lastOrder: '2024-01-15',
      customerSince: '2023-08-20',
      segment: 'regular',
      satisfaction: 4.6
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.w@email.com',
      country: 'Japan',
      totalOrders: 3,
      totalSpent: 599.97,
      avgOrderValue: 199.99,
      lastOrder: '2024-01-14',
      customerSince: '2023-12-01',
      segment: 'new',
      satisfaction: 4.9
    },
    {
      id: '4',
      name: 'Lisa Chen',
      email: 'lisa.c@email.com',
      country: 'China',
      totalOrders: 15,
      totalSpent: 2235.00,
      avgOrderValue: 149.00,
      lastOrder: '2024-01-14',
      customerSince: '2023-03-10',
      segment: 'high_value',
      satisfaction: 4.7
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.b@email.com',
      country: 'Australia',
      totalOrders: 1,
      totalSpent: 79.99,
      avgOrderValue: 79.99,
      lastOrder: '2024-01-13',
      customerSince: '2024-01-13',
      segment: 'new',
      satisfaction: 4.5
    },
    {
      id: '6',
      name: 'Emma Davis',
      email: 'emma.d@email.com',
      country: 'France',
      totalOrders: 6,
      totalSpent: 1799.94,
      avgOrderValue: 299.99,
      lastOrder: '2024-01-13',
      customerSince: '2023-09-15',
      segment: 'high_value',
      satisfaction: 4.8
    },
    {
      id: '7',
      name: 'James Miller',
      email: 'james.m@email.com',
      country: 'India',
      totalOrders: 4,
      totalSpent: 478.00,
      avgOrderValue: 119.50,
      lastOrder: '2024-01-12',
      customerSince: '2023-10-05',
      segment: 'regular',
      satisfaction: 4.4
    },
    {
      id: '8',
      name: 'Anna Garcia',
      email: 'anna.g@email.com',
      country: 'Spain',
      totalOrders: 9,
      totalSpent: 2249.91,
      avgOrderValue: 249.99,
      lastOrder: '2024-01-12',
      customerSince: '2023-07-22',
      segment: 'high_value',
      satisfaction: 4.9
    },
    {
      id: '9',
      name: 'Robert Taylor',
      email: 'robert.t@email.com',
      country: 'Italy',
      totalOrders: 2,
      totalSpent: 358.00,
      avgOrderValue: 179.00,
      lastOrder: '2024-01-11',
      customerSince: '2023-11-18',
      segment: 'new',
      satisfaction: 4.6
    },
    {
      id: '10',
      name: 'Maria Rodriguez',
      email: 'maria.r@email.com',
      country: 'Mexico',
      totalOrders: 7,
      totalSpent: 1119.93,
      avgOrderValue: 159.99,
      lastOrder: '2024-01-11',
      customerSince: '2023-05-30',
      segment: 'regular',
      satisfaction: 4.7
    }
  ]

  // Calculate metrics
  const totalCustomers = customersData.length
  const totalRevenue = customersData.reduce((sum, customer) => sum + customer.totalSpent, 0)
  const avgOrderValue = customersData.reduce((sum, customer) => sum + customer.avgOrderValue, 0) / totalCustomers
  const repeatCustomers = customersData.filter(customer => customer.totalOrders > 1).length
  const repeatRate = (repeatCustomers / totalCustomers) * 100

  // Segment distribution
  const segmentDistribution = {
    high_value: customersData.filter(customer => customer.segment === 'high_value').length,
    regular: customersData.filter(customer => customer.segment === 'regular').length,
    new: customersData.filter(customer => customer.segment === 'new').length
  }

  // Geographic distribution
  const countryStats = customersData.reduce((acc, customer) => {
    acc[customer.country] = (acc[customer.country] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topCountries = Object.entries(countryStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)

  // Customer lifetime value analysis
  const avgLifetimeValue = totalRevenue / totalCustomers
  const highValueCustomers = customersData.filter(customer => customer.segment === 'high_value')
  const avgHighValueSpent = highValueCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0) / highValueCustomers.length

  // Filter data based on segment
  const filteredCustomers = segment === 'all' 
    ? customersData 
    : customersData.filter(customer => customer.segment === segment)

  return (
    <div className="space-y-6">
      {/* Filters removed per spec (using global Today button in header) */}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+15% from last month</span>
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
            <span>+22% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Repeat Rate</p>
              <p className="text-2xl font-bold text-gray-900">{repeatRate.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Repeat className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+3% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Lifetime Value</p>
              <p className="text-2xl font-bold text-gray-900">${avgLifetimeValue.toFixed(0)}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+18% from last month</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Segmentation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Segmentation</h3>
          <div className="space-y-3">
            {Object.entries(segmentDistribution).map(([segment, count]) => {
              const percentage = (count / totalCustomers) * 100
              const segmentConfig = {
                high_value: { label: 'High Value', color: 'bg-green-500', description: '>$200 avg order' },
                regular: { label: 'Regular', color: 'bg-blue-500', description: '$100-$200 avg order' },
                new: { label: 'New', color: 'bg-yellow-500', description: 'First-time customers' }
              }
              const config = segmentConfig[segment as keyof typeof segmentConfig]
              
              return (
                <div key={segment} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${config.color}`}></div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">{config.label}</span>
                      <p className="text-xs text-gray-500">{config.description}</p>
                    </div>
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

        {/* Geographic Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
          <div className="space-y-3">
            {topCountries.map(([country, count], index) => {
              const percentage = (count / totalCustomers) * 100
              return (
                <div key={country} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">{country}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
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

      {/* Customer Value Analysis */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Value Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">${avgLifetimeValue.toFixed(0)}</div>
            <div className="text-sm text-gray-600">Average Lifetime Value</div>
            <div className="text-xs text-gray-500 mt-1">All customers</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">${avgHighValueSpent.toFixed(0)}</div>
            <div className="text-sm text-gray-600">High Value Customer Avg</div>
            <div className="text-xs text-gray-500 mt-1">{highValueCustomers.length} customers</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{avgOrderValue.toFixed(0)}</div>
            <div className="text-sm text-gray-600">Average Order Value</div>
            <div className="text-xs text-gray-500 mt-1">Per transaction</div>
          </div>
        </div>
      </div>

      {/* Customer Satisfaction */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Satisfaction</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Rating</span>
              <span className="text-2xl font-bold text-gray-900">4.7</span>
            </div>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-5 h-5 ${star <= 4.7 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">High Value Customers</span>
              <span className="font-medium">4.8 avg rating</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Regular Customers</span>
              <span className="font-medium">4.6 avg rating</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">New Customers</span>
              <span className="font-medium">4.7 avg rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Customer Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Segment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-[#faf9f5]">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      customer.segment === 'high_value' ? 'bg-green-100 text-green-800' :
                      customer.segment === 'regular' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {customer.segment.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.totalOrders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${customer.avgOrderValue.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-900">{customer.satisfaction}</span>
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

