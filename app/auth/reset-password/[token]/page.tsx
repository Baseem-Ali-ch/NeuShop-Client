import type { Metadata } from "next"
import ResetPasswordForm from "@/components/templates/auth/reset-password-form"

export const metadata: Metadata = {
  title: "Set New Password | Modern E-commerce",
  description: "Set a new password for your account.",
}

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  return <ResetPasswordForm token={params.token} />
}
