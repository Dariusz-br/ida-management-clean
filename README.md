# IDA Management App

International Automobile Authority - Order Management System

## Overview

The IDA Management App is a comprehensive order management system designed for handling international driver's license orders. It provides a unified interface for operations teams to monitor performance, process shipments, and maintain order accuracy.

## Features

### 🎯 Core Functionality
- **Dashboard**: Real-time overview with KPI cards, top-selling products, and live visitor funnel
- **Order Management**: Complete order lifecycle from processing to fulfillment
- **Role-Based Access**: Admin, Team, Agent, and Supplier roles with different permissions
- **Document Management**: Upload, review, and approve customer documents
- **Status Tracking**: Automated and manual status transitions
- **Analytics**: Revenue reports, order trends, and conversion tracking

### 🔐 Role-Based Permissions

| Feature | Admin | Team | Agent | Supplier |
|---------|-------|------|-------|----------|
| Dashboard | ✅ Full | ✅ Full | ❌ | ❌ |
| Orders | ✅ Full | ✅ Full | ✅ | ✅ View Only |
| Order Details | ✅ Full | ✅ Full | ✅ | Partial |
| Reports | ✅ | ✅ | ❌ | ❌ |
| Products | ✅ | ✅ | ❌ | ❌ |
| Settings | ✅ Full | ✅ Full | Personal Only | Basic |

### 📊 Dashboard Components
- **KPI Cards**: Revenue, Orders, AOV, Refunds, Conversion Rate, Pending Orders, Visitors
- **Top Selling Products**: Product performance with order counts and revenue
- **Live Visitor Funnel**: Real-time conversion tracking through checkout stages
- **Recent Orders**: Quick access to latest orders with status indicators

### 📋 Order Management
- **Status Workflow**: Processing → Shipment in Progress → Completed → Refunded
- **Document Validation**: Auto-checks for image quality, file size, and virus scanning
- **Bulk Actions**: Change status, generate documents, queue for print, export CSV
- **Tracking Integration**: Support for DHL, FedEx, USPS with automatic status updates

### 🎨 Design System
- **Color Scheme**: Green primary (#16a34a), clean grays, status-based colors
- **Typography**: Inter font family for modern, readable text
- **Components**: Consistent button styles, form inputs, and data tables
- **Responsive**: Desktop-first design (≥1280px) with mobile adaptation

## Getting Started

### Prerequisites
- Node.js 18+ 
- Next.js 15+
- TypeScript 5+

### Installation
```bash
# Navigate to the project directory
cd app/ida-management

# Install dependencies (if needed)
npm install

# Start development server
npm run dev
```

### Access the App
Open [http://localhost:3000/ida-management](http://localhost:3000/ida-management) in your browser.

## Project Structure

```
app/ida-management/
├── components/
│   ├── Sidebar.tsx          # Navigation sidebar with role-based menu
│   ├── TopBar.tsx           # Header with search and user menu
│   ├── Dashboard.tsx        # Main dashboard with KPIs and widgets
│   ├── Orders.tsx           # Orders list with filters and bulk actions
│   ├── OrderDetails.tsx     # Detailed order view with customer info
│   ├── Products.tsx         # Product management
│   ├── Users.tsx            # User management
│   ├── Reports.tsx          # Analytics and reporting
│   ├── Discounts.tsx        # Discount code management
│   ├── Affiliates.tsx       # Affiliate program management
│   └── Settings.tsx         # System and user settings
├── globals.css              # Global styles and Tailwind configuration
├── layout.tsx              # App layout wrapper
├── page.tsx                 # Main app component with routing
└── README.md               # This file
```

## Key Components

### Dashboard
- Real-time KPI metrics with trend indicators
- Top-selling products with revenue tracking
- Live visitor funnel with conversion rates
- Recent orders table with quick actions

### Orders Module
- Advanced filtering by status, date range, and customer
- Bulk operations for multiple orders
- Document status tracking with visual indicators
- Delivery type management (VIP Express vs Standard)

### Order Details
- Complete customer information with editing capabilities
- Document upload and approval workflow
- Activity timeline with user attribution
- Internal notes with auto-save functionality

## Status Management

### Order Statuses
1. **Processing**: New order received, documents being reviewed
2. **Shipment in Progress**: Order verified, ready to ship
3. **Completed**: Order fulfilled and delivered
4. **On Hold**: Order needs review or correction
5. **Refunded**: Order canceled or refunded

### Status Transitions
- **Automatic**: Processing → Shipment in Progress (VIP Express)
- **Manual**: Status changes by authorized users
- **System**: Tracking updates trigger completion

## Performance Targets
- Dashboard load time: < 2 seconds
- Orders table: < 1.5 seconds for 1k rows
- Auto-refresh: Every 5 minutes
- Infinite scroll: 50 rows per page

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Follow the existing code style and patterns
2. Ensure all components are properly typed with TypeScript
3. Test role-based permissions thoroughly
4. Maintain responsive design principles
5. Update documentation for new features

## License

This project is proprietary software for International Automobile Authority.

# Force Vercel deployment update
