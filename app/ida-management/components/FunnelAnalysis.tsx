'use client'

import { useState } from 'react'
import { TrendingDown, TrendingUp, Users, Eye, Upload, CreditCard, CheckCircle, AlertCircle, Filter } from 'lucide-react'
import { DateFilterButton } from './DateFilterButton'

export function FunnelAnalysis() {
  const [dateRange, setDateRange] = useState('today')
  const [isDateOpen, setIsDateOpen] = useState(false)
  const [funnelType, setFunnelType] = useState('conversion')

  // Mock funnel data
  const funnelData = {
    website_visitors: {
      count: 10000,
      label: 'Website Visitors',
      description: 'Total website visitors',
      icon: Eye,
      color: 'bg-blue-500'
    },
    driver_details: {
      count: 3500,
      label: 'Driver Details',
      description: 'Started filling driver details',
      icon: Users,
      color: 'bg-green-500'
    },
    upload_photos: {
      count: 2100,
      label: 'Upload Photos',
      description: 'Uploaded required documents',
      icon: Upload,
      color: 'bg-yellow-500'
    },
    delivery_details: {
      count: 1800,
      label: 'Delivery Details',
      description: 'Completed delivery information',
      icon: Users,
      color: 'bg-orange-500'
    },
    payment: {
      count: 1200,
      label: 'Payment',
      description: 'Completed payment process',
      icon: CreditCard,
      color: 'bg-purple-500'
    },
    completed: {
      count: 1100,
      label: 'Completed',
      description: 'Successfully completed order',
      icon: CheckCircle,
      color: 'bg-green-600'
    }
  }

  const funnelStages = Object.entries(funnelData)
  const totalVisitors = funnelData.website_visitors.count

  // Calculate conversion rates
  const conversionRates = funnelStages.map(([key, stage], index) => {
    const rate = (stage.count / totalVisitors) * 100
    const previousStage = index > 0 ? funnelStages[index - 1][1] : null
    const stageRate = previousStage ? (stage.count / previousStage.count) * 100 : rate
    
    return {
      key,
      stage,
      overallRate: rate,
      stageRate: stageRate,
      dropOff: previousStage ? previousStage.count - stage.count : 0
    }
  })

  // Time to convert analysis
  const timeToConvert = {
    driver_details: { avg: '2.5 min', median: '1.8 min' },
    upload_photos: { avg: '4.2 min', median: '3.1 min' },
    delivery_details: { avg: '1.8 min', median: '1.2 min' },
    payment: { avg: '3.1 min', median: '2.4 min' },
    completed: { avg: '12.3 min', median: '8.7 min' }
  }

  // Drop-off analysis
  const dropOffReasons = [
    { reason: 'Complex form fields', percentage: 35, count: 490 },
    { reason: 'Document upload issues', percentage: 28, count: 392 },
    { reason: 'Payment processing errors', percentage: 18, count: 252 },
    { reason: 'Delivery address validation', percentage: 12, count: 168 },
    { reason: 'Other technical issues', percentage: 7, count: 98 }
  ]

  // A/B Testing results
  const abTestResults = [
    {
      test: 'Form Layout A vs B',
      variant: 'A',
      conversion: 12.3,
      improvement: '+15%',
      status: 'winner'
    },
    {
      test: 'Payment Flow A vs B',
      variant: 'B',
      conversion: 8.7,
      improvement: '+8%',
      status: 'winner'
    },
    {
      test: 'Document Upload A vs B',
      variant: 'A',
      conversion: 6.2,
      improvement: '+3%',
      status: 'inconclusive'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <DateFilterButton label="Today" onClick={() => setIsDateOpen(!isDateOpen)} isOpen={isDateOpen} />
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={funnelType}
              onChange={(e) => setFunnelType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="conversion">Conversion Funnel</option>
              <option value="recovery">Recovery Funnel</option>
              <option value="mobile">Mobile Funnel</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Conversion</p>
              <p className="text-2xl font-bold text-gray-900">11.0%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+2.3% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Best Stage</p>
              <p className="text-2xl font-bold text-gray-900">91.7%</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <span>Upload Photos → Delivery</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Biggest Drop-off</p>
              <p className="text-2xl font-bold text-gray-900">14.3%</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <span>Driver Details → Upload</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Time to Convert</p>
              <p className="text-2xl font-bold text-gray-900">12.3m</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>-1.2m from last month</span>
          </div>
        </div>
      </div>

      {/* Funnel Visualization */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Conversion Funnel</h3>
        <div className="space-y-4">
          {conversionRates.map(({ key, stage, overallRate, stageRate, dropOff }, index) => {
            const Icon = stage.icon
            const isLastStage = index === conversionRates.length - 1
            
            return (
              <div key={key} className="relative">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${stage.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{stage.label}</h4>
                      <p className="text-sm text-gray-600">{stage.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{stage.count.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{overallRate.toFixed(1)}% of total</div>
                    {!isLastStage && (
                      <div className="text-sm text-gray-500">
                        {stageRate.toFixed(1)}% conversion
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Drop-off indicator */}
                {!isLastStage && dropOff > 0 && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center space-x-2 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                      <TrendingDown className="w-4 h-4" />
                      <span>{dropOff.toLocaleString()} dropped off</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Time Analysis & Drop-off Reasons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time to Convert */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Time to Convert</h3>
          <div className="space-y-3">
            {Object.entries(timeToConvert).map(([stage, times]) => {
              const stageInfo = funnelData[stage as keyof typeof funnelData]
              const Icon = stageInfo.icon
              
              return (
                <div key={stage} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${stageInfo.color}`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{stageInfo.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{times.avg}</div>
                    <div className="text-xs text-gray-500">avg</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Drop-off Reasons */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Drop-off Reasons</h3>
          <div className="space-y-3">
            {dropOffReasons.map((reason, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">{reason.reason}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-red-500"
                      style={{ width: `${reason.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12 text-right">{reason.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* A/B Testing Results */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">A/B Testing Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {abTestResults.map((test, index) => (
            <div key={index} className={`p-4 rounded-lg border-2 ${
              test.status === 'winner' ? 'border-green-200 bg-green-50' :
              test.status === 'inconclusive' ? 'border-yellow-200 bg-yellow-50' :
              'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{test.test}</h4>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  test.status === 'winner' ? 'bg-green-100 text-green-800' :
                  test.status === 'inconclusive' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {test.status}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Variant {test.variant}</span>
                  <span className="font-medium">{test.conversion}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Improvement</span>
                  <span className={`font-medium ${
                    test.status === 'winner' ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {test.improvement}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recovery Strategies */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recovery Strategies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-gray-900">Email Retargeting</h4>
            </div>
            <p className="text-sm text-gray-600 mb-2">Send follow-up emails to users who dropped off</p>
            <div className="text-sm text-gray-500">
              <span className="font-medium">Recovery Rate:</span> 23% of dropped users return
            </div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h4 className="font-medium text-gray-900">Form Simplification</h4>
            </div>
            <p className="text-sm text-gray-600 mb-2">Reduce form fields and improve UX</p>
            <div className="text-sm text-gray-500">
              <span className="font-medium">Impact:</span> +15% conversion improvement
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

