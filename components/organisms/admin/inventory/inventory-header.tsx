"use client"

import { RefreshCw, Download, Upload, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"

interface InventoryHeaderProps {
  isAdvancedView: boolean
  onViewToggle: () => void
  onBulkUpdate: () => void
  onHistoryToggle: () => void
}

export default function InventoryHeader({
  isAdvancedView,
  onViewToggle,
  onBulkUpdate,
  onHistoryToggle,
}: InventoryHeaderProps) {
  // Mock last sync time
  const lastSyncTime = new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Inventory Management</h1>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={onViewToggle}>
            {isAdvancedView ? (
              <>
                <EyeOff className="h-4 w-4" />
                <span className="hidden sm:inline">Simple View</span>
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">Advanced View</span>
              </>
            )}
          </Button>

          <Button variant="outline" className="flex items-center gap-2" onClick={onHistoryToggle}>
            <span className="hidden sm:inline">History Log</span>
          </Button>

          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>

          <Button onClick={onBulkUpdate} className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Bulk Update</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center text-sm text-muted-foreground">
        <Button variant="ghost" size="sm" className="flex items-center gap-2 h-8 px-2">
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Sync Inventory</span>
        </Button>
        <span className="ml-2">Last updated {formatDistanceToNow(lastSyncTime, { addSuffix: true })}</span>
      </div>
    </div>
  )
}
