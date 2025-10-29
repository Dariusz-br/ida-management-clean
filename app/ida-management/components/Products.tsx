'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Edit, Trash2, Eye, Upload, Camera, Package } from 'lucide-react'
import { ProductCreateModal } from './ProductCreateModal'
import { ProductEditModal } from './ProductEditModal'
import { useGenericSearch } from '../hooks/useSearch'

export function Products() {
  const [statusFilter, setStatusFilter] = useState('published')
  
  const mockProducts = [
    {
      id: '1',
      name: 'Digital only',
      description: 'Digital driver\'s license delivered instantly',
      price: 29.99,
      type: 'digital',
      status: 'active',
      orders: 1500,
      revenue: 44985,
      image: '/products/digital.jpg'
    },
    {
      id: '2',
      name: 'Print + Digital',
      description: 'Physical and digital driver\'s license',
      price: 49.99,
      type: 'physical',
      status: 'active',
      orders: 1200,
      revenue: 59988,
      image: '/products/physical.jpg'
    },
    {
      id: '3',
      name: 'VIP Express shipping',
      description: 'Priority handling with 1-2 day delivery',
      price: 79.99,
      type: 'service',
      status: 'active',
      orders: 800,
      revenue: 63992,
      image: '/products/vip.jpg'
    },
    {
      id: '4',
      name: 'Premium Package',
      description: 'All-inclusive driver\'s license package',
      price: 99.99,
      type: 'premium',
      status: 'draft',
      orders: 0,
      revenue: 0,
      image: null
    },
    {
      id: '5',
      name: 'Legacy Product',
      description: 'Old product no longer available',
      price: 19.99,
      type: 'legacy',
      status: 'archived',
      orders: 500,
      revenue: 9995,
      image: null
    }
  ]

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [products, setProducts] = useState(mockProducts)
  const [uploadingImage, setUploadingImage] = useState<string | null>(null)
  
  // Use search hook for filtering products
  const searchFilteredProducts = useGenericSearch(products, searchTerm, ['name', 'description', 'type', 'status'])
  
  // Apply status filter
  const filteredProducts = searchFilteredProducts.filter(product => {
    if (statusFilter === 'published') return product.status === 'active'
    if (statusFilter === 'draft') return product.status === 'draft'
    if (statusFilter === 'archive') return product.status === 'archived'
    return true
  })

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product)
    // For now, just show edit modal. In a real app, you'd have a separate view modal
    setShowEditModal(true)
  }

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product)
    setShowEditModal(true)
  }

  const handleSaveProduct = (updatedProduct: any) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product
    ))
    setShowEditModal(false)
  }

  const handleCreateProduct = (newProduct: any) => {
    const productWithId = {
      ...newProduct,
      id: (products.length + 1).toString()
    }
    setProducts([...products, productWithId])
    setShowCreateModal(false)
  }

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId))
    }
  }

  const handleImageUpload = (productId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadingImage(productId)
      
      // Simulate image upload
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        
        // Update the product with new image
        setProducts(products.map(product => 
          product.id === productId 
            ? { ...product, image: imageUrl }
            : product
        ))
        
        setUploadingImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: '#FAF9F6' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <div className="flex items-center gap-3">
          {/* Compact Status Tabs */}
          <div className="bg-[#F5F4E7] rounded-full p-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStatusFilter('published')}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                  statusFilter === 'published'
                    ? 'bg-[#00473A] text-white border border-[#E8E6CF]'
                    : 'text-black font-semibold hover:text-gray-700'
                }`}
              >
                Published
              </button>
              <button
                onClick={() => setStatusFilter('draft')}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                  statusFilter === 'draft'
                    ? 'bg-[#00473A] text-white border border-[#E8E6CF]'
                    : 'text-black font-semibold hover:text-gray-700'
                }`}
              >
                Draft
              </button>
              <button
                onClick={() => setStatusFilter('archive')}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                  statusFilter === 'archive'
                    ? 'bg-[#00473A] text-white border border-[#E8E6CF]'
                    : 'text-black font-semibold hover:text-gray-700'
                }`}
              >
                Archive
              </button>
            </div>
          </div>

          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#00473A] text-white rounded-xl hover:bg-[#00473A]/90"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-[10px] shadow-sm border border-[#E8E6CF] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F4E7]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total Order</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total Revenue</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E6CF]">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-36 h-36 bg-[#F5F4E7] rounded-[10px] flex items-center justify-center relative group">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover rounded-[10px]"
                          />
                        ) : (
                          <Package className="w-6 h-6 text-gray-400" />
                        )}
                        
                        {/* Upload Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[10px]">
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(product.id, e)}
                              className="hidden"
                            />
                            <div className="bg-white rounded-full p-1 hover:bg-gray-100 transition-colors">
                              {uploadingImage === product.id ? (
                                <div className="w-3 h-3 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                              ) : (
                                <Upload className="w-3 h-3 text-gray-600" />
                              )}
                            </div>
                          </label>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900">{product.name}</h3>
                        <p className="text-xs text-gray-600">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900">${product.price}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{product.orders.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">${product.revenue.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleViewProduct(product)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View Product"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditProduct(product)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {selectedProduct && (
        <ProductEditModal
          product={selectedProduct}
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveProduct}
        />
      )}
      
      <ProductCreateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  )
}
