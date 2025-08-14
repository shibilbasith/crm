'use client'

import { useSession, signOut } from '@/lib/auth-client'
import { User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function UserProfile() {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/sign-in')
  }

  if (isPending) {
    return <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/sign-in">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Sign In
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        {session.user?.image ? (
          <img
            src={session.user.image}
            alt={session.user.name || 'User'}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User size={16} />
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {session.user?.name || session.user?.email}
          </span>
          <span className="text-xs text-gray-500">
            {session.user?.email}
          </span>
        </div>
      </div>
      <button 
        onClick={handleSignOut}
        className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
      >
        Sign Out
      </button>
    </div>
  )
}