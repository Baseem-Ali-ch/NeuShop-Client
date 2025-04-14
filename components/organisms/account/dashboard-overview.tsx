"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  DollarSign,
  Package,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

// Mock data
const mockUser = {
  name: "Thomas Anderson",
  email: "thomas.anderson@example.com",
  accountLevel: "Gold Member",
  totalSpent: 1249.95,
  ordersPlaced: 8,
  accountCompletion: 75,
  recentOrders: [
    {
      id: "ORD-12345",
      date: "2023-10-15",
      items: [
        {
          id: 1,
          name: "Premium Wireless Headphones",
          price: 249.99,
          image: "/vibrant-headphones.png",
        },
      ],
      status: "Delivered",
    },
    {
      id: "ORD-12344",
      date: "2023-09-28",
      items: [
        {
          id: 2,
          name: "Smart Watch Series 5",
          price: 399.99,
          image: "/wrist-tech-lifestyle.png",
        },
      ],
      status: "Delivered",
    },
  ],
  accountTasks: [
    { id: 1, task: "Verify email address", completed: true },
    { id: 2, task: "Complete profile information", completed: true },
    { id: 3, task: "Add a payment method", completed: true },
    { id: 4, task: "Add a shipping address", completed: false },
  ],
};

export default function DashboardOverview({ user }: { user: any }) {
  const [progress, setProgress] = useState(0);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-[5px_5px_10px_rgba(0,0,0,0.05),-5px_-5px_10px_rgba(255,255,255,0.8)] dark:shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.05)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
              Welcome back, {user?.firstName + " " + user?.lastName}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {mockUser.accountLevel}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Account Status
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {mockUser.accountLevel}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-[5px_5px_10px_rgba(0,0,0,0.05),-5px_-5px_10px_rgba(255,255,255,0.8)] dark:shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.05)]"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4 shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Spent
              </p>
              <p className="text-2xl font-medium text-gray-900 dark:text-white">
                ${mockUser.totalSpent.toFixed(2)}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-[5px_5px_10px_rgba(0,0,0,0.05),-5px_-5px_10px_rgba(255,255,255,0.8)] dark:shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.05)]"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mr-4 shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Orders Placed
              </p>
              <p className="text-2xl font-medium text-gray-900 dark:text-white">
                {mockUser.ordersPlaced}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-[5px_5px_10px_rgba(0,0,0,0.05),-5px_-5px_10px_rgba(255,255,255,0.8)] dark:shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.05)]"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Recently Ordered
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 dark:text-gray-400"
            asChild
          >
            <a href="#" className="flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </Button>
        </div>

        <div className="space-y-4">
          {mockUser.recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]"
            >
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center">
                  <div className="relative w-16 h-16 bg-white dark:bg-gray-800 rounded-lg overflow-hidden mr-4 shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)]">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ${item.price.toFixed(2)} •{" "}
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="sm:self-center shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(255,255,255,0.05)] active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reorder
              </Button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Account Completion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-[5px_5px_10px_rgba(0,0,0,0.05),-5px_-5px_10px_rgba(255,255,255,0.8)] dark:shadow-[5px_5px_10px_rgba(0,0,0,0.2),-5px_-5px_10px_rgba(255,255,255,0.05)]"
      >
        <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
          Complete Your Account
        </h2>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Account Completion
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {progress}%
            </span>
          </div>
          <Progress
            value={progress}
            className="h-2 bg-gray-200 dark:bg-gray-700"
          />
        </div>

        <div className="space-y-3">
          {mockUser.accountTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.05),inset_-3px_-3px_6px_rgba(255,255,255,0.5)] dark:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.05)]"
            >
              <div
                className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                  task.completed
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                }`}
              >
                {task.completed ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : null}
              </div>
              <span
                className={`${
                  task.completed
                    ? "text-gray-500 dark:text-gray-400 line-through"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {task.task}
              </span>
              {!task.completed && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto text-sm text-blue-600 dark:text-blue-400"
                >
                  Complete
                </Button>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
