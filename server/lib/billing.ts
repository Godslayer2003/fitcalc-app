export const CUSTOM_CALCULATOR_PRICE_CENTS = 500;

/**
 * True once a database is configured. Lets endpoints degrade gracefully
 * (instead of crashing) before DATABASE_URL is set.
 */
export const AUTH_ENABLED = !!process.env.DATABASE_URL;
