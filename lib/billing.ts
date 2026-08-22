export const CUSTOM_CALCULATOR_PRICE_CENTS = 500;
export const CUSTOM_CALCULATOR_PRICE_LABEL = "$5";

/**
 * True once a database is configured. Lets auth UI degrade gracefully
 * (instead of crashing) before DATABASE_URL is set.
 */
export const AUTH_ENABLED = !!process.env.DATABASE_URL;
