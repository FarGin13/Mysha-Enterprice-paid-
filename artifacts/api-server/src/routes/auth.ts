import { Router } from "express";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { db } from "@workspace/db";
import { usersTable, verificationCodesTable } from "@workspace/db";
import { eq, and, gt } from "drizzle-orm";

const router = Router();

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function codeExpiry(): Date {
  const d = new Date();
  d.setMinutes(d.getMinutes() + 15);
  return d;
}

async function sendVerificationEmail(to: string, code: string, type: "signup" | "reset") {
  const subject = type === "signup"
    ? "Verify your Mysha Enterprise account"
    : "Reset your Mysha Enterprise password";

  const html = `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
      <div style="text-align:center;margin-bottom:24px">
        <div style="display:inline-block;background:#f97316;color:#fff;font-weight:bold;font-size:20px;padding:10px 18px;border-radius:8px">M</div>
        <span style="font-size:22px;font-weight:bold;margin-left:8px">Mysha<span style="color:#f97316">Enterprise</span></span>
      </div>
      <h2 style="color:#111;margin-bottom:8px">${type === "signup" ? "Confirm your email" : "Reset your password"}</h2>
      <p style="color:#555;margin-bottom:24px">Use this code to ${type === "signup" ? "verify your account" : "reset your password"}. It expires in 15 minutes.</p>
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:24px;text-align:center;margin-bottom:24px">
        <p style="font-size:40px;font-weight:bold;letter-spacing:12px;color:#f97316;margin:0">${code}</p>
      </div>
      <p style="color:#9ca3af;font-size:12px;text-align:center">If you didn't request this, you can safely ignore this email.</p>
    </div>
  `;

  const useSmtp = process.env["SMTP_HOST"] && process.env["SMTP_USER"] && process.env["SMTP_PASS"];

  if (useSmtp) {
    const transport = nodemailer.createTransport({
      host: process.env["SMTP_HOST"],
      port: Number(process.env["SMTP_PORT"] || 587),
      secure: process.env["SMTP_PORT"] === "465",
      auth: { user: process.env["SMTP_USER"], pass: process.env["SMTP_PASS"] },
    });
    await transport.sendMail({
      from: `"Mysha Enterprise" <${process.env["SMTP_USER"]}>`,
      to,
      subject,
      html,
    });
    return null;
  }

  return code;
}

router.post("/auth/signup", async (req, res) => {
  const { name, email, password } = req.body as { name?: string; email?: string; password?: string };

  if (!name || !email || !password) {
    res.status(400).json({ error: "Name, email, and password are required" });
    return;
  }
  if (password.length < 8) {
    res.status(400).json({ error: "Password must be at least 8 characters" });
    return;
  }

  const existing = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
  if (existing.length > 0) {
    res.status(409).json({ error: "An account with this email already exists" });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const [user] = await db.insert(usersTable).values({ name, email, passwordHash, verified: false }).returning();

  const code = generateCode();
  await db.insert(verificationCodesTable).values({
    email,
    code,
    type: "signup",
    expiresAt: codeExpiry(),
  });

  const devCode = await sendVerificationEmail(email, code, "signup");
  req.log.info({ email }, "Signup verification code sent");

  res.json({ message: "Account created. Check your email for the verification code.", devCode });
});

router.post("/auth/verify-email", async (req, res) => {
  const { email, code } = req.body as { email?: string; code?: string };
  if (!email || !code) {
    res.status(400).json({ error: "Email and code are required" });
    return;
  }

  const [record] = await db
    .select()
    .from(verificationCodesTable)
    .where(
      and(
        eq(verificationCodesTable.email, email),
        eq(verificationCodesTable.code, code),
        eq(verificationCodesTable.type, "signup"),
        eq(verificationCodesTable.used, false),
        gt(verificationCodesTable.expiresAt, new Date()),
      )
    )
    .limit(1);

  if (!record) {
    res.status(400).json({ error: "Invalid or expired verification code" });
    return;
  }

  await db.update(verificationCodesTable).set({ used: true }).where(eq(verificationCodesTable.id, record.id));
  const [user] = await db.update(usersTable).set({ verified: true }).where(eq(usersTable.email, email)).returning();

  (req.session as Record<string, unknown>)["userId"] = user.id;
  res.json({ user: { id: user.id, name: user.name, email: user.email, verified: user.verified } });
});

router.post("/auth/resend-code", async (req, res) => {
  const { email } = req.body as { email?: string };
  if (!email) { res.status(400).json({ error: "Email is required" }); return; }

  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
  if (!user) { res.status(404).json({ error: "No account found with this email" }); return; }

  await db.update(verificationCodesTable).set({ used: true })
    .where(and(eq(verificationCodesTable.email, email), eq(verificationCodesTable.type, "signup")));

  const code = generateCode();
  await db.insert(verificationCodesTable).values({ email, code, type: "signup", expiresAt: codeExpiry() });

  const devCode = await sendVerificationEmail(email, code, "signup");
  res.json({ message: "Verification code resent", devCode });
});

router.post("/auth/signin", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
  if (!user) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  (req.session as Record<string, unknown>)["userId"] = user.id;
  res.json({ user: { id: user.id, name: user.name, email: user.email, verified: user.verified } });
});

