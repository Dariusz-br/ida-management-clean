'use client'

import React, { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { DateFilterButton } from './DateFilterButton'

type Granularity = 'daily' | 'weekly' | 'monthly'
type SeriesKey = 'inStore' | 'online'

type Point = {
  label: string
  inStore: number
  online: number
}

const dailyMock: Point[] = [
  { label: 'Mon', inStore: 180, online: 140 },
  { label: 'Tue', inStore: 295, online: 225 },
  { label: 'Wed', inStore: 285, online: 380 },
  { label: 'Thu', inStore: 345, online: 200 },
  { label: 'Fri', inStore: 150, online: 165 },
  { label: 'Sat', inStore: 340, online: 290 },
  { label: 'Sun', inStore: 300, online: 300 },
]

const weeklyMock: Point[] = [
  { label: 'W1', inStore: 820, online: 640 },
  { label: 'W2', inStore: 1010, online: 880 },
  { label: 'W3', inStore: 930, online: 700 },
  { label: 'W4', inStore: 1150, online: 920 },
]

const monthlyMock: Point[] = [
  { label: 'Jan', inStore: 195, online: 145 },
  { label: 'Feb', inStore: 298, online: 225 },
  { label: 'Mar', inStore: 285, online: 380 },
  { label: 'Apr', inStore: 345, online: 200 },
  { label: 'May', inStore: 150, online: 165 },
  { label: 'Jun', inStore: 345, online: 290 },
  { label: 'Jul', inStore: 300, online: 300 },
  { label: 'Aug', inStore: 98, online: 95 },
  { label: 'Sep', inStore: 120, online: 300 },
  { label: 'Oct', inStore: 215, online: 220 },
  { label: 'Nov', inStore: 195, online: 115 },
  { label: 'Dec', inStore: 298, online: 145 },
]

function getData(granularity: Granularity) {
  if (granularity === 'daily') return dailyMock
  if (granularity === 'weekly') return weeklyMock
  return monthlyMock
}

export function OrdersStats() {
  const [tab, setTab] = useState<'orders' | 'sales'>('orders')
  const [granularity, setGranularity] = useState<Granularity>('monthly')
  const [isDateOpen, setIsDateOpen] = useState(false)

  const data = useMemo(() => getData(granularity), [granularity])

  const totals = useMemo(() => {
    const sum = data.reduce(
      (acc, p) => {
        acc.inStore += p.inStore
        acc.online += p.online
        return acc
      },
      { inStore: 0, online: 0 }
    )
    const total = sum.inStore + sum.online
    const target = 200_000
    const pct = Math.min(100, (total / target) * 100)
    return { ...sum, total, target, pct }
  }, [data])

  const maxY = useMemo(() => {
    const maxPoint = Math.max(
      ...data.map(p => Math.max(p.inStore, p.online))
    )
    return Math.ceil((maxPoint + 20) / 50) * 50
  }, [data])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#E8E6CF] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-[#333333]">Orders</h3>
          <div className="bg-[#F5F4E7] rounded-full p-1">
            <div className="flex items-center">
              <button
                onClick={() => setTab('orders')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-full ${
                  tab === 'orders'
                    ? 'bg-[#00473A] text-white border border-[#E8E6CF]'
                    : 'text-black'
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => setTab('sales')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-full ${
                  tab === 'sales'
                    ? 'bg-[#00473A] text-white border border-[#E8E6CF]'
                    : 'text-black'
                }`}
              >
                Sales
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-[#F5F4E7] rounded-full p-1">
            <div className="flex items-center">
              <button
                onClick={() => setGranularity('daily')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                  granularity === 'daily'
                    ? 'bg-[#00473A] text-white border border-[#E8E6CF]'
                    : 'text-black'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setGranularity('weekly')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                  granularity === 'weekly'
                    ? 'bg-[#00473A] text-white border border-[#E8E6CF]'
                    : 'text-black'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setGranularity('monthly')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                  granularity === 'monthly'
                    ? 'bg-[#00473A] text-white border border-[#E8E6CF]'
                    : 'text-black'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <DateFilterButton
            label="25 Jul – 25 Aug"
            onClick={() => setIsDateOpen(!isDateOpen)}
            isOpen={isDateOpen}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
        <div className="lg:col-span-4 p-6">
          <BarChart
            data={data}
            maxY={maxY}
            series={[
              { key: 'inStore', label: 'In-store', color: '#16A34A' },
              { key: 'online', label: 'Online', color: '#D1D5DB' },
            ]}
          />

          <div className="mt-4 flex items-center gap-6">
            <LegendDot color="#16A34A" label="In-store" />
            <LegendDot color="#D1D5DB" label="Online" />
          </div>
        </div>

        <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-[#E8E6CF] p-6 space-y-4">
          <div>
            <div className="text-3xl font-bold text-[#333333]">
              {totals.total.toLocaleString()}
            </div>
            <div className="text-xs text-[#666666] mt-1">
              A project‑wise breakdown of total {tab}.
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-[#666666] mb-1">
              <span>0.00</span>
              <span>{totals.target.toLocaleString()}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-2 bg-[#16A34A] rounded-full"
                style={{ width: `${totals.pct}%` }}
              />
            </div>
          </div>

          <button className="w-full flex items-center justify-between px-3 py-2 text-sm bg-white border border-[#E8E6CF] rounded-xl hover:bg-[#F5F4E7]">
            <span>Show all highlights</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          <button className="w-full flex items-center justify-between px-3 py-2 text-sm bg-white border border-[#E8E6CF] rounded-xl hover:bg-[#F5F4E7]">
            <span>Show all {tab} data</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-block w-3 h-3 rounded" style={{ backgroundColor: color }} />
      <span className="text-xs text-[#333333] font-medium">{label}</span>
    </div>
  )
}

function BarChart({
  data,
  maxY,
  series,
}: {
  data: Point[]
  maxY: number
  series: { key: SeriesKey; label: string; color: string }[]
}) {
  const barGroupWidth = 36
  const barGap = 6
  const groupGap = 18
  const chartHeight = 240
  const paddingTop = 10
  const paddingBottom = 24
  const height = chartHeight + paddingTop + paddingBottom

  const width =
    data.length * (barGroupWidth + groupGap) - groupGap + 24

  const scale = (v: number) => (v / maxY) * chartHeight

  return (
    <div className="w-full overflow-x-auto">
      <svg width={width} height={height}>
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
          const y = paddingTop + chartHeight - t * chartHeight
          return (
            <line
              key={i}
              x1={0}
              y1={y}
              x2={width}
              y2={y}
              stroke="#E8E6CF"
              strokeWidth="1"
            />
          )
        })}

        {data.map((p, i) => {
          const x0 = i * (barGroupWidth + groupGap)
          const s0 = series[0]
          const s1 = series[1]
          const h0 = scale(p[s0.key])
          const h1 = scale(p[s1.key])
          const y0 = paddingTop + (chartHeight - h0)
          const y1 = paddingTop + (chartHeight - h1)

          return (
            <g key={p.label}>
              <rect
                x={x0}
                y={y0}
                width={barGroupWidth / 2 - barGap / 2}
                height={h0}
                rx={4}
                fill={s0.color}
              />
              <rect
                x={x0 + barGroupWidth / 2 + barGap / 2}
                y={y1}
                width={barGroupWidth / 2 - barGap / 2}
                height={h1}
                rx={4}
                fill={s1.color}
              />
              <text
                x={x0 + barGroupWidth / 2}
                y={paddingTop + chartHeight + 14}
                textAnchor="middle"
                fontSize="10"
                fill="#666666"
              >
                {p.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}


