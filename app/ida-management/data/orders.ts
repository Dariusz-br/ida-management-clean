// Shared order data for Dashboard and Orders components
export const sharedOrdersData = [
  {
    id: '1',
    orderId: 'IAA-24152739',
    customer: {
      name: 'John Smith',
      email: 'john.smith@email.com'
    },
    shipping: {
      address: '123 Main St',
      city: 'New York',
      country: 'USA',
      postalCode: '10001'
    },
    payment: {
      status: 'paid' as const,
      method: 'credit_card'
    },
    status: 'processing' as const,
    internalStatus: 'pending_review' as const,
    amount: 129.00,
    currency: 'USD',
    date: '2024-01-15T10:30:00Z',
    deliveryType: 'vip_express' as const,
    productType: 'digital' as const,
    documents: {
      selfie: { status: 'pending' as const, url: '/documents/selfie1.jpg' },
      front: { status: 'pending' as const, url: '/documents/front1.jpg' },
      back: { status: 'missing' as const }
    },
    tracking: {
      carrier: 'DHL',
      number: 'DHL123456789'
    },
    fulfillment: {
      center: 'NYC-001',
      generated: true,
      printed: false
    },
    notes: 'Priority handling requested',
    activity: [
      {
        id: '1',
        type: 'status_change' as const,
        message: 'Order created',
        timestamp: '2024-01-15T10:30:00Z',
        user: 'System'
      },
      {
        id: '2',
        type: 'status_change' as const,
        message: 'Payment confirmed via Credit Card',
        timestamp: '2024-01-15T10:32:00Z',
        user: 'Payment System'
      },
      {
        id: '3',
        type: 'document_upload' as const,
        message: 'Customer uploaded front document',
        timestamp: '2024-01-15T11:15:00Z',
        user: 'John Smith'
      },
      {
        id: '4',
        type: 'status_change' as const,
        message: 'Front document approved by reviewer',
        timestamp: '2024-01-15T14:20:00Z',
        user: 'Document Reviewer'
      }
    ],
    affiliateTracking: {
      isAffiliateOrder: true,
      affiliateName: 'Travel Blog Network',
      referralCode: 'TBN123456',
      referralLink: 'https://yourdomain.com/ref/TBN123456',
      couponCode: 'SAVE10',
      channel: 'Website'
    }
  },
  {
    id: '2',
    orderId: 'IAA-24152740',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com'
    },
    shipping: {
      address: '456 Hauptstraße',
      city: 'Berlin',
      country: 'Germany',
      postalCode: '10115'
    },
    payment: {
      status: 'paid' as const,
      method: 'credit_card'
    },
    status: 'shipment_in_progress' as const,
    internalStatus: 'reviewed' as const,
    amount: 89.50,
    currency: 'EUR',
    date: '2024-01-15T09:15:00Z',
    deliveryType: 'standard' as const,
    productType: 'print_digital' as const,
    documents: {
      selfie: { status: 'approved', url: '/documents/selfie2.jpg' },
      front: { status: 'approved', url: '/documents/front2.jpg' },
      back: { status: 'approved', url: '/documents/back2.jpg' }
    },
    tracking: {
      carrier: 'UPS',
      number: 'UPS987654321'
    },
    fulfillment: {
      center: 'BER-002',
      generated: true,
      printed: true
    },
    notes: 'Standard delivery',
    activity: [
      {
        id: '1',
        type: 'status_change' as const,
        message: 'Order created',
        timestamp: '2024-01-15T09:15:00Z',
        user: 'System'
      },
      {
        id: '2',
        type: 'status_change' as const,
        message: 'Order moved to Shipment in Progress',
        timestamp: '2024-01-15T11:30:00Z',
        user: 'Sarah Johnson'
      },
      {
        id: '3',
        type: 'tracking_update' as const,
        message: 'Package picked up by UPS',
        timestamp: '2024-01-15T15:45:00Z',
        user: 'UPS System'
      }
    ],
    affiliateTracking: {
      isAffiliateOrder: true,
      affiliateName: 'Adventure Guides',
      referralCode: 'AG789012',
      referralLink: 'https://yourdomain.com/ref/AG789012',
      couponCode: 'ADVENTURE15',
      channel: 'Email'
    }
  },
  {
    id: '3',
    orderId: 'IAA-24152741',
    customer: {
      name: 'Mike Wilson',
      email: 'mike.w@email.com'
    },
    shipping: {
      address: '789 Tokyo Street',
      city: 'Tokyo',
      country: 'Japan',
      postalCode: '100-0001'
    },
    payment: {
      status: 'paid' as const,
      method: 'credit_card'
    },
    status: 'completed' as const,
    internalStatus: 'on_hold' as const,
    amount: 199.99,
    currency: 'JPY',
    date: '2024-01-14T14:20:00Z',
    deliveryType: 'vip_express' as const,
    productType: 'digital' as const,
    documents: {
      selfie: { status: 'approved', url: '/documents/selfie3.jpg' },
      front: { status: 'approved', url: '/documents/front3.jpg' },
      back: { status: 'approved', url: '/documents/back3.jpg' }
    },
    tracking: {
      carrier: 'FedEx',
      number: 'FDX456789123'
    },
    fulfillment: {
      center: 'TYO-003',
      generated: true,
      printed: true
    },
    notes: 'VIP express delivery',
    activity: [
      {
        id: '1',
        type: 'status_change' as const,
        message: 'Order created',
        timestamp: '2024-01-14T14:20:00Z',
        user: 'System'
      },
      {
        id: '2',
        type: 'status_change' as const,
        message: 'Order shipped',
        timestamp: '2024-01-14T16:45:00Z',
        user: 'Mike Wilson'
      },
      {
        id: '3',
        type: 'tracking_update' as const,
        message: 'Package delivered successfully',
        timestamp: '2024-01-15T09:30:00Z',
        user: 'Delivery System'
      },
      {
        id: '4',
        type: 'status_change' as const,
        message: 'Order completed',
        timestamp: '2024-01-15T09:30:00Z',
        user: 'Delivery System'
      }
    ]
  },
  {
    id: '4',
    orderId: 'IAA-24152742',
    customer: {
      name: 'Lisa Chen',
      email: 'lisa.c@email.com'
    },
    shipping: {
      address: '321 Beijing Road',
      city: 'Beijing',
      country: 'China',
      postalCode: '100000'
    },
    payment: {
      status: 'pending' as const,
      method: 'bank_transfer'
    },
    status: 'on_hold' as const,
    internalStatus: 'pending_review' as const,
    amount: 149.00,
    currency: 'CNY',
    date: '2024-01-14T11:45:00Z',
    deliveryType: 'standard' as const,
    documents: {
      selfie: { status: 'rejected', url: '/documents/selfie4.jpg', rejectionNote: 'Photo quality is too blurry' },
      front: { status: 'rejected', url: '/documents/front4.jpg', rejectionNote: 'Document is not clear enough' },
      back: { status: 'missing' }
    },
    tracking: {
      carrier: null,
      number: null
    },
    fulfillment: {
      center: 'BJS-004',
      generated: false,
      printed: false
    },
    notes: 'Document verification required',
    activity: [
      {
        id: '1',
        type: 'status_change' as const,
        message: 'Order created',
        timestamp: '2024-01-14T11:45:00Z',
        user: 'System'
      },
      {
        id: '2',
        type: 'document_upload' as const,
        message: 'Customer uploaded front document',
        timestamp: '2024-01-14T12:30:00Z',
        user: 'Lisa Chen'
      },
      {
        id: '3',
        type: 'status_change' as const,
        message: 'Front document rejected - poor quality',
        timestamp: '2024-01-14T13:20:00Z',
        user: 'Document Reviewer'
      },
      {
        id: '4',
        type: 'status_change' as const,
        message: 'Order placed on hold pending document resubmission',
        timestamp: '2024-01-14T13:25:00Z',
        user: 'Document Reviewer'
      }
    ]
  },
  {
    id: '5',
    orderId: 'IAA-24152743',
    customer: {
      name: 'David Brown',
      email: 'david.b@email.com'
    },
    shipping: {
      address: '654 Sydney Street',
      city: 'Sydney',
      country: 'Australia',
      postalCode: 'NSW 2000'
    },
    payment: {
      status: 'paid' as const,
      method: 'credit_card'
    },
    status: 'refunded' as const,
    internalStatus: 'reviewed' as const,
    amount: 79.99,
    currency: 'AUD',
    date: '2024-01-13T16:30:00Z',
    deliveryType: 'standard' as const,
    documents: {
      selfie: { status: 'approved', url: '/documents/selfie5.jpg' },
      front: { status: 'approved', url: '/documents/front5.jpg' },
      back: { status: 'approved', url: '/documents/back5.jpg' }
    }
  },
  {
    id: '6',
    orderId: 'IAA-24152744',
    customer: {
      name: 'Emma Davis',
      email: 'emma.d@email.com'
    },
    shipping: {
      address: '987 Champs-Élysées',
      city: 'Paris',
      country: 'France',
      postalCode: '75008'
    },
    payment: {
      status: 'paid' as const,
      method: 'credit_card'
    },
    status: 'processing' as const,
    amount: 299.99,
    currency: 'EUR',
    date: '2024-01-13T13:20:00Z',
    deliveryType: 'vip_express' as const,
    documents: {
      selfie: { status: 'pending', url: '/documents/selfie6.jpg' },
      front: { status: 'pending', url: '/documents/front6.jpg' },
      back: { status: 'missing' }
    }
  },
  {
    id: '7',
    orderId: 'IAA-24152745',
    customer: {
      name: 'James Miller',
      email: 'james.m@email.com'
    },
    shipping: {
      address: '147 Mumbai Road',
      city: 'Mumbai',
      country: 'India',
      postalCode: '400001'
    },
    payment: {
      status: 'failed' as const,
      method: 'credit_card'
    },
    status: 'on_hold' as const,
    internalStatus: 'on_hold' as const,
    amount: 119.50,
    currency: 'INR',
    date: '2024-01-12T15:45:00Z',
    deliveryType: 'standard' as const,
    documents: {
      selfie: { status: 'approved', url: '/documents/selfie7.jpg' },
      front: { status: 'approved', url: '/documents/front7.jpg' },
      back: { status: 'pending', url: '/documents/back7.jpg' }
    }
  },
  {
    id: '8',
    orderId: 'IAA-24152746',
    customer: {
      name: 'Anna Garcia',
      email: 'anna.g@email.com'
    },
    shipping: {
      address: '258 Gran Vía',
      city: 'Madrid',
      country: 'Spain',
      postalCode: '28013'
    },
    payment: {
      status: 'paid' as const,
      method: 'credit_card'
    },
    status: 'shipment_in_progress' as const,
    amount: 249.99,
    currency: 'EUR',
    date: '2024-01-12T12:10:00Z',
    deliveryType: 'vip_express' as const,
    documents: {
      selfie: { status: 'approved', url: '/documents/selfie8.jpg' },
      front: { status: 'approved', url: '/documents/front8.jpg' },
      back: { status: 'approved', url: '/documents/back8.jpg' }
    }
  },
  {
    id: '9',
    orderId: 'IAA-24152747',
    customer: {
      name: 'Robert Taylor',
      email: 'robert.t@email.com'
    },
    shipping: {
      address: '369 Via Roma',
      city: 'Rome',
      country: 'Italy',
      postalCode: '00100'
    },
    payment: {
      status: 'paid' as const,
      method: 'credit_card'
    },
    status: 'completed' as const,
    internalStatus: 'reviewed' as const,
    amount: 179.00,
    currency: 'EUR',
    date: '2024-01-11T09:30:00Z',
    deliveryType: 'standard' as const,
    documents: {
      selfie: { status: 'approved', url: '/documents/selfie9.jpg' },
      front: { status: 'approved', url: '/documents/front9.jpg' },
      back: { status: 'approved', url: '/documents/back9.jpg' }
    }
  },
  {
    id: '10',
    orderId: 'IAA-24152748',
    customer: {
      name: 'Maria Rodriguez',
      email: 'maria.r@email.com'
    },
    shipping: {
      address: '741 Avenida Paulista',
      city: 'São Paulo',
      country: 'Brazil',
      postalCode: '01310-100'
    },
    payment: {
      status: 'paid' as const,
      method: 'credit_card'
    },
    status: 'processing' as const,
    internalStatus: 'pending_review' as const,
    amount: 159.99,
    currency: 'USD',
    date: '2024-01-11T08:15:00Z',
    deliveryType: 'vip_express' as const,
    documents: {
      selfie: { status: 'pending', url: '/documents/selfie10.jpg' },
      front: { status: 'missing' },
      back: { status: 'missing' }
    }
  }
]

