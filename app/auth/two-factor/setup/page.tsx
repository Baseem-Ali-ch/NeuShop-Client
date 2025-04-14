import type { Metadata } from "next"
import TwoFactorSetup from "@/components/templates/auth/two-factor-setup"

export const metadata: Metadata = {
  title: "Set Up Two-Factor Authentication | Modern E-commerce",
  description: "Enhance your account security with two-factor authentication.",
}

export default function TwoFactorSetupPage() {
  return <TwoFactorSetup />
}
