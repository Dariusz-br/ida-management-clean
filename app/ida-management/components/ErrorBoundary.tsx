'use client'

import React from 'react'

type Props = { children: React.ReactNode }
type State = { hasError: boolean; error?: any }

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error }
  }

  componentDidCatch(error: any, info: any) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4">
            <div className="font-semibold mb-2">A runtime error occurred.</div>
            <pre className="text-xs whitespace-pre-wrap">{String(this.state.error)}</pre>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}


