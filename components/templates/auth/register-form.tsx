"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import AuthLayout from "@/components/organisms/auth/auth-layout";
import SocialLoginButtons from "@/components/molecules/auth/social-login-buttons";
import PasswordStrengthIndicator from "@/components/molecules/auth/password-strength-indicator";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/slices/authSlice";
import { constructFromSymbol } from "date-fns/constants";
import { registerUser } from "@/lib/user/authApi";

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const validatePassword = (password: string) => {
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);
    return strength;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  // handle register submit functionality
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate password strength
    if (validatePassword(password) < 3) {
      setError("Please choose a stronger password");
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const formData = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      };

      const result = await registerUser(formData);

      if (!result.success) {
       setError(result.message || "Registration Failed");
       return
      }

      router.push(`/auth/two-factor/verify?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Create your account">
      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div
              className="p-4 mb-4 text-sm text-red-500 bg-red-50 rounded-lg"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="text-gray-700 block w-full pl-10 pr-3 py-3 border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm transition-all duration-200 ease-in-out"
                  style={{
                    boxShadow:
                      "inset 2px 2px 5px rgba(166, 180, 200, 0.35), inset -2px -2px 5px rgba(255, 255, 255, 0.7)",
                  }}
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="text-gray-700 block w-full pl-10 pr-3 py-3 border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm transition-all duration-200 ease-in-out"
                  style={{
                    boxShadow:
                      "inset 2px 2px 5px rgba(166, 180, 200, 0.35), inset -2px -2px 5px rgba(255, 255, 255, 0.7)",
                  }}
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-gray-700 block w-full pl-10 pr-3 py-3 border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm transition-all duration-200 ease-in-out"
                  style={{
                    boxShadow:
                      "inset 2px 2px 5px rgba(166, 180, 200, 0.35), inset -2px -2px 5px rgba(255, 255, 255, 0.7)",
                  }}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="text-gray-700 block w-full pl-10 pr-10 py-3 border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm transition-all duration-200 ease-in-out"
                  style={{
                    boxShadow:
                      "inset 2px 2px 5px rgba(166, 180, 200, 0.35), inset -2px -2px 5px rgba(255, 255, 255, 0.7)",
                  }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              <PasswordStrengthIndicator strength={passwordStrength} />
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 8 characters and include uppercase,
                number, and special character
              </p>
            </div>

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="text-gray-700 block w-full pl-10 pr-10 py-3 border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm transition-all duration-200 ease-in-out"
                  style={{
                    boxShadow:
                      "inset 2px 2px 5px rgba(166, 180, 200, 0.35), inset -2px -2px 5px rgba(255, 255, 255, 0.7)",
                  }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  Passwords do not match
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                boxShadow:
                  "3px 3px 6px rgba(166, 180, 200, 0.45), -3px -3px 6px rgba(255, 255, 255, 0.8)",
              }}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <SocialLoginButtons />
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
