import type { Metadata } from "next"
import EmailVerification from "@/components/templates/auth/email-verification"

export const metadata: Metadata = {
  title: "Verify Email | Modern E-commerce",
  description: "Verify your email address to complete your registration.",
}

export default function VerifyEmailPage({ params }: { params: { token: string } }) {
  return <EmailVerification token={params.token} />
}
