"use client"

import { CalendarDays, List, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface MarketingHeaderProps {
  onCreateCampaign: () => void
  onCreatePromotion: () => void
  viewMode: "list" | "calendar"
  onViewModeChange: (mode: "list" | "calendar") => void
}

export default function MarketingHeader({
  onCreateCampaign,
  onCreatePromotion,
  viewMode,
  onViewModeChange,
}: MarketingHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-3xl font-bold tracking-tight">Marketing & Promotions</h1>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex gap-2">
          <Button
            onClick={onCreateCampaign}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
          >
            <Plus className="mr-1 h-4 w-4" />
            Create Campaign
          </Button>

          <Button
            onClick={onCreatePromotion}
            variant="outline"
            className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
          >
            <Plus className="mr-1 h-4 w-4" />
            New Promotion
          </Button>
        </div>

        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) => value && onViewModeChange(value as "list" | "calendar")}
          className="justify-end"
        >
          <ToggleGroupItem value="list" aria-label="List View">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="calendar" aria-label="Calendar View">
            <CalendarDays className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}
