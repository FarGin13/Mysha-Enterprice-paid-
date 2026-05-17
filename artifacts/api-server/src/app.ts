import express, { type Express } from "express";
import cors from "cors";
import session from "express-session";
import pinoHttp from "pino-http";
import rateLimit from "express-rate-limit";
import router from "./routes";
import { logger } from "./lib/logger";
import "express-session";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  })
);

// ─── CORS ─────────────────────────────────────────────────────────────────────
// credentials:true is required so the browser sends the session cookie.
// The Vite dev proxy (localhost:8081 → localhost:8080) needs this.
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (same-origin, mobile, Postman)
      // and any localhost / 127.0.0.1 origin in development.
      if (!origin) return callback(null, true);
      if (
        origin.includes("localhost") ||
        origin.includes("127.0.0.1") ||
        process.env.NODE_ENV !== "production"
      ) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true, // ← required to send Set-Cookie back to browser
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Session ──────────────────────────────────────────────────────────────────
app.use(
  session({
    secret: process.env["SESSION_SECRET"] || "mysha-dev-secret",
    resave: false,
    saveUninitialized: false, // false = don't create session until something is stored
    cookie: {
      // IMPORTANT: must be false in development so the cookie is sent over HTTP
      // through the Vite proxy.  secure:true only works with HTTPS.
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

// ─── Rate limiter on auth routes ──────────────────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // increased from 10 so dev testing isn't constantly blocked
  message: { error: "Too many requests. Please try again in 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/auth", authLimiter);
app.use("/api", router);

export default app;
