'use client'

import React from 'react'

interface FilterOption {
  id: string
  label: string
  count?: number
}

interface FilterPillsProps {
  options: FilterOption[]
  activeOption: string
  onOptionChange: (optionId: string) => void
  className?: string
}

export function FilterPills({ options, activeOption, onOptionChange, className = '' }: FilterPillsProps) {
  return (
    <div className={`bg-[#FAF9F6] rounded-full p-1 ${className}`}>
      <div className="flex space-x-1">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onOptionChange(option.id)}
            className={`flex-1 px-4 py-2 text-sm rounded-full transition-all duration-200 whitespace-nowrap ${
              activeOption === option.id
                ? 'bg-[#00473A] text-white font-bold'
                : 'text-black font-semibold hover:text-black/80'
            }`}
          >
            {option.label}
            {option.count !== undefined && (
              <span className={`ml-1 ${
                activeOption === option.id ? 'text-green-200' : 'text-black/60'
              }`}>
                {option.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
