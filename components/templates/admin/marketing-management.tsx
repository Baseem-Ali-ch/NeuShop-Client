"use client"

import { useState } from "react"
import MarketingHeader from "@/components/organisms/admin/marketing/marketing-header"
import MarketingOverview from "@/components/organisms/admin/marketing/marketing-overview"
import CampaignTabs from "@/components/organisms/admin/marketing/campaign-tabs"
import EmailCampaignEditor from "@/components/organisms/admin/marketing/email-campaign-editor"
import PromotionsTable from "@/components/organisms/admin/marketing/promotions-table"
import PromotionEditor from "@/components/organisms/admin/marketing/promotion-editor"
import AbandonedCartRecovery from "@/components/organisms/admin/marketing/abandoned-cart-recovery"
import LoyaltyProgramManager from "@/components/organisms/admin/marketing/loyalty-program-manager"
import MarketingCalendar from "@/components/organisms/admin/marketing/marketing-calendar"
import MarketingAnalytics from "@/components/organisms/admin/marketing/marketing-analytics"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setActiveTab } from "@/store/slices/marketingSlice"

export default function MarketingManagement() {
  const dispatch = useAppDispatch()
  const { activeTab } = useAppSelector((state) => state.marketing)
  const [showEmailEditor, setShowEmailEditor] = useState(false)
  const [showPromotionEditor, setShowPromotionEditor] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")

  const handleCreateCampaign = () => {
    setShowEmailEditor(true)
    dispatch(setActiveTab("email"))
  }

  const handleCreatePromotion = () => {
    setShowPromotionEditor(true)
    dispatch(setActiveTab("discount"))
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <MarketingHeader
        onCreateCampaign={handleCreateCampaign}
        onCreatePromotion={handleCreatePromotion}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <MarketingOverview />

      <CampaignTabs />

      {viewMode === "list" ? (
        <div className="space-y-6">
          {activeTab === "all" && (
            <div className="space-y-6">
              <PromotionsTable />
              <MarketingAnalytics />
            </div>
          )}

          {activeTab === "email" &&
            (showEmailEditor ? (
              <EmailCampaignEditor onClose={() => setShowEmailEditor(false)} />
            ) : (
              <PromotionsTable type="email" />
            ))}

          {activeTab === "social" && <PromotionsTable type="social" />}

          {activeTab === "discount" &&
            (showPromotionEditor ? (
              <PromotionEditor onClose={() => setShowPromotionEditor(false)} />
            ) : (
              <PromotionsTable type="discount" />
            ))}

          {activeTab === "loyalty" && <LoyaltyProgramManager />}

          {activeTab === "abandoned" && <AbandonedCartRecovery />}
        </div>
      ) : (
        <MarketingCalendar />
      )}
    </div>
  )
}
