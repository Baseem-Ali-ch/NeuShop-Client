"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield } from "lucide-react";
import AuthLayout from "@/components/organisms/auth/auth-layout";
import { useAppDispatch } from "@/store/hooks";

export default function TwoFactorVerify() {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [remainingAttempts, setRemainingAttempts] = useState(3);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/two-factor-verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, verificationCode }),
        }
      );

      const result = await response.json();
      localStorage.setItem("access_token", result.accessToken);
      localStorage.setItem("is_loggedIn", 'true');

      if (!response.ok) {
        setError(result.message || "An error occurred. Please try again.");
        return;
      }
      if (response.ok) {
        router.push("/account");
      } else {
        const newRemainingAttempts = remainingAttempts - 1;
        setRemainingAttempts(newRemainingAttempts);

        if (newRemainingAttempts <= 0) {
          setError("Too many failed attempts. Please try again later.");
        } else {
          setError(
            `Invalid verification code. ${newRemainingAttempts} attempts remaining.`
          );
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Two-Factor Authentication">
      <div className="w-full max-w-md mx-auto">
        <div className="rounded-full bg-blue-100 p-3 mx-auto w-16 h-16 flex items-center justify-center mb-6">
          <Shield className="h-8 w-8 text-blue-600" />
        </div>

        <p className="text-gray-600 mb-6 text-center">
          Enter the 6-digit verification code from your email to verify your
          identity.
        </p>

        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-500 bg-red-50 rounded-lg"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
              onChange={(e) =>
                setVerificationCode(e.target.value.replace(/\D/g, ""))
              }
              className="block w-full px-3 py-3 text-center text-lg font-mono tracking-widest border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm transition-all duration-200 ease-in-out"
              style={{
                boxShadow:
                  "inset 2px 2px 5px rgba(166, 180, 200, 0.35), inset -2px -2px 5px rgba(255, 255, 255, 0.7)",
              }}
              placeholder="000000"
              disabled={remainingAttempts <= 0}
            />
          </div>

          <button
            type="submit"
            disabled={
              isLoading ||
              verificationCode.length !== 6 ||
              remainingAttempts <= 0
            }
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              boxShadow:
                "3px 3px 6px rgba(166, 180, 200, 0.45), -3px -3px 6px rgba(255, 255, 255, 0.8)",
            }}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <div className="mt-6 flex flex-col space-y-2 text-center text-sm text-gray-600">
          <Link
            href="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Back to login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
