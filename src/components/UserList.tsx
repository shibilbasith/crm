'use client'

import { useState, useEffect } from 'react'

interface User {
  id: number
  email: string
  name: string | null
  createdAt: string
  updatedAt: string
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const createUser = async () => {
    const email = prompt('Enter email:')
    const name = prompt('Enter name (optional):')
    
    if (!email) return

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      })

      if (!response.ok) {
        throw new Error('Failed to create user')
      }

      fetchUsers() // Refresh the list
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create user')
    }
  }

  if (loading) return <div>Loading users...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Users</h2>
        <button
          onClick={createUser}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </div>
      
      {users.length === 0 ? (
        <p>No users found. Click "Add User" to create one.</p>
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <div key={user.id} className="border p-4 rounded">
              <h3 className="font-semibold">{user.name || 'No name'}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">
                Created: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}