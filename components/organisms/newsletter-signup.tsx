"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setMessage({ text: "Please enter a valid email address", type: "error" })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setMessage({ text: "Thank you for subscribing to our newsletter!", type: "success" })
      setEmail("")

      // Clear success message after 5 seconds
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }, 1500)
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto rounded-3xl bg-white dark:bg-gray-800 p-8 md:p-12 shadow-[10px_10px_30px_rgba(0,0,0,0.05),-10px_-10px_30px_rgba(255,255,255,0.8)] dark:shadow-[10px_10px_30px_rgba(0,0,0,0.2),-10px_-10px_30px_rgba(255,255,255,0.05)]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              Stay Updated
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Subscribe to our newsletter to receive updates on new products, special offers, and tech tips.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-6 py-4 rounded-full bg-gray-100 dark:bg-gray-700 border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]"
                aria-label="Email address"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium flex items-center justify-center gap-2 transition-all hover:shadow-lg shadow-[5px_5px_10px_rgba(0,0,0,0.05),-5px_-5px_10px_rgba(255,255,255,0.8)] dark:shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.05)] hover:shadow-[7px_7px_15px_rgba(0,0,0,0.05),-7px_-7px_15px_rgba(255,255,255,0.8)] dark:hover:shadow-[7px_7px_15px_rgba(0,0,0,0.2),-7px_-7px_15px_rgba(255,255,255,0.05)] active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),inset_-2px_-2px_5px_rgba(255,255,255,0.5)] dark:active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.05)] disabled:opacity-70"
            >
              {isSubmitting ? (
                <span>Subscribing...</span>
              ) : (
                <>
                  <span>Subscribe</span>
                  <Send className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 text-center ${
                message.type === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
