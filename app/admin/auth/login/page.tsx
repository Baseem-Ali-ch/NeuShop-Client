import LoginForm from "@/components/templates/admin/login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Modern E-commerce",
  description:
    "Login to your account to access your dashboard, orders, and more.",
};

export default function LoginPage() {
  return <LoginForm />;
}
