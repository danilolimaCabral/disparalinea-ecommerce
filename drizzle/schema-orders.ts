import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal } from "drizzle-orm/mysql-core";
import { users, products } from "./schema";

/**
 * Orders table - stores customer orders
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull().references(() => users.id),
  
  // Order details
  orderNumber: varchar("order_number", { length: 64 }).notNull().unique(),
  status: mysqlEnum("status", ["pending", "processing", "shipped", "delivered", "cancelled"]).default("pending").notNull(),
  
  // Pricing
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  vatAmount: decimal("vat_amount", { precision: 10, scale: 2 }).notNull(),
  shippingCost: decimal("shipping_cost", { precision: 10, scale: 2 }).default("0.00").notNull(),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  
  // Shipping information
  shippingName: varchar("shipping_name", { length: 255 }).notNull(),
  shippingEmail: varchar("shipping_email", { length: 320 }).notNull(),
  shippingPhone: varchar("shipping_phone", { length: 50 }),
  shippingAddress: text("shipping_address").notNull(),
  shippingCity: varchar("shipping_city", { length: 100 }).notNull(),
  shippingPostalCode: varchar("shipping_postal_code", { length: 20 }).notNull(),
  shippingCountry: varchar("shipping_country", { length: 100 }).notNull(),
  
  // Payment information
  stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 }),
  paymentStatus: mysqlEnum("payment_status", ["pending", "paid", "failed", "refunded"]).default("pending").notNull(),
  
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
  paidAt: timestamp("paid_at"),
  shippedAt: timestamp("shipped_at"),
  deliveredAt: timestamp("delivered_at"),
});

/**
 * Order items table - stores individual items in each order
 */
export const orderItems = mysqlTable("order_items", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("order_id").notNull().references(() => orders.id),
  productId: int("product_id").notNull().references(() => products.id),
  
  // Product snapshot at time of purchase
  productName: varchar("product_name", { length: 255 }).notNull(),
  productBrand: varchar("product_brand", { length: 100 }),
  productImage: text("product_image"),
  
  // Pricing at time of purchase
  priceExclVat: decimal("price_excl_vat", { precision: 10, scale: 2 }).notNull(),
  priceInclVat: decimal("price_incl_vat", { precision: 10, scale: 2 }).notNull(),
  quantity: int("quantity").notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;
