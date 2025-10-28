'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from './components/Sidebar'
import { TopBar } from './components/TopBar'
import { Dashboard } from './components/Dashboard'
import { Dashboard2 } from './components/Dashboard2'
import { Orders } from './components/Orders'
import { OrderDetails } from './components/OrderDetails'
import { Products } from './components/Products'
import { Users } from './components/Users'
import { Reports } from './components/Reports'
import { Discounts } from './components/Discounts'
import { Affiliates } from './components/Affiliates'
import { ComponentLab } from './components/ComponentLab'
import { Settings } from './components/Settings'
import { sharedOrdersData } from './data/orders'

export type UserRole = 'admin' | 'team' | 'agent' | 'supplier'
export type OrderStatus = 'processing' | 'shipment_in_progress' | 'completed' | 'on_hold' | 'refunded'
export type DeliveryType = 'vip_express' | 'standard'
export type InternalStatus = 'pending_review' | 'on_hold' | 'reviewed'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export interface Order {
  id: string
  orderId: string
  customer: {
    name: string
    email: string
    phone?: string
  }
  shipping: {
    address: string
    city: string
    country: string
    postalCode: string
  }
  payment: {
    status: 'paid' | 'pending' | 'failed'
    method: string
    transactionId?: string
  }
  status: OrderStatus
  internalStatus: InternalStatus
  deliveryType: DeliveryType
  productType: 'digital' | 'print_digital'
  amount: number
  currency: string
  date: string
  documents: {
    selfie: { status: 'missing' | 'pending' | 'approved' | 'rejected'; url?: string; rejectionNote?: string }
    front: { status: 'missing' | 'pending' | 'approved' | 'rejected'; url?: string; rejectionNote?: string }
    back: { status: 'missing' | 'pending' | 'approved' | 'rejected'; url?: string; rejectionNote?: string }
  }
  tracking?: {
    carrier: string
    number: string
  }
  fulfillment?: {
    center: string
    generated: boolean
    printed: boolean
  }
  notes?: string
  activity: Array<{
    id: string
    type: 'status_change' | 'document_upload' | 'tracking_update' | 'note_added'
    message: string
    timestamp: string
    user: string
  }>
  affiliateTracking?: {
    isAffiliateOrder: boolean
    affiliateName?: string
    referralCode?: string
    referralLink?: string
    couponCode?: string
    channel?: string
  }
}

export default function IDAManagementApp() {
  const [currentUser, setCurrentUser] = useState<User>({
    id: '1',
    name: 'Jonathan Doe',
    email: 'jonathan.doe@ida.com',
    role: 'admin',
    avatar: '/avatars/jonathan-doe.jpg'
  })

  const [activeSection, setActiveSection] = useState('dashboard')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('ida-theme')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const handleNavigation = (section: string) => {
    switch (section) {
      case 'orders':
        setActiveSection('orders')
        setSelectedOrder(null)
        break
      case 'profile':
        setActiveSection('users')
        setSelectedOrder(null)
        break
      case 'settings':
        setActiveSection('settings')
        setSelectedOrder(null)
        break
      case 'admin':
        setActiveSection('users')
        setSelectedOrder(null)
        break
      default:
        break
    }
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    // Clear any sub-page states when navigating to a new section
    setSelectedOrder(null)
    // Add any other sub-page state clearing here if needed
  }

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm)
  }

  const renderContent = () => {
    if (selectedOrder) {
      return <OrderDetails order={selectedOrder} onBack={() => setSelectedOrder(null)} />
    }

    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onOrderSelect={setSelectedOrder} onNavigate={handleNavigation} onSearch={handleSearch} />
      case 'dashboard2':
        return <Dashboard2 onOrderSelect={(orderId) => {
          const order = sharedOrdersData.find(o => o.id === orderId) as Order
          if (order) setSelectedOrder(order)
        }} onNavigate={handleNavigation} onSearch={handleSearch} />
      case 'orders':
        return <Orders onOrderSelect={setSelectedOrder} initialSearchTerm={searchTerm} />
      case 'products':
        return <Products />
      case 'users':
        return <Users />
      case 'reports':
        return <Reports />
      case 'discounts':
        return <Discounts />
      case 'affiliates':
        return <Affiliates />
      case 'component-lab':
        return <ComponentLab />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-[#FAF9F6] dark:bg-gray-900">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        collapsed={sidebarCollapsed}
        userRole={currentUser.role}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          user={currentUser}
          onUserChange={setCurrentUser}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onNavigate={handleNavigation}
          onSearch={handleSearch}
        />
        
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
