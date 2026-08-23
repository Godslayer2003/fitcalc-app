/**
 * Base URL of the fitcalc-api backend (Render). Empty string in local dev
 * without it set just makes fetches relative, which will 404 - fine, since
 * accounts gracefully degrade to "coming soon" via authEnabled anyway.
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
