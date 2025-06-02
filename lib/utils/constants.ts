export const ORDER_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;

export const isAdminEmail = (email: string): boolean => {
  return (
    email === process.env.ADMIN_EMAIL && process.env.NODE_ENV === "production"
  );
};
