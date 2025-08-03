'use client'

import { useUser, SignInButton, SignOutButton } from '@clerk/nextjs'
import { User } from 'lucide-react'

export default function UserProfile() {
  const { isSignedIn, user, isLoaded } = useUser()

  if (!isLoaded) {
    return <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center gap-2">
        <SignInButton mode="modal">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Sign In
          </button>
        </SignInButton>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        {user.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={user.fullName || 'User'}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User size={16} />
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {user.fullName || user.emailAddresses[0]?.emailAddress}
          </span>
          <span className="text-xs text-gray-500">
            {user.emailAddresses[0]?.emailAddress}
          </span>
        </div>
      </div>
      <SignOutButton>
        <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
          Sign Out
        </button>
      </SignOutButton>
    </div>
  )
}