import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface GeneralSettings {
  storeStatus: boolean
  maintenanceMessage?: string
  guestCheckout: boolean
  accountCreation: "optional" | "required" | "disabled"
  passwordMinLength: number
  passwordRequireSpecial: boolean
  lowStockThreshold: number
  outOfStockBehavior: "hide" | "show_unavailable" | "allow_backorders"
  backorderLimit: number
  orderNumberPrefix: string
  orderNumberSuffix?: string
  invoiceNumberPrefix: string
  metaTitleTemplate: string
  metaDescriptionTemplate: string
  robotsTxt: string
}

interface StoreLocation {
  id: number
  name: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
  email: string
  hours: string
}

interface StoreInformation {
  storeName: string
  legalName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
  logoUrl?: string | null
  faviconUrl?: string | null
  facebookUrl?: string
  twitterUrl?: string
  instagramUrl?: string
  linkedinUrl?: string
  youtubeUrl?: string
  aboutUs?: string
  termsConditions?: string
  privacyPolicy?: string
  locations?: StoreLocation[]
}

interface LocalizationSettings {
  defaultLanguage: string
  availableLanguages: { code: string; name: string; enabled: boolean }[]
  defaultCurrency: string
  availableCurrencies: { code: string; name: string; symbol: string; rate: number; enabled: boolean }[]
  dateFormat: string
  timeFormat: string
  unitSystem: "metric" | "imperial"
  defaultCountry: string
  supportedCountries: { code: string; name: string; enabled: boolean }[]
}

interface PaymentMethod {
  id: string
  name: string
  type: string
  enabled: boolean
  testMode: boolean
  credentials: Record<string, string>
  displayName: string
  description: string
  fee: number
  feeType: "fixed" | "percentage"
  countries: string[]
  orderStatusMapping: Record<string, string>
}

interface ShippingMethod {
  id: string
  name: string
  type: "free" | "flat" | "table" | "carrier"
  enabled: boolean
  conditions: {
    minOrderValue?: number
    maxOrderValue?: number
    countries?: string[]
  }
  rates: any[]
}

interface ShippingZone {
  id: string
  name: string
  countries: string[]
  methods: string[]
  rates: Record<string, number>
}

interface TaxSettings {
  calculationMethod: "exclusive" | "inclusive"
  defaultTaxClass: string
  taxClasses: { id: string; name: string; description: string }[]
  taxRates: {
    id: string
    name: string
    rate: number
    country: string
    state: string
    postalCode: string
    priority: number
    compound: boolean
    shipping: boolean
    digital: boolean
  }[]
  taxExemption: boolean
  digitalGoodsTax: boolean
}

interface UserRole {
  id: string
  name: string
  description: string
  permissions: Record<string, boolean>
}

interface AdminUser {
  id: string
  username: string
  email: string
  roleId: string
  lastLogin: string
  status: "active" | "inactive"
}

interface EmailProvider {
  type: "smtp" | "api"
  host?: string
  port?: number
  username?: string
  password?: string
  encryption?: "none" | "ssl" | "tls"
  apiKey?: string
  fromName: string
  fromEmail: string
  replyToEmail: string
}

interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  enabled: boolean
}

interface Integration {
  id: string
  name: string
  type: string
  enabled: boolean
  credentials: Record<string, string>
  settings: Record<string, any>
}

interface SettingsState {
  general: GeneralSettings
  storeInfo: StoreInformation
  localization: LocalizationSettings
  paymentMethods: PaymentMethod[]
  shippingMethods: ShippingMethod[]
  shippingZones: ShippingZone[]
  taxSettings: TaxSettings
  userRoles: UserRole[]
  adminUsers: AdminUser[]
  emailProvider: EmailProvider
  emailTemplates: EmailTemplate[]
  integrations: Integration[]
  hasChanges: boolean
}

