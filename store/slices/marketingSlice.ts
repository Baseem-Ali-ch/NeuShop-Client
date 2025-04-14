import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type MarketingTabType = "all" | "email" | "social" | "discount" | "loyalty" | "abandoned"

interface MarketingState {
  activeTab: MarketingTabType
  campaigns: any[]
  promotions: any[]
  loading: boolean
  error: string | null
}

const initialState: MarketingState = {
  activeTab: "all",
  campaigns: [],
  promotions: [],
  loading: false,
  error: null,
}

export const marketingSlice = createSlice({
  name: "marketing",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<MarketingTabType>) => {
      state.activeTab = action.payload
    },
    setCampaigns: (state, action: PayloadAction<any[]>) => {
      state.campaigns = action.payload
    },
    setPromotions: (state, action: PayloadAction<any[]>) => {
      state.promotions = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    addCampaign: (state, action: PayloadAction<any>) => {
      state.campaigns.push(action.payload)
    },
    updateCampaign: (state, action: PayloadAction<any>) => {
      const index = state.campaigns.findIndex((c) => c.id === action.payload.id)
      if (index !== -1) {
        state.campaigns[index] = action.payload
      }
    },
    deleteCampaign: (state, action: PayloadAction<string>) => {
      state.campaigns = state.campaigns.filter((c) => c.id !== action.payload)
    },
    addPromotion: (state, action: PayloadAction<any>) => {
      state.promotions.push(action.payload)
    },
    updatePromotion: (state, action: PayloadAction<any>) => {
      const index = state.promotions.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.promotions[index] = action.payload
      }
    },
    deletePromotion: (state, action: PayloadAction<string>) => {
      state.promotions = state.promotions.filter((p) => p.id !== action.payload)
    },
  },
})

export const {
  setActiveTab,
  setCampaigns,
  setPromotions,
  setLoading,
  setError,
  addCampaign,
  updateCampaign,
  deleteCampaign,
  addPromotion,
  updatePromotion,
  deletePromotion,
} = marketingSlice.actions

export default marketingSlice.reducer
