import { Router } from "express";

const router = Router();

interface Coupon {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrder: number;
  description: string;
}

const COUPONS: Coupon[] = [
  { code: "MYSHA10",   type: "percentage", value: 10,  minOrder: 0,    description: "10% off your order" },
  { code: "SAVE500",   type: "fixed",      value: 500, minOrder: 3000, description: "৳500 off on orders over ৳3,000" },
  { code: "WELCOME",   type: "fixed",      value: 200, minOrder: 0,    description: "৳200 welcome discount" },
  { code: "NEWUSER15", type: "percentage", value: 15,  minOrder: 1000, description: "15% off for new users" },
  { code: "FLASH20",   type: "percentage", value: 20,  minOrder: 5000, description: "20% flash sale discount" },
  { code: "TECH5",     type: "percentage", value: 5,   minOrder: 0,    description: "5% off all tech products" },
];

router.post("/coupons/validate", (req, res) => {
  const { code, orderTotal } = req.body;

  if (!code || typeof code !== "string") {
    return void res.status(400).json({ valid: false, message: "Coupon code is required." });
  }

  const coupon = COUPONS.find(c => c.code === code.trim().toUpperCase());

  if (!coupon) {
    return void res.status(404).json({ valid: false, message: "Invalid coupon code. Please try again." });
  }

  const total = parseFloat(orderTotal) || 0;

  if (total < coupon.minOrder) {
    return void res.json({
      valid: false,
      message: `This coupon requires a minimum order of ৳${coupon.minOrder.toLocaleString()}.`,
    });
  }

  const discountAmount =
    coupon.type === "percentage"
      ? Math.round((total * coupon.value) / 100)
      : Math.min(coupon.value, total);

  return void res.json({
    valid: true,
    code: coupon.code,
    type: coupon.type,
    value: coupon.value,
    discountAmount,
    finalTotal: Math.max(0, total - discountAmount),
    description: coupon.description,
    message: `Coupon applied! You save ৳${discountAmount.toLocaleString()}.`,
  });
});

export default router;
