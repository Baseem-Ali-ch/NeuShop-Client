import type { Metadata } from "next"
import RegisterForm from "@/components/templates/auth/register-form"

export const metadata: Metadata = {
  title: "Create Account | Modern E-commerce",
  description: "Create a new account to start shopping and track your orders.",
}

export default function RegisterPage() {
  return <RegisterForm />
}
