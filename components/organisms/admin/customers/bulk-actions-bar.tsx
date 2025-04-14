"use client"
import { X, Tag, Mail, UserMinus, Download } from "lucide-react"
import { useSelector, useDispatch } from "@/store/hooks"
import { deselectAllCustomers, selectSelectedCustomers } from "@/store/slices/customerSlice"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

export default function BulkActionsBar() {
  const dispatch = useDispatch()
  const selectedCustomers = useSelector(selectSelectedCustomers)

  const handleClearSelection = () => {
    dispatch(deselectAllCustomers())
  }

  const handleAction = (action: string) => {
    // In a real app, dispatch an action to perform the bulk action
    console.log(`Performing ${action} on ${selectedCustomers.length} customers`)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 z-10 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleClearSelection}>
          <X className="h-4 w-4" />
        </Button>
        <span className="font-medium">
          {selectedCustomers.length} customer{selectedCustomers.length !== 1 && "s"} selected
        </span>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Tag className="mr-2 h-4 w-4" /> Add Tags
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleAction("add-vip-tag")}>Add VIP Tag</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("add-wholesale-tag")}>Add Wholesale Tag</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("add-custom-tag")}>Add Custom Tag...</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" onClick={() => handleAction("export")}>
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>

        <Button variant="outline" onClick={() => handleAction("email")}>
          <Mail className="mr-2 h-4 w-4" /> Email
        </Button>

        <Button
          variant="outline"
          className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          onClick={() => handleAction("deactivate")}
        >
          <UserMinus className="mr-2 h-4 w-4" /> Deactivate
        </Button>
      </div>
    </div>
  )
}
