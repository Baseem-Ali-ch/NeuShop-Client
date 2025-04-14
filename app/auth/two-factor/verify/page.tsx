import type { Metadata } from "next"
import TwoFactorVerify from "@/components/templates/auth/two-factor-verify"

export const metadata: Metadata = {
  title: "Verify Two-Factor Authentication | Modern E-commerce",
  description: "Verify your identity with two-factor authentication.",
}

export default function TwoFactorVerifyPage() {
  return <TwoFactorVerify />
}
