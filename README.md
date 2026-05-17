Readme · MD
Copy

# Mysha Enterprise — Full-Stack E-Commerce Platform
 
A complete, production-ready e-commerce web application built for **Mysha Enterprise**, a Bangladeshi electronics and gadgets retailer. Built end-to-end — from PostgreSQL database schema to a fully functional React storefront.
 
>  **Deployment Status:** This project is currently being deployed to a live production server. The live URL will be updated here once it goes live.
 
---
 
## What's Inside
 
###  Shopping
- Product listing with category browsing, brand filter, price range filter, keyword search, and sorting
- Tag-based sub-filtering (e.g. headphones and watches within gadgets)
- Product detail page with EMI calculator, discount badge, stock status, and reviews
- Flash sale section with countdown timer
- Recently viewed products
###  Cart & Checkout
- Add to cart from any page, quantity selector, remove items
- Checkout with shipping address form and payment method selection
- WhatsApp order confirmation after checkout
###  Wishlist & Compare
- Save products to wishlist (no login required)
- Compare up to 4 products side by side
- Sticky compare bar at the bottom of the screen
###  Accounts
- Sign up with email verification via 6-digit OTP
- Sign in / sign out
- Forgot password and reset via OTP
- Profile page and order history
###  Reviews
- Star ratings with breakdown chart
- Helpful votes on reviews
- Verified purchase badge
###  Responsive
- Fully responsive from mobile to large desktop
- Mobile filter sheet, responsive grids, stacked product detail on mobile
---
 
## Tech Stack
 
**Frontend** (`artifacts/mysha-enterprise/`)
- React 18 + TypeScript + Vite
- TailwindCSS v4
- TanStack Query — server state and caching
- Wouter — client-side routing
- Radix UI + shadcn/ui — accessible components
- Framer Motion, Embla Carousel, Sonner, Lucide React
**Backend** (`artifacts/api-server/`)
- Node.js + Express 5 + TypeScript
- Drizzle ORM
- bcryptjs, express-session, express-rate-limit
- Nodemailer (email OTP)
- Pino (logging)
**Database** (`lib/db/`)
- PostgreSQL
- Drizzle ORM schema and migrations
---

## Local Setup
 
### Prerequisites
- Node.js 20+
- pnpm 9+
- PostgreSQL 15+

## Notes
 
- Currency displayed in Bangladeshi Taka (৳)
- EMI calculator covers major Bangladeshi banks
- Wishlist and recently viewed stored in localStorage — no account needed
- Cart is session-based — persists within a browser session
- All monetary values use `numeric(10,2)` precision in the database
 
