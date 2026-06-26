# 🌐 Orchidd Client (Next.js Portal)

Welcome to the frontend application of **Orchidd CLI** (Orbital System). This portal is built with **Next.js 16** (using **React 19** and **Tailwind CSS 4**) to serve as the secure web-based authorization gateway for the `orbitals` CLI tool.

---

## 🎨 Premium UI & Design Aesthetics

The client application features a premium dark-themed interface built with the following aesthetics:
- **Glassmorphism**: Backdrop blur overlays (`backdrop-blur-md`/`backdrop-blur-3xl`) with white borders (`border-white/10`) for cards, input containers, and menus.
- **Grain Textures**: Dynamic grain image overlays adding premium depth to solid panels.
- **Mesh Gradients**: Flowing background animations with soft glow states using `framer-motion` and custom CSS blurs.
- **Micro-Animations**: Hover actions, spin transitions, and smooth page mounting effects powered by Framer Motion.

---

## ✨ Features

- **GitHub OAuth Login**: Integrated seamlessly using `better-auth/react`.
- **Device Authorization View**: A minimalist input UI that formats user codes as `XXXX-XXXX` and prompts verification.
- **Approve/Deny Controls**: Detailed control panels for active device sessions where users verify and authorize the terminal with a single click.
- **Protected Routing**: Automatical redirection to sign-in pages if an active session cannot be found.

---

## 📂 Route Directory Structure

The frontend routing layout in the `/app` directory:

| Path | File | Description |
| :--- | :--- | :--- |
| `/` | [`app/page.tsx`](file:///c:/Users/abhas/Desktop/Orchidd%20CLI/client/app/page.tsx) | User Session profile page (GitHub metadata & logout). |
| `/device` | [`app/device/page.tsx`](file:///c:/Users/abhas/Desktop/Orchidd%20CLI/client/app/device/page.tsx) | Form to input `user_code` shown on the terminal. |
| `/approve` | [`app/approve/page.tsx`](file:///c:/Users/abhas/Desktop/Orchidd%20CLI/client/app/approve/page.tsx) | Gateway to approve or deny the specific device access. |
| `/(auth)/sign-in` | [`app/(auth)/sign-in/page.tsx`](file:///c:/Users/abhas/Desktop/Orchidd%20CLI/client/app/(auth)/sign-in/page.tsx) | GitHub Social Sign-In credentials handler. |

---

## 🚀 Getting Started

To run the Next.js client alone:

### 1. Environment Configuration
Ensure you have a `.env.local` file configured in this directory:
```env
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3005" # Backend API endpoint
```

### 2. Commands

```bash
# Install dependencies (if not done at the workspace level)
npm install

# Run the Next.js local development server
npm run dev
```

The portal runs on **`http://localhost:3000`** by default.

---

## 🛠️ Technology Stack

- **Core**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion
- **Auth Client**: Better Auth React SDK (`better-auth/react`) with `deviceAuthorizationClient` plugin
- **Icons**: Lucide React
- **Toast Notifications**: Sonner Toast manager

---

> [!IMPORTANT]
> The client requires the Orchidd Backend server to be running (typically on port `3005`) for handling authentication APIs and active Prisma database queries. See the root [README.md](file:///c:/Users/abhas/Desktop/Orchidd%20CLI/README.md) for full stack execution instructions.