const initialState: SettingsState = {
  general: {
    storeStatus: true,
    maintenanceMessage: "We're currently updating our store to serve you better. Please check back soon!",
    guestCheckout: true,
    accountCreation: "optional",
    passwordMinLength: 8,
    passwordRequireSpecial: true,
    lowStockThreshold: 5,
    outOfStockBehavior: "show_unavailable",
    backorderLimit: 10,
    orderNumberPrefix: "ORD-",
    orderNumberSuffix: "",
    invoiceNumberPrefix: "INV-",
    metaTitleTemplate: "{product_name} | {store_name}",
    metaDescriptionTemplate: "{product_short_description} - Shop now at {store_name}",
    robotsTxt: "User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /checkout\nDisallow: /cart",
  },
  storeInfo: {
    storeName: "Your Store",
    legalName: "Your Company LLC",
    email: "contact@yourstore.com",
    phone: "(555) 123-4567",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    postalCode: "12345",
    country: "United States",
    logoUrl: null,
    faviconUrl: null,
    facebookUrl: "",
    twitterUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
    youtubeUrl: "",
    aboutUs: "",
    termsConditions: "",
    privacyPolicy: "",
    locations: [],
  },
  localization: {
    defaultLanguage: "en-US",
    availableLanguages: [
      { code: "en-US", name: "English (US)", enabled: true },
      { code: "es-ES", name: "Spanish (Spain)", enabled: false },
      { code: "fr-FR", name: "French (France)", enabled: false },
    ],
    defaultCurrency: "USD",
    availableCurrencies: [
      { code: "USD", name: "US Dollar", symbol: "$", rate: 1, enabled: true },
      { code: "EUR", name: "Euro", symbol: "€", rate: 0.85, enabled: false },
      { code: "GBP", name: "British Pound", symbol: "£", rate: 0.75, enabled: false },
    ],
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    unitSystem: "imperial",
    defaultCountry: "US",
    supportedCountries: [
      { code: "US", name: "United States", enabled: true },
      { code: "CA", name: "Canada", enabled: true },
      { code: "MX", name: "Mexico", enabled: false },
    ],
  },
  paymentMethods: [
    {
      id: "stripe",
      name: "Stripe",
      type: "credit_card",
      enabled: true,
      testMode: true,
      credentials: {
        publishableKey: "",
        secretKey: "",
      },
      displayName: "Credit / Debit Card",
      description: "Pay with your credit or debit card via Stripe",
      fee: 0,
      feeType: "percentage",
      countries: ["*"],
      orderStatusMapping: {
        authorized: "processing",
        captured: "completed",
        refunded: "refunded",
      },
    },
    {
      id: "paypal",
      name: "PayPal",
      type: "paypal",
      enabled: true,
      testMode: true,
      credentials: {
        clientId: "",
        clientSecret: "",
      },
      displayName: "PayPal",
      description: "Pay with your PayPal account",
      fee: 0,
      feeType: "percentage",
      countries: ["*"],
      orderStatusMapping: {
        authorized: "processing",
        captured: "completed",
        refunded: "refunded",
      },
    },
  ],
  shippingMethods: [
    {
      id: "free_shipping",
      name: "Free Shipping",
      type: "free",
      enabled: true,
      conditions: {
        minOrderValue: 50,
      },
      rates: [],
    },
    {
      id: "flat_rate",
      name: "Flat Rate",
      type: "flat",
      enabled: true,
      conditions: {},
      rates: [{ amount: 5.99 }],
    },
  ],
  shippingZones: [
    {
      id: "domestic",
      name: "Domestic",
      countries: ["US"],
      methods: ["free_shipping", "flat_rate"],
      rates: {
        flat_rate: 5.99,
      },
    },
    {
      id: "international",
      name: "International",
      countries: ["*"],
      methods: ["flat_rate"],
      rates: {
        flat_rate: 19.99,
      },
    },
  ],
  taxSettings: {
    calculationMethod: "exclusive",
    defaultTaxClass: "standard",
    taxClasses: [
      { id: "standard", name: "Standard", description: "Standard tax class for most products" },
      { id: "reduced", name: "Reduced", description: "Reduced tax rate for specific products" },
      { id: "zero", name: "Zero", description: "Zero-rated products" },
    ],
    taxRates: [
      {
        id: "us-ca",
        name: "California",
        rate: 7.25,
        country: "US",
        state: "CA",
        postalCode: "",
        priority: 1,
        compound: false,
        shipping: true,
        digital: true,
      },
    ],
    taxExemption: true,
    digitalGoodsTax: true,
  },
  userRoles: [
    {
      id: "admin",
      name: "Administrator",
      description: "Full access to all areas",
      permissions: {
        "admin.access": true,
        "admin.settings": true,
        "admin.products": true,
        "admin.orders": true,
        "admin.customers": true,
        "admin.marketing": true,
        "admin.analytics": true,
      },
    },
    {
      id: "manager",
      name: "Store Manager",
      description: "Manage products, orders, and customers",
      permissions: {
        "admin.access": true,
        "admin.settings": false,
        "admin.products": true,
        "admin.orders": true,
        "admin.customers": true,
        "admin.marketing": true,
        "admin.analytics": true,
      },
    },
  ],
  adminUsers: [
    {
      id: "1",
      username: "admin",
      email: "admin@example.com",
      roleId: "admin",
      lastLogin: "2023-04-01T10:30:00Z",
      status: "active",
    },
  ],
  emailProvider: {
    type: "smtp",
    host: "",
    port: 587,
    username: "",
    password: "",
    encryption: "tls",
    fromName: "Your Store",
    fromEmail: "noreply@yourstore.com",
    replyToEmail: "support@yourstore.com",
  },
  emailTemplates: [
    {
      id: "order_confirmation",
      name: "Order Confirmation",
      subject: "Your order #{{order_number}} has been received",
      body: "Thank you for your order!",
      enabled: true,
    },
    {
      id: "shipping_confirmation",
      name: "Shipping Confirmation",
      subject: "Your order #{{order_number}} has been shipped",
      body: "Your order has been shipped!",
      enabled: true,
    },
  ],
  integrations: [
    {
      id: "google_analytics",
      name: "Google Analytics",
      type: "analytics",
      enabled: false,
      credentials: {
        trackingId: "",
      },
      settings: {},
    },
    {
      id: "facebook_pixel",
      name: "Facebook Pixel",
      type: "marketing",
      enabled: false,
      credentials: {
        pixelId: "",
      },
      settings: {},
    },
  ],
  hasChanges: false,
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateGeneralSettings: (state, action: PayloadAction<Partial<GeneralSettings>>) => {
      state.general = { ...state.general, ...action.payload }
      state.hasChanges = true
    },
    updateStoreInformation: (state, action: PayloadAction<Partial<StoreInformation>>) => {
      state.storeInfo = { ...state.storeInfo, ...action.payload }
      state.hasChanges = true
    },
    updateLocalizationSettings: (state, action: PayloadAction<Partial<LocalizationSettings>>) => {
      state.localization = { ...state.localization, ...action.payload }
      state.hasChanges = true
    },
    updatePaymentMethod: (state, action: PayloadAction<{ id: string; data: Partial<PaymentMethod> }>) => {
      const { id, data } = action.payload
      const index = state.paymentMethods.findIndex((method) => method.id === id)
      if (index !== -1) {
        state.paymentMethods[index] = { ...state.paymentMethods[index], ...data }
        state.hasChanges = true
      }
    },
    updateShippingMethod: (state, action: PayloadAction<{ id: string; data: Partial<ShippingMethod> }>) => {
      const { id, data } = action.payload
      const index = state.shippingMethods.findIndex((method) => method.id === id)
      if (index !== -1) {
        state.shippingMethods[index] = { ...state.shippingMethods[index], ...data }
        state.hasChanges = true
      }
    },
    updateTaxSettings: (state, action: PayloadAction<Partial<TaxSettings>>) => {
      state.taxSettings = { ...state.taxSettings, ...action.payload }
      state.hasChanges = true
    },
    updateUserRole: (state, action: PayloadAction<{ id: string; data: Partial<UserRole> }>) => {
      const { id, data } = action.payload
      const index = state.userRoles.findIndex((role) => role.id === id)
      if (index !== -1) {
        state.userRoles[index] = { ...state.userRoles[index], ...data }
        state.hasChanges = true
      }
    },
    updateEmailProvider: (state, action: PayloadAction<Partial<EmailProvider>>) => {
      state.emailProvider = { ...state.emailProvider, ...action.payload }
      state.hasChanges = true
    },
    updateEmailTemplate: (state, action: PayloadAction<{ id: string; data: Partial<EmailTemplate> }>) => {
      const { id, data } = action.payload
      const index = state.emailTemplates.findIndex((template) => template.id === id)
      if (index !== -1) {
        state.emailTemplates[index] = { ...state.emailTemplates[index], ...data }
        state.hasChanges = true
      }
    },
    updateIntegration: (state, action: PayloadAction<{ id: string; data: Partial<Integration> }>) => {
      const { id, data } = action.payload
      const index = state.integrations.findIndex((integration) => integration.id === id)
      if (index !== -1) {
        state.integrations[index] = { ...state.integrations[index], ...data }
        state.hasChanges = true
      }
    },
    saveSettings: (state) => {
      // In a real app, this would save to an API
      state.hasChanges = false
    },
    resetSettings: (state) => {
      return { ...initialState, hasChanges: false }
    },
    setHasChanges: (state, action: PayloadAction<boolean>) => {
      state.hasChanges = action.payload
    },
  },
})

export const {
  updateGeneralSettings,
  updateStoreInformation,
  updateLocalizationSettings,
  updatePaymentMethod,
  updateShippingMethod,
  updateTaxSettings,
  updateUserRole,
  updateEmailProvider,
  updateEmailTemplate,
  updateIntegration,
  saveSettings,
  resetSettings,
  setHasChanges,
} = settingsSlice.actions

export default settingsSlice.reducer
