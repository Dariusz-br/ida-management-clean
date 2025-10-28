'use client'

interface DocumentStatusCirclesProps {
  documents: {
    selfie: { status: string }
    front: { status: string }
    back: { status: string }
  }
  orderStatus: string
}

export function DocumentStatusCircles({ documents, orderStatus }: DocumentStatusCirclesProps) {
  const getCircleColor = (status: string, orderStatus: string) => {
    // If order is canceled, all circles are grey
    if (orderStatus === 'refunded') {
      return 'bg-gray-400'
    }
    
    switch (status) {
            case 'approved':
              return 'bg-green-500'
      case 'rejected':
        return 'bg-red-500'
      case 'pending':
        return 'bg-amber-500'
      case 'missing':
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <div className="flex items-center space-x-1">
      {/* Selfie Circle */}
      <div 
        className={`w-3 h-3 rounded-full ${getCircleColor(documents.selfie?.status || 'missing', orderStatus)}`}
        title={`Selfie: ${documents.selfie?.status || 'missing'}`}
      />
      {/* Front Document Circle */}
      <div 
        className={`w-3 h-3 rounded-full ${getCircleColor(documents.front?.status || 'missing', orderStatus)}`}
        title={`Front: ${documents.front?.status || 'missing'}`}
      />
      {/* Back Document Circle */}
      <div 
        className={`w-3 h-3 rounded-full ${getCircleColor(documents.back?.status || 'missing', orderStatus)}`}
        title={`Back: ${documents.back?.status || 'missing'}`}
      />
    </div>
  )
}
