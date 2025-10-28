'use client'

import { useState } from 'react'
import { X, Download, FileText, Calendar, Filter, BarChart3 } from 'lucide-react'

interface ReportsExportModalProps {
  isOpen: boolean
  onClose: () => void
  onExport: (exportData: any) => void
}

export function ReportsExportModal({ isOpen, onClose, onExport }: ReportsExportModalProps) {
  const [exportConfig, setExportConfig] = useState({
    reportType: 'orders',
    dateRange: 'last_30_days',
    format: 'csv',
    includeCharts: false,
    filters: {
      status: [] as string[],
      payment: [] as string[],
      country: [] as string[]
    }
  })
  const [isExporting, setIsExporting] = useState(false)

  const reportTypes = [
    {
      id: 'orders',
      label: 'Orders Report',
      description: 'Complete order data with customer information',
      icon: FileText
    },
    {
      id: 'products',
      label: 'Products Report',
      description: 'Product performance and sales data',
      icon: BarChart3
    },
    {
      id: 'customers',
      label: 'Customers Report',
      description: 'Customer data and order history',
      icon: FileText
    },
    {
      id: 'revenue',
      label: 'Revenue Report',
      description: 'Financial data and revenue analysis',
      icon: BarChart3
    }
  ]

  const dateRanges = [
    { id: 'last_7_days', label: 'Last 7 days' },
    { id: 'last_30_days', label: 'Last 30 days' },
    { id: 'last_90_days', label: 'Last 90 days' },
    { id: 'last_year', label: 'Last year' },
    { id: 'custom', label: 'Custom range' }
  ]

  const formats = [
    { id: 'csv', label: 'CSV', description: 'Comma-separated values' },
    { id: 'xlsx', label: 'Excel', description: 'Microsoft Excel format' },
    { id: 'pdf', label: 'PDF', description: 'Portable Document Format' }
  ]

  const handleExport = async () => {
    setIsExporting(true)
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, this would generate and download the file
      const exportData = {
        ...exportConfig,
        timestamp: new Date().toISOString(),
        filename: `${exportConfig.reportType}_report_${new Date().toISOString().split('T')[0]}.${exportConfig.format}`
      }
      
      onExport(exportData)
      onClose()
    } catch (error) {
      alert('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleConfigChange = (key: string, value: any) => {
    setExportConfig(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
    setExportConfig(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterType]: checked 
          ? [...prev.filters[filterType as keyof typeof prev.filters], value]
          : prev.filters[filterType as keyof typeof prev.filters].filter((item: string) => item !== value)
      }
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Export Report</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Report Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Report Type *</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reportTypes.map((type) => {
                const Icon = type.icon
                return (
                  <label
                    key={type.id}
                    className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      exportConfig.reportType === type.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reportType"
                      value={type.id}
                      checked={exportConfig.reportType === type.id}
                      onChange={(e) => handleConfigChange('reportType', e.target.value)}
                      className="sr-only"
                    />
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{type.label}</p>
                      <p className="text-sm text-gray-500">{type.description}</p>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Date Range *
            </label>
            <select
              value={exportConfig.dateRange}
              onChange={(e) => handleConfigChange('dateRange', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {dateRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Export Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Download className="w-4 h-4 inline mr-2" />
              Export Format *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {formats.map((format) => (
                <label
                  key={format.id}
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    exportConfig.format === format.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="format"
                    value={format.id}
                    checked={exportConfig.format === format.id}
                    onChange={(e) => handleConfigChange('format', e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{format.label}</p>
                    <p className="text-sm text-gray-500">{format.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Filter className="w-4 h-4 inline mr-2" />
              Filters (Optional)
            </label>
            <div className="space-y-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order Status</label>
                <div className="flex flex-wrap gap-2">
                  {['processing', 'shipment_in_progress', 'completed', 'on_hold', 'refunded'].map((status) => (
                    <label key={status} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={exportConfig.filters.status.includes(status)}
                        onChange={(e) => handleFilterChange('status', status, e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700 capitalize">{status.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
                <div className="flex flex-wrap gap-2">
                  {['paid', 'pending', 'failed'].map((payment) => (
                    <label key={payment} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={exportConfig.filters.payment.includes(payment)}
                        onChange={(e) => handleFilterChange('payment', payment, e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700 capitalize">{payment}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Export Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Export Preview</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Report:</strong> {reportTypes.find(t => t.id === exportConfig.reportType)?.label}</p>
              <p><strong>Date Range:</strong> {dateRanges.find(r => r.id === exportConfig.dateRange)?.label}</p>
              <p><strong>Format:</strong> {formats.find(f => f.id === exportConfig.format)?.label}</p>
              <p><strong>Estimated Records:</strong> 1,247 orders</p>
              <p><strong>File Size:</strong> ~2.3 MB</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-lg ${
              isExporting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            } text-white`}
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Exporting...' : 'Export Report'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
