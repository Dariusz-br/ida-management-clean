'use client'

import { useState, useEffect } from 'react'
import { 
  Bell, 
  X, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Truck, 
  User, 
  Package,
  Settings,
  Eye
} from 'lucide-react'
import { Order } from '../page'

interface Notification {
  id: string
  type: 'order_created' | 'order_updated' | 'order_completed' | 'order_cancelled' | 'payment_received' | 'shipment_created'
  title: string
  message: string
  orderId: string
  orderNumber: string
  timestamp: string
  isRead: boolean
  priority: 'low' | 'medium' | 'high'
}

interface NotificationsProps {
  onOrderClick: (orderId: string) => void
  isOpen: boolean
  onClose: () => void
}

// Mock live activity data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'order_created',
    title: 'New Order Created',
    message: 'Order #ORD-2024-001 has been created by John Smith',
    orderId: 'ORD-2024-001',
    orderNumber: 'ORD-2024-001',
    timestamp: '2 minutes ago',
    isRead: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'payment_received',
    title: 'Payment Received',
    message: 'Payment of $299.00 received for order #ORD-2024-002',
    orderId: 'ORD-2024-002',
    orderNumber: 'ORD-2024-002',
    timestamp: '5 minutes ago',
    isRead: false,
    priority: 'medium'
  },
  {
    id: '3',
    type: 'order_updated',
    title: 'Order Status Updated',
    message: 'Order #ORD-2024-003 status changed to "Shipment in Progress"',
    orderId: 'ORD-2024-003',
    orderNumber: 'ORD-2024-003',
    timestamp: '8 minutes ago',
    isRead: true,
    priority: 'medium'
  },
  {
    id: '4',
    type: 'shipment_created',
    title: 'Shipment Created',
    message: 'Tracking number generated for order #ORD-2024-004',
    orderId: 'ORD-2024-004',
    orderNumber: 'ORD-2024-004',
    timestamp: '12 minutes ago',
    isRead: true,
    priority: 'low'
  },
  {
    id: '5',
    type: 'order_completed',
    title: 'Order Completed',
    message: 'Order #ORD-2024-005 has been marked as completed',
    orderId: 'ORD-2024-005',
    orderNumber: 'ORD-2024-005',
    timestamp: '15 minutes ago',
    isRead: true,
    priority: 'high'
  }
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'order_created':
      return <Package className="w-4 h-4 text-green-600" />
    case 'payment_received':
      return <CheckCircle className="w-4 h-4 text-blue-600" />
    case 'order_updated':
      return <Clock className="w-4 h-4 text-yellow-600" />
    case 'order_completed':
      return <CheckCircle className="w-4 h-4 text-green-600" />
    case 'order_cancelled':
      return <AlertCircle className="w-4 h-4 text-red-600" />
    case 'shipment_created':
      return <Truck className="w-4 h-4 text-purple-600" />
    default:
      return <Bell className="w-4 h-4 text-gray-600" />
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'border-l-red-500'
    case 'medium':
      return 'border-l-yellow-500'
    case 'low':
      return 'border-l-gray-300'
    default:
      return 'border-l-gray-300'
  }
}

export function Notifications({ onOrderClick, isOpen, onClose }: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [showSettings, setShowSettings] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    enabled: true,
    orderCreated: true,
    paymentReceived: true,
    orderUpdated: true,
    orderCompleted: true,
    orderCancelled: true,
    shipmentCreated: true,
    soundEnabled: true,
    desktopNotifications: true
  })

  const unreadCount = notifications.filter(n => !n.isRead).length

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => 
        n.id === notification.id 
          ? { ...n, isRead: true }
          : n
      )
    )
    
    // Navigate to order
    onOrderClick(notification.orderId)
    onClose()
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    )
  }

  const handleSettingsChange = (key: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E8E6CF]">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Live Activity</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="p-6 border-b border-[#E8E6CF] bg-[#F5F4E7]">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Notification Settings</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Enable Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.enabled}
                    onChange={(e) => handleSettingsChange('enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00473A]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00473A]"></div>
                </label>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={notificationSettings.orderCreated}
                    onChange={(e) => handleSettingsChange('orderCreated', e.target.checked)}
                    className="w-4 h-4 text-[#00473A] border-gray-300 rounded focus:ring-[#00473A]"
                  />
                  <span className="text-sm text-gray-700">New Orders</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={notificationSettings.paymentReceived}
                    onChange={(e) => handleSettingsChange('paymentReceived', e.target.checked)}
                    className="w-4 h-4 text-[#00473A] border-gray-300 rounded focus:ring-[#00473A]"
                  />
                  <span className="text-sm text-gray-700">Payments</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={notificationSettings.orderUpdated}
                    onChange={(e) => handleSettingsChange('orderUpdated', e.target.checked)}
                    className="w-4 h-4 text-[#00473A] border-gray-300 rounded focus:ring-[#00473A]"
                  />
                  <span className="text-sm text-gray-700">Status Updates</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={notificationSettings.orderCompleted}
                    onChange={(e) => handleSettingsChange('orderCompleted', e.target.checked)}
                    className="w-4 h-4 text-[#00473A] border-gray-300 rounded focus:ring-[#00473A]"
                  />
                  <span className="text-sm text-gray-700">Completed Orders</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-[#E8E6CF]">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 ${getPriorityColor(notification.priority)} ${
                    !notification.isRead ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          <span className="text-xs text-gray-500">
                            {notification.timestamp}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-[#00473A] font-medium">
                          {notification.orderNumber}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleNotificationClick(notification)
                          }}
                          className="flex items-center space-x-1 text-xs text-[#00473A] hover:text-[#00473A]/80"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View Order</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-4 border-t border-[#E8E6CF] bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {unreadCount} unread notifications
              </span>
              <button
                onClick={markAllAsRead}
                className="text-sm text-[#00473A] hover:text-[#00473A]/80 font-medium"
              >
                Mark all as read
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