// Abandoned orders data
export const abandonedOrdersData = [
  {
    id: 'abandoned-1',
    orderId: 'IAA-24152740',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com'
    },
    shipping: {
      address: '456 Oak Avenue',
      city: 'Los Angeles',
      country: 'USA',
      postalCode: '90210'
    },
    payment: {
      status: 'pending' as const,
      method: 'credit_card'
    },
    status: 'abandoned' as const,
    internalStatus: 'pending_review' as const,
    amount: 89.00,
    currency: 'USD',
    date: '2024-01-20T14:22:00Z',
    deliveryType: 'standard' as const,
    productType: 'digital' as const,
    documents: {
      selfie: { status: 'missing' as const },
      front: { status: 'missing' as const },
      back: { status: 'missing' as const }
    },
    abandonmentReason: 'cart_abandoned',
    abandonmentStage: 'payment',
    lastActivity: '2024-01-20T14:22:00Z',
    recoveryAttempts: 2,
    notes: 'Customer abandoned at payment stage - sent recovery email',
    activity: [
      {
        id: '1',
        type: 'status_change' as const,
        message: 'Order created',
        timestamp: '2024-01-20T14:22:00Z',
        user: 'System'
      },
      {
        id: '2',
        type: 'status_change' as const,
        message: 'Order abandoned at payment stage',
        timestamp: '2024-01-20T14:25:00Z',
        user: 'System'
      }
    ]
  },
  {
    id: 'abandoned-2',
    orderId: 'IAA-24152741',
    customer: {
      name: 'Michael Brown',
      email: 'michael.brown@email.com'
    },
    shipping: {
      address: '789 Pine Street',
      city: 'Chicago',
      country: 'USA',
      postalCode: '60601'
    },
    payment: {
      status: 'pending' as const,
      method: 'paypal'
    },
    status: 'abandoned' as const,
    internalStatus: 'on_hold' as const,
    amount: 199.00,
    currency: 'USD',
    date: '2024-01-19T09:15:00Z',
    deliveryType: 'vip_express' as const,
    productType: 'print_digital' as const,
    documents: {
      selfie: { status: 'pending' as const, url: '/documents/selfie_abandoned1.jpg' },
      front: { status: 'missing' as const },
      back: { status: 'missing' as const }
    },
    abandonmentReason: 'document_upload',
    abandonmentStage: 'document_verification',
    lastActivity: '2024-01-19T09:15:00Z',
    recoveryAttempts: 1,
    notes: 'Customer uploaded selfie but abandoned during document verification',
    activity: [
      {
        id: '1',
        type: 'status_change' as const,
        message: 'Order created',
        timestamp: '2024-01-19T09:15:00Z',
        user: 'System'
      },
      {
        id: '2',
        type: 'document_upload' as const,
        message: 'Selfie document uploaded',
        timestamp: '2024-01-19T09:18:00Z',
        user: 'System'
      },
      {
        id: '3',
        type: 'status_change' as const,
        message: 'Order abandoned during document verification',
        timestamp: '2024-01-19T09:45:00Z',
        user: 'System'
      }
    ]
  },
  {
    id: 'abandoned-3',
    orderId: 'IAA-24152742',
    customer: {
      name: 'Emma Wilson',
      email: 'emma.wilson@email.com'
    },
    shipping: {
      address: '321 Elm Street',
      city: 'Miami',
      country: 'USA',
      postalCode: '33101'
    },
    payment: {
      status: 'failed' as const,
      method: 'credit_card'
    },
    status: 'abandoned' as const,
    internalStatus: 'pending_review' as const,
    amount: 149.00,
    currency: 'USD',
    date: '2024-01-18T16:30:00Z',
    deliveryType: 'standard' as const,
    productType: 'digital' as const,
    documents: {
      selfie: { status: 'approved' as const, url: '/documents/selfie_abandoned2.jpg' },
      front: { status: 'approved' as const, url: '/documents/front_abandoned2.jpg' },
      back: { status: 'missing' as const }
    },
    abandonmentReason: 'payment_failed',
    abandonmentStage: 'payment',
    lastActivity: '2024-01-18T16:30:00Z',
    recoveryAttempts: 3,
    notes: 'Payment failed multiple times - customer support contacted',
    activity: [
      {
        id: '1',
        type: 'status_change' as const,
        message: 'Order created',
        timestamp: '2024-01-18T16:30:00Z',
        user: 'System'
      },
      {
        id: '2',
        type: 'document_upload' as const,
        message: 'Selfie document uploaded and approved',
        timestamp: '2024-01-18T16:35:00Z',
        user: 'System'
      },
      {
        id: '3',
        type: 'document_upload' as const,
        message: 'Front document uploaded and approved',
        timestamp: '2024-01-18T16:40:00Z',
        user: 'System'
      },
      {
        id: '4',
        type: 'status_change' as const,
        message: 'Payment failed - order abandoned',
        timestamp: '2024-01-18T16:45:00Z',
        user: 'System'
      }
    ]
  },
  {
    id: 'abandoned-4',
    orderId: 'IAA-24152743',
    customer: {
      name: 'David Lee',
      email: 'david.lee@email.com'
    },
    shipping: {
      address: '654 Maple Drive',
      city: 'Seattle',
      country: 'USA',
      postalCode: '98101'
    },
    payment: {
      status: 'pending' as const,
      method: 'stripe'
    },
    status: 'abandoned' as const,
    internalStatus: 'reviewed' as const,
    amount: 79.00,
    currency: 'USD',
    date: '2024-01-17T11:45:00Z',
    deliveryType: 'standard' as const,
    productType: 'digital' as const,
    documents: {
      selfie: { status: 'missing' as const },
      front: { status: 'missing' as const },
      back: { status: 'missing' as const }
    },
    abandonmentReason: 'form_abandonment',
    abandonmentStage: 'personal_info',
    lastActivity: '2024-01-17T11:45:00Z',
    recoveryAttempts: 0,
    notes: 'Customer started filling form but never completed personal information',
    activity: [
      {
        id: '1',
        type: 'status_change' as const,
        message: 'Order created',
        timestamp: '2024-01-17T11:45:00Z',
        user: 'System'
      },
      {
        id: '2',
        type: 'status_change' as const,
        message: 'Order abandoned at personal information stage',
        timestamp: '2024-01-17T11:50:00Z',
        user: 'System'
      }
    ]
  },
  {
    id: 'abandoned-5',
    orderId: 'IAA-24152744',
    customer: {
      name: 'Lisa Garcia',
      email: 'lisa.garcia@email.com'
    },
    shipping: {
      address: '987 Cedar Lane',
      city: 'Boston',
      country: 'USA',
      postalCode: '02101'
    },
    payment: {
      status: 'pending' as const,
      method: 'credit_card'
    },
    status: 'abandoned' as const,
    internalStatus: 'pending_review' as const,
    amount: 219.00,
    currency: 'USD',
    date: '2024-01-16T13:20:00Z',
    deliveryType: 'vip_express' as const,
    productType: 'print_digital' as const,
    documents: {
      selfie: { status: 'rejected' as const, url: '/documents/selfie_abandoned3.jpg', rejectionNote: 'Image quality too low' },
      front: { status: 'missing' as const },
      back: { status: 'missing' as const }
    },
    abandonmentReason: 'document_rejection',
    abandonmentStage: 'document_verification',
    lastActivity: '2024-01-16T13:20:00Z',
    recoveryAttempts: 1,
    notes: 'Customer abandoned after selfie document was rejected',
    activity: [
      {
        id: '1',
        type: 'status_change' as const,
        message: 'Order created',
        timestamp: '2024-01-16T13:20:00Z',
        user: 'System'
      },
      {
        id: '2',
        type: 'document_upload' as const,
        message: 'Selfie document uploaded',
        timestamp: '2024-01-16T13:25:00Z',
        user: 'System'
      },
      {
        id: '3',
        type: 'document_upload' as const,
        message: 'Selfie document rejected - image quality too low',
        timestamp: '2024-01-16T13:30:00Z',
        user: 'Admin User'
      },
      {
        id: '4',
        type: 'status_change' as const,
        message: 'Order abandoned after document rejection',
        timestamp: '2024-01-16T13:35:00Z',
        user: 'System'
      }
    ]
  }
]
