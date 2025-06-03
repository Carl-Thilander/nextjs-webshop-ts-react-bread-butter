export const APP_CONFIG = {
  DATABASE_URL: process.env.DATABASE_URL || "",

  AUTH_SECRET: process.env.AUTH_SECRET || "",
  AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID || "",
  AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET || "",

  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "",

  NODE_ENV: process.env.NODE_ENV || "development",
  SITE_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",

  DEFAULT_CURRENCY: "€",
  SHIPPING_COST: 0,
  TAX_RATE: 0.25,
} as const;

export const FEATURES = {
  GOOGLE_AUTH: !!process.env.AUTH_GOOGLE_ID,
  EMAIL_NOTIFICATIONS: !!process.env.EMAIL_SERVICE_URL,
  ANALYTICS: process.env.NODE_ENV === "production",
} as const;
