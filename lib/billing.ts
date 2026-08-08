export const REMOVE_ADS_PRICE_CENTS = 1050;
export const REMOVE_ADS_PRICE_LABEL = "$10.50";

/**
 * True once real Clerk keys are configured. Lets auth UI degrade gracefully
 * (instead of crashing) before NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set.
 */
export const CLERK_ENABLED = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
