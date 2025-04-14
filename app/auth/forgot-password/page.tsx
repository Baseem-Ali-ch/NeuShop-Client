import type { Metadata } from "next"
import ForgotPasswordForm from "@/components/templates/auth/forgot-password-form"

export const metadata: Metadata = {
  title: "Reset Password | Modern E-commerce",
  description: "Reset your password to regain access to your account.",
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
