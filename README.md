## TechMart — Next.js E‑commerce

An e‑commerce web app built with Next.js App Router, featuring product browsing, carts, brands, categories, authentication, and orders. Optimized with Turbopack, TypeScript, Tailwind CSS v4, and Redux Toolkit.

### Features

- Product listing and details (`/products`, `/products/[id]`)
- Cart management with Redux (`/cart`)
- Categories and brands pages (`/categories`, `/brands`)
- Orders page (`/allorders`)
- Authentication via NextAuth (`/api/auth/[...nextauth]`)
- API routes for products and users (`/api/products`, `/api/users`)
- Responsive UI using Tailwind CSS and Radix primitives

### Tech Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **State**: Redux Toolkit, React Redux
- **Auth**: NextAuth
- **Forms & Validation**: React Hook Form, Zod
- **UI**: Tailwind CSS v4, Radix UI, Lucide Icons
- **Language**: TypeScript

---

## Getting Started

### Prerequisites

- Node.js 18+ (recommended 20+)
- npm (or pnpm/yarn/bun)

### Installation

```bash
git clone <your-fork-or-repo-url>
cd Ecommerce_site_next.js
npm install
```

### Environment Variables

Create a `.env.local` file in the project root with at least:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-strong-random-secret
```

Add any provider credentials if you enable them (e.g., GitHub, Google). See NextAuth docs.

### Development

```bash
npm run dev
```

Open `http://localhost:3000`.

### Production Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## Available Scripts

- `npm run dev`: Start dev server with Turbopack
- `npm run build`: Create production build (Turbopack)
- `npm start`: Run production server
- `npm run lint`: Run ESLint

---

## Project Structure

```text
src/
  app/
    (pages)/
      products/[id]/page.tsx
      products/page.tsx
      cart/
      brands/
      categories/
      allorders/
    api/
      auth/[...nextauth]/route.ts
      products/route.ts
      users/route.ts
  components/
    layout/ (Navbar, Footer, ProvidersContainer)
    products/ (ProductCard, AddToCartBtn, CartProduct, wishlistBtn)
    shared/ (LoadingSpinner)
    ui/ (form, input, button, label, etc.)
  redux/ (store, slices for cart, products, etc.)
  interfaces/ (TypeScript interfaces)
  helpers/ (currency, rating)
  lib/ (utils)
```

---

## Contributing

1. Fork the repo and create a feature branch.
2. Commit with clear messages.
3. Open a Pull Request describing your changes.

Please follow the existing code style and run `npm run lint` before submitting.

---

## Deployment

The app is optimized for deployment on Vercel. After setting environment variables in your Vercel project, push to a branch and let Vercel build and deploy.

---

## License

This project is provided under an open-source license. If missing, consider adding `LICENSE` (e.g., MIT) to the repository root.
