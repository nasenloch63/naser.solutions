export function isCmsQuotaExceeded(error: unknown): boolean {
  // Payload can wrap a failed query with the original Postgres error as its cause.
  for (let depth = 0; depth < 4 && error instanceof Error; depth++) {
    if (/account or project has exceeded the quota/i.test(error.message)) return true
    error = error.cause
  }
  return false
}
