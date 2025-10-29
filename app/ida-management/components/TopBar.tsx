'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Bell, ChevronDown, Menu, User as UserIcon, Settings, LogOut, Shield } from 'lucide-react'
import { User as UserType } from '../page'
import { ThemeSwitcher } from './ThemeSwitcher'
import { Notifications } from './Notifications'
// import { DateRangeFilter } from './DateRangeFilter'

interface TopBarProps {
  user: UserType
  onUserChange: (user: UserType) => void
  onToggleSidebar: () => void
  onNavigate?: (section: string) => void
  onSearch?: (searchTerm: string) => void
}

export function TopBar({ user, onUserChange, onToggleSidebar, onNavigate, onSearch }: TopBarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const userDropdownRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle dropdown menu item clicks
  const handleProfileClick = () => {
    setIsUserDropdownOpen(false)
    onNavigate?.('profile')
  }

  const handleSettingsClick = () => {
    setIsUserDropdownOpen(false)
    onNavigate?.('settings')
  }

  const handleAdminPanelClick = () => {
    setIsUserDropdownOpen(false)
    onNavigate?.('admin')
  }

  const handleSignOutClick = () => {
    setIsUserDropdownOpen(false)
    // In a real app, this would handle logout
    console.log('Sign out clicked')
    alert('Sign out functionality would be implemented here')
  }

  const handleNotificationClick = (orderId: string) => {
    // Navigate to orders section and then to specific order
    if (onNavigate) {
      onNavigate('orders')
      // In a real app, you would navigate to the specific order
      console.log('Navigating to order:', orderId)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // Navigate to orders section
      if (onNavigate) {
        onNavigate('orders')
      }
      
      // Pass search term to parent component
      if (onSearch) {
        onSearch(searchTerm.trim())
      }
      
      console.log('Searching for:', searchTerm.trim())
    }
  }

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-[#E8E6CF] dark:border-gray-700 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left side - Mobile menu and search */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-[#F5F4E7] rounded-xl transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Global Search */}
          <form onSubmit={handleSearch} className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by orders, customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00473A] focus:border-transparent w-full bg-white text-gray-900 placeholder-gray-400 transition-colors"
            />
          </form>
        </div>

        {/* Right side - Notifications and User menu */}
        <div className="flex items-center space-x-4">

          {/* Notifications */}
          <button 
            onClick={() => setShowNotifications(true)}
            className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-[#F5F4E7] rounded-xl transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="sr-only">3 notifications</span>
            </span>
          </button>

          {/* User Menu */}
          <div className="relative" ref={userDropdownRef}>
            <button 
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center space-x-3 hover:bg-[#F5F4E7] rounded-xl p-2 transition-colors"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* User Dropdown Menu */}
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-[#E8E6CF] rounded-xl shadow-lg z-50">
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button 
                    onClick={handleProfileClick}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-[#F5F4E7] transition-colors"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  
                  <button 
                    onClick={handleSettingsClick}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-[#F5F4E7] transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  
                  {/* Theme Switcher */}
                  <div className="px-4 py-2">
                    <ThemeSwitcher className="w-full justify-start" />
                  </div>
                  
                  {user.role === 'admin' && (
                    <button 
                      onClick={handleAdminPanelClick}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-[#F5F4E7] transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Admin Panel</span>
                    </button>
                  )}
                  
                  <div className="border-t border-gray-100 my-1"></div>
                  
                  <button 
                    onClick={handleSignOutClick}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notifications Modal */}
      <Notifications
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        onOrderClick={handleNotificationClick}
      />
    </header>
  )
}