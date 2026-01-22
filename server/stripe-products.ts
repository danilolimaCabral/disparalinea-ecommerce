/**
 * Stripe product configuration
 * This file defines the products available for purchase via Stripe
 */

export interface StripeProduct {
  id: string;
  name: string;
  description: string;
  priceInCents: number; // Price in cents (EUR)
  currency: string;
}

/**
 * Convert EUR to cents for Stripe
 */
export function eurToCents(eur: number): number {
  return Math.round(eur * 100);
}

/**
 * Convert cents to EUR
 */
export function centsToEur(cents: number): number {
  return cents / 100;
}
