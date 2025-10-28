'use client'

import { useState } from 'react'
import { FlaskConical, Plus, Code, Palette, Settings, Eye, Users, ShoppingCart, CreditCard, CheckCircle, ArrowRight, TrendingUp, TrendingDown, Target } from 'lucide-react'
import { FlatFlag } from './FlatFlag'

export function ComponentLab() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)

  // Visitor Funnel Data
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

  const testComponents = [
    {
      id: 'button-variants',
      name: 'Button Variants',
      description: 'Test different button styles and states',
      icon: Code,
      status: 'ready'
    },
    {
      id: 'form-components',
      name: 'Form Components',
      description: 'Test form inputs, validation, and layouts',
      icon: Settings,
      status: 'ready'
    },
    {
      id: 'data-display',
      name: 'Data Display',
      description: 'Test tables, cards, and data visualization',
      icon: Eye,
      status: 'ready'
    },
    {
      id: 'navigation',
      name: 'Navigation',
      description: 'Test menus, breadcrumbs, and navigation patterns',
      icon: Palette,
      status: 'ready'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800'
      case 'testing': return 'bg-yellow-100 text-yellow-800'
      case 'development': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: '#FAF9F6' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Component Lab</h1>
          <p className="text-sm text-gray-600 mt-1">Test and develop new components</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-[#00473A] text-white rounded-lg hover:bg-[#00473A]/90">
          <Plus className="w-4 h-4" />
          <span>Add Component</span>
        </button>
      </div>

              {/* Component Preview Space */}
              <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Component Preview</h2>
                    <p className="text-sm text-gray-600">Preview components before moving to production</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Preview Mode</span>
                  </div>
                </div>

                {/* Funnel Components Row */}
                <div className="flex space-x-4">
                  {/* Original Visitor Checkout Funnel - 40% width */}
                  <div className="w-2/5">
                    <div className="bg-gray-50 rounded-lg p-4 border border-[#E8E6CF]">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-gray-900">Visitor Checkout Funnel</h3>
                        <div className="flex items-center space-x-1 text-xs text-gray-600">
                          <Users className="w-3 h-3" />
                          <span>Live tracking</span>
                        </div>
                      </div>

                      {/* Ultra Compact Funnel Visualization */}
                      <div className="space-y-1.5">
                        {funnelData.map((step, index) => {
                          const Icon = step.icon
                          const isLast = index === funnelData.length - 1
                          const nextStep = funnelData[index + 1]
                          const dropoffRate = nextStep ? ((step.visitors - nextStep.visitors) / step.visitors * 100).toFixed(1) : 0
                          const isImportant = step.stage === 'Payment' || step.stage === 'Completed'
                          
                          return (
                            <div key={step.stage} className="relative">
                              <div className="flex items-center space-x-2">
                                {/* Ultra Compact Stage Icon */}
                                <div className={`w-6 h-6 ${step.color} rounded flex items-center justify-center flex-shrink-0`}>
                                  <Icon className="w-3 h-3 text-white" />
                                </div>

                                {/* Ultra Compact Stage Info */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-0.5">
                                    <h4 className="text-xs font-semibold text-gray-900 truncate">{step.stage}</h4>
                                    <div className="flex items-center space-x-1 text-xs">
                                      <span className="text-gray-600">{step.visitors.toLocaleString()}</span>
                                      <span className="font-medium text-gray-900">{step.percentage}%</span>
                                    </div>
                                  </div>
                                  
                                  {/* Ultra Compact Animated Progress Bar */}
                                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden relative">
                                    <div 
                                      className={`h-1.5 ${step.color} rounded-full transition-all duration-1000 ease-out ${
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

                                {/* Ultra Compact Dropoff Rate */}
                                {!isLast && (
                                  <div className="text-right flex-shrink-0">
                                    <div className="text-xs text-red-600 font-medium">
                                      -{dropoffRate}%
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Ultra Compact Arrow to next stage */}
                              {!isLast && (
                                <div className="flex justify-center mt-0.5 mb-0.5">
                                  <div className="flex items-center space-x-1 text-gray-400">
                                    <ArrowRight className="w-2 h-2" />
                                    <span className="text-xs">
                                      {((step.visitors - nextStep.visitors).toLocaleString())} dropped
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>

                      {/* Ultra Compact Funnel Summary */}
                      <div className="bg-white rounded p-2 mt-3 border border-[#E8E6CF]">
                        <div className="grid grid-cols-3 gap-2">
                          <div className="text-center">
                            <div className="text-sm font-bold text-gray-900">{funnelData[0].visitors.toLocaleString()}</div>
                            <div className="text-xs text-gray-600">Total</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-green-600">{funnelData[funnelData.length - 1].visitors.toLocaleString()}</div>
                            <div className="text-xs text-gray-600">Done</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-blue-600">{funnelData[funnelData.length - 1].percentage}%</div>
                            <div className="text-xs text-gray-600">Rate</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* New Alternative Funnel Design - 40% width */}
                  <div className="w-2/5">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-gray-900">Alternative Funnel View</h3>
                        <div className="flex items-center space-x-1 text-xs text-blue-600">
                          <CheckCircle className="w-3 h-3" />
                          <span>Analytics</span>
                        </div>
                      </div>

                      {/* Alternative Funnel Visualization - Circular Progress Style */}
                      <div className="space-y-3">
                        {funnelData.map((step, index) => {
                          const Icon = step.icon
                          const isLast = index === funnelData.length - 1
                          const nextStep = funnelData[index + 1]
                          const dropoffRate = nextStep ? ((step.visitors - nextStep.visitors) / step.visitors * 100).toFixed(1) : 0
                          const isImportant = step.stage === 'Payment' || step.stage === 'Completed'
                          
                          return (
                            <div key={step.stage} className="relative">
                              <div className="flex items-center space-x-3">
                                {/* Circular Progress Icon */}
                                <div className="relative">
                                  <div className={`w-8 h-8 ${step.color} rounded-full flex items-center justify-center`}>
                                    <Icon className="w-4 h-4 text-white" />
                                  </div>
                                  {/* Circular Progress Ring */}
                                  <div className="absolute -inset-1">
                                    <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                                      <path
                                        className="text-gray-200"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        fill="none"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                      />
                                      <path
                                        className={`${step.color.replace('bg-', 'text-')} transition-all duration-1000 ease-out ${
                                          isImportant ? 'animate-pulse' : ''
                                        }`}
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        fill="none"
                                        strokeDasharray={`${step.percentage}, 100`}
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                      />
                                    </svg>
                                  </div>
                                </div>

                                {/* Stage Info */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className="text-xs font-semibold text-gray-900 truncate">{step.stage}</h4>
                                    <div className="flex items-center space-x-2 text-xs">
                                      <span className="text-gray-600">{step.visitors.toLocaleString()}</span>
                                      <span className="font-medium text-gray-900">{step.percentage}%</span>
                                    </div>
                                  </div>
                                  
                                  {/* Alternative Progress Bar - Stepped */}
                                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden relative">
                                    <div 
                                      className={`h-2 ${step.color} rounded-full transition-all duration-1000 ease-out ${
                                        isImportant ? 'animate-pulse' : ''
                                      }`}
                                      style={{ width: `${step.percentage}%` }}
                                    ></div>
                                    
                                    {/* Stepped effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50"></div>
                                  </div>
                                </div>

                                {/* Dropoff Rate */}
                                {!isLast && (
                                  <div className="text-right flex-shrink-0">
                                    <div className="text-xs text-red-500 font-medium">
                                      -{dropoffRate}%
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Connection Line */}
                              {!isLast && (
                                <div className="flex justify-center mt-2 mb-1">
                                  <div className="w-px h-3 bg-gradient-to-b from-blue-300 to-transparent"></div>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>

                      {/* Alternative Funnel Summary */}
                      <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 mt-4 border border-blue-100">
                        <div className="grid grid-cols-3 gap-3">
                          <div className="text-center">
                            <div className="text-sm font-bold text-gray-900">{funnelData[0].visitors.toLocaleString()}</div>
                            <div className="text-xs text-gray-600">Total</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-green-600">{funnelData[funnelData.length - 1].visitors.toLocaleString()}</div>
                            <div className="text-xs text-gray-600">Done</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-blue-600">{funnelData[funnelData.length - 1].percentage}%</div>
                            <div className="text-xs text-gray-600">Rate</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Countries Data Table Component - Matching Dashboard Width */}
                <div className="mt-6">
                  <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Countries Data Table</h3>
                        <p className="text-sm text-gray-600">Sample countries analytics table with flags and trends</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Component Test</span>
                      </div>
                    </div>

                    {/* Countries Data Table - Using Table Structure Like Dashboard */}
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
                            { country: 'United States', visits: 10013, purchases: 5361, change: -3.2, revenue: 536100 },
                            { country: 'India', visits: 8545, purchases: 5361, change: 45.8, revenue: 536100 },
                            { country: 'China', visits: 6837, purchases: 3954, change: 24.4, revenue: 395400 },
                            { country: 'Brazil', visits: 4512, purchases: 2512, change: -12, revenue: 251200 },
                            { country: 'Germany', visits: 3795, purchases: 1173, change: 0.9, revenue: 117300 },
                            { country: 'United Kingdom', visits: 2100, purchases: 1012, change: -0.1, revenue: 101200 }
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
                                ${country.purchases.toLocaleString()}.00
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap">
                                <div className="flex items-center">
                                  {country.change >= 0 ? (
                                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                                  ) : (
                                    <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                                  )}
                                  <span className={`text-xs font-medium ${country.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {Math.abs(country.change)}%
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Summary Stats */}
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <span>6 countries</span>
                        <span>•</span>
                        <span>$1.5M Revenue</span>
                        <span>•</span>
                        <span>380K Visits</span>
                      </div>
                      <div className="flex items-center space-x-1 text-[#00473A]">
                        <Target className="w-4 h-4" />
                        <span>Analytics</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

      {/* Lab Status */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-[#00473A]/10 rounded-lg">
            <FlaskConical className="w-6 h-6 text-[#00473A]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Lab Environment</h3>
            <p className="text-sm text-gray-600">Safe testing environment for new components</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-900">Components Ready</p>
                <p className="text-2xl font-bold text-green-900">4</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Code className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">In Development</p>
                <p className="text-2xl font-bold text-blue-900">0</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Settings className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-900">Testing</p>
                <p className="text-2xl font-bold text-yellow-900">0</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Eye className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Component Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testComponents.map((component) => {
          const Icon = component.icon
          return (
            <div 
              key={component.id}
              className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedComponent(component.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-[#00473A]/10 rounded-lg">
                  <Icon className="w-6 h-6 text-[#00473A]" />
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(component.status)}`}>
                  {component.status}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{component.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{component.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Click to test</span>
                <div className="w-2 h-2 bg-[#00473A] rounded-full"></div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Component Details */}
      {selectedComponent && (
        <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Component Details</h3>
            <button 
              onClick={() => setSelectedComponent(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Code className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Component: {selectedComponent}</span>
            </div>
            <p className="text-sm text-gray-600">
              This is where the component testing interface will be implemented.
              You can add your new components here for testing and development.
            </p>
          </div>
        </div>
      )}

      {/* Development Notes */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="p-1 bg-yellow-100 rounded">
            <FlaskConical className="w-4 h-4 text-yellow-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-yellow-800">Development Notes</h4>
            <p className="text-sm text-yellow-700 mt-1">
              This is a temporary section for testing new components. 
              Components added here can be easily moved to production sections when ready.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
