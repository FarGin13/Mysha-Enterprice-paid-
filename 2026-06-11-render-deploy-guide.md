# Mysha Enterprise — Deploy on Render (single service)

This runs your Express server **and** serves your storefront from one Render web
service. One URL, same origin → sessions/login work, no CORS. Your Neon database
and its data are already set up and reused as-is.

## 1. Push the latest code

From `E:\Mysha-Enterprise F\Mysha-Enterprise`:

```
git add -A
git commit -m "Serve frontend from Express for single-service deploy (Render)"
git push
```

## 2. Create the Render service

1. Go to https://render.com and sign up (use **GitHub** to sign in).
2. Click **New → Web Service**.
3. Connect your GitHub and pick the **Mysha-Enterprice-paid-** repo.
4. Fill in the settings:

   | Field | Value |
   |---|---|
   | **Name** | `mysha-enterprise` (or anything) |
   | **Region** | Singapore (closest to Bangladesh / your Neon region) |
   | **Branch** | `main` |
   | **Root Directory** | *(leave blank)* |
   | **Runtime** | Node |
   | **Build Command** | `pnpm install && pnpm --filter @workspace/mysha-enterprise build && pnpm --filter @workspace/api-server build` |
   | **Start Command** | `node artifacts/api-server/dist/index.mjs` |
   | **Instance Type** | Free |

## 3. Environment variables

Add these under **Environment** (Advanced → Add Environment Variable):

| Name | Value |
|---|---|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | your Neon connection string (the **direct**, non-pooler one is ideal here) |
| `SESSION_SECRET` | your 32+ character secret |
| `RESEND_API_KEY` | your `re_...` key |
| `UPSTASH_REDIS_REST_URL` | *(optional)* your Upstash URL |
| `UPSTASH_REDIS_REST_TOKEN` | *(optional)* your Upstash token |

Notes:
- **Do not** set `PORT` — Render provides it automatically and the app reads it.
- Upstash is **optional** here: on a single always-on server, rate limiting works
  in-memory. Add the Upstash vars only if you want shared limits.

## 4. Deploy

Click **Create Web Service**. Render installs, builds the frontend + backend, and
starts the server. First build takes a few minutes.

When it's live, Render gives you a URL like `https://mysha-enterprise.onrender.com`.

## 5. Verify

- Open `https://<your-app>.onrender.com/api/healthz` → `{"status":"ok"}`
- Open the site root → your storefront with products, categories, flash sale, etc.
- Sign up with a real email, confirm the code arrives, place a test order.

## Notes

- **Free tier sleeps** after ~15 min idle; the first visit after that takes
  ~30–60s to wake. Upgrade later to keep it always on.
- **Rotate the secrets** you shared earlier once it's working: reset the Neon
  `neondb_owner` password and generate a fresh `SESSION_SECRET`, then update both
  in Render's environment variables.
- The old Vercel project can be deleted later — Render is now the backend+site.
  (You can keep Vercel for the frontend only if you ever want to split them, but
  the single Render service is simpler.)
