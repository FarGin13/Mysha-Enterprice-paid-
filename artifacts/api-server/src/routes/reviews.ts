import { Router } from "express";
import { db } from "@workspace/db";
import { reviewsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const router = Router();

router.get("/products/:id/reviews", async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  if (isNaN(productId)) { res.status(400).json({ error: "Invalid product ID" }); return; }

  const reviews = await db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.productId, productId))
    .orderBy(sql`${reviewsTable.createdAt} desc`);

  const total = reviews.length;
  const avgRating = total > 0
    ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / total) * 10) / 10
    : 0;

  const breakdown = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(r => r.rating === stars).length;
    return { stars, count, pct: total > 0 ? Math.round((count / total) * 100) : 0 };
  });

  res.json({ reviews, avgRating, total, breakdown });
});

router.post("/products/:id/reviews", async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  if (isNaN(productId)) { res.status(400).json({ error: "Invalid product ID" }); return; }

  const { reviewerName, rating, comment } = req.body as {
    reviewerName?: string;
    rating?: number;
    comment?: string;
  };

  if (!reviewerName || typeof reviewerName !== "string" || reviewerName.trim().length < 2) {
    res.status(400).json({ error: "Name must be at least 2 characters" }); return;
  }
  if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
    res.status(400).json({ error: "Rating must be between 1 and 5" }); return;
  }
  if (!comment || typeof comment !== "string" || comment.trim().length < 10) {
    res.status(400).json({ error: "Review must be at least 10 characters" }); return;
  }

  const [review] = await db.insert(reviewsTable).values({
    productId,
    reviewerName: reviewerName.trim(),
    rating,
    comment: comment.trim(),
    verified: true,
  }).returning();

  res.status(201).json(review);
});

router.post("/reviews/:id/helpful", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid review ID" }); return; }

  const [review] = await db
    .update(reviewsTable)
    .set({ helpfulCount: sql`${reviewsTable.helpfulCount} + 1` })
    .where(eq(reviewsTable.id, id))
    .returning();

  if (!review) { res.status(404).json({ error: "Review not found" }); return; }
  res.json({ helpfulCount: review.helpfulCount });
});

export default router;
