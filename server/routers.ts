import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  categories: router({
    list: publicProcedure.query(async () => {
      return await db.getAllCategories();
    }),
    
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getCategoryBySlug(input.slug);
      }),
  }),

  products: router({
    list: publicProcedure.query(async () => {
      return await db.getAllProducts();
    }),

    featured: publicProcedure.query(async () => {
      return await db.getFeaturedProducts();
    }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getProductById(input.id);
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getProductBySlug(input.slug);
      }),

    getByCategory: publicProcedure
      .input(z.object({ categoryId: z.number() }))
      .query(async ({ input }) => {
        return await db.getProductsByCategory(input.categoryId);
      }),

    search: publicProcedure
      .input(z.object({ query: z.string() }))
      .query(async ({ input }) => {
        return await db.searchProducts(input.query);
      }),

    filter: publicProcedure
      .input(
        z.object({
          categoryIds: z.array(z.number()).optional(),
          minPrice: z.number().optional(),
          maxPrice: z.number().optional(),
          brands: z.array(z.string()).optional(),
          inStockOnly: z.boolean().optional(),
        })
      )
      .query(async ({ input }) => {
        return await db.filterProducts(input);
      }),
  }),

  cart: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getCartItems(ctx.user.id);
    }),

    add: protectedProcedure
      .input(
        z.object({
          productId: z.number(),
          quantity: z.number().min(1).default(1),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await db.addToCart(ctx.user.id, input.productId, input.quantity);
        return { success: true };
      }),

    updateQuantity: protectedProcedure
      .input(
        z.object({
          cartItemId: z.number(),
          quantity: z.number().min(0),
        })
      )
      .mutation(async ({ input }) => {
        await db.updateCartItemQuantity(input.cartItemId, input.quantity);
        return { success: true };
      }),

    remove: protectedProcedure
      .input(z.object({ cartItemId: z.number() }))
      .mutation(async ({ input }) => {
        await db.removeFromCart(input.cartItemId);
        return { success: true };
      }),

    clear: protectedProcedure.mutation(async ({ ctx }) => {
      await db.clearCart(ctx.user.id);
      return { success: true };
    }),
  }),

  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        const success = await db.subscribeNewsletter(input.email);
        return { success };
      }),
  }),

  testimonials: router({
    list: publicProcedure.query(async () => {
      return await db.getActiveTestimonials();
    }),
  }),

  orders: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const dbOrders = await import("./db-orders");
      return await dbOrders.getUserOrders(ctx.user.id);
    }),

    getByNumber: protectedProcedure
      .input(z.object({ orderNumber: z.string() }))
      .query(async ({ input }) => {
        const dbOrders = await import("./db-orders");
        return await dbOrders.getOrderByNumber(input.orderNumber);
      }),
  }),

  checkout: router({
    createSession: protectedProcedure
      .input(
        z.object({
          shippingName: z.string().min(1),
          shippingEmail: z.string().email(),
          shippingPhone: z.string().optional(),
          shippingAddress: z.string().min(1),
          shippingCity: z.string().min(1),
          shippingPostalCode: z.string().min(1),
          shippingCountry: z.string().min(1),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const Stripe = (await import("stripe")).default;
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
          apiVersion: "2025-12-15.clover",
        });
        const dbOrders = await import("./db-orders");
        const { eurToCents } = await import("./stripe-products");

        // Get cart items
        const cartItems = await db.getCartItems(ctx.user.id);
        if (!cartItems || cartItems.length === 0) {
          throw new Error("Cart is empty");
        }

        // Calculate totals
        const subtotalExclVat = cartItems.reduce((sum, item) => {
          if (!item.product) return sum;
          return sum + parseFloat(item.product.priceExclVat) * item.quantity;
        }, 0);

        const vatAmount = subtotalExclVat * 0.23;
        const shippingCost = 0; // Free shipping
        const total = subtotalExclVat + vatAmount + shippingCost;

        // Create order in database
        const { orderId, orderNumber } = await dbOrders.createOrder(
          ctx.user.id,
          {
            status: "pending",
            subtotal: subtotalExclVat.toFixed(2),
            vatAmount: vatAmount.toFixed(2),
            shippingCost: shippingCost.toFixed(2),
            total: total.toFixed(2),
            shippingName: input.shippingName,
            shippingEmail: input.shippingEmail,
            shippingPhone: input.shippingPhone || null,
            shippingAddress: input.shippingAddress,
            shippingCity: input.shippingCity,
            shippingPostalCode: input.shippingPostalCode,
            shippingCountry: input.shippingCountry,
            paymentStatus: "pending",
          },
          cartItems.map((item) => ({
            productId: item.product!.id,
            productName: item.product!.nameEn,
            productBrand: item.product!.brand || null,
            productImage: item.product!.imageUrl || null,
            priceExclVat: item.product!.priceExclVat,
            priceInclVat: item.product!.priceInclVat,
            quantity: item.quantity,
          }))
        );

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: cartItems.map((item) => ({
            price_data: {
              currency: "eur",
              product_data: {
                name: item.product!.nameEn,
                description: item.product!.brand || undefined,
                images: item.product!.imageUrl ? [item.product!.imageUrl] : undefined,
              },
              unit_amount: eurToCents(parseFloat(item.product!.priceInclVat)),
            },
            quantity: item.quantity,
          })),
          mode: "payment",
          success_url: `${ctx.req.headers.origin}/order-confirmation?order=${orderNumber}`,
          cancel_url: `${ctx.req.headers.origin}/cart`,
          customer_email: input.shippingEmail,
          client_reference_id: orderId.toString(),
          metadata: {
            orderId: orderId.toString(),
            orderNumber,
            userId: ctx.user.id.toString(),
          },
          allow_promotion_codes: true,
        });

        return {
          sessionId: session.id,
          sessionUrl: session.url,
          orderNumber,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
