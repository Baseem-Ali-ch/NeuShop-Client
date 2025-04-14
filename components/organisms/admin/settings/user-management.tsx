"use client"
import { Users } from "lucide-react"

export default function UserManagement() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Manage admin users, roles, and permissions.</p>
      </div>

      <div className="flex items-center justify-center p-12 border rounded-lg bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">User Management</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            This panel would include admin user management, role configuration, permission settings, and security
            options.
          </p>
        </div>
      </div>
    </div>
  )
}
