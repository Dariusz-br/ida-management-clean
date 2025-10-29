'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'

interface Tab {
  id: string
  label: string
  icon?: LucideIcon
}

interface MinimalTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  label?: string
}

export function MinimalTabs({ tabs, activeTab, onTabChange, label }: MinimalTabsProps) {
  return (
    <div className="space-y-3">
      {label && (
        <h3 className="text-lg font-semibold text-[#00473A]">{label}</h3>
      )}
      <div className="bg-[#FAF9F6] rounded-full p-1">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex-1 px-6 py-3 text-sm font-bold rounded-full transition-all duration-200 flex items-center justify-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-[#00473A] text-white shadow-sm'
                    : 'text-[#00473A] hover:text-[#00473A]/80'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
