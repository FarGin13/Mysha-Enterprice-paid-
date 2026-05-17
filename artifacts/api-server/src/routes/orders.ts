import { Router } from "express";
import { db } from "@workspace/db";
import { ordersTable, cartItemsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

function formatOrder(o: typeof ordersTable.$inferSelect) {
  return {
    id: o.id,
    items: (o.items as Array<{ productId: number; name: string; price: number; quantity: number; image: string; brand: string }>),
    total: parseFloat(o.total),
    status: o.status,
    createdAt: o.createdAt?.toISOString() ?? new Date().toISOString(),
    shippingAddress: o.shippingAddress,
    paymentMethod: o.paymentMethod,
  };
}

router.get("/orders", async (req, res) => {
  try {
    const rows = await db.select().from(ordersTable).where(eq(ordersTable.sessionId, req.session.id));
    res.json(rows.map(formatOrder).reverse());
  } catch (err) {
    req.log.error({ err }, "Error fetching orders");
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.post("/orders", async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    const cartItems = await db.select().from(cartItemsTable).where(eq(cartItemsTable.sessionId, req.session.id));
    if (cartItems.length === 0) return void res.status(400).json({ error: "Cart is empty" });

    const items = cartItems.map((i) => ({
      productId: i.productId,
      name: i.name,
      price: parseFloat(i.price),
      quantity: i.quantity,
      image: i.image,
      brand: i.brand,
    }));
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const [order] = await db.insert(ordersTable).values({
      sessionId: req.session.id,
      total: total.toString(),
      status: "confirmed",
      shippingAddress,
      paymentMethod: paymentMethod ?? "cash",
      items,
    }).returning();

    await db.delete(cartItemsTable).where(eq(cartItemsTable.sessionId, req.session.id));

    res.status(201).json(formatOrder(order));
  } catch (err) {
    req.log.error({ err }, "Error creating order");
    res.status(500).json({ error: "Failed to create order" });
  }
});

router.get("/orders/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [order] = await db.select().from(ordersTable).where(eq(ordersTable.id, id));
    if (!order) return void res.status(404).json({ error: "Order not found" });
    res.json(formatOrder(order));
  } catch (err) {
    req.log.error({ err }, "Error fetching order");
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

export default router;
