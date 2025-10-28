import { useMemo } from 'react'

export function useOrderSearch(orders: any[], searchTerm: string) {
  const filteredOrders = useMemo(() => {
    if (!searchTerm.trim()) {
      return orders
    }

    const term = searchTerm.toLowerCase().trim()
    
    return orders.filter(order => {
      // Search by Order ID
      if (order.orderId.toLowerCase().includes(term)) {
        return true
      }
      
      // Search by Customer Name
      if (order.customer.name.toLowerCase().includes(term)) {
        return true
      }
      
      // Search by Customer Email
      if (order.customer.email.toLowerCase().includes(term)) {
        return true
      }
      
      // Search by Customer Phone
      if (order.customer.phone && order.customer.phone.toLowerCase().includes(term)) {
        return true
      }
      
      // Search by Shipping Country
      if (order.shipping.country.toLowerCase().includes(term)) {
        return true
      }
      
      // Search by Shipping City
      if (order.shipping.city.toLowerCase().includes(term)) {
        return true
      }
      
      // Search by Status
      if (order.status.toLowerCase().includes(term)) {
        return true
      }
      
      // Search by Amount (if user types a number)
      if (!isNaN(Number(term)) && order.amount.toString().includes(term)) {
        return true
      }
      
      return false
    })
  }, [orders, searchTerm])

  return filteredOrders
}

export function useGenericSearch<T extends Record<string, any>>(
  items: T[], 
  searchTerm: string, 
  searchFields: (keyof T)[]
) {
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) {
      return items
    }

    const term = searchTerm.toLowerCase().trim()
    
    return items.filter(item => {
      return searchFields.some(field => {
        const value = item[field]
        if (typeof value === 'string') {
          return value.toLowerCase().includes(term)
        }
        if (typeof value === 'number') {
          return value.toString().includes(term)
        }
        if (typeof value === 'object' && value !== null) {
          // Handle nested objects
          return Object.values(value).some(nestedValue => 
            typeof nestedValue === 'string' && 
            nestedValue.toLowerCase().includes(term)
          )
        }
        return false
      })
    })
  }, [items, searchTerm, searchFields])

  return filteredItems
}
