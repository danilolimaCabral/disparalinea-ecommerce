import { describe, expect, it } from "vitest";
import { generateOrderNumber } from "./db-orders";

describe("Checkout System", () => {
  describe("generateOrderNumber", () => {
    it("should generate a unique order number with correct format", () => {
      const orderNumber = generateOrderNumber();
      
      // Should start with DT-
      expect(orderNumber).toMatch(/^DT-/);
      
      // Should have the correct structure: DT-{timestamp}-{random}
      const parts = orderNumber.split("-");
      expect(parts).toHaveLength(3);
      expect(parts[0]).toBe("DT");
      
      // Timestamp part should be alphanumeric
      expect(parts[1]).toMatch(/^[A-Z0-9]+$/);
      
      // Random part should be 6 characters
      expect(parts[2]).toHaveLength(6);
      expect(parts[2]).toMatch(/^[A-Z0-9_-]+$/);
    });

    it("should generate different order numbers on consecutive calls", () => {
      const orderNumber1 = generateOrderNumber();
      const orderNumber2 = generateOrderNumber();
      
      expect(orderNumber1).not.toBe(orderNumber2);
    });
  });
});

describe("Stripe Integration", () => {
  it("should have Stripe secret key configured", () => {
    expect(process.env.STRIPE_SECRET_KEY).toBeDefined();
    expect(process.env.STRIPE_SECRET_KEY).not.toBe("");
  });

  it("should have Stripe webhook secret configured", () => {
    expect(process.env.STRIPE_WEBHOOK_SECRET).toBeDefined();
    expect(process.env.STRIPE_WEBHOOK_SECRET).not.toBe("");
  });

  it("should have Stripe publishable key configured", () => {
    expect(process.env.VITE_STRIPE_PUBLISHABLE_KEY).toBeDefined();
    expect(process.env.VITE_STRIPE_PUBLISHABLE_KEY).not.toBe("");
  });
});

describe("Price Calculations", () => {
  it("should calculate VAT correctly (23%)", () => {
    const priceExclVat = 100;
    const vatRate = 0.23;
    const expectedVat = 23;
    const expectedTotal = 123;
    
    const calculatedVat = priceExclVat * vatRate;
    const calculatedTotal = priceExclVat + calculatedVat;
    
    expect(calculatedVat).toBe(expectedVat);
    expect(calculatedTotal).toBe(expectedTotal);
  });

  it("should handle decimal prices correctly", () => {
    const priceExclVat = 99.99;
    const vatRate = 0.23;
    const expectedVat = 22.9977;
    const expectedTotal = 122.9877;
    
    const calculatedVat = priceExclVat * vatRate;
    const calculatedTotal = priceExclVat + calculatedVat;
    
    expect(calculatedVat).toBeCloseTo(expectedVat, 4);
    expect(calculatedTotal).toBeCloseTo(expectedTotal, 4);
  });
});

describe("EUR to Cents Conversion", () => {
  it("should convert EUR to cents correctly", async () => {
    const { eurToCents } = await import("./stripe-products");
    
    expect(eurToCents(1)).toBe(100);
    expect(eurToCents(10)).toBe(1000);
    expect(eurToCents(99.99)).toBe(9999);
    expect(eurToCents(0.50)).toBe(50);
  });

  it("should convert cents to EUR correctly", async () => {
    const { centsToEur } = await import("./stripe-products");
    
    expect(centsToEur(100)).toBe(1);
    expect(centsToEur(1000)).toBe(10);
    expect(centsToEur(9999)).toBe(99.99);
    expect(centsToEur(50)).toBe(0.50);
  });

  it("should handle rounding correctly", async () => {
    const { eurToCents } = await import("./stripe-products");
    
    // 99.999 should round to 10000 cents (100.00 EUR)
    expect(eurToCents(99.999)).toBe(10000);
    
    // 99.994 should round to 9999 cents (99.99 EUR)
    expect(eurToCents(99.994)).toBe(9999);
  });
});
