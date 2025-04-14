"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setActiveTab } from "@/store/slices/marketingSlice"

export default function CampaignTabs() {
  const dispatch = useAppDispatch()
  const { activeTab } = useAppSelector((state) => state.marketing)

  const tabs = [
    { id: "all", label: "All Campaigns" },
    { id: "email", label: "Email Campaigns" },
    { id: "social", label: "Social Media" },
    { id: "discount", label: "Discount Codes" },
    { id: "loyalty", label: "Loyalty Program" },
    { id: "abandoned", label: "Abandoned Cart" },
  ]

  return (
    <Tabs value={activeTab} onValueChange={(value) => dispatch(setActiveTab(value))}>
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="text-sm">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
