'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Edit, Trash2, Eye, Upload, Camera } from 'lucide-react'
import { ProductCreateModal } from './ProductCreateModal'
import { ProductEditModal } from './ProductEditModal'
import { useGenericSearch } from '../hooks/useSearch'

export function Products() {
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
    }
  ]

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [products, setProducts] = useState(mockProducts)
  const [uploadingImage, setUploadingImage] = useState<string | null>(null)
  
  // Use search hook for filtering products
  const filteredProducts = useGenericSearch(products, searchTerm, ['name', 'description', 'type', 'status'])

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
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-[#00473A] text-white rounded-xl hover:bg-[#00473A]/90"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#E8E6CF] rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-[#F5F4E7] focus:bg-[#F5F4E7] transition-colors"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-[#E8E6CF] rounded-xl hover:bg-[#F5F4E7]">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-6">
            {/* Product Image */}
            <div className="relative mb-4">
              <div className="w-full h-32 bg-[#F5F4E7] rounded-xl overflow-hidden relative group">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                
                {/* Upload Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(product.id, e)}
                      className="hidden"
                    />
                    <div className="bg-white rounded-full p-2 hover:bg-gray-100 transition-colors">
                      {uploadingImage === product.id ? (
                        <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                      ) : (
                        <Upload className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-[#F5F4E7] text-gray-800'
              }`}>
                {product.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Price</span>
                <span className="text-lg font-semibold text-gray-900">${product.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Orders</span>
                <span className="text-sm font-medium text-gray-900">{product.orders.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Revenue</span>
                <span className="text-sm font-medium text-gray-900">${product.revenue.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <button 
                onClick={() => handleViewProduct(product)}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm border border-[#E8E6CF] rounded-xl hover:bg-[#F5F4E7]"
                title="View Product"
              >
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
              <button 
                onClick={() => handleEditProduct(product)}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm border border-[#E8E6CF] rounded-xl hover:bg-[#F5F4E7] bg-[#E2EAFF]"
                title="Edit Product"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button 
                onClick={() => handleDeleteProduct(product.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
                title="Delete Product"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
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
