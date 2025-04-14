"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle, XCircle } from "lucide-react"
import AuthLayout from "@/components/organisms/auth/auth-layout"

interface EmailVerificationProps {
  token: string
}

export default function EmailVerification({ token }: EmailVerificationProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Simulate API call to verify the token
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // In a real app, you would verify the token with your backend
        // For demo purposes, we'll verify if the token is not empty
        if (token && token.length > 5) {
          setIsVerified(true)

          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push("/auth/login")
          }, 3000)
        } else {
          setError("Invalid verification token")
        }
      } catch (err) {
        setError("An error occurred during verification")
      } finally {
        setIsLoading(false)
      }
    }

    verifyEmail()
  }, [token, router])

  return (
    <AuthLayout title="Email Verification">
      <div className="w-full max-w-md mx-auto text-center">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Verifying your email address...</p>
          </div>
        ) : isVerified ? (
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-green-100 p-3 mx-auto w-16 h-16 flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Email verified successfully</h2>
            <p className="text-gray-600 mb-6">
              Your email has been successfully verified. You will be redirected to the login page in a few seconds.
            </p>
            <Link href="/auth/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Go to login
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-red-100 p-3 mx-auto w-16 h-16 flex items-center justify-center mb-6">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Verification failed</h2>
            <p className="text-gray-600 mb-6">
              {error || "We could not verify your email address. The link may have expired or is invalid."}
            </p>
            <Link href="/auth/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Return to login
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  )
}
