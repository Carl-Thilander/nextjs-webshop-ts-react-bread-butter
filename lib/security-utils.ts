export function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .trim();
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function isAllowedFileType(
  filename: string,
  allowedTypes: string[]
): boolean {
  const extension = filename.split(".").pop()?.toLowerCase();
  return extension ? allowedTypes.includes(extension) : false;
}

export function generateRateLimitKey(
  ip: string,
  endpoint: string,
  userId?: string
): string {
  return userId ? `${ip}-${endpoint}-${userId}` : `${ip}-${endpoint}`;
}

export function isValidUUID(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export function containsSQLInjection(input: string): boolean {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/i,
    /(--|\/\*|\*\/|;)/,
    /(\b(OR|AND)\b.*=.*)/i,
  ];

  return sqlPatterns.some((pattern) => pattern.test(input));
}

export function logSecurityEvent(
  event: string,
  details: Record<string, any>,
  ip?: string
): void {
  if (process.env.NODE_ENV === "development") {
    console.warn(`[SECURITY] ${event}`, {
      ...details,
      ip,
      timestamp: new Date().toISOString(),
    });
  }
}
