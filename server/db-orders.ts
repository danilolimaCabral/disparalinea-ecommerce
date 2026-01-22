import { eq, desc } from "drizzle-orm";
import { getDb } from "./db";
import { orders, orderItems, InsertOrder, InsertOrderItem } from "../drizzle/schema";
import { nanoid } from "nanoid";

/**
 * Generate a unique order number
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = nanoid(6).toUpperCase();
  return `DT-${timestamp}-${random}`;
}

/**
 * Create a new order with items
 */
export async function createOrder(
  userId: number,
  orderData: Omit<InsertOrder, "id" | "userId" | "orderNumber" | "createdAt" | "updatedAt">,
  items: Omit<InsertOrderItem, "id" | "orderId" | "createdAt">[]
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const orderNumber = generateOrderNumber();

  // Insert order
  const [order] = await db.insert(orders).values({
    ...orderData,
    userId,
    orderNumber,
  });

  const orderId = order.insertId;

  // Insert order items
  if (items.length > 0) {
    await db.insert(orderItems).values(
      items.map((item) => ({
        ...item,
        orderId,
      }))
    );
  }

  return { orderId, orderNumber };
}

/**
 * Get order by ID with items
 */
export async function getOrderById(orderId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1);

  if (!order) return undefined;

  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, orderId));

  return { ...order, items };
}

/**
 * Get order by order number
 */
export async function getOrderByNumber(orderNumber: string) {
  const db = await getDb();
  if (!db) return undefined;

  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.orderNumber, orderNumber))
    .limit(1);

  if (!order) return undefined;

  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, order.id));

  return { ...order, items };
}

/**
 * Get all orders for a user
 */
export async function getUserOrders(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt));
}

/**
 * Update order payment status
 */
export async function updateOrderPaymentStatus(
  orderId: number,
  paymentStatus: "pending" | "paid" | "failed" | "refunded",
  stripePaymentIntentId?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateData: any = {
    paymentStatus,
  };

  if (stripePaymentIntentId) {
    updateData.stripePaymentIntentId = stripePaymentIntentId;
  }

  if (paymentStatus === "paid") {
    updateData.paidAt = new Date();
    updateData.status = "processing";
  }

  await db.update(orders).set(updateData).where(eq(orders.id, orderId));
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: number,
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateData: any = { status };

  if (status === "shipped") {
    updateData.shippedAt = new Date();
  } else if (status === "delivered") {
    updateData.deliveredAt = new Date();
  }

  await db.update(orders).set(updateData).where(eq(orders.id, orderId));
}
