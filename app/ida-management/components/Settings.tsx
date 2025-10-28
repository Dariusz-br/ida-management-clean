'use client'

import { useState } from 'react'
import { Save, User, Bell, Shield, Globe, Database, Mail } from 'lucide-react'

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [settings, setSettings] = useState(() => {
    // Load settings from localStorage or use defaults
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ida-settings')
      if (saved) {
        return JSON.parse(saved)
      }
    }
    return {
      profile: {
        name: 'Jonathan Doe',
        email: 'jonathan.doe@ida.com',
        role: 'admin',
        timezone: 'UTC-5',
        language: 'en'
      },
      notifications: {
        emailOrders: true,
        emailReports: true,
        emailAlerts: false,
        pushNotifications: true
      },
      system: {
        autoRefresh: true,
        refreshInterval: 5,
        theme: 'light',
        compactMode: false
      }
    }
  })
  const [isSaving, setIsSaving] = useState(false)

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'system', label: 'System', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'email', label: 'Email Settings', icon: Mail }
  ]

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('ida-settings', JSON.stringify(settings))
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert('Settings saved successfully!')
    } catch (error) {
      alert('Failed to save settings. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: '#FAF9F6' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${
            isSaving 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-[#00473A] hover:bg-[#00473A]/90'
          } text-white`}
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-green-600 text-white'
                        : 'text-gray-700 hover:bg-[#F5F4E7]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-6">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Profile Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={settings.profile.name}
                      onChange={(e) => setSettings({
                        ...settings,
                        profile: { ...settings.profile, name: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-[#E8E6CF] rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) => setSettings({
                        ...settings,
                        profile: { ...settings.profile, email: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-[#E8E6CF] rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                      value={settings.profile.role}
                      onChange={(e) => setSettings({
                        ...settings,
                        profile: { ...settings.profile, role: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-[#E8E6CF] rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="admin">Admin</option>
                      <option value="team">Team</option>
                      <option value="agent">Agent</option>
                      <option value="supplier">Supplier</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                    <select
                      value={settings.profile.timezone}
                      onChange={(e) => setSettings({
                        ...settings,
                        profile: { ...settings.profile, timezone: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-[#E8E6CF] rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="UTC-5">UTC-5 (EST)</option>
                      <option value="UTC-8">UTC-8 (PST)</option>
                      <option value="UTC+0">UTC+0 (GMT)</option>
                      <option value="UTC+1">UTC+1 (CET)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Email Order Updates</h4>
                      <p className="text-sm text-gray-600">Receive emails when orders are updated</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.emailOrders}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, emailOrders: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E8E6CF] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Email Reports</h4>
                      <p className="text-sm text-gray-600">Receive daily/weekly reports</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.emailReports}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, emailReports: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E8E6CF] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Push Notifications</h4>
                      <p className="text-sm text-gray-600">Receive browser notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.pushNotifications}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, pushNotifications: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E8E6CF] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">System Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Auto Refresh</h4>
                      <p className="text-sm text-gray-600">Automatically refresh data</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.system.autoRefresh}
                        onChange={(e) => setSettings({
                          ...settings,
                          system: { ...settings.system, autoRefresh: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E8E6CF] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Refresh Interval (minutes)</label>
                    <select
                      value={settings.system.refreshInterval}
                      onChange={(e) => setSettings({
                        ...settings,
                        system: { ...settings.system, refreshInterval: parseInt(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-[#E8E6CF] rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value={1}>1 minute</option>
                      <option value={5}>5 minutes</option>
                      <option value={10}>10 minutes</option>
                      <option value={30}>30 minutes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                    <select
                      value={settings.system.theme}
                      onChange={(e) => setSettings({
                        ...settings,
                        system: { ...settings.system, theme: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-[#E8E6CF] rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Other Settings Placeholders */}
            {activeTab !== 'profile' && activeTab !== 'notifications' && activeTab !== 'system' && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#F5F4E7] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h3>
                <p className="text-gray-600">
                  This section is coming soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