router.post("/auth/signout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Signed out" });
  });
});

router.get("/auth/me", async (req, res) => {
  const userId = (req.session as Record<string, unknown>)["userId"] as number | undefined;
  if (!userId) { res.status(401).json({ error: "Not authenticated" }); return; }

  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
  if (!user) { res.status(401).json({ error: "User not found" }); return; }

  res.json({ user: { id: user.id, name: user.name, email: user.email, verified: user.verified } });
});

router.post("/auth/forgot-password", async (req, res) => {
  const { email } = req.body as { email?: string };
  if (!email) { res.status(400).json({ error: "Email is required" }); return; }

  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
  if (!user) {
    res.json({ message: "If an account exists, a reset code has been sent" });
    return;
  }

  await db.update(verificationCodesTable).set({ used: true })
    .where(and(eq(verificationCodesTable.email, email), eq(verificationCodesTable.type, "reset")));

  const code = generateCode();
  await db.insert(verificationCodesTable).values({ email, code, type: "reset", expiresAt: codeExpiry() });

  const devCode = await sendVerificationEmail(email, code, "reset");
  req.log.info({ email }, "Password reset code sent");

  res.json({ message: "If an account exists, a reset code has been sent", devCode });
});

router.post("/auth/verify-reset-code", async (req, res) => {
  const { email, code } = req.body as { email?: string; code?: string };
  if (!email || !code) { res.status(400).json({ error: "Email and code are required" }); return; }

  const [record] = await db
    .select()
    .from(verificationCodesTable)
    .where(
      and(
        eq(verificationCodesTable.email, email),
        eq(verificationCodesTable.code, code),
        eq(verificationCodesTable.type, "reset"),
        eq(verificationCodesTable.used, false),
        gt(verificationCodesTable.expiresAt, new Date()),
      )
    )
    .limit(1);

  if (!record) { res.status(400).json({ error: "Invalid or expired reset code" }); return; }
  res.json({ valid: true });
});

router.post("/auth/reset-password", async (req, res) => {
  const { email, code, newPassword } = req.body as { email?: string; code?: string; newPassword?: string };
  if (!email || !code || !newPassword) {
    res.status(400).json({ error: "Email, code, and new password are required" });
    return;
  }
  if (newPassword.length < 8) {
    res.status(400).json({ error: "Password must be at least 8 characters" });
    return;
  }

  const [record] = await db
    .select()
    .from(verificationCodesTable)
    .where(
      and(
        eq(verificationCodesTable.email, email),
        eq(verificationCodesTable.code, code),
        eq(verificationCodesTable.type, "reset"),
        eq(verificationCodesTable.used, false),
        gt(verificationCodesTable.expiresAt, new Date()),
      )
    )
    .limit(1);

  if (!record) { res.status(400).json({ error: "Invalid or expired reset code" }); return; }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await db.update(usersTable).set({ passwordHash }).where(eq(usersTable.email, email));
  await db.update(verificationCodesTable).set({ used: true }).where(eq(verificationCodesTable.id, record.id));

  res.json({ message: "Password reset successfully" });
});

export default router;
