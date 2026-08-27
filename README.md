# Impact Program Registration

A QR-accessible registration form for the **Impact** program. Collects a person's name, phone number, and consent to be contacted.

## Features

- **Registration form** (`/`) — name, phone number, and consent checkbox
- **QR code page** (`/qr`) — printable QR code that links directly to the form
- **Persistent storage** — submissions saved to Postgres (Neon)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file and add your database URL:

```bash
cp .env.example .env.local
```

3. Run the development server:

```bash
npm run dev
```

4. Open:
   - Form: [http://localhost:3000](http://localhost:3000)
   - QR code: [http://localhost:3000/qr](http://localhost:3000/qr)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Postgres connection string (Neon recommended) |
| `NEXT_PUBLIC_APP_URL` | Optional. Your deployed URL so QR codes point to production |

## Deployment

Deploy to [Vercel](https://vercel.com) and set `DATABASE_URL` and `NEXT_PUBLIC_APP_URL` in your project environment variables.

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- [shadcn/ui](https://ui.shadcn.com)
- [Neon Postgres](https://neon.tech)
- [qrcode](https://www.npmjs.com/package/qrcode)
