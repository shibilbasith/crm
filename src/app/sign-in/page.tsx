'use client'

import { useState } from 'react'
import { signIn } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HeroGeometric } from '@/components/ui/shape-landing-hero'

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const router = useRouter()

  const clearErrors = () => {
    setError('')
    setEmailError('')
    setPasswordError('')
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    clearErrors()
    
    // Client-side validation
    if (!email) {
      setEmailError('Email is required')
      setIsLoading(false)
      return
    }
    
    if (!password) {
      setPasswordError('Password is required')
      setIsLoading(false)
      return
    }

    try {
      // Make direct API call to better understand the response
      const response = await fetch('/api/auth/sign-in/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const result = await response.json()
      console.log('Sign in result:', result) // Debug log

      // Check if the response indicates an error
      if (result.code && result.message) {
        // This is an error response
        const errorMessage = result.message
        
        if (result.code === 'INVALID_EMAIL_OR_PASSWORD' || 
            result.code === 'USER_NOT_FOUND') {
          setError('Invalid email or password')
          setEmailError('Please check your email')
          setPasswordError('Please check your password')
          toast.error('Invalid email or password. Please check your credentials and try again.')
        } else if (result.code === 'INVALID_EMAIL') {
          setEmailError('Please enter a valid email address')
          toast.error('Please enter a valid email address.')
        } else {
          setError(errorMessage)
          toast.error(errorMessage)
        }
        return
      }

      // Check if this is a success response (has user or token)
      if (result.user || result.token) {
        // Success! Clear any errors and redirect
        clearErrors()
        toast.success('Successfully signed in!')
        
        // Use better-auth client to set the session properly
        try {
          await signIn.email({
            email,
            password,
            callbackURL: '/dashboard'
          })
        } catch (clientError) {
          // If client fails but API succeeded, still redirect
          console.warn('Client sign-in failed but API succeeded:', clientError)
        }
        
        router.push('/dashboard')
        return
      }

      // If we get here, something unexpected happened
      setError('Authentication failed. Please try again.')
      toast.error('Authentication failed. Please try again.')
      
    } catch (error: any) {
      console.error('Sign in error:', error)
      setError('Network error. Please try again.')
      toast.error('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: '/dashboard'
      })
      toast.success('Successfully signed in with Google!')
    } catch (error: any) {
      console.error('Google sign in error:', error)
      toast.error('Failed to sign in with Google. Please try again.')
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Hero Background */}
      <HeroGeometric 
        badge="Welcome Back"
        title1="Sign In to Your"
        title2="CRM Dashboard"
      />
      
      {/* Overlay Form */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <Card className="w-full max-w-md bg-black/20 backdrop-blur-md border-white/10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-white/70">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-950/50 border border-red-800/50 rounded-md backdrop-blur-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (emailError) setEmailError('')
                  }}
                  required
                  disabled={isLoading}
                  className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 ${emailError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                {emailError && (
                  <p className="text-sm text-red-400">{emailError}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/90">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (passwordError) setPasswordError('')
                  }}
                  required
                  disabled={isLoading}
                  className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 ${passwordError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                {passwordError && (
                  <p className="text-sm text-red-400">{passwordError}</p>
                )}
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white/20 hover:bg-white/30 text-white border-white/20"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black/20 px-2 text-white/60">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20"
              variant="outline"
            >
              {isGoogleLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </div>
              )}
            </Button>

            <div className="text-center text-sm">
              <span className="text-white/70">Don't have an account?{' '}</span>
              <Link href="/sign-up" className="text-white underline hover:text-white/80">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}