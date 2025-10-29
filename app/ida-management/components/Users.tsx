'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Edit, Trash2, Eye, Shield, User, Users as UsersIcon } from 'lucide-react'
import { UserProfileModal } from './UserProfileModal'
import { UserEditModal } from './UserEditModal'
import { UserCreateModal } from './UserCreateModal'
import { useGenericSearch } from '../hooks/useSearch'

export function Users() {
  const mockUsers = [
    {
      id: '1',
      name: 'Jonathan Doe',
      email: 'jonathan.doe@ida.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-15T10:30:00Z',
      orders: 245
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@ida.com',
      role: 'team',
      status: 'active',
      lastLogin: '2024-01-15T09:15:00Z',
      orders: 189
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.w@ida.com',
      role: 'agent',
      status: 'active',
      lastLogin: '2024-01-14T16:45:00Z',
      orders: 156
    },
    {
      id: '4',
      name: 'Lisa Chen',
      email: 'lisa.c@ida.com',
      role: 'supplier',
      status: 'active',
      lastLogin: '2024-01-14T14:20:00Z',
      orders: 0
    }
  ]

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [users, setUsers] = useState(mockUsers)
  
  // Use search hook for filtering users
  const filteredUsers = useGenericSearch(users, searchTerm, ['name', 'email', 'role', 'status'])

  const roleConfig = {
    admin: { label: 'Admin', color: 'bg-red-100 text-red-800', icon: Shield },
    team: { label: 'Team', color: 'bg-blue-100 text-blue-800', icon: UsersIcon },
    agent: { label: 'Agent', color: 'bg-green-100 text-green-800', icon: User },
    supplier: { label: 'Supplier', color: 'bg-yellow-100 text-yellow-800', icon: User }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }

  const handleViewUser = (user: any) => {
    setSelectedUser(user)
    setShowProfileModal(true)
  }

  const handleEditUser = (user: any) => {
    setSelectedUser(user)
    setShowEditModal(true)
  }

  const handleSaveUser = (updatedUser: any) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? { ...user, ...updatedUser } : user
    ))
    setShowEditModal(false)
    setShowProfileModal(false)
  }

  const handleCreateUser = (newUser: any) => {
    const userWithId = {
      ...newUser,
      id: (users.length + 1).toString(),
      lastLogin: 'Never',
      orders: 0,
      joinDate: new Date().toLocaleDateString()
    }
    setUsers([...users, userWithId])
    setShowCreateModal(false)
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId))
    }
  }

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: '#FAF9F6' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-[#00473A] text-white rounded-xl hover:bg-[#00473A]/90"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] p-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
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

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E6CF] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F4E7]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E8E6CF]">
              {filteredUsers.map((user) => {
                const RoleIcon = roleConfig[user.role as keyof typeof roleConfig].icon
                return (
                  <tr 
                    key={user.id} 
                    className="hover:bg-[#F5F4E7] cursor-pointer"
                    onClick={() => handleViewUser(user)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#E8E6CF] rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${roleConfig[user.role as keyof typeof roleConfig].color}`}>
                        <RoleIcon className="w-3 h-3 mr-1" />
                        {roleConfig[user.role as keyof typeof roleConfig].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-[#F5F4E7] text-gray-800'
        }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.orders.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.lastLogin)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
        <button 
          onClick={(e) => {
            e.stopPropagation()
            handleViewUser(user)
          }}
          className="text-[#00473A] hover:text-[#00473A]/80"
          title="View Profile"
        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditUser(user)
                          }}
                          className="p-2 text-gray-600 hover:text-gray-800 bg-[#E2EAFF] rounded-xl"
                          title="Edit User"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteUser(user.id)
                          }}
                          className="text-red-600 hover:text-red-800"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {selectedUser && (
        <>
          <UserProfileModal
            user={selectedUser}
            isOpen={showProfileModal}
            onClose={() => setShowProfileModal(false)}
            onSave={handleSaveUser}
          />
          <UserEditModal
            user={selectedUser}
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSave={handleSaveUser}
          />
        </>
      )}
      
      <UserCreateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateUser}
      />
    </div>
  )
}
