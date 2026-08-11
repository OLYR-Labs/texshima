# TEXSHIMA — Modern E-commerce

A modern editorial redesign for Texshima built with Next.js App Router, TypeScript, Tailwind, Prisma/SQLite, NextAuth, Zustand and Stripe test mode.

## Run

```bash
npm install
copy .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

Open http://localhost:3000.

Demo:
- Email: demo@texshima.com
- Password: password123

## Stripe

Put your Stripe test keys in `.env`.

For local webhook testing:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## Design direction

The redesign intentionally removes the warm beige/terracotta visual language and replaces it with a monochrome, editorial fashion system:
- white/black foundation
- large typography
- image-first layouts
- thin borders
- minimal cards
- restrained sale red
- sticky blurred navigation
- responsive mobile navigation
- minimal rounded UI
