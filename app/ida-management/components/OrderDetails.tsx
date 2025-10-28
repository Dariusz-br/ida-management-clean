'use client'

import { useState } from 'react'
import { 
  ArrowLeft, 
  Download, 
  Copy, 
  Edit, 
  Save, 
  X,
  CheckCircle,
  Clock,
  Truck,
  AlertCircle,
  RotateCcw,
  Upload,
  Eye,
  Trash2,
  Users,
  Crown,
  Smartphone,
  Mail,
  FileText,
  Package,
  Image
} from 'lucide-react'
import { Order } from '../page'
import { getOperationByCountry } from '../utils/operations'
import { OperationDropdown } from './OperationDropdown'
import { DocumentStatusDropdown } from './DocumentStatusDropdown'
import { StatusDropdown } from './StatusDropdown'
import { OrderDetailsActionsDropdown } from './OrderDetailsActionsDropdown'
import { InternalStatusDropdown } from './InternalStatusDropdown'

interface OrderDetailsProps {
  order: Order
  onBack: () => void
}

export function OrderDetails({ order, onBack }: OrderDetailsProps) {
  // Force rebuild for Vercel deployment
  const [isEditing, setIsEditing] = useState(false)
  const [editedOrder, setEditedOrder] = useState(order)
  const [notes, setNotes] = useState(order.notes || '')
  const [isSavingNotes, setIsSavingNotes] = useState(false)
  const [currentOperation, setCurrentOperation] = useState(getOperationByCountry(order.shipping.country))
  const [currentStatus, setCurrentStatus] = useState(order.status)
  const [editingFulfillment, setEditingFulfillment] = useState(false)
  const [editedFulfillment, setEditedFulfillment] = useState({
    carrier: order.tracking?.carrier || 'USPS Standard shipping',
    trackingNumber: order.tracking?.number || 'IPA-12416273883',
    operation: getOperationByCountry(order.shipping.country)
  })
  const [documentStatuses, setDocumentStatuses] = useState({
    selfie: order.documents.selfie?.status || 'missing',
    front: order.documents.front?.status || 'missing',
    back: order.documents.back?.status || 'missing'
  })
  const [internalStatus, setInternalStatus] = useState(order.internalStatus || 'pending_review')
  
  // Customer Information editing state
  const [isEditingCustomer, setIsEditingCustomer] = useState(false)
  const [editedCustomer, setEditedCustomer] = useState({
    name: order.customer.name,
    email: order.customer.email,
    phone: order.customer?.phone || '',
    city: order.shipping?.city || '',
    country: order.shipping.country,
    address: order.shipping?.address || ''
  })

  // Application Details editing state
  const [isEditingApplication, setIsEditingApplication] = useState(false)
  const [editedApplication, setEditedApplication] = useState({
    fullName: 'Mark Johnson',
    sex: 'Male',
    dateOfBirth: 'January 10, 1993',
    citizenship: 'France',
    residency: 'Thailand',
    destination: 'Thailand',
    licenseClasses: 'A/B/C',
    licenseCountry: 'France',
    licenseExpiryDate: '29/01/2028'
  })
  
  // Export modal state
  const [showExportModal, setShowExportModal] = useState(false)
  const [selectedAssets, setSelectedAssets] = useState({
    orderData: true,
    customerInfo: true,
    documents: true,
    generatedArtifacts: true,
    applicationDetails: true,
    activityLog: true
  })

  const statusConfig = {
    processing: { label: 'Processing', color: 'bg-blue-100 text-blue-800', icon: Clock },
    shipment_in_progress: { label: 'Shipment in Progress', color: 'bg-yellow-100 text-yellow-800', icon: Truck },
    completed: { label: 'Completed', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    on_hold: { label: 'On Hold', color: 'bg-red-100 text-red-800', icon: AlertCircle },
    refunded: { label: 'Refunded', color: 'bg-[#F5F4E7] text-gray-800', icon: RotateCcw }
  }

  const handleSaveNotes = async () => {
    setIsSavingNotes(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSavingNotes(false)
  }

  const handleSaveFulfillment = async () => {
    // Update the operation if it changed
    if (editedFulfillment.operation !== currentOperation) {
      setCurrentOperation(editedFulfillment.operation)
    }
    
    // Here you would typically make an API call to save the fulfillment details
    console.log('Saving fulfillment details:', editedFulfillment)
    
    setEditingFulfillment(false)
  }

  const handleOperationChange = (newOperation: string) => {
    console.log('OrderDetails: Changing operation to:', newOperation)
    setCurrentOperation(newOperation as 'UK OP' | 'China OP')
    // Here you would typically make an API call to update the operation
    alert(`Operation changed to ${newOperation}. This would update the fulfillment center assignment.`)
  }

  const handleStatusChange = (newStatus: string) => {
    console.log('OrderDetails: Changing status to:', newStatus)
    setCurrentStatus(newStatus as any)
    // Here you would typically make an API call to update the status
    alert(`Order status changed to ${newStatus}. This would update the order status.`)
  }

  const handleOrderAction = (action: string, order: Order) => {
    switch (action) {
      case 'cancel':
        setCurrentStatus('refunded' as any)
        alert(`Order ${order.orderId} has been cancelled and refunded.`)
        break
      case 'regenerate_booklet':
        alert(`Booklet regeneration initiated for order ${order.orderId}.`)
        break
      case 'regenerate_card':
        alert(`Card regeneration initiated for order ${order.orderId}.`)
        break
      case 'archive':
        alert(`Order ${order.orderId} has been archived.`)
        break
      default:
        console.log(`Action ${action} not implemented`)
    }
  }

  // Customer editing functions
  const handleSaveCustomer = () => {
    // Update the order with edited customer information
    setEditedOrder({
      ...editedOrder,
      customer: {
        ...editedOrder.customer,
        name: editedCustomer.name,
        email: editedCustomer.email,
        phone: editedCustomer.phone
      },
      shipping: {
        ...editedOrder.shipping,
        city: editedCustomer.city,
        country: editedCustomer.country,
        address: editedCustomer.address
      }
    })
    setIsEditingCustomer(false)
    console.log('Customer information saved:', editedCustomer)
  }

  const handleCancelCustomer = () => {
    // Reset to original values
    setEditedCustomer({
      name: order.customer.name,
      email: order.customer.email,
      phone: order.customer?.phone || '',
      city: order.shipping?.city || '',
      country: order.shipping.country,
      address: order.shipping?.address || ''
    })
    setIsEditingCustomer(false)
  }

  // Application Details editing functions
  const handleSaveApplication = () => {
    setIsEditingApplication(false)
    console.log('Application details saved:', editedApplication)
  }

  const handleCancelApplication = () => {
    // Reset to original values
    setEditedApplication({
      fullName: 'Mark Johnson',
      sex: 'Male',
      dateOfBirth: 'January 10, 1993',
      citizenship: 'France',
      residency: 'Thailand',
      destination: 'Thailand',
      licenseClasses: 'A/B/C',
      licenseCountry: 'France',
      licenseExpiryDate: '29/01/2028'
    })
    setIsEditingApplication(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-[#F5F4E7] text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-[#F5F4E7]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
            <p className="text-sm text-gray-500">Order ID: {order.orderId}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <StatusDropdown
            currentStatus={currentStatus}
            onStatusChange={handleStatusChange}
          />
          <button className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-[#F5F4E7] text-gray-800 hover:opacity-80 cursor-pointer">
            <Download className="w-4 h-4 mr-2" />
            <span>Download Invoice</span>
          </button>
          <button 
            onClick={() => setShowExportModal(true)}
            className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-[#F5F4E7] text-gray-800 hover:opacity-80 cursor-pointer"
          >
            <FileText className="w-4 h-4 mr-2" />
            <span>Export Order</span>
          </button>
          <button className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-[#F5F4E7] text-gray-800 hover:opacity-80 cursor-pointer">
            <Copy className="w-4 h-4 mr-2" />
            <span>Copy Link</span>
          </button>
          <OrderDetailsActionsDropdown
            order={order}
            onAction={handleOrderAction}
          />
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Customer Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
            {/* Header with Date */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{formatDate(order.date)}</span>
                <button
                  onClick={() => setIsEditingCustomer(!isEditingCustomer)}
                  className="p-2 text-gray-600 hover:text-gray-800 bg-[#E2EAFF] rounded-lg"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Customer Profile with Avatar */}
            <div className="flex items-center mb-6">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#00473A] flex items-center justify-center text-white font-semibold">
                  {order.customer.name.split(' ').map(n => n[0]).join('')}
                </div>
                {order.deliveryType === 'vip_express' && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Crown className="w-2 h-2 text-yellow-600" />
                  </div>
                )}
              </div>
              <div className="ml-4">
                {isEditingCustomer ? (
                  <input
                    type="text"
                    value={editedCustomer.name}
                    onChange={(e) => setEditedCustomer({...editedCustomer, name: e.target.value})}
                    className="text-lg font-semibold text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#00473A] focus:outline-none"
                  />
                ) : (
                  <h4 className="text-lg font-semibold text-gray-900">{editedOrder.customer.name}</h4>
                )}
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="mb-6">
              <h4 className="text-base font-semibold text-gray-900 mb-2">Contact info</h4>
              <div className="border-t border-[#E8E6CF] pt-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-4 h-4 text-gray-500" />
                  {isEditingCustomer ? (
                    <input
                      type="tel"
                      value={editedCustomer.phone}
                      onChange={(e) => setEditedCustomer({...editedCustomer, phone: e.target.value})}
                      placeholder="Phone number"
                      className="text-sm text-gray-600 bg-transparent border-b border-gray-300 focus:border-[#00473A] focus:outline-none flex-1"
                    />
                  ) : (
                    <span className="text-sm text-gray-600">{editedOrder.customer?.phone || 'Not provided'}</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  {isEditingCustomer ? (
                    <input
                      type="email"
                      value={editedCustomer.email}
                      onChange={(e) => setEditedCustomer({...editedCustomer, email: e.target.value})}
                      className="text-sm text-gray-600 bg-transparent border-b border-gray-300 focus:border-[#00473A] focus:outline-none flex-1"
                    />
                  ) : (
                    <span className="text-sm text-gray-600">{editedOrder.customer.email}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Address Section */}
            <div className="mb-6">
              <h4 className="text-base font-semibold text-gray-900 mb-2">Shipping Address</h4>
              <div className="border-t border-[#E8E6CF] pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="text-gray-500">Name</div>
                    <div className="text-gray-500">Email</div>
                    <div className="text-gray-500">Phone</div>
                    <div className="text-gray-500">City</div>
                    <div className="text-gray-500">Country</div>
                    <div className="text-gray-500">Shipping Address</div>
                  </div>
                  <div className="space-y-2">
                    {isEditingCustomer ? (
                      <input
                        type="text"
                        value={editedCustomer.name}
                        onChange={(e) => setEditedCustomer({...editedCustomer, name: e.target.value})}
                        className="text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#00473A] focus:outline-none w-full"
                      />
                    ) : (
                      <div className="text-gray-900">{editedOrder.customer.name}</div>
                    )}
                    {isEditingCustomer ? (
                      <input
                        type="email"
                        value={editedCustomer.email}
                        onChange={(e) => setEditedCustomer({...editedCustomer, email: e.target.value})}
                        className="text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#00473A] focus:outline-none w-full"
                      />
                    ) : (
                      <div className="text-gray-900">{editedOrder.customer.email}</div>
                    )}
                    {isEditingCustomer ? (
                      <input
                        type="tel"
                        value={editedCustomer.phone}
                        onChange={(e) => setEditedCustomer({...editedCustomer, phone: e.target.value})}
                        placeholder="Phone number"
                        className="text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#00473A] focus:outline-none w-full"
                      />
                    ) : (
                      <div className="text-gray-900">{editedOrder.customer?.phone || 'Not provided'}</div>
                    )}
                    {isEditingCustomer ? (
                      <input
                        type="text"
                        value={editedCustomer.city}
                        onChange={(e) => setEditedCustomer({...editedCustomer, city: e.target.value})}
                        placeholder="City"
                        className="text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#00473A] focus:outline-none w-full"
                      />
                    ) : (
                      <div className="text-gray-900">{editedOrder.shipping?.city || 'Not provided'}</div>
                    )}
                    {isEditingCustomer ? (
                      <input
                        type="text"
                        value={editedCustomer.country}
                        onChange={(e) => setEditedCustomer({...editedCustomer, country: e.target.value})}
                        placeholder="Country"
                        className="text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#00473A] focus:outline-none w-full"
                      />
                    ) : (
                      <div className="text-gray-900">{editedOrder.shipping.country}</div>
                    )}
                    {isEditingCustomer ? (
                      <input
                        type="text"
                        value={editedCustomer.address}
                        onChange={(e) => setEditedCustomer({...editedCustomer, address: e.target.value})}
                        placeholder="Shipping address"
                        className="text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#00473A] focus:outline-none w-full"
                      />
                    ) : (
                      <div className="text-gray-900">{editedOrder.shipping?.address || 'Not provided'}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with Update Timestamp */}
            <div className="bg-[#F5F4E7] -mx-6 -mb-6 px-6 py-3 rounded-b-lg">
              {isEditingCustomer ? (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Edit customer information</div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCancelCustomer}
                      className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={handleSaveCustomer}
                      className="flex items-center space-x-1 px-3 py-1 text-sm bg-[#00473A] text-white rounded-lg hover:bg-[#00473A]/90 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Updated November 23, 2023</div>
                  <div className="text-sm text-gray-500">by John Smith</div>
                </div>
              )}
            </div>
          </div>

          {/* Generated Artifacts */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Generated Artifacts</h3>
              <div className="flex items-center space-x-2">
                <button className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-[#F5F4E7] text-gray-800 hover:opacity-80 cursor-pointer">
                  <Download className="w-4 h-4 mr-2" />
                  <span>Download All</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* IDP Booklet */}
              <div className="relative group">
                <div className="rounded-lg p-4 border border-[#E8E6CF]">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-900">IDP Booklet</h4>
                    <button className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-lg bg-[#F5F4E7] text-gray-800 hover:opacity-80 cursor-pointer">
                      <Download className="w-3 h-3 mr-1" />
                      <span>Download</span>
                    </button>
                  </div>
                  
                  {/* Thumbnail */}
                  <div className="relative mb-3">
                    <div className="w-full h-32 bg-white rounded border border-[#E8E6CF] flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-16 bg-red-100 rounded border-2 border-red-300 mx-auto mb-2 flex items-center justify-center">
                          <span className="text-red-600 text-xs font-bold">IDP</span>
                        </div>
                        <span className="text-xs text-gray-500">Booklet Preview</span>
                      </div>
                    </div>
                    
                    {/* Hover Preview Button */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button className="px-3 py-1 bg-white text-gray-900 rounded text-xs font-medium hover:bg-gray-100 transition-colors">
                        Preview PDF
                      </button>
                    </div>
                  </div>
                  
                  {/* Generation Date */}
                  <div className="text-xs text-gray-500">
                    Generated: {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>

              {/* IDP Card */}
              <div className="relative group">
                <div className="rounded-lg p-4 border border-[#E8E6CF]">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-900">IDP Card</h4>
                    <button className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-lg bg-[#F5F4E7] text-gray-800 hover:opacity-80 cursor-pointer">
                      <Download className="w-3 h-3 mr-1" />
                      <span>Download</span>
                    </button>
                  </div>
                  
                  {/* Thumbnail */}
                  <div className="relative mb-3">
                    <div className="w-full h-32 bg-white rounded border border-[#E8E6CF] flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-10 bg-blue-100 rounded border-2 border-blue-300 mx-auto mb-2 flex items-center justify-center">
                          <span className="text-blue-600 text-xs font-bold">IDP</span>
                        </div>
                        <span className="text-xs text-gray-500">Card Preview</span>
                      </div>
                    </div>
                    
                    {/* Hover Preview Button */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button className="px-3 py-1 bg-white text-gray-900 rounded text-xs font-medium hover:bg-gray-100 transition-colors">
                        Preview PDF
                      </button>
                    </div>
                  </div>
                  
                  {/* Generation Date */}
                  <div className="text-xs text-gray-500">
                    Generated: {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Item</h3>
            <div className="space-y-4">
              {/* Main Product */}
              <div className="flex items-center p-4 bg-[#F5F4E7] rounded-lg">
                <div className="w-16 h-16 bg-white rounded-lg border border-[#E8E6CF] flex items-center justify-center mr-4 flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-6 h-6 bg-blue-600 rounded-sm mx-auto mb-1 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">IDP</span>
                      </div>
                      <div className="w-4 h-4 bg-green-500 rounded-sm mx-auto mt-1"></div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Print + Digital IDP</h4>
                  <p className="text-sm text-gray-600">3 Years</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">$120.00</p>
                </div>
              </div>

              {/* Express Processing */}
              <div className="flex items-center p-4 bg-[#F5F4E7] rounded-lg">
                <div className="w-16 h-16 bg-white rounded-lg border border-[#E8E6CF] flex items-center justify-center mr-4 flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-6 h-6 bg-[#00473A] rounded-sm mx-auto mb-1 flex items-center justify-center">
                        <span className="text-white text-xs">⚡</span>
                      </div>
                      <div className="flex space-x-1 mt-1">
                        <div className="w-1 h-1 bg-[#00473A] rounded-full"></div>
                        <div className="w-1 h-1 bg-[#00473A] rounded-full"></div>
                        <div className="w-1 h-1 bg-[#00473A] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Express Order Processing</h4>
                  <p className="text-sm text-gray-600">VIP EXPRESS</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">$30.00</p>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="mt-6 pt-4 border-t border-[#E8E6CF]">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">$150.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">$5.00</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-[#E8E6CF]">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">$180.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <p className="text-sm text-gray-900">{order.payment.method}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          order.payment.status === 'paid' ? 'bg-[#00473A]/10 text-[#00473A]' :
          order.payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
                  {order.payment.status.toUpperCase()}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                <p className="text-sm text-gray-900 font-mono">{order.payment.transactionId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <p className="text-sm text-gray-900">${order.amount.toFixed(2)} {order.currency}</p>
              </div>
            </div>
          </div>


          {/* Fulfillment Details */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Fullfilment Details</h3>
              <button
                onClick={() => setEditingFulfillment(!editingFulfillment)}
                className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                title="Edit Fulfillment Details"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Shipping Carriers */}
              <div className="flex items-center justify-between py-3 border-b border-[#E8E6CF]">
                <span className="text-sm font-medium text-gray-900">Shipping Carriers</span>
                {editingFulfillment ? (
                  <select
                    value={editedFulfillment.carrier}
                    onChange={(e) => setEditedFulfillment({...editedFulfillment, carrier: e.target.value})}
                    className="text-sm text-gray-600 border border-[#E8E6CF] rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="USPS Standard shipping">USPS Standard shipping</option>
                    <option value="FedEx Express">FedEx Express</option>
                    <option value="DHL Express">DHL Express</option>
                    <option value="UPS Ground">UPS Ground</option>
                  </select>
                ) : (
                  <span className="text-sm text-gray-600">{order.tracking?.carrier || 'USPS Standard shipping'}</span>
                )}
              </div>

              {/* Tracking Number */}
              <div className="flex items-center justify-between py-3 border-b border-[#E8E6CF]">
                <span className="text-sm font-medium text-gray-900">Tracking number</span>
                {editingFulfillment ? (
                  <input
                    type="text"
                    value={editedFulfillment.trackingNumber}
                    onChange={(e) => setEditedFulfillment({...editedFulfillment, trackingNumber: e.target.value})}
                    className="text-sm text-gray-600 border border-[#E8E6CF] rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                    placeholder="Enter tracking number"
                  />
                ) : (
                  <span className="text-sm text-gray-600 font-mono">{order.tracking?.number || 'IPA-12416273883'}</span>
                )}
              </div>

              {/* Fulfillment Center */}
              <div className="flex items-center justify-between py-3 border-b border-[#E8E6CF]">
                <span className="text-sm font-medium text-gray-900">Fulfillment Center</span>
                {editingFulfillment ? (
                  <OperationDropdown
                    currentOperation={editedFulfillment.operation}
                    onOperationChange={(operation) => setEditedFulfillment({...editedFulfillment, operation: operation as 'UK OP' | 'China OP'})}
                  />
                ) : (
                  <span className="text-sm text-gray-600">{currentOperation}</span>
                )}
              </div>

              {/* Document Status */}
              <div className="flex items-center justify-between py-3">
                <span className="text-sm font-medium text-gray-900">Document Status</span>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    order.fulfillment?.generated ? 'bg-green-100 text-green-800' : 'bg-[#F5F4E7] text-gray-800'
                  }`}>
                    {order.fulfillment?.generated ? 'Generated' : 'Not Generated'}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    order.fulfillment?.printed ? 'bg-green-100 text-green-800' : 'bg-[#F5F4E7] text-gray-800'
                  }`}>
                    {order.fulfillment?.printed ? 'Printed' : 'Not Printed'}
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Actions */}
            {editingFulfillment && (
              <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-[#E8E6CF]">
                <button
                  onClick={() => {
                    setEditingFulfillment(false)
                    setEditedFulfillment({
                      carrier: order.tracking?.carrier || 'USPS Standard shipping',
                      trackingNumber: order.tracking?.number || 'IPA-12416273883',
                      operation: currentOperation
                    })
                  }}
                  className="px-4 py-2 text-sm text-gray-600 border border-[#E8E6CF] rounded-lg hover:bg-[#F5F4E7]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveFulfillment}
                  className="px-4 py-2 text-sm bg-[#00473A] text-white rounded-lg hover:bg-[#00473A]/90"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Conversion Attributions */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Attributions</h3>
            
            <div className="space-y-4">
              {/* Utm Source */}
              <div className="flex items-center justify-between py-3 border-b border-[#E8E6CF]">
                <span className="text-sm font-medium text-gray-900">Utm Source</span>
                <span className="text-sm text-gray-600">NA</span>
              </div>

              {/* Utm Medium */}
              <div className="flex items-center justify-between py-3 border-b border-[#E8E6CF]">
                <span className="text-sm font-medium text-gray-900">Utm Medium</span>
                <span className="text-sm text-gray-600">NA</span>
              </div>

              {/* Utm Term */}
              <div className="flex items-center justify-between py-3 border-b border-[#E8E6CF]">
                <span className="text-sm font-medium text-gray-900">Utm Term</span>
                <span className="text-sm text-gray-600">international drivers licence</span>
              </div>

              {/* Utm Campaign */}
              <div className="flex items-center justify-between py-3 border-b border-[#E8E6CF]">
                <span className="text-sm font-medium text-gray-900">Utm Campaign</span>
                <span className="text-sm text-gray-600">08Jan24-ww</span>
              </div>

              {/* Fbclid NA */}
              <div className="flex items-center justify-between py-3 border-b border-[#E8E6CF]">
                <span className="text-sm font-medium text-gray-900">Fbclid NA</span>
                <span className="text-sm text-gray-600">Msclkid NA</span>
              </div>

              {/* Gclid */}
              <div className="flex items-center justify-between py-3 border-b border-[#E8E6CF]">
                <span className="text-sm font-medium text-gray-900">Gclid</span>
                <span className="text-sm text-gray-600 font-mono break-all">
                  CjwKCAjw_LOwBhBFEiwAmSEQARMZq6C9uzyb8z|twevz3TIZYg_Qbek1aSSJpoJB0uPsFu7UWmFEaRoCeBcQAvD_BwE
                </span>
              </div>

              {/* Referral */}
              <div className="flex items-center justify-between py-3 border-b border-[#E8E6CF]">
                <span className="text-sm font-medium text-gray-900">Referral</span>
                <span className="text-sm text-gray-600">Www.internationaldrivingauthority.com/referal 1</span>
              </div>

              {/* Organic Source */}
              <div className="flex items-center justify-between py-3 border-b border-[#E8E6CF]">
                <span className="text-sm font-medium text-gray-900">Organic Source</span>
                <span className="text-sm text-gray-600">https://us.roamerglobe.com/</span>
              </div>

              {/* Discord */}
              <div className="flex items-center justify-between py-3">
                <span className="text-sm font-medium text-gray-900">Discord</span>
                <span className="text-sm text-gray-600 underline">IDP DISCOUNT LINK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Documents and Activity */}
        <div className="space-y-6">
          {/* Internal Notes */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Internal Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add internal notes..."
              className="w-full h-32 px-3 py-2 border border-[#E8E6CF] rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">Auto-saves every 5 seconds</span>
              <button
                onClick={handleSaveNotes}
                disabled={isSavingNotes}
                className="flex items-center space-x-2 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {isSavingNotes ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Uploaded Documents */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Uploads</h3>
              <InternalStatusDropdown
                currentStatus={internalStatus}
                onStatusChange={(newStatus) => {
                  setInternalStatus(newStatus)
                  if (newStatus === 'reviewed') {
                    setDocumentStatuses({
                      selfie: 'approved',
                      front: 'approved',
                      back: 'approved'
                    })
                    console.log('Internal status set to reviewed - all documents automatically approved')
                  }
                }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Selfie Photo */}
              <div className="text-center">
                <div className="w-full h-24 bg-[#F5F4E7] rounded-lg flex items-center justify-center mb-2">
                  {order.documents.selfie?.url ? (
                    <img 
                      src={order.documents.selfie.url} 
                      alt="Selfie" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Upload className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <p className="text-sm font-medium text-gray-900">Selfie Photo</p>
                <div className="mt-2">
                  <DocumentStatusDropdown
                    currentStatus={documentStatuses.selfie}
                    onStatusChange={(newStatus) => {
                      setDocumentStatuses(prev => ({ ...prev, selfie: newStatus }))
                      console.log('Selfie status changed to:', newStatus)
                      if (newStatus === 'approved') {
                        console.log('Order status changed to shipment_in_progress')
                      }
                    }}
                    onRejectionNote={(note) => {
                      console.log('Selfie rejection note:', note)
                    }}
                  />
                </div>
              </div>

              {/* Front Document */}
              <div className="text-center">
                <div className="w-full h-24 bg-[#F5F4E7] rounded-lg flex items-center justify-center mb-2">
                  {order.documents.front?.url ? (
                    <img 
                      src={order.documents.front.url} 
                      alt="Front Document" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Upload className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <p className="text-sm font-medium text-gray-900">Front Document</p>
                <div className="mt-2">
                  <DocumentStatusDropdown
                    currentStatus={documentStatuses.front}
                    onStatusChange={(newStatus) => {
                      setDocumentStatuses(prev => ({ ...prev, front: newStatus }))
                      console.log('Front document status changed to:', newStatus)
                      if (newStatus === 'approved') {
                        console.log('Order status changed to shipment_in_progress')
                      }
                    }}
                    onRejectionNote={(note) => {
                      console.log('Front document rejection note:', note)
                    }}
                  />
                </div>
              </div>

              {/* Back Document */}
              <div className="text-center">
                <div className="w-full h-24 bg-[#F5F4E7] rounded-lg flex items-center justify-center mb-2">
                  {order.documents.back?.url ? (
                    <img 
                      src={order.documents.back.url} 
                      alt="Back Document" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Upload className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <p className="text-sm font-medium text-gray-900">Back Document</p>
                <div className="mt-2">
                  <DocumentStatusDropdown
                    currentStatus={documentStatuses.back}
                    onStatusChange={(newStatus) => {
                      setDocumentStatuses(prev => ({ ...prev, back: newStatus }))
                      console.log('Back document status changed to:', newStatus)
                      if (newStatus === 'approved') {
                        console.log('Order status changed to shipment_in_progress')
                      }
                    }}
                    onRejectionNote={(note) => {
                      console.log('Back document rejection note:', note)
                    }}
                  />
                </div>
              </div>
            </div>

            {/* E-signature - Fourth Card */}
            <div className="mt-6">
              <div className="text-center max-w-sm mx-auto">
                <div className="w-full h-24 bg-[#F5F4E7] rounded-lg flex items-center justify-center mb-2">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-gray-400 rounded mx-auto mb-2"></div>
                    <span className="text-gray-500 text-sm">E-signature</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">E-signature</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm border border-[#E8E6CF] rounded-lg hover:bg-[#F5F4E7]">
                <Eye className="w-4 h-4" />
                <span>Preview All</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm border border-[#E8E6CF] rounded-lg hover:bg-[#F5F4E7]">
                <Download className="w-4 h-4" />
                <span>Download All</span>
              </button>
            </div>
          </div>

          {/* Application Details */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Application details</h3>
              <button
                onClick={() => setIsEditingApplication(!isEditingApplication)}
                className="p-2 text-gray-600 hover:text-gray-800 bg-[#E2EAFF] rounded-lg"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-[#E8E6CF] mb-4"></div>

            {/* Application Details Content */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div className="text-gray-500">Full name</div>
                <div className="text-gray-500">Sex</div>
                <div className="text-gray-500">Date of birth</div>
                <div className="text-gray-500">Citizenship</div>
                <div className="text-gray-500">Residency</div>
                <div className="text-gray-500">Destination</div>
              </div>
              <div className="space-y-3">
                {isEditingApplication ? (
                  <input
                    type="text"
                    value={editedApplication.fullName}
                    onChange={(e) => setEditedApplication({...editedApplication, fullName: e.target.value})}
                    placeholder="Full name"
                    className="text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#00473A] focus:outline-none w-full"
                  />
                ) : (
                  <div className="text-gray-900">{editedApplication.fullName}</div>
                )}
                {isEditingApplication ? (
                  <select
                    value={editedApplication.sex}
                    onChange={(e) => setEditedApplication({...editedApplication, sex: e.target.value})}
                    className="text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#00473A] focus:outline-none w-full"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <div className="text-gray-900">{editedApplication.sex}</div>
                )}
                {isEditingApplication ? (
                  <input
                    type="text"
                    value={editedApplication.dateOfBirth}
                    onChange={(e) => setEditedApplication({...editedApplication, dateOfBirth: e.target.value})}
                    placeholder="Date of birth"
                    className="text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#00473A] focus:outline-none w-full"
                  />
                ) : (
                  <div className="text-gray-900">{editedApplication.dateOfBirth}</div>
                )}
                {isEditingApplication ? (
                  <input
                    type="text"
                    value={editedApplication.citizenship}
                    onChange={(e) => setEditedApplication({...editedApplication, citizenship: e.target.value})}
                    placeholder="Citizenship"
                    className="text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#00473A] focus:outline-none w-full"
                  />
                ) : (
                  <div className="text-gray-900">{editedApplication.citizenship}</div>
                )}
                {isEditingApplication ? (
                  <input
                    type="text"
                    value={editedApplication.residency}
                    onChange={(e) => setEditedApplication({...editedApplication, residency: e.target.value})}
                    placeholder="Residency"
                    className="text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#00473A] focus:outline-none w-full"
                  />
                ) : (
                  <div className="text-gray-900">{editedApplication.residency}</div>
                )}
                {isEditingApplication ? (
                  <input
                    type="text"
                    value={editedApplication.destination}
                    onChange={(e) => setEditedApplication({...editedApplication, destination: e.target.value})}
                    placeholder="Destination"
                    className="text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#00473A] focus:outline-none w-full"
                  />
                ) : (
                  <div className="text-gray-900">{editedApplication.destination}</div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#E8E6CF] my-6"></div>

            {/* License Details Section */}
            <div className="mt-6">
              <h4 className="text-base font-semibold text-gray-900 mb-4">License details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div className="text-gray-500">Classes:</div>
                  <div className="text-gray-500">License Country:</div>
                  <div className="text-gray-500">License Expiry date:</div>
                </div>
                <div className="space-y-3">
                  {isEditingApplication ? (
                    <input
                      type="text"
                      value={editedApplication.licenseClasses}
                      onChange={(e) => setEditedApplication({...editedApplication, licenseClasses: e.target.value})}
                      placeholder="A/B/C"
                      className="text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#00473A] focus:outline-none w-full"
                    />
                  ) : (
                    <div className="text-gray-900">{editedApplication.licenseClasses}</div>
                  )}
                  {isEditingApplication ? (
                    <input
                      type="text"
                      value={editedApplication.licenseCountry}
                      onChange={(e) => setEditedApplication({...editedApplication, licenseCountry: e.target.value})}
                      placeholder="License Country"
                      className="text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#00473A] focus:outline-none w-full"
                    />
                  ) : (
                    <div className="text-gray-900">{editedApplication.licenseCountry}</div>
                  )}
                  {isEditingApplication ? (
                    <input
                      type="text"
                      value={editedApplication.licenseExpiryDate}
                      onChange={(e) => setEditedApplication({...editedApplication, licenseExpiryDate: e.target.value})}
                      placeholder="29/01/2028"
                      className="text-gray-900 bg-transparent border-b border-gray-300 focus:border-[#00473A] focus:outline-none w-full"
                    />
                  ) : (
                    <div className="text-gray-900">{editedApplication.licenseExpiryDate}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer with Save/Cancel buttons */}
            {isEditingApplication && (
              <div className="mt-6 pt-4 border-t border-[#E8E6CF]">
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={handleCancelApplication}
                    className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSaveApplication}
                    className="flex items-center space-x-1 px-3 py-1 text-sm bg-[#00473A] text-white rounded-lg hover:bg-[#00473A]/90 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            )}

            {/* Footer with last update info */}
            <div className="mt-6 bg-[#F5F4E7] -mx-6 -mb-6 px-6 py-3 rounded-b-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Updated November 23, 2023</div>
                <div className="text-sm text-gray-500">by John Smith</div>
              </div>
            </div>
          </div>


          {/* Affiliate Information */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Affiliate Information
            </h3>
            
            {order.affiliateTracking?.isAffiliateOrder ? (
              <div className="space-y-4">
                {/* Affiliate Status */}
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">✅ Affiliate Order</div>
                    <div className="text-xs text-gray-500 mt-1">Order acquired through affiliate partner</div>
                  </div>
                </div>
                
                {/* Affiliate Partner */}
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Affiliate Partner</div>
                    <div className="text-xs text-gray-500 mt-1">{order.affiliateTracking.affiliateName}</div>
                  </div>
                </div>
                
                {/* Referral Code */}
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Referral Code</div>
                    <div className="text-xs text-gray-500 mt-1 font-mono bg-[#F5F4E7] px-2 py-1 rounded inline-block">
                      {order.affiliateTracking.referralCode}
                    </div>
                  </div>
                </div>
                
                {/* Referral Link */}
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Referral Link</div>
                    <div className="text-xs text-gray-500 mt-1">
                      <a 
                        href={order.affiliateTracking.referralLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {order.affiliateTracking.referralLink}
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Coupon Code */}
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Coupon Code Applied</div>
                    <div className="text-xs text-gray-500 mt-1">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        {order.affiliateTracking.couponCode}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Channel */}
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Acquisition Channel</div>
                    <div className="text-xs text-gray-500 mt-1">{order.affiliateTracking.channel}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                <div>
                  <div className="text-sm font-medium text-gray-900">❌ Direct Order</div>
                  <div className="text-xs text-gray-500 mt-1">No affiliate tracking information available</div>
                </div>
              </div>
            )}
          </div>

          {/* Activity Panel */}
          <div className="bg-white rounded-lg shadow-sm border border-[#E8E6CF] p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Panel</h3>
            <div className="space-y-4">
              {order.activity?.length > 0 ? (
                order.activity.map((activity, index) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{activity.user}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{formatDate(activity.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No activity recorded yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Export Order Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Export Order Data</h3>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Order Information */}
                <div className="bg-[#F5F4E7] rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Order Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Order ID:</span>
                      <span className="ml-2 font-medium">{order.orderId}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <span className="ml-2 font-medium">{order.status}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Amount:</span>
                      <span className="ml-2 font-medium">${order.amount}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Created:</span>
                      <span className="ml-2 font-medium">{formatDate(order.date)}</span>
                    </div>
                  </div>
                </div>

                {/* Asset Selection */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Select Assets to Export</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedAssets.orderData}
                        onChange={(e) => setSelectedAssets({...selectedAssets, orderData: e.target.checked})}
                        className="w-4 h-4 text-[#00473A] border-gray-300 rounded focus:ring-[#00473A]"
                      />
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Order Data (JSON/CSV)</span>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedAssets.customerInfo}
                        onChange={(e) => setSelectedAssets({...selectedAssets, customerInfo: e.target.checked})}
                        className="w-4 h-4 text-[#00473A] border-gray-300 rounded focus:ring-[#00473A]"
                      />
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Customer Information</span>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedAssets.documents}
                        onChange={(e) => setSelectedAssets({...selectedAssets, documents: e.target.checked})}
                        className="w-4 h-4 text-[#00473A] border-gray-300 rounded focus:ring-[#00473A]"
                      />
                      <div className="flex items-center space-x-2">
                        <Image className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Uploaded Documents</span>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedAssets.generatedArtifacts}
                        onChange={(e) => setSelectedAssets({...selectedAssets, generatedArtifacts: e.target.checked})}
                        className="w-4 h-4 text-[#00473A] border-gray-300 rounded focus:ring-[#00473A]"
                      />
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Generated Artifacts (IDP Booklet & Card)</span>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedAssets.applicationDetails}
                        onChange={(e) => setSelectedAssets({...selectedAssets, applicationDetails: e.target.checked})}
                        className="w-4 h-4 text-[#00473A] border-gray-300 rounded focus:ring-[#00473A]"
                      />
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Application Details</span>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedAssets.activityLog}
                        onChange={(e) => setSelectedAssets({...selectedAssets, activityLog: e.target.checked})}
                        className="w-4 h-4 text-[#00473A] border-gray-300 rounded focus:ring-[#00473A]"
                      />
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">Activity Log</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Export Format Selection */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Export Format</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2 p-3 border border-[#E8E6CF] rounded-lg hover:bg-[#F5F4E7] cursor-pointer">
                      <input type="radio" name="format" value="zip" className="w-4 h-4 text-[#00473A] border-gray-300 focus:ring-[#00473A]" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">ZIP Archive</div>
                        <div className="text-xs text-gray-500">All files in a compressed folder</div>
                      </div>
                    </label>
                    <label className="flex items-center space-x-2 p-3 border border-[#E8E6CF] rounded-lg hover:bg-[#F5F4E7] cursor-pointer">
                      <input type="radio" name="format" value="pdf" className="w-4 h-4 text-[#00473A] border-gray-300 focus:ring-[#00473A]" />
                      <div>
                        <div className="text-sm font-medium text-gray-700">PDF Report</div>
                        <div className="text-xs text-gray-500">Formatted document with all data</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle export logic here
                    console.log('Exporting order with selected assets:', selectedAssets)
                    setShowExportModal(false)
                  }}
                  className="px-4 py-2 text-sm bg-[#00473A] text-white rounded-lg hover:bg-[#00473A]/90"
                >
                  Export Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
