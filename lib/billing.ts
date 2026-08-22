export const CUSTOM_CALCULATOR_PRICE_CENTS = 500;
export const CUSTOM_CALCULATOR_PRICE_LABEL = "$5";

/**
 * True once real Clerk keys are configured. Lets auth UI degrade gracefully
 * (instead of crashing) before NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set.
 */
export const CLERK_ENABLED = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
