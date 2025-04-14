"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Settings, Save, RotateCcw, Search } from "lucide-react"
import SettingsSidebar from "@/components/organisms/admin/settings/settings-sidebar"
import GeneralSettings from "@/components/organisms/admin/settings/general-settings"
import StoreInformation from "@/components/organisms/admin/settings/store-information"
import LocalizationSettings from "@/components/organisms/admin/settings/localization-settings"
import PaymentMethods from "@/components/organisms/admin/settings/payment-methods"
import ShippingDelivery from "@/components/organisms/admin/settings/shipping-delivery"
import TaxConfiguration from "@/components/organisms/admin/settings/tax-configuration"
import UserManagement from "@/components/organisms/admin/settings/user-management"
import EmailSettings from "@/components/organisms/admin/settings/email-settings"
import IntegrationsPanel from "@/components/organisms/admin/settings/integrations-panel"
import AdvancedSettings from "@/components/organisms/admin/settings/advanced-settings"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { resetSettings, saveSettings } from "@/store/slices/settingsSlice"
import type { RootState } from "@/store/store"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function SettingsDashboard() {
  const [activePanel, setActivePanel] = useState("general")
  const [searchQuery, setSearchQuery] = useState("")
  const [confirmReset, setConfirmReset] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const dispatch = useDispatch()
  const { hasChanges } = useSelector((state: RootState) => state.settings)

  // Handle panel change
  const handlePanelChange = (panel: string) => {
    if (hasChanges) {
      // Show confirmation dialog
      if (window.confirm("You have unsaved changes. Are you sure you want to leave this page?")) {
        setActivePanel(panel)
      }
    } else {
      setActivePanel(panel)
    }
  }

  // Handle save
  const handleSave = () => {
    dispatch(saveSettings())
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  // Handle reset
  const handleReset = () => {
    setConfirmReset(true)
  }

  // Confirm reset
  const confirmResetSettings = () => {
    dispatch(resetSettings())
    setConfirmReset(false)
  }

  // Render active panel
  const renderPanel = () => {
    switch (activePanel) {
      case "general":
        return <GeneralSettings />
      case "store":
        return <StoreInformation />
      case "localization":
        return <LocalizationSettings />
      case "payment":
        return <PaymentMethods />
      case "shipping":
        return <ShippingDelivery />
      case "tax":
        return <TaxConfiguration />
      case "users":
        return <UserManagement />
      case "email":
        return <EmailSettings />
      case "integrations":
        return <IntegrationsPanel />
      case "advanced":
        return <AdvancedSettings />
      default:
        return <GeneralSettings />
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center">
          <Settings className="h-6 w-6 mr-2" />
          <h1 className="text-2xl font-bold">Settings & Configuration</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search settings..."
              className="pl-10 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={handleReset} className="flex items-center">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges} className="flex items-center">
            <Save className="h-4 w-4 mr-2" />
            {saveSuccess ? "Saved!" : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SettingsSidebar activePanel={activePanel} onPanelChange={handlePanelChange} />

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{renderPanel()}</div>
      </div>

      {/* Reset confirmation dialog */}
      <Dialog open={confirmReset} onOpenChange={setConfirmReset}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset to Default Settings</DialogTitle>
            <DialogDescription>
              This will reset all settings to their default values. This action cannot be undone. Are you sure you want
              to continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmReset(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmResetSettings}>
              Reset All Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
