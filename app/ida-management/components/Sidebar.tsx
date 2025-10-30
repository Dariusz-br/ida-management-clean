'use client'

import { useState } from 'react'
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart3, 
  Percent, 
  Network, 
  Settings,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  ChevronDown,
  ChevronRight as ChevronRightIcon
} from 'lucide-react'
import { UserRole } from '../page'

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  collapsed: boolean
  userRole: UserRole
  onToggleCollapse: () => void
}

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'team']
  },
  {
    id: 'dashboard2',
    label: 'Dashboard #2',
    icon: LayoutDashboard,
    roles: ['admin', 'team']
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: ShoppingCart,
    roles: ['admin', 'team', 'agent', 'supplier'],
    hasSubmenu: true,
    submenu: [
      { id: 'abandoned-orders', label: 'Abandoned Orders' },
      { id: 'quiz', label: 'Quiz' }
    ]
  },
  {
    id: 'products',
    label: 'Products',
    icon: Package,
    roles: ['admin', 'team']
  },
  {
    id: 'users',
    label: 'Users',
    icon: Users,
    roles: ['admin', 'team']
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    icon: BarChart3,
    roles: ['admin', 'team']
  },
  {
    id: 'discounts',
    label: 'Discounts',
    icon: Percent,
    roles: ['admin', 'team']
  },
  {
    id: 'affiliates',
    label: 'Affiliates',
    icon: Network,
    roles: ['admin', 'team']
  },
  {
    id: 'component-lab',
    label: 'Component Lab',
    icon: FlaskConical,
    roles: ['admin', 'team']
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    roles: ['admin', 'team', 'agent', 'supplier']
  }
]

export function Sidebar({ activeSection, onSectionChange, collapsed, userRole, onToggleCollapse }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const visibleItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  )

  const toggleSubmenu = (itemId: string) => {
    setExpandedMenus(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const isSubmenuExpanded = (itemId: string) => expandedMenus.includes(itemId)

  return (
    <div className={`bg-white dark:bg-gray-800 border-r border-[#E8E6CF] dark:border-gray-700 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} relative select-none z-20`}>
      {/* Logo */}
      <div className="p-6 border-b border-[#E8E6CF] dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#00473A] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">IDA</span>
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-caption text-[#333333] dark:text-white">INTERNATIONAL</h1>
              <h2 className="text-label text-[#666666] dark:text-gray-400">AUTOMOBILE AUTHORITY</h2>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 pt-16 space-y-2">
        {visibleItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          const hasSubmenu = item.hasSubmenu && item.submenu
          const isExpanded = isSubmenuExpanded(item.id)
          
          return (
            <div key={item.id}>
              {/* Main Navigation Item */}
              <div className="flex items-center">
                {/* Main button - clickable to navigate */}
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`flex-1 flex items-center px-4 py-4 text-button transition-all duration-200 select-none ${
                    isActive
                      ? 'bg-[#00473A] text-white shadow-lg'
                      : 'text-[#666666] dark:text-gray-300 hover:bg-[#F5F4E7] dark:hover:bg-gray-700 hover:text-[#333333] dark:hover:text-white'
                  }`}
                  style={{ borderRadius: '50px' }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </button>
                
                {/* Arrow button - only for items with submenu */}
                {hasSubmenu && !collapsed && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSubmenu(item.id)
                    }}
                    className="ml-2 p-2 text-[#666666] dark:text-gray-400 hover:text-[#333333] dark:hover:text-white hover:bg-[#F5F4E7] dark:hover:bg-gray-700 rounded-xl transition-colors select-none"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRightIcon className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>

              {/* Submenu Items */}
              {hasSubmenu && isExpanded && !collapsed && (
                <div className="ml-8 mt-2 space-y-2">
                  {item.submenu?.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => onSectionChange(subItem.id)}
                      className={`w-full flex items-center px-4 py-3 text-button transition-all duration-200 select-none ${
                        activeSection === subItem.id
                          ? 'bg-[#F5F4E7] dark:bg-gray-700 text-[#333333] dark:text-white'
                          : 'text-[#999999] dark:text-gray-400 hover:bg-[#F5F4E7] dark:hover:bg-gray-700 hover:text-[#333333] dark:hover:text-white'
                      }`}
                      style={{ borderRadius: '50px' }}
                    >
                      <span className="ml-3">{subItem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="absolute bottom-4 left-4">
        <button 
          onClick={onToggleCollapse}
          className="w-8 h-8 bg-[#00473A] hover:bg-[#00473A]/90 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  )
}