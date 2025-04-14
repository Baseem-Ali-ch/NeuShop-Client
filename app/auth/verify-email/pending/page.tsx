import type { Metadata } from "next"
import Link from "next/link"
import { Mail } from "lucide-react"
import AuthLayout from "@/components/organisms/auth/auth-layout"

export const metadata: Metadata = {
  title: "Verify Your Email | Modern E-commerce",
  description: "Please verify your email address to complete your registration.",
}

export default function VerifyEmailPendingPage() {
  return (
    <AuthLayout title="Verify your email">
      <div className="w-full max-w-md mx-auto text-center">
        <div className="rounded-full bg-blue-100 p-3 mx-auto w-16 h-16 flex items-center justify-center mb-6">
          <Mail className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Check your inbox</h2>
        <p className="text-gray-600 mb-6">
          We've sent a verification link to your email address. Please check your inbox and click the link to verify
          your account.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          If you don't see the email, check your spam folder or contact support.
        </p>
        <Link href="/auth/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          Return to login
        </Link>
      </div>
    </AuthLayout>
  )
}
