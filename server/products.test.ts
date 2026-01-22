import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createTestContext(user?: AuthenticatedUser): TrpcContext {
  const ctx: TrpcContext = {
    user: user || null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
  return ctx;
}

describe("products router", () => {
  it("should list all products", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const products = await caller.products.list();

    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  it("should get featured products", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const featured = await caller.products.featured();

    expect(Array.isArray(featured)).toBe(true);
    // Featured products should have isNew or isBestSeller flag
    if (featured.length > 0) {
      const hasFlag = featured.some(p => p.isNew || p.isBestSeller);
      expect(hasFlag).toBe(true);
    }
  });

  it("should search products by query", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const results = await caller.products.search({ query: "iPhone" });

    expect(Array.isArray(results)).toBe(true);
    if (results.length > 0) {
      const hasMatch = results.some(p => 
        p.nameEn.toLowerCase().includes("iphone") || 
        p.namePt.toLowerCase().includes("iphone")
      );
      expect(hasMatch).toBe(true);
    }
  });

  it("should filter products by category", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    // First get a category
    const categories = await caller.categories.list();
    expect(categories.length).toBeGreaterThan(0);

    const firstCategory = categories[0];
    const filtered = await caller.products.filter({
      categoryIds: [firstCategory.id],
    });

    expect(Array.isArray(filtered)).toBe(true);
    if (filtered.length > 0) {
      filtered.forEach(product => {
        expect(product.categoryId).toBe(firstCategory.id);
      });
    }
  });

  it("should filter products by price range", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const filtered = await caller.products.filter({
      minPrice: 100,
      maxPrice: 500,
    });

    expect(Array.isArray(filtered)).toBe(true);
    if (filtered.length > 0) {
      filtered.forEach(product => {
        const price = parseFloat(product.priceExclVat);
        expect(price).toBeGreaterThanOrEqual(100);
        expect(price).toBeLessThanOrEqual(500);
      });
    }
  });

  it("should calculate VAT correctly (23%)", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const products = await caller.products.list();
    expect(products.length).toBeGreaterThan(0);

    const product = products[0];
    const priceExcl = parseFloat(product.priceExclVat);
    const priceIncl = parseFloat(product.priceInclVat);
    
    // VAT should be 23%
    const expectedInclVat = priceExcl * 1.23;
    expect(priceIncl).toBeCloseTo(expectedInclVat, 2);
  });
});

describe("categories router", () => {
  it("should list all categories", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const categories = await caller.categories.list();

    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  it("should get category by slug", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const category = await caller.categories.getBySlug({ slug: "smartphones" });

    expect(category).toBeDefined();
    expect(category?.slug).toBe("smartphones");
  });
});

describe("cart router", () => {
  const testUser: AuthenticatedUser = {
    id: 999,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  it("should require authentication for cart operations", async () => {
    const ctx = createTestContext(); // No user
    const caller = appRouter.createCaller(ctx);

    await expect(caller.cart.list()).rejects.toThrow();
  });

  it("should add product to cart", async () => {
    const ctx = createTestContext(testUser);
    const caller = appRouter.createCaller(ctx);

    // Get a product first
    const products = await caller.products.list();
    expect(products.length).toBeGreaterThan(0);

    const result = await caller.cart.add({
      productId: products[0].id,
      quantity: 1,
    });

    expect(result.success).toBe(true);
  });
});

describe("newsletter router", () => {
  it("should subscribe email to newsletter", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const testEmail = `test-${Date.now()}@example.com`;
    const result = await caller.newsletter.subscribe({ email: testEmail });

    expect(result.success).toBe(true);
  });

  it("should not allow duplicate email subscriptions", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const testEmail = `duplicate-${Date.now()}@example.com`;
    
    // First subscription should succeed
    const result1 = await caller.newsletter.subscribe({ email: testEmail });
    expect(result1.success).toBe(true);

    // Second subscription should fail
    const result2 = await caller.newsletter.subscribe({ email: testEmail });
    expect(result2.success).toBe(false);
  });
});
