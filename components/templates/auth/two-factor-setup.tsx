"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Copy, RefreshCw, Shield } from "lucide-react"
import AuthLayout from "@/components/organisms/auth/auth-layout"

export default function TwoFactorSetup() {
  const [qrCode, setQrCode] = useState("")
  const [secretKey, setSecretKey] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const generateTwoFactorSecret = async () => {
      try {
        // Simulate API call to generate QR code and secret key
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // In a real app, you would generate these on your backend
        setQrCode("/generic-2fa-qr.png")
        setSecretKey("ABCD EFGH IJKL MNOP")
      } catch (err) {
        setError("Failed to generate 2FA credentials")
      } finally {
        setIsLoading(false)
      }
    }

    generateTwoFactorSecret()
  }, [])

  const handleCopySecretKey = () => {
    navigator.clipboard.writeText(secretKey.replace(/\s/g, ""))
  }

  const handleRefreshSecretKey = async () => {
    setIsLoading(true)

    try {
      // Simulate API call to regenerate QR code and secret key
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would regenerate these on your backend
      setQrCode("/secure-login-qr.png")
      setSecretKey("WXYZ ABCD EFGH IJKL")
    } catch (err) {
      setError("Failed to regenerate 2FA credentials")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsVerifying(true)

    try {
      // Simulate API call to verify the code
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would verify the code with your backend
      // For demo purposes, we'll verify if the code is 6 digits
      if (/^\d{6}$/.test(verificationCode)) {
        setIsSuccess(true)

        // Redirect to account page after 3 seconds
        setTimeout(() => {
          router.push("/account")
        }, 3000)
      } else {
        setError("Invalid verification code")
      }
    } catch (err) {
      setError("Failed to verify code")
    } finally {
      setIsVerifying(false)
    }
  }

  if (isSuccess) {
    return (
      <AuthLayout title="Two-Factor Authentication Enabled">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="rounded-full bg-green-100 p-3 mx-auto w-16 h-16 flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Two-Factor Authentication Enabled</h2>
          <p className="text-gray-600 mb-6">
            Your account is now protected with two-factor authentication. You will be redirected to your account page.
          </p>
          <Link href="/account" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            Go to account
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Set Up Two-Factor Authentication">
      <div className="w-full max-w-md mx-auto">
        <p className="text-gray-600 mb-6">
          Two-factor authentication adds an extra layer of security to your account. You'll need to enter a verification
          code from your authenticator app when you sign in.
        </p>

        {error && (
          <div className="p-4 mb-4 text-sm text-red-500 bg-red-50 rounded-lg" role="alert">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">1. Scan this QR code</h3>
            <p className="text-sm text-gray-600 mb-4">
              Use an authenticator app like Google Authenticator, Authy, or Microsoft Authenticator to scan this QR
              code.
            </p>

            <div className="flex justify-center mb-4">
              {isLoading ? (
                <div className="w-48 h-48 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <img
                  src={qrCode || "/placeholder.svg"}
                  alt="QR Code for two-factor authentication"
                  className="w-48 h-48 rounded-lg shadow-sm"
                  style={{
                    boxShadow: "3px 3px 6px rgba(166, 180, 200, 0.25), -3px -3px 6px rgba(255, 255, 255, 0.3)",
                  }}
                />
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <p className="text-sm text-gray-600">Can't scan the QR code? Enter this code manually:</p>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                <code className="text-sm font-mono text-gray-800">{secretKey}</code>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={handleCopySecretKey}
                    className="p-1 rounded-md hover:bg-gray-200 transition-colors"
                    title="Copy secret key"
                  >
                    <Copy className="h-4 w-4 text-gray-500" />
                  </button>
                  <button
                    type="button"
                    onClick={handleRefreshSecretKey}
                    className="p-1 rounded-md hover:bg-gray-200 transition-colors"
                    title="Generate new secret key"
                    disabled={isLoading}
                  >
                    <RefreshCw className={`h-4 w-4 text-gray-500 ${isLoading ? "animate-spin" : ""}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">2. Enter verification code</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter the 6-digit verification code from your authenticator app to verify setup.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="verificationCode" className="sr-only">
                  Verification Code
                </label>
                <input
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]*"
                  maxLength={6}
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                  className="block w-full px-3 py-3 text-center text-lg font-mono tracking-widest border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm transition-all duration-200 ease-in-out"
                  style={{
                    boxShadow:
                      "inset 2px 2px 5px rgba(166, 180, 200, 0.35), inset -2px -2px 5px rgba(255, 255, 255, 0.7)",
                  }}
                  placeholder="000000"
                />
              </div>

              <button
                type="submit"
                disabled={isVerifying || verificationCode.length !== 6}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  boxShadow: "3px 3px 6px rgba(166, 180, 200, 0.45), -3px -3px 6px rgba(255, 255, 255, 0.8)",
                }}
              >
                {isVerifying ? "Verifying..." : "Verify and enable"}
              </button>
            </form>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          <Link href="/account" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
            Skip for now
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
